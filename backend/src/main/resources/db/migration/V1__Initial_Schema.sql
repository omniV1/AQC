-- Create base user table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    last_login TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create providers table that extends users
CREATE TABLE providers (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    bio TEXT,
    CONSTRAINT fk_provider_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create provider specialties table
CREATE TABLE provider_specialties (
    provider_id UUID NOT NULL REFERENCES providers(user_id),
    specialty VARCHAR(255) NOT NULL,
    PRIMARY KEY (provider_id, specialty)
);

-- Create provider availability table
CREATE TABLE provider_availability (
    provider_id UUID NOT NULL REFERENCES providers(user_id),
    day_of_week INTEGER NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    end_time VARCHAR(10) NOT NULL,
    PRIMARY KEY (provider_id, day_of_week, start_time, end_time)
);

-- Create clients table that extends users
CREATE TABLE clients (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    provider_id UUID REFERENCES providers(user_id),
    birth_date TIMESTAMP,
    due_date TIMESTAMP,
    preferences JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT fk_client_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_client_provider FOREIGN KEY (provider_id) REFERENCES providers(user_id)
);

-- Create notifications table
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    scheduled_for TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create messages table
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES users(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    content TEXT,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Create user_profiles table
CREATE TABLE user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    due_date DATE,
    birth_date DATE,
    birth_type VARCHAR(50),
    feeding_style VARCHAR(50),
    birth_location VARCHAR(255),
    support_system TEXT,
    concerns TEXT,
    goals TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
); 