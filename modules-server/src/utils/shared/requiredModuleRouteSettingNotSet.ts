/**
 * @param { routeSettings: { bodyParams: {}, queryParams: {} } }
 * @param { body: string[]; query: string[] }
 * @returns { boolean } true if a required route setting is not set
 */
export default (
  routeSettings,
  requiredModuleSettings: { body: string[]; query: string[] }
): boolean => {
  if (!routeSettings) return true;
  const requiredBodyParamNotSet: boolean = requiredModuleSettings.body
    .map(param => (routeSettings.bodyParams[param] ? true : false))
    .some(paramSetting => false);

  const requiredQueryParamNotSet: boolean = requiredModuleSettings.query
    .map(param => (routeSettings.queryParams[param] ? true : false))
    .some(paramSetting => false);

  return requiredBodyParamNotSet || requiredQueryParamNotSet;
};
