import { v4 } from "uuid/interfaces";

interface DataModule {
  name: string;
  address: string;
  config: {
    routes: {
      [route: string]: {
        description: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
        query: {
          [queryParam: string]: {
            type:
              | "string[]"
              | "number[]"
              | "boolean"
              | "string"
              | "number"
              | "boolean[]";
            description: string;
            required: boolean;
          };
        };
        body: {
          [bodyParam: string]: {
            type:
              | "string[]"
              | "number[]"
              | "boolean"
              | "string"
              | "number"
              | "boolean[]";
            description: string;
            required: boolean;
          };
        };
        configurable: boolean;
      };
    };
    description: string;
    author: string;
  };
  id?: number;
}
