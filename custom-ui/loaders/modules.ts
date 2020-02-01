import axios, { AxiosResponse } from "axios";

// Modules

const getAllModules = async (): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/modules`
  );
};

const getModuleById = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/modules/id/${moduleId}`
  );
};

const deleteModuleById = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.delete(
    process.env.NODE_ENV === "development"
      ? `${process.env.MODULES_SERVICE_DEV}/modules/id/${moduleId}?deleteData=true`
      : `${process.env.MODULES_SERVICE_PROD}/modules/id/${moduleId}?deleteData=true`
  );
};

const createNewModule = async (newModule: {
  name: string;
  address: string;
}): Promise<AxiosResponse> => {
  return await axios.post(
    process.env.NODE_ENV === "development"
      ? `${process.env.MODULES_SERVICE_DEV}/modules`
      : `${process.env.MODULES_SERVICE_PROD}/modules`,
    newModule
  );
};

// Jobs

const getJobByModuleId = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.MODULES_SERVICE_PROD
        : process.env.MODULES_SERVICE_DEV
    }/jobs/id/${moduleId}`
  );
};

const createJob = async (newJob: {
  moduleId: string;
  interval: number;
  execute: boolean;
}): Promise<AxiosResponse> => {
  return await axios.post(
    process.env.NODE_ENV === "development"
      ? `${process.env.MODULES_SERVICE_DEV}/jobs`
      : `${process.env.MODULES_SERVICE_PROD}/jobs`,
    newJob
  );
};

const startJob = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.MODULES_SERVICE_DEV
        : process.env.MODULES_SERVICE_PROD
    }/aggregation/${moduleId}/start`,
    {}
  );
};

const updateJob = async (updatedJob: {
  moduleId: string;
  execute: boolean;
  interval: number;
}): Promise<AxiosResponse> => {
  return await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.MODULES_SERVICE_DEV
        : process.env.MODULES_SERVICE_PROD
    }/jobs/update`,
    updatedJob
  );
};

const updateRouteSettings = async (
  moduleId: string,
  newRouteSettings: {
    moduleRouteSettings: ModuleRouteSettings;
  }
): Promise<AxiosResponse> => {
  return await axios.post(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.MODULES_SERVICE_DEV
        : process.env.MODULES_SERVICE_PROD
    }/modules/id/${moduleId}/routeSettings`,
    newRouteSettings
  );
};

export {
  getAllModules,
  getModuleById,
  deleteModuleById,
  createNewModule,
  getJobByModuleId,
  createJob,
  startJob,
  updateJob,
  updateRouteSettings
};
