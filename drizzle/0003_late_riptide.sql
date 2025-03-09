ALTER TABLE "auth"."users" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_userId_users_uid_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
