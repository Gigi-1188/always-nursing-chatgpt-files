// Add new, numbered additive migrations here. Never rewrite an applied migration.
export const migrations=[{version:1,sql:`
CREATE TABLE IF NOT EXISTS auth_identity_links(auth_id TEXT PRIMARY KEY,record_user_id TEXT UNIQUE NOT NULL,verified_at INTEGER NOT NULL,verified_by TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS native_objects(object_key TEXT PRIMARY KEY,file_uri TEXT NOT NULL,content_type TEXT NOT NULL,bytes INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS native_requests(request_key TEXT PRIMARY KEY,response TEXT NOT NULL,created_at INTEGER NOT NULL);
`}];
