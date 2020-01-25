import axios, { AxiosResponse } from "axios";
import retry from "async-retry";
import cheerio from "cheerio";
import logger from "../utils/logger";

const startAggregation = async (
  dataStoreUrl: string,
  searchQueries: string[],
  moduleId: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getSearchResultsPromises: Promise<
        {
          title: string;
          link: string;
          query: string;
          hostname: string;
        }[]
      >[] = searchQueries.map(searchQuery => getSearchResults(searchQuery));

      const searchResults = await Promise.all(getSearchResultsPromises);
      const flattenedSearchResults = [].concat(...searchResults);

      flattenedSearchResults.map(searchResult => {
        axios.post(`${dataStoreUrl}/document/insert`, {
          index: moduleId,
          data: searchResult
        });
      });

      resolve();
    } catch (err) {
      logger.log("error", err);
      reject(err);
    }
  });
};

const stopAggregation = async (moduleServiceUrl: string, moduleId: string) => {
  await axios.post(`${moduleServiceUrl}/aggregation/${moduleId}/done`, {});
};

/**
 * Fetches HTML from page
 * @param URL Link from page to fetch
 * @returns HTML from page
 */
const getHTML = async (url: string): Promise<AxiosResponse> => {
  return await retry(
    async request =>
      await axios.get(url).catch(err => {
        logger.log("error", `Error in getHTML() for URL "${url}": ${err}`);
        throw err;
      }),
    {
      retries: 3,
      minTimeout: 120000
    }
  );
};

const getSearchResults = async (
  searchQuery: string
): Promise<{
  title: string;
  link: string;
  query: string;
  hostname: string;
}[]> => {
  const html: AxiosResponse = await getHTML(
    `https://www.google.com/search?q=${searchQuery}&tbm=nws`
  );

  const $ = await cheerio.load(html.data);
  const searchResults = [];
  const scrapedLinks = [];

  $("div > .ZINbbc > .kCrYT").each(function(i, element) {
    try {
      const title = $(this)
        .children()
        .first()
        .text()
        .trim();

      const link = $(this)
        .find("a")
        .attr("href")
        .split("/url?q=")[1]
        .split("&sa=U&")[0];

      const hostname = new URL(link).hostname;

      if (
        title &&
        link &&
        hostname &&
        scrapedLinks.toString().indexOf(link) === -1
      ) {
        searchResults.push({
          query: searchQuery,
          title: title,
          link: link,
          hostname: hostname
        });
      }
      scrapedLinks.push(link);
    } catch (err) {
      logger.log("error", err);
    }
  });

  return searchResults;
};

export { startAggregation, stopAggregation };
