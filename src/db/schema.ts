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
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const playlistsTable = pgTable("playlists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  playListId: varchar({ length: 255 }).notNull(),
  playListName: varchar({ length: 255 }).notNull(),
  playListDescription: varchar({ length: 255 }),
  songId: varchar({ length: 255 }).notNull(),
  songName: varchar({ length: 255 }),
  songAlbum: varchar({ length: 255 }),
  songArtist: varchar({ length: 255 }),
  songKinds: varchar({ length: 255 }),
  liked: boolean().default(false),
  updatedAt: timestamp().defaultNow().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
