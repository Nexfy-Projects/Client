ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "public"."users" SET SCHEMA "auth";
--> statement-breakpoint
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_users_uid_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
