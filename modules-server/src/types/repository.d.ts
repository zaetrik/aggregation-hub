import { DataModule } from "dataModule";
import {
  InsertDeleteModuleResponse,
  GetModulesResponse,
  GetJobsResponse,
  AddModifyJobResponse,
  DeleteJobResponse
} from "responses";

interface Repository {
  /**
   * Modules
   */
  getAllModules: () => Promise<GetModulesResponse>;
  getModules: (moduleName: string) => Promise<GetModulesResponse>;
  getModuleById: (moduleId: string) => Promise<GetModulesResponse>;
  deleteModuleById: (moduleId: string) => Promise<InsertDeleteModuleResponse>;
  addModule: (newModule: {
    name: string;
    address: string;
  }) => Promise<InsertDeleteModuleResponse>;
  addModuleManual: (
    newModule: DataModule
  ) => Promise<InsertDeleteModuleResponse>;
  updateModuleConfig: (
    moduleId: string,
    moduleConfig
  ) => Promise<{ status: number }>;
  updateModuleRouteSettings: (
    moduleId: string,
    moduleRouteSettings: ModuleRouteSettings
  ) => Promise<{ status: number }>;
  getModuleRouteSettings: (
    moduleId: string
  ) => Promise<{ status: number; routeSettings: ModuleRouteSettings }>;

  /**
   * Jobs
   */
  getAllJobs: () => Promise<GetJobsResponse>;
  addJob: (newJob: Job) => Promise<AddModifyJobResponse>;
  updateJob: (updatedJob: Job) => Promise<AddModifyJobResponse>;
  deleteJobByModuleId: (moduleId: string) => Promise<DeleteJobResponse>;
  getJobByModuleId: (moduleId: string) => Promise<GetJobsResponse>;
}
