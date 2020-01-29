import { DataModule } from "dataModule";
import getRequiredModuleRouteSettings from "./getRequiredModuleRouteSettings";
import requiredModuleRouteSettingNotSet from "./requiredModuleRouteSettingNotSet";
import axios from "axios";

export default async (module: DataModule, repository) => {
  const routeSettings: {
    status: number;
    routeSettings: ModuleRouteSettings;
  } = await repository.getModuleRouteSettings(`${module.id}`);

  const requiredModuleSettings: {
    body: string[];
    query: string[];
  } = getRequiredModuleRouteSettings(module, "/start");

  if (
    !routeSettings.routeSettings.routeSettings ||
    requiredModuleRouteSettingNotSet(
      routeSettings.routeSettings.routeSettings["/start"],
      requiredModuleSettings
    )
  ) {
    throw new Error(
      `Required routeSettings not set: ${JSON.stringify(
        requiredModuleSettings
      )}`
    );
  }

  const startRouteSettings = {
    ...routeSettings.routeSettings.routeSettings["/start"].bodyParams,
    ...routeSettings.routeSettings.routeSettings["/start"].queryParams
  };

  axios.post(`${module.address}/start`, {
    ...startRouteSettings,
    dataStoreUrl: process.env.DATA_STORE_URL,
    moduleServiceUrl: process.env.SERVICE_URL,
    moduleId: module.id
  });
};
