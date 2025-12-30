INSERT OR REPLACE INTO users (id, mocha_user_id, email, user_code, role, name, is_active, password)
VALUES (1, 'admin-001', 'dhasan111@gmail.com', 'ADM-001', 'admin', 'Danish Hasan', 1, 'test123');

UPDATE users SET is_active = 1;