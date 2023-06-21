import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";

const DB_CONNECTION  = 'postgresql://vijaysingh:@localhost/dummyDB'

const pool = new Pool({
  connectionString: DB_CONNECTION,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to database at', res.rows[0].now);
  }
});


export const db = drizzle(pool);