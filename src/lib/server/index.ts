import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './database/schema';

// Initialize the Postgres client and Drizzle ORM with the database URL from environment variables
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });