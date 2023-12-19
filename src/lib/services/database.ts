import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from '$env/dynamic/private';
import { sql } from "drizzle-orm";

// create the connection
const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);

export function count(col: string){
    return {count: sql`count(${col})`.mapWith(Number)}
}