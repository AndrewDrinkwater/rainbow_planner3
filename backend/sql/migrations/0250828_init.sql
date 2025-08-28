BEGIN;

-- Choices (lookup values for dropdowns)
CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Enquiries (children waiting to join)
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    enquiry_date DATE NOT NULL DEFAULT now(),
    status_id INT REFERENCES choices(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Members (active/past)
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    enquiry_id INT REFERENCES enquiries(id),
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    join_date DATE NOT NULL DEFAULT now(),
    exit_date DATE,
    exit_reason_id INT REFERENCES choices(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Staging imports (raw spreadsheet uploads)
CREATE TABLE staging_imports (
    id SERIAL PRIMARY KEY,
    upload_batch_id UUID DEFAULT gen_random_uuid(),
    raw_data JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT now()
);

-- Settings (configurable app rules)
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

COMMIT;
