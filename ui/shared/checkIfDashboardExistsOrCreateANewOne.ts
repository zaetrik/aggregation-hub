import {
  createNewDashboard,
  getDashboardByModuleId
} from "../loaders/dashboards";
import { DataModule } from "../types/dataModule";

export default async (module: DataModule) => {
  const responseGetModuleDashboard = await getDashboardByModuleId(module.id);

  if (!responseGetModuleDashboard.data.dashboards[0]) {
    const newDashboard: Dashboard = {
      moduleId: module.id,
      name: module.name,
      components: []
    };
    await createNewDashboard(newDashboard);
    return newDashboard;
  } else {
    return responseGetModuleDashboard.data.dashboards[0].dashboard;
  }
};
