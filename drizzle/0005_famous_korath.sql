CREATE TABLE `ncns_evidence` (
	`document_id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_ncns_evidence_incident` ON `ncns_evidence` (`incident_id`);--> statement-breakpoint
CREATE TABLE `ncns_incidents` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`facility` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`report` text NOT NULL,
	`submitted_by` text NOT NULL,
	`submitted_at` integer NOT NULL,
	`review_note` text,
	`reviewed_by` text,
	`reviewed_at` integer,
	`version` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_ncns_user_status` ON `ncns_incidents` (`user_id`,`status`);--> statement-breakpoint
CREATE VIEW ncns_suspensions AS
WITH ranked AS (SELECT id,user_id,submitted_at,row_number() OVER (PARTITION BY user_id ORDER BY submitted_at,id) AS offense FROM ncns_incidents WHERE status='active'),
penalties AS (SELECT *,CASE WHEN offense=1 THEN 7 WHEN offense=2 THEN 14 ELSE 30 END AS days FROM ranked)
SELECT *,submitted_at+days*86400000 AS ends_at FROM penalties;
