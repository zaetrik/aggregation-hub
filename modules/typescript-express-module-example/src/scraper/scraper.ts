import axios from "axios";

const startAggregation = async (dataStoreUrl: string, moduleId: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        axios.post(`${dataStoreUrl}/document/insert`, {
          index: moduleId,
          data: { test: "hello", number: i }
        });
      }
      resolve();
    }, 60000);
  });
};

const stopAggregation = async (moduleServiceUrl: string, moduleId: string) => {
  await axios.post(`${moduleServiceUrl}/aggregation/${moduleId}/done`, {});
};

export { startAggregation, stopAggregation };
