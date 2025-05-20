-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., CLIENT, PROVIDER, ADMIN
    last_login TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create providers table (for provider-specific data, inherits from users)
CREATE TABLE providers (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table (for client-specific data, inherits from users)
CREATE TABLE clients (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES providers(user_id) ON DELETE SET NULL, -- A client might not always have a provider or provider could be deleted
    birth_date TIMESTAMP,
    due_date TIMESTAMP,
    preferences JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- e.g., ACTIVE, INACTIVE
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_client_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'ONHOLD', 'GRADUATED'))
);

-- Create user_profiles table (extends user information, specific to clients typically)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    due_date TIMESTAMP,
    birth_date TIMESTAMP,
    birth_type VARCHAR(50),
    feeding_style VARCHAR(50),
    birth_location TEXT,
    support_system TEXT,
    concerns TEXT,
    goals TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create provider_specialties table (join table for provider and their specialties)
CREATE TABLE provider_specialties (
    provider_id UUID NOT NULL REFERENCES providers(user_id) ON DELETE CASCADE,
    specialty VARCHAR(255) NOT NULL,
    PRIMARY KEY (provider_id, specialty)
);

-- Create provider_availability table
CREATE TABLE provider_availability (
    provider_id UUID NOT NULL REFERENCES providers(user_id) ON DELETE CASCADE, -- Changed from users(id) to providers(user_id) for clarity if User is not always a Provider
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- ERD had 'timestamp without time zone'
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- ERD had 'timestamp without time zone'
    PRIMARY KEY (provider_id, day_of_week, start_time)
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Assuming provider is a User
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,   -- Assuming client is a User
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL, -- e.g., SCHEDULED, COMPLETED, CANCELLED
    appointment_type VARCHAR(50) NOT NULL, -- e.g., INITIAL_CONSULTATION, FOLLOW_UP
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_appointment_status CHECK (status IN ('SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')),
    CONSTRAINT valid_appointment_type CHECK (appointment_type IN (
        'INITIAL_CONSULTATION',
        'FOLLOW_UP',
        'POSTPARTUM_CARE',
        'LACTATION_SUPPORT',
        'EMOTIONAL_SUPPORT',
        'NEWBORN_CARE',
        'VIRTUAL_CHECK_IN'
    ))
);

-- Create support_sessions table (details for a specific session, linked to an appointment)
CREATE TABLE support_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    session_type VARCHAR(50) NOT NULL,
    recommendations TEXT,
    resources_provided JSONB,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP, -- ERD had 'timestamp without time zone'
    approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    cancellation_reason TEXT,
    follow_up_notes TEXT,
    location TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_support_session_type CHECK (session_type IN (
        'INITIAL_CONSULTATION',
        'FOLLOW_UP',
        'POSTPARTUM_CARE',
        'LACTATION_SUPPORT',
        'EMOTIONAL_SUPPORT',
        'NEWBORN_CARE',
        'VIRTUAL_CHECK_IN'
    )),
    CONSTRAINT valid_support_approval_status CHECK (approval_status IN ('PENDING', 'APPROVED', 'REJECTED'))
);

-- Create daily_checkins table
CREATE TABLE daily_checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Assuming client is a User
    mood_level VARCHAR(50) NOT NULL,
    sleep_hours INTEGER,
    physical_symptoms TEXT,
    emotional_notes TEXT,
    took_medication BOOLEAN DEFAULT false,
    medication_notes TEXT,
    support_needed TEXT,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments JSONB,
    read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL, -- e.g., ARTICLE, VIDEO, PDF
    content TEXT NOT NULL, -- Could be URL or actual content depending on use case
    tags TEXT[],
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create resource_assignments table (linking resources to clients)
CREATE TABLE resource_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assigned_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'ASSIGNED', -- e.g., ASSIGNED, VIEWED, COMPLETED
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES support_sessions(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- User might be deleted
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- e.g., CREATE, UPDATE, DELETE
    details JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    read BOOLEAN NOT NULL DEFAULT false,
    scheduled_for TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create system_config table
CREATE TABLE system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_clients_provider_id ON clients(provider_id);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_provider_availability_provider_day ON provider_availability(provider_id, day_of_week);
CREATE INDEX idx_appointments_provider_id ON appointments(provider_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_support_sessions_appointment_id ON support_sessions(appointment_id);
CREATE INDEX idx_messages_sender_recipient ON messages(sender_id, recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_daily_checkins_client_id ON daily_checkins(client_id);
CREATE INDEX idx_daily_checkins_created_at ON daily_checkins(created_at);
CREATE INDEX idx_resources_created_by ON resources(created_by);
CREATE INDEX idx_resources_tags ON resources USING gin(tags);
CREATE INDEX idx_resource_assignments_client_id ON resource_assignments(client_id);
CREATE INDEX idx_resource_assignments_resource_id ON resource_assignments(resource_id);
CREATE INDEX idx_feedback_session_id ON feedback(session_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_system_config_key ON system_config(config_key);

-- Create updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers for all tables with an updated_at column
CREATE TRIGGER trigger_update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_provider_availability_updated_at BEFORE UPDATE ON provider_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_support_sessions_updated_at BEFORE UPDATE ON support_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_daily_checkins_updated_at BEFORE UPDATE ON daily_checkins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_resource_assignments_updated_at BEFORE UPDATE ON resource_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_feedback_updated_at BEFORE UPDATE ON feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trigger_update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 