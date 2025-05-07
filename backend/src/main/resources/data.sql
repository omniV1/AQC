-- Insert provider registration code if it doesn't exist
INSERT INTO system_config (config_key, config_value, description)
SELECT 'provider_registration_code', 'LUNARA2024', 'Provider registration code'
WHERE NOT EXISTS (SELECT 1 FROM system_config WHERE config_key = 'provider_registration_code');

-- Insert mock providers if they don't exist
INSERT INTO _user (first_name, last_name, email, password, role) 
SELECT 'Sarah', 'Johnson', 'sarah.j@lunara.com', '$2a$10$YourHashedPasswordHere', 'PROVIDER'
WHERE NOT EXISTS (SELECT 1 FROM _user WHERE email = 'sarah.j@lunara.com');

INSERT INTO _user (first_name, last_name, email, password, role) 
SELECT 'Michael', 'Chen', 'michael.c@lunara.com', '$2a$10$YourHashedPasswordHere', 'PROVIDER'
WHERE NOT EXISTS (SELECT 1 FROM _user WHERE email = 'michael.c@lunara.com');

INSERT INTO _user (first_name, last_name, email, password, role) 
SELECT 'Emma', 'Williams', 'emma.w@lunara.com', '$2a$10$YourHashedPasswordHere', 'PROVIDER'
WHERE NOT EXISTS (SELECT 1 FROM _user WHERE email = 'emma.w@lunara.com');

-- Insert provider availability (Monday to Friday, 9 AM to 5 PM)
WITH provider_ids AS (
    SELECT DISTINCT id FROM _user WHERE role = 'PROVIDER'
)
INSERT INTO provider_availability (provider_id, day_of_week, start_time, end_time, is_available)
SELECT 
    id as provider_id,
    day_number as day_of_week,
    '09:00:00'::TIME as start_time,
    '17:00:00'::TIME as end_time,
    true as is_available
FROM provider_ids
CROSS JOIN generate_series(1, 5) as day_number
ON CONFLICT (provider_id, day_of_week) DO UPDATE
SET 
    start_time = EXCLUDED.start_time,
    end_time = EXCLUDED.end_time,
    is_available = EXCLUDED.is_available;

-- Add some variation in availability
WITH michael_id AS (
    SELECT id FROM _user WHERE email = 'michael.c@lunara.com' LIMIT 1
)
UPDATE provider_availability 
SET start_time = '10:00:00', end_time = '18:00:00'
WHERE provider_id = (SELECT id FROM michael_id)
AND day_of_week IN (2, 4);

WITH emma_id AS (
    SELECT id FROM _user WHERE email = 'emma.w@lunara.com' LIMIT 1
)
UPDATE provider_availability 
SET start_time = '08:00:00', end_time = '16:00:00'
WHERE provider_id = (SELECT id FROM emma_id)
AND day_of_week IN (1, 3, 5); 