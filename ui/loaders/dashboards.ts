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

const createNewDashboard = async (
  newDashboard: Dashboard
): Promise<AxiosResponse> => {
  return await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards`,
    newDashboard
  );
};

const updateDashboard = async (
  dashboardId: string,
  updatedDashboard: Dashboard
): Promise<AxiosResponse> => {
  return await axios.post(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards/id/${dashboardId}/update`,
    updatedDashboard
  );
};

const getDashboardByModuleId = async (
  moduleId: string
): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards/moduleId/${moduleId}`
  );
};

const getDashboardById = async (
  dashboardId: string
): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/dashboards/id/${dashboardId}`
  );
};

export {
  getAllDashboards,
  deleteDashboardById,
  createNewDashboard,
  updateDashboard,
  getDashboardByModuleId,
  getDashboardById
};
