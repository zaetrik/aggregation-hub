import { Pool as PostgresPool } from "pg";
import { DataModule } from "dataModule";
import { Repository } from "repository";
import {
  GetModulesResponse,
  InsertDeleteModuleResponse,
  GetJobsResponse,
  AddModifyJobResponse,
  DeleteJobResponse,
  AddModifyDashboardResponse,
  DeleteDashboardResponse,
  GetDashboardsResponse
} from "responses";
import axios from "axios";

const repository = (client: PostgresPool): Repository => {
  /**
   * Modules
   */

  const getAllModules = async (): Promise<GetModulesResponse> => {
    const modules = await client.query("SELECT * FROM modules");
    return { status: 200, modules: modules.rows };
  };

  const getModules = async (
    moduleName: string
  ): Promise<GetModulesResponse> => {
    const modules = await client.query(
      `SELECT * FROM modules WHERE name LIKE '%' || $1 || '%' LIMIT 100`,
      [moduleName]
    );
    return { status: 200, modules: modules.rows };
  };

  const getModuleById = async (
    moduleId: string
  ): Promise<GetModulesResponse> => {
    const module = await client.query(`SELECT * FROM modules WHERE id = $1`, [
      moduleId
    ]);
    return { status: 200, modules: module.rows };
  };

  const deleteModuleById = async (
    moduleId: string
  ): Promise<InsertDeleteModuleResponse> => {
    await client.query(`DELETE FROM modules WHERE id = $1`, [moduleId]);
    return { status: 200 };
  };

  /**
   * Adds module only by name and address; fetches config from module itself
   * @param { name: string, address: string }
   */
  const addModule = async (newModule: {
    name: string;
    address: string;
  }): Promise<InsertDeleteModuleResponse> => {
    const moduleConfig = await axios.get(`${newModule.address}/config`);

    await client.query(
      `INSERT INTO modules (name, address, config) VALUES ($1, $2, $3);`,
      [newModule.name, newModule.address, moduleConfig.data]
    );

    return { status: 200 };
  };

  /**
   * Adds module manually, so the module has to have a config
   * @param newModule DataModule
   */
  const addModuleManual = async (
    newModule: DataModule
  ): Promise<InsertDeleteModuleResponse> => {
    await client.query(
      `INSERT INTO modules (name, address, config) VALUES ($1, $2, $3);`,
      [newModule.name, newModule.address, newModule.config]
    );

    return { status: 200 };
  };

  const updateModuleConfig = async (
    moduleId: string,
    moduleConfig
  ): Promise<{ status: number }> => {
    await client.query(
      `UPDATE modules SET config = COALESCE($1, config) WHERE id = $2;`,
      [moduleConfig, moduleId]
    );

    return { status: 200 };
  };

  const updateModuleRouteSettings = async (
    moduleId: string,
    moduleRouteSettings: ModuleRouteSettings
  ): Promise<{ status: number }> => {
    await client.query(
      `UPDATE modules SET "routeSettings" = COALESCE($1, "routeSettings") WHERE id = $2;`,
      [moduleRouteSettings, moduleId]
    );

    return { status: 200 };
  };

  const getModuleRouteSettings = async (
    moduleId: string
  ): Promise<{ status: number; routeSettings: ModuleRouteSettings }> => {
    const routeSettings = await client.query(
      `SELECT "routeSettings" FROM modules WHERE id = $1`,
      [moduleId]
    );
    return { status: 200, routeSettings: routeSettings.rows[0] };
  };

  /**
   * Jobs
   */

  const getAllJobs = async (): Promise<GetJobsResponse> => {
    const jobs = await client.query("SELECT * FROM jobs");
    return { status: 200, jobs: jobs.rows };
  };

  const addJob = async (newJob: Job): Promise<AddModifyJobResponse> => {
    await client.query(
      `INSERT INTO jobs ("moduleId", interval, execute, "lastExecuted", running) VALUES ($1, $2, $3, $4, $5);`,
      [newJob.moduleId, newJob.interval, newJob.execute, -8640000000, false]
    );

    return { status: 200, jobs: [newJob] };
  };

  const updateJob = async (updatedJob: Job): Promise<AddModifyJobResponse> => {
    await client.query(
      `UPDATE jobs SET interval = COALESCE($1, interval), execute = COALESCE($2, execute), "lastExecuted" = COALESCE($3, "lastExecuted"), running = COALESCE($4, running) WHERE "moduleId" = $5;`,
      [
        updatedJob.interval,
        updatedJob.execute,
        updatedJob.lastExecuted,
        updatedJob.running,
        updatedJob.moduleId
      ]
    );

    return { status: 200, jobs: [updatedJob] };
  };

  const deleteJobByModuleId = async (
    moduleId: string
  ): Promise<DeleteJobResponse> => {
    await client.query(`DELETE FROM jobs WHERE "moduleId" = $1`, [moduleId]);
    return { status: 200 };
  };

  const getJobByModuleId = async (
    moduleId: string
  ): Promise<GetJobsResponse> => {
    const jobs = await client.query(
      `SELECT * FROM jobs WHERE "moduleId" = $1`,
      [moduleId]
    );
    return { status: 200, jobs: jobs.rows };
  };

  /**
   * Dashboards
   */

  const addDashboard = async (
    newDashboard: Dashboard
  ): Promise<AddModifyDashboardResponse> => {
    await client.query(`INSERT INTO dashboards (dashboard) VALUES ($1);`, [
      newDashboard
    ]);

    return { status: 200, dashboards: [newDashboard] };
  };

  const updateDashboard = async (
    dashboardId: string,
    updatedDashboard: Dashboard
  ): Promise<AddModifyDashboardResponse> => {
    await client.query(
      `UPDATE dashboards SET dashboard = COALESCE($1, dashboard) WHERE id = $2;`,
      [updatedDashboard, dashboardId]
    );

    return { status: 200, dashboards: [updatedDashboard] };
  };

  const deleteDashboardById = async (
    dashboardId: string
  ): Promise<DeleteDashboardResponse> => {
    await client.query(`DELETE FROM dashboards WHERE id = $1`, [dashboardId]);
    return { status: 200 };
  };

  const getAllDashboards = async (): Promise<GetDashboardsResponse> => {
    const dashboards = await client.query("SELECT * FROM dashboards");
    return { status: 200, dashboards: dashboards.rows };
  };

  const getDashboardById = async (
    dashboardId: string
  ): Promise<GetDashboardsResponse> => {
    const dashboards = await client.query(
      `SELECT * FROM dashboards WHERE id = $1`,
      [dashboardId]
    );
    return { status: 200, dashboards: dashboards.rows };
  };

  const getDashboardByModuleId = async (
    moduleId: string
  ): Promise<GetDashboardsResponse> => {
    const dashboards = await client.query(
      `SELECT * FROM dashboards WHERE dashboard->>'moduleId' = $1`,
      [moduleId]
    );
    return { status: 200, dashboards: dashboards.rows };
  };

  return {
    getAllModules,
    getModules,
    getModuleById,
    deleteModuleById,
    addModule,
    addModuleManual,
    updateModuleConfig,
    updateModuleRouteSettings,
    getModuleRouteSettings,
    getAllJobs,
    addJob,
    updateJob,
    deleteJobByModuleId,
    getJobByModuleId,
    addDashboard,
    updateDashboard,
    deleteDashboardById,
    getAllDashboards,
    getDashboardById,
    getDashboardByModuleId
  };
};

const connect = (databaseConnection: PostgresPool): Repository => {
  return repository(databaseConnection);
};

export { connect };
