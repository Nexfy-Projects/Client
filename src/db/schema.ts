// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);

import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

// src/schema/playlists.sql.ts
export const playlistsTable = pgTable("playlists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id),
  spotify_playlist_id: varchar({ length: 255 }).notNull(),
  playlist_name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  songId: varchar({ length: 255 }).notNull(),
  liked: boolean().notNull().default(false),
  created_at: timestamp()
    .notNull()
    .default(sql`now()`),
});
