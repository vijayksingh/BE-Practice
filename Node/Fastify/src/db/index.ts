import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";

const DB_CONNECTION  = 'postgresql://vijaysingh:@localhost/dummyDB'

const pool = new Pool({
  connectionString: DB_CONNECTION,
});

export const db = drizzle(pool);