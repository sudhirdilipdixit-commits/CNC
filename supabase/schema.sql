-- CollegeNCourses - Supabase Schema
-- Run this in the Supabase SQL editor

-- ============================================================
-- LEADS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  mobile          TEXT NOT NULL,
  email           TEXT,
  city            TEXT,
  course_interested TEXT,
  consent         BOOLEAN NOT NULL DEFAULT false,

  -- UTM & Attribution
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_content     TEXT,
  utm_term        TEXT,
  gclid_fbclid    TEXT,
  referrer        TEXT,
  landing_page    TEXT,
  source          TEXT DEFAULT 'modal',

  -- Device Info
  user_agent      TEXT,
  device_type     TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  browser         TEXT,
  ip_address      TEXT,

  -- CRM Status
  status          TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'lost', 'duplicate')),
  notes           TEXT,
  assigned_to     UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_leads_mobile      ON leads (mobile);
CREATE INDEX IF NOT EXISTS idx_leads_email       ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source  ON leads (utm_source);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON leads;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Only service role (admin) can do anything; anon cannot read leads
DROP POLICY IF EXISTS "service_role_all" ON leads;
CREATE POLICY "service_role_all" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anon INSERT (lead submission from website)
DROP POLICY IF EXISTS "anon_insert" ON leads;
CREATE POLICY "anon_insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================================
-- ANALYTICS EVENTS TABLE (optional, for custom event tracking)
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name  TEXT NOT NULL,
  properties  JSONB,
  session_id  TEXT,
  user_agent  TEXT,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_name       ON analytics_events (event_name);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON analytics_events (created_at DESC);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all_events" ON analytics_events;
CREATE POLICY "service_role_all_events" ON analytics_events
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_events" ON analytics_events;
CREATE POLICY "anon_insert_events" ON analytics_events
  FOR INSERT TO anon WITH CHECK (true);
