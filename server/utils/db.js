import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString:
    "postgres://xzughoey:i7Fh--hn177jOgqFCkt21k0-jJq6R3F9@arjuna.db.elephantsql.com/xzughoey",
});

export { pool };
