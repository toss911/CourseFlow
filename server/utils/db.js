import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgres://xzughoey:c-e5W3_RoMxozqgb5VLxL3i5hXP70Dtc@arjuna.db.elephantsql.com/xzughoey",
});

export { pool };