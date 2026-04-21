import { siteContentSeed } from "@/data/site-content";
import type { SiteContent } from "@/types/site-content";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { createRequire } from "node:module";

const CONTENT_ROW_ID = "primary";

let memoryContent: SiteContent = structuredClone(siteContentSeed);
let pool: Pool | null = null;
let schemaReadyPromise: Promise<void> | null = null;

const require = createRequire(import.meta.url);

// `ws` optionally loads a native `bufferutil` helper. In Next 16 dev bundling,
// that helper can be replaced with an ignored stub instead of throwing, which
// breaks `bufferUtil.mask(...)` at runtime. Force the pure-JS path instead.
process.env.WS_NO_BUFFER_UTIL ??= "true";

neonConfig.webSocketConstructor = require("ws");

function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL);
}

function getPool() {
  if (!process.env.DATABASE_URL) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  return pool;
}

async function ensureSchema() {
  const db = getPool();
  if (!db) return;

  if (!schemaReadyPromise) {
    schemaReadyPromise = db
      .query(`
        CREATE TABLE IF NOT EXISTS site_content (
          id TEXT PRIMARY KEY,
          payload JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() => undefined);
  }

  await schemaReadyPromise;
}

export function isPersistentContentStoreEnabled() {
  return hasDatabaseConfig();
}

export async function getSiteContent(): Promise<SiteContent> {
  const db = getPool();

  if (!db) {
    return structuredClone(memoryContent);
  }

  await ensureSchema();

  const existing = await db.query<{ payload: SiteContent }>(
    "SELECT payload FROM site_content WHERE id = $1",
    [CONTENT_ROW_ID],
  );

  if (existing.rowCount && existing.rows[0]) {
    return structuredClone(existing.rows[0].payload);
  }

  await db.query(
    `
      INSERT INTO site_content (id, payload)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (id) DO NOTHING
    `,
    [CONTENT_ROW_ID, JSON.stringify(siteContentSeed)],
  );

  return structuredClone(siteContentSeed);
}

export async function setSiteContent(nextContent: SiteContent): Promise<SiteContent> {
  const db = getPool();

  if (!db) {
    memoryContent = structuredClone(nextContent);
    return structuredClone(memoryContent);
  }

  await ensureSchema();

  await db.query(
    `
      INSERT INTO site_content (id, payload, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()
    `,
    [CONTENT_ROW_ID, JSON.stringify(nextContent)],
  );

  return structuredClone(nextContent);
}

export async function resetSiteContent(): Promise<SiteContent> {
  const db = getPool();

  if (!db) {
    memoryContent = structuredClone(siteContentSeed);
    return structuredClone(memoryContent);
  }

  await ensureSchema();

  await db.query(
    `
      INSERT INTO site_content (id, payload, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()
    `,
    [CONTENT_ROW_ID, JSON.stringify(siteContentSeed)],
  );

  return structuredClone(siteContentSeed);
}
