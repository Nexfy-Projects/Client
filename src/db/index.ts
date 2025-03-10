import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// 環境変数からデータベース接続文字列を取得
const connectionString = process.env.DATABASE_URL as string;

// PostgreSQLクライアントを作成
const client = postgres(connectionString);

// drizzle ORM インスタンスを作成
export const db = drizzle(client, { schema });
