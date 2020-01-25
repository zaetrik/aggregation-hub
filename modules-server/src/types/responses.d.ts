import { DataModule } from "dataModule";

interface InsertDeleteModuleResponse {
  status: number;
}

interface GetModulesResponse {
  status: number;
  modules: DataModule[];
}

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
