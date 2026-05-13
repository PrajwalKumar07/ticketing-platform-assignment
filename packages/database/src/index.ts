import dotenv from "dotenv";
import path from "path";

// Load env FIRST
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("DIRNAME:", __dirname);
console.log("ENV PATH:", path.resolve(__dirname, "../../.env"));

import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "./schema";

export * from "./schema";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export { pool };