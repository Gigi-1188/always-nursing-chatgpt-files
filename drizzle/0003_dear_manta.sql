CREATE TABLE `quarterly_draws` (
	`quarter_key` text PRIMARY KEY NOT NULL,
	`snapshot` text NOT NULL,
	`drawn_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quarterly_evaluations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`quarter_key` text NOT NULL,
	`facility` text NOT NULL,
	`rating` text NOT NULL,
	`reference` text NOT NULL,
	`reviewed_by` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_quarterly_evaluations_quarter_user` ON `quarterly_evaluations` (`quarter_key`,`user_id`);--> statement-breakpoint
CREATE TABLE `quarterly_nominations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`quarter_key` text NOT NULL,
	`category` text NOT NULL,
	`clearance` text NOT NULL,
	`reviewed_by` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_quarterly_nominations_quarter_user` ON `quarterly_nominations` (`quarter_key`,`user_id`);--> statement-breakpoint
CREATE TABLE `quarterly_periods` (
	`key` text PRIMARY KEY NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL
);
