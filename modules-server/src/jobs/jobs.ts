import logger from "../utils/logger";
import { Repository } from "repository";
import cron from "cron";
import { GetJobsResponse, GetModulesResponse } from "responses";
import { DataModule } from "dataModule";
import executeJob from "../utils/shared/executeJob";

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

    jobsToExecute.map(job => startJobExecution(job));
  };

  const startJobExecution = async (job: Job) => {
    try {
      const getModuleByIdOperation: GetModulesResponse = await repository.getModuleById(
        job.moduleId
      );

      if (getModuleByIdOperation.modules.length === 0) {
        throw new Error("MODULE NOT FOUND");
      }

      const module: DataModule = getModuleByIdOperation.modules[0];

      await executeJob(module, repository);

      await repository.updateJob({
        ...job,
        running: true
      });
    } catch (err) {
      logger.log("error", err);
    }
  };
};
