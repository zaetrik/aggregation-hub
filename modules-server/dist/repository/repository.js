"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const repository = (client) => {
    /**
     * Modules
     */
    const getAllModules = () => __awaiter(void 0, void 0, void 0, function* () {
        const modules = yield client.query("SELECT * FROM modules");
        return { status: 200, modules: modules.rows };
    });
    const getModules = (moduleName) => __awaiter(void 0, void 0, void 0, function* () {
        const modules = yield client.query(`SELECT * FROM modules WHERE name LIKE '%' || $1 || '%' LIMIT 100`, [moduleName]);
        return { status: 200, modules: modules.rows };
    });
    const getModuleById = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield client.query(`SELECT * FROM modules WHERE id = $1`, [
            moduleId
        ]);
        return { status: 200, modules: module.rows };
    });
    const deleteModuleById = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`DELETE FROM modules WHERE id = $1`, [moduleId]);
        return { status: 200 };
    });
    /**
     * Adds module only by name and address; fetches config from module itself
     * @param { name: string, address: string }
     */
    const addModule = (newModule) => __awaiter(void 0, void 0, void 0, function* () {
        const moduleConfig = yield axios_1.default.get(`${newModule.address}/config`);
        yield client.query(`INSERT INTO modules (name, address, config) VALUES ($1, $2, $3);`, [newModule.name, newModule.address, moduleConfig.data]);
        return { status: 200 };
    });
    /**
     * Adds module manually, so the module has to have a config
     * @param newModule DataModule
     */
    const addModuleManual = (newModule) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`INSERT INTO modules (name, address, config) VALUES ($1, $2, $3);`, [newModule.name, newModule.address, newModule.config]);
        return { status: 200 };
    });
    const updateModuleConfig = (moduleId, moduleConfig) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`UPDATE modules SET config = COALESCE($1, config) WHERE id = $2;`, [moduleConfig, moduleId]);
        return { status: 200 };
    });
    const updateModuleRouteSettings = (moduleId, moduleRouteSettings) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`UPDATE modules SET "routeSettings" = COALESCE($1, "routeSettings") WHERE id = $2;`, [moduleRouteSettings, moduleId]);
        return { status: 200 };
    });
    const getModuleRouteSettings = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const routeSettings = yield client.query(`SELECT "routeSettings" FROM modules WHERE id = $1`, [moduleId]);
        return { status: 200, routeSettings: routeSettings.rows[0] };
    });
    /**
     * Jobs
     */
    const getAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield client.query("SELECT * FROM jobs");
        return { status: 200, jobs: jobs.rows };
    });
    const addJob = (newJob) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`INSERT INTO jobs ("moduleId", interval, execute, "lastExecuted", running) VALUES ($1, $2, $3, $4, $5);`, [newJob.moduleId, newJob.interval, newJob.execute, -8640000000, false]);
        return { status: 200, jobs: [newJob] };
    });
    const updateJob = (updatedJob) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`UPDATE jobs SET interval = COALESCE($1, interval), execute = COALESCE($2, execute), "lastExecuted" = COALESCE($3, "lastExecuted"), running = COALESCE($4, running) WHERE "moduleId" = $5;`, [
            updatedJob.interval,
            updatedJob.execute,
            updatedJob.lastExecuted,
            updatedJob.running,
            updatedJob.moduleId
        ]);
        return { status: 200, jobs: [updatedJob] };
    });
    const deleteJobByModuleId = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`DELETE FROM jobs WHERE "moduleId" = $1`, [moduleId]);
        return { status: 200 };
    });
    const getJobByModuleId = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield client.query(`SELECT * FROM jobs WHERE "moduleId" = $1`, [moduleId]);
        return { status: 200, jobs: jobs.rows };
    });
    /**
     * Dashboards
     */
    const addDashboard = (newDashboard) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`INSERT INTO dashboards (dashboard) VALUES ($1);`, [
            newDashboard
        ]);
        return { status: 200, dashboards: [newDashboard] };
    });
    const updateDashboardById = (dashboardId, updatedDashboard) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`UPDATE dashboards SET dashboard = COALESCE($1, dashboard) WHERE id = $2;`, [updatedDashboard, dashboardId]);
        return { status: 200, dashboards: [updatedDashboard] };
    });
    const updateDashboardByModuleId = (moduleId, updatedDashboard) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`UPDATE dashboards SET dashboard = COALESCE($1, dashboard) WHERE dashboard->>'moduleId' = $2;`, [updatedDashboard, moduleId]);
        return { status: 200, dashboards: [updatedDashboard] };
    });
    const deleteDashboardById = (dashboardId) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`DELETE FROM dashboards WHERE id = $1`, [dashboardId]);
        return { status: 200 };
    });
    const deleteDashboardByModuleId = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.query(`DELETE FROM dashboards WHERE dashboard->>'moduleId' = $1`, [moduleId]);
        return { status: 200 };
    });
    const getAllDashboards = () => __awaiter(void 0, void 0, void 0, function* () {
        const dashboards = yield client.query("SELECT * FROM dashboards");
        return { status: 200, dashboards: dashboards.rows };
    });
    const getDashboardById = (dashboardId) => __awaiter(void 0, void 0, void 0, function* () {
        const dashboards = yield client.query(`SELECT * FROM dashboards WHERE id = $1`, [dashboardId]);
        return { status: 200, dashboards: dashboards.rows };
    });
    const getDashboardByModuleId = (moduleId) => __awaiter(void 0, void 0, void 0, function* () {
        const dashboards = yield client.query(`SELECT * FROM dashboards WHERE dashboard->>'moduleId' = $1`, [moduleId]);
        return { status: 200, dashboards: dashboards.rows };
    });
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
        updateDashboardById,
        updateDashboardByModuleId,
        deleteDashboardById,
        deleteDashboardByModuleId,
        getAllDashboards,
        getDashboardById,
        getDashboardByModuleId
    };
};
const connect = (databaseConnection) => {
    return repository(databaseConnection);
};
exports.connect = connect;
