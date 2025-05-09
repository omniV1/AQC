-- Drop existing data first to ensure clean state
DELETE FROM system_config WHERE config_key = 'provider_registration_code';

-- Insert the registration code
INSERT INTO system_config (config_key, config_value, description)
VALUES ('provider_registration_code', 'LUNARA2024', 'Provider registration code'); 