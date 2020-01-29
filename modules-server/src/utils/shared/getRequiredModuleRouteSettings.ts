import { DataModule } from "dataModule";

/**
 * @returns { body: string[]; query: string[] } required params for route
 */
export default (
  module: DataModule,
  route: string
): { body: string[]; query: string[] } => {
  const requiredBodyParams: string[] = Object.keys(
    module.config.routes[route].body
  )
    .map(param =>
      module.config.routes[route].body[param].required ? param : undefined
    )
    .filter(item => item);

  const requiredQueryParams: string[] = Object.keys(
    module.config.routes[route].query
  )
    .map(param =>
      module.config.routes[route].query[param].required ? param : undefined
    )
    .filter(item => item);

  return { body: requiredBodyParams, query: requiredQueryParams };
};
