ALTER TABLE "playlists" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "songId" TO "song_id";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "songName" TO "song_name";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "songAlbum" TO "song_album";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "songArtist" TO "song_artist";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "songKinds" TO "song_kinds";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "playlists" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "display_name";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "providers";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "provider_type";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "last_sign_in_at";