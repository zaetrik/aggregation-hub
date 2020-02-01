import axios, { AxiosResponse } from "axios";

const getModuleDataFromStore = async (
  moduleId: string,
  start?: number
): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.STORE_SERVICE_DEV
        : process.env.STORE_SERVICE_PROD
    }/query/all?moduleId=${moduleId}&start=${start ? start : 0}`
  );
};

const getDocumentCount = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.STORE_SERVICE_DEV
        : process.env.STORE_SERVICE_PROD
    }/index/count/${moduleId}`
  );
};

const getMapping = async (moduleId: string): Promise<AxiosResponse> => {
  return await axios.get(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.STORE_SERVICE_DEV
        : process.env.STORE_SERVICE_PROD
    }/index/mapping/${moduleId}`
  );
};

export { getModuleDataFromStore, getDocumentCount, getMapping };
