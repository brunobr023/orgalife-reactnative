export const migration_01 = `
  CREATE TABLE IF NOT EXISTS metas (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    sincronizado INTEGER DEFAULT 0
  );
`;