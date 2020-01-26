import { DataModule } from "../types/dataModule";
import { Fragment } from "react";
import { Text, Box } from "grommet";

const ModuleRoutesDescription = ({ module }: { module: DataModule }) => {
  return (
    <Fragment>
      {Object.keys(module.config.routes).map((route, index) => {
        return (
          <Box pad="small" key={index}>
            <Text>Route: {route}</Text>
            <Box pad="small">
              <Text>Method: {module.config.routes[route].method}</Text>
              <Text>
                Query:{" "}
                {Object.keys(module.config.routes[route].query).map(
                  (queryParam, indexQueryParams) => {
                    return (
                      <Box pad="small" key={indexQueryParams}>
                        <Text>Query parameter: {queryParam}</Text>
                        <Text>
                          Type:{" "}
                          {module.config.routes[route].query[queryParam].type}
                        </Text>
                        <Text>
                          Description:{" "}
                          {
                            module.config.routes[route].query[queryParam]
                              .description
                          }
                        </Text>
                      </Box>
                    );
                  }
                )}
              </Text>
              <Text>
                Body:{" "}
                {Object.keys(module.config.routes[route].body).map(
                  (bodyParam, indexBodyParams) => {
                    return (
                      <Box pad="small" key={indexBodyParams}>
                        <Text>Body parameter: {bodyParam}</Text>
                        <Text>
                          Type:{" "}
                          {module.config.routes[route].body[bodyParam].type}
                        </Text>
                        <Text>
                          Description:{" "}
                          {
                            module.config.routes[route].body[bodyParam]
                              .description
                          }
                        </Text>
                      </Box>
                    );
                  }
                )}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Fragment>
  );
};

export default ModuleRoutesDescription;
