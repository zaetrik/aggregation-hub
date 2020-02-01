interface ModuleRouteSettings {
  [route: string]: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    bodyParams: {
      [bodyParam: string]:
        | string[]
        | number[]
        | boolean
        | string
        | number
        | boolean[];
    };
    queryParams: {
      [queryParam: string]:
        | string[]
        | number[]
        | boolean
        | string
        | number
        | boolean[];
    };
  };
}
