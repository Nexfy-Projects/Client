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

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const playlistsTable = pgTable("playlists", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
  songId: varchar({ length: 255 }).notNull(),
  songName: varchar({ length: 255 }).notNull(),
  songAlbum: varchar({ length: 255 }),
  songArtist: varchar({ length: 255 }).notNull(),
  songKinds: varchar({ length: 255 }),
  liked: integer().default(0),
  createdAt: varchar({ length: 255 }).notNull(),
  updatedAt: varchar({ length: 255 }).notNull(),
});
