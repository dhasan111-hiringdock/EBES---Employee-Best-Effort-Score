ALTER TABLE candidates ADD COLUMN candidate_code TEXT;
CREATE INDEX IF NOT EXISTS idx_candidates_code ON candidates(candidate_code);
