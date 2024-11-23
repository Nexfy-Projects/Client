import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
async function main() {
  const client = postgres(process.env.DATABASE_URI || "");
  const db = drizzle({ client });
  console.log(db);
}
main();
