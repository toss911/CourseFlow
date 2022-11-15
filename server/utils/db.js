import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
<<<<<<< HEAD
  connectionString:
    "postgres://xzughoey:i7Fh--hn177jOgqFCkt21k0-jJq6R3F9@arjuna.db.elephantsql.com/xzughoey",
=======
  connectionString: "postgres://xzughoey:i7Fh--hn177jOgqFCkt21k0-jJq6R3F9@arjuna.db.elephantsql.com/xzughoey",
>>>>>>> d87ab5a4ddaac1f7f33a84f9ba02751c2f100d59
});

export { pool };
