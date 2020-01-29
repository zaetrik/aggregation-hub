import { DataModule } from "dataModule";

export default (module: DataModule, route: string): boolean => {
  const bodyParamRequired: boolean = Object.keys(
    module.config.routes[route].body
  )
    .map(param =>
      module.config.routes[route].body[param].required ? true : false
    )
    .some(required => required);

  const queryParamRequired: boolean = Object.keys(
    module.config.routes[route].query
  )
    .map(param =>
      module.config.routes[route].query[param].required ? true : false
    )
    .some(required => required);

  return queryParamRequired || bodyParamRequired;
};
