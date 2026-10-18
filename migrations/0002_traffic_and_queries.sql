-- Website traffic (one row per page view; written by POST /api/t) and query-management fields
-- read by the AiFyn dashboard (separate Worker on the same database).
CREATE TABLE IF NOT EXISTS pageviews (
  id           TEXT PRIMARY KEY,
  ts           TEXT NOT NULL,
  visitor      TEXT NOT NULL,   -- salted daily hash of IP + user agent (no cookies)
  session      TEXT NOT NULL,   -- per-tab id generated in the browser
  path         TEXT NOT NULL,
  referrer     TEXT,            -- external referrer host only
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  country      TEXT,
  city         TEXT,
  device       TEXT,
  browser      TEXT,
  os           TEXT,
  duration_ms  INTEGER
);
CREATE INDEX IF NOT EXISTS idx_pageviews_ts ON pageviews (ts);
CREATE INDEX IF NOT EXISTS idx_pageviews_session ON pageviews (session, ts);

CREATE TABLE IF NOT EXISTS lead_events (
  id      TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  ts      TEXT NOT NULL,
  kind    TEXT NOT NULL,        -- note | status | priority | assignee | follow_up_at
  body    TEXT,
  author  TEXT
);
CREATE INDEX IF NOT EXISTS idx_lead_events_lead ON lead_events (lead_id, ts DESC);

ALTER TABLE leads ADD COLUMN status            TEXT NOT NULL DEFAULT 'new';
ALTER TABLE leads ADD COLUMN priority          TEXT NOT NULL DEFAULT 'normal';
ALTER TABLE leads ADD COLUMN assignee          TEXT;
ALTER TABLE leads ADD COLUMN follow_up_at      TEXT;
ALTER TABLE leads ADD COLUMN first_response_at TEXT;
ALTER TABLE leads ADD COLUMN updated_at        TEXT;
ALTER TABLE leads ADD COLUMN session           TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_session ON leads (session);
