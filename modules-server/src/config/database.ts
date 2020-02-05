import { dbSettings } from "./config";
import pg from "pg";

/**
 * Connects to db
 * @returns { Promise<pg.Pool> }
 */
const connect = (): Promise<pg.Pool> => {
  return new Promise(async (resolve, reject) => {
    try {
      const Pool = pg.Pool;
      const pool = new Pool(dbSettings.dbParameters());

      await createTables(pool);

      resolve(pool);
    } catch (err) {
      reject(err);
    }
  });
};

const createTables = async (pool: pg.Pool): Promise<void> => {
  const modulesTableExists: boolean = await checkTableExists("modules", pool);

  if (!modulesTableExists) {
    await pool.query(
      `CREATE TABLE modules(id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, address TEXT NOT NULL, config JSON NOT NULL, "routeSettings" JSON)`
    );
  }

  const jobsTableExists: boolean = await checkTableExists("jobs", pool);

  if (!jobsTableExists) {
    await pool.query(
      `CREATE TABLE jobs(id SERIAL PRIMARY KEY, "moduleId" SERIAL UNIQUE NOT NULL, interval INT NOT NULL, "lastExecuted" BIGINT NOT NULL, execute BOOLEAN NOT NULL, running BOOLEAN NOT NULL)`
    );
  }

  const dashboardsTableExists: boolean = await checkTableExists(
    "dashboards",
    pool
  );

  if (!dashboardsTableExists) {
    await pool.query(
      `CREATE TABLE dashboards(id SERIAL PRIMARY KEY, dashboard JSON NOT NULL)`
    );
  }
};

const checkTableExists = async (
  tableName: string,
  pool: pg.Pool
): Promise<boolean> => {
  try {
    await pool.query(`SELECT 'public.${tableName}'::regclass`);

    return true;
  } catch (err) {
    return false;
  }
};

export { connect };
