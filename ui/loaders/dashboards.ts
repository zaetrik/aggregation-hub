import axios, { AxiosResponse } from "axios";

const getAllDashboards = async (): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards`
  );
};

const deleteDashboardById = async (
  dashboardId: string
): Promise<AxiosResponse> => {
  return await axios.delete(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards/id/${dashboardId}`
  );
};

export { getAllDashboards, deleteDashboardById };
