import { DataModule } from "dataModule";

/**
 * Modules
 */

interface InsertDeleteModuleResponse {
  status: number;
}

interface GetModulesResponse {
  status: number;
  modules: DataModule[];
}

/**
 * Jobs
 */

interface GetJobsResponse {
  status: number;
  jobs: Job[];
}

interface AddModifyJobResponse {
  status: number;
  jobs: Job[];
}

interface DeleteJobResponse {
  status: number;
}

/**
 * Dashboards
 */

interface AddModifyDashboardResponse {
  status: number;
  dashboards: Dashboard[];
}

interface DeleteDashboardResponse {
  status: number;
}

interface GetDashboardsResponse {
  status: number;
  dashboards: Dashboard[];
}
