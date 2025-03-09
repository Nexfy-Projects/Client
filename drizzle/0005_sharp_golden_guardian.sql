ALTER TABLE "auth"."users" ADD COLUMN "instance_id" uuid;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "aud" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "role" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "encrypted_password" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_confirmed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "invited_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "confirmation_token" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "confirmation_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "recovery_token" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "recovery_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_change_token_new" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_change" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_change_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "last_sign_in_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "raw_app_meta_data" json;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "raw_user_meta_data" json;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "is_super_admin" boolean;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "created_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "updated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "phone" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "phone_confirmed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "phone_change" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "phone_change_token" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "phone_change_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "confirmed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_change_token_current" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "email_change_confirm_status" integer;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "banned_until" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "reauthentication_token" varchar(255);--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "reauthentication_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "is_sso_user" boolean;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "is_anonymous" boolean;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN "providers" text[];