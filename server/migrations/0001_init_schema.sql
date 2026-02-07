-- Migration number: 0001 	 2026-02-07T16:28:54.828Z

PRAGMA foreign_keys = ON;

--------------------------------------------------
-- USERS
--------------------------------------------------
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  google_id TEXT UNIQUE,
  plan_id INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);

--------------------------------------------------
-- PLANS
--------------------------------------------------
CREATE TABLE plans (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  max_tests INTEGER,
  max_questions_per_test INTEGER,
  can_export_results INTEGER DEFAULT 0,
  can_ai_generate INTEGER DEFAULT 1,
  price_monthly REAL DEFAULT 0
);

INSERT INTO plans (id, name, max_tests, max_questions_per_test, can_export_results, can_ai_generate, price_monthly)
VALUES
  (1, 'Free', 3, 10, 0, 1, 0),
  (2, 'Pro', 50, 30, 1, 1, 9.99),
  (3, 'Ultimate', NULL, NULL, 1, 1, 19.99);

--------------------------------------------------
-- TESTS
--------------------------------------------------
CREATE TABLE tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  public_link TEXT NOT NULL UNIQUE,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

--------------------------------------------------
-- QUESTIONS
--------------------------------------------------
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

--------------------------------------------------
-- ANSWER OPTIONS (for open or structured answers)
--------------------------------------------------
CREATE TABLE answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

--------------------------------------------------
-- TEST SUBMISSIONS
--------------------------------------------------
CREATE TABLE test_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id INTEGER NOT NULL,
  user_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('started', 'submitted', 'expired')),
  started_at TEXT DEFAULT CURRENT_TIMESTAMP,
  submitted_at TEXT,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

--------------------------------------------------
-- SUBMISSION ANSWERS
--------------------------------------------------
CREATE TABLE submission_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct INTEGER,
  FOREIGN KEY (submission_id) REFERENCES test_submissions(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

--------------------------------------------------
-- INDEXES (performance)
--------------------------------------------------
CREATE INDEX idx_tests_owner ON tests(owner_id);
CREATE INDEX idx_questions_test ON questions(test_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_submissions_test ON test_submissions(test_id);
CREATE INDEX idx_submission_answers_submission ON submission_answers(submission_id);
