import * as scraper from "../scraper/scraper";

describe("Google Search Results Scraper", () => {
  it("gets search results", async () => {
    const searchResults: {
      query: string;
      link: string;
      hostname: string;
      title: string;
    }[] = await scraper.startAggregation("", ["test"], "1");

    expect(searchResults).toBeDefined();
    expect(searchResults.length).toEqual(10);
    expect(searchResults[0].query).toEqual("test");
    expect(searchResults[0].title).toBeDefined();
    expect(searchResults[0].link).toBeDefined();
    expect(searchResults[0].hostname).toBeDefined();
  });
});
