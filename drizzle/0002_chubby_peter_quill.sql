CREATE TABLE `incentive_awards` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`period_key` text NOT NULL,
	`period_start` integer NOT NULL,
	`period_end` integer NOT NULL,
	`amount_cents` integer NOT NULL,
	`snapshot` text NOT NULL,
	`earned_at` integer NOT NULL,
	`paid_at` integer,
	`paid_by` text,
	`payment_reference` text
);
--> statement-breakpoint
CREATE INDEX `idx_incentive_awards_user` ON `incentive_awards` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_incentive_awards_unpaid` ON `incentive_awards` (`paid_at`);