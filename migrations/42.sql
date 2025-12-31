CREATE TABLE IF NOT EXISTS candidate_role_associations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  recruiter_user_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  status TEXT DEFAULT 'submitted',
  submission_date DATE NOT NULL,
  is_discarded INTEGER DEFAULT 0,
  discarded_at TIMESTAMP,
  discarded_reason TEXT,
  is_lost_role INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
