import logger from "../utils/logger";
import { Repository } from "repository";
import cron from "cron";
import { GetJobsResponse, GetModulesResponse } from "responses";
import { DataModule } from "dataModule";
import axios from "axios";

export = (repository: Repository) => {
  new cron.CronJob(
    "30 * * * * *",
    () => {
      checkIfJobIsDue();
    },
    null,
    true,
    "America/Los_Angeles"
  );

  const checkIfJobIsDue = async () => {
    const jobs: GetJobsResponse = await repository.getAllJobs();

    const jobsToExecute = jobs.jobs.filter(
      job =>
        new Date().getTime() - job.lastExecuted > 1000 * 60 * job.interval &&
        job.execute &&
        !job.running
    );

    jobsToExecute.map(job => executeJob(job));
  };

  const executeJob = async (job: Job) => {
    try {
      const getModuleByIdOperation: GetModulesResponse = await repository.getModuleById(
        job.moduleId
      );

      if (getModuleByIdOperation.modules.length === 0) {
        throw new Error("MODULE NOT FOUND");
      }

      const module: DataModule = getModuleByIdOperation.modules[0];

      const routeSettings: {
        status: number;
        routeSettings: ModuleRouteSettings;
      } = await repository.getModuleRouteSettings(`${module.id}`);

      const startRouteSettings =
        routeSettings.routeSettings.routeSettings["/start"].bodyParams;

      axios.post(`${module.address}/start`, {
        ...startRouteSettings,
        dataStoreUrl: process.env.DATA_STORE_URL,
        moduleServiceUrl: process.env.SERVICE_URL,
        moduleId: module.id
      });

      await repository.updateJob({
        ...job,
        running: true
      });
    } catch (err) {
      logger.log("error", err);
    }
  };
};
