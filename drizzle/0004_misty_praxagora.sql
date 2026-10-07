CREATE TABLE `facility_access` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`facility` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_facility_access_email_facility` ON `facility_access` (`email`,`facility`);--> statement-breakpoint
CREATE TABLE `facility_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`assignment_id` text NOT NULL,
	`facility` text NOT NULL,
	`quarter_key` text NOT NULL,
	`kind` text NOT NULL,
	`rating` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`data` text NOT NULL,
	`submitted_by` text NOT NULL,
	`submitted_at` integer NOT NULL,
	`reviewed_by` text,
	`reviewed_at` integer,
	`review_note` text,
	`version` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_facility_reports_user_facility_status` ON `facility_reports` (`user_id`,`facility`,`status`);--> statement-breakpoint
CREATE INDEX `idx_facility_reports_quarter_kind` ON `facility_reports` (`quarter_key`,`kind`);