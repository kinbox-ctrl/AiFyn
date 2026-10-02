CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  company     TEXT NOT NULL,
  industry    TEXT NOT NULL,
  cameras     TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  city        TEXT NOT NULL,
  message     TEXT,
  source_page TEXT,
  ip_hash     TEXT,
  created_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_ip_created ON leads (ip_hash, created_at);
