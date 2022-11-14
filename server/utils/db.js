import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
<<<<<<< HEAD
  connectionString:
    "postgres://xzughoey:i7Fh--hn177jOgqFCkt21k0-jJq6R3F9@arjuna.db.elephantsql.com/xzughoey",
=======
  connectionString: "postgres://xzughoey:i7Fh--hn177jOgqFCkt21k0-jJq6R3F9@arjuna.db.elephantsql.com/xzughoey",
>>>>>>> 2500936 (fix: changed postgresql connection string)
});

export { pool };
