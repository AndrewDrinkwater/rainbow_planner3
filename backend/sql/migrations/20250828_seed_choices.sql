-- Seed values for dropdowns

-- Enquiry Status
INSERT INTO choices (category, value, label, sort_order) VALUES
('enquiry_status', 'new',        'New',         1),
('enquiry_status', 'eligible',   'Eligible',    2),
('enquiry_status', 'ineligible', 'Ineligible',  3),
('enquiry_status', 'promoted',   'Promoted',    4),
('enquiry_status', 'withdrawn',  'Withdrawn',   5);

-- Exit Reasons
INSERT INTO choices (category, value, label, sort_order) VALUES
('exit_reason', 'age_out',   'Aged Out',    1),
('exit_reason', 'moved',     'Moved Away',  2),
('exit_reason', 'withdrawn', 'Withdrew',    3),
('exit_reason', 'other',     'Other',       4);
