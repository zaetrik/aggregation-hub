import * as esb from "elastic-builder";

export default (query: { [key: string]: any }): esb.RequestBodySearch => {
  const queryObjects: esb.BoolQuery[] = Object.keys(query).map(key =>
    getQueryObjects(key, query[key])
  );

  return esb.requestBodySearch().query(esb.boolQuery().must(queryObjects));
};

const getQueryObjects = (key, item): esb.BoolQuery => {
  return esb
    .boolQuery()
    .must(
      item === "*" ? esb.wildcardQuery(key, "*") : esb.matchQuery(key, item)
    );
};
