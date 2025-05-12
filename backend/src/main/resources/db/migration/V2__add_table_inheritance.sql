-- Drop old indexes
DROP INDEX IF EXISTS idx_users_user_type;
DROP INDEX IF EXISTS idx_users_managed_by_id;

-- Drop old columns from users table
ALTER TABLE users 
    DROP COLUMN IF EXISTS user_type,
    DROP COLUMN IF EXISTS managed_by_id,
    DROP COLUMN IF EXISTS provider_details,
    DROP COLUMN IF EXISTS client_details;

-- Add role column to users table
ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS role VARCHAR(50) NOT NULL;

-- Create providers table for provider-specific data
CREATE TABLE IF NOT EXISTS providers (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    bio TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table for client-specific data
CREATE TABLE IF NOT EXISTS clients (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    provider_id UUID NOT NULL REFERENCES providers(user_id),
    birth_date TIMESTAMP,
    due_date TIMESTAMP,
    preferences JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_client_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'ONHOLD', 'GRADUATED'))
);

-- Create provider_specialties table
CREATE TABLE IF NOT EXISTS provider_specialties (
    provider_id UUID NOT NULL REFERENCES providers(user_id),
    specialty VARCHAR(255) NOT NULL,
    PRIMARY KEY (provider_id, specialty)
);

-- Create provider_availability table
CREATE TABLE IF NOT EXISTS provider_availability (
    provider_id UUID NOT NULL REFERENCES providers(user_id),
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    PRIMARY KEY (provider_id, day_of_week, start_time)
);

-- Add new indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_clients_provider_id ON clients(provider_id); 