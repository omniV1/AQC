-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Modify users table to use UUID and enhance
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey CASCADE;
ALTER TABLE users ADD COLUMN temp_id UUID DEFAULT uuid_generate_v4();
UPDATE users SET temp_id = uuid_generate_v4();
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users RENAME COLUMN temp_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users ADD COLUMN user_type VARCHAR(50) NOT NULL DEFAULT 'CLIENT';
ALTER TABLE users ADD COLUMN managed_by_id UUID REFERENCES users(id);
ALTER TABLE users ADD COLUMN provider_details JSONB;
ALTER TABLE users ADD COLUMN client_details JSONB;
ALTER TABLE users ADD CONSTRAINT valid_user_type CHECK (user_type IN ('PROVIDER', 'CLIENT', 'ADMIN'));

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    birth_date TIMESTAMP WITHOUT TIME ZONE,
    birth_location VARCHAR(255),
    birth_type VARCHAR(255),
    concerns VARCHAR(255),
    feeding_style VARCHAR(255),
    goals VARCHAR(255),
    support_system VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create providers table
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    bio TEXT,
    availability_schedule JSONB,
    hourly_rate DECIMAL(10,2),
    rating DECIMAL(3,2),
    total_clients INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_providers_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create provider_specialties table
CREATE TABLE provider_specialties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES providers(id),
    specialty_name VARCHAR(255),
    certification_date TIMESTAMP WITHOUT TIME ZONE,
    certification_details JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_provider_specialties_provider FOREIGN KEY (provider_id) REFERENCES providers(id)
);

-- Create clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    provider_id UUID NOT NULL REFERENCES providers(id),
    birth_date TIMESTAMP WITHOUT TIME ZONE,
    due_date TIMESTAMP WITHOUT TIME ZONE,
    preferences JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    support_plan JSONB,
    emergency_contact JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_clients_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_clients_provider FOREIGN KEY (provider_id) REFERENCES providers(id),
    CONSTRAINT valid_client_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'ONHOLD', 'GRADUATED'))
);

-- Create provider_availability table
CREATE TABLE provider_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES providers(id),
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT true,
    recurrence_rule VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_provider_availability_provider FOREIGN KEY (provider_id) REFERENCES providers(id)
);

-- Create appointments table
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES providers(id),
    client_id UUID NOT NULL REFERENCES clients(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'SCHEDULED',
    type VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    notes TEXT,
    follow_up_notes TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointment_provider FOREIGN KEY (provider_id) REFERENCES providers(id),
    CONSTRAINT fk_appointment_client FOREIGN KEY (client_id) REFERENCES clients(id),
    CONSTRAINT valid_appointment_status CHECK (status IN ('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'))
);

-- Create support_sessions table
CREATE TABLE support_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID NOT NULL REFERENCES appointments(id),
    session_type VARCHAR(50) NOT NULL,
    summary TEXT,
    recommendations TEXT,
    resources_provided JSONB,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_session_type CHECK (session_type IN (
        'INITIAL_CONSULTATION',
        'FOLLOW_UP',
        'POSTPARTUM_CARE',
        'LACTATION_SUPPORT',
        'EMOTIONAL_SUPPORT',
        'NEWBORN_CARE',
        'VIRTUAL_CHECK_IN'
    ))
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(id),
    recipient_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    attachments JSONB,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITHOUT TIME ZONE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_message_sender FOREIGN KEY (sender_id) REFERENCES users(id),
    CONSTRAINT fk_message_recipient FOREIGN KEY (recipient_id) REFERENCES users(id)
);

-- Create daily_checkins table
CREATE TABLE daily_checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id),
    mood_level INTEGER NOT NULL CHECK (mood_level BETWEEN 1 AND 5),
    sleep_hours INTEGER,
    physical_symptoms TEXT[],
    emotional_state TEXT,
    support_needed BOOLEAN DEFAULT false,
    support_type TEXT,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_checkin_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    category VARCHAR(100),
    visibility VARCHAR(50) DEFAULT 'PUBLIC',
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resource_creator FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT valid_visibility CHECK (visibility IN ('PUBLIC', 'PRIVATE', 'CLIENTS_ONLY'))
);

-- Create resource_assignments table
CREATE TABLE resource_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_id UUID NOT NULL REFERENCES resources(id),
    client_id UUID NOT NULL REFERENCES clients(id),
    assigned_by UUID NOT NULL REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'UNREAD',
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT fk_resource_assignment_resource FOREIGN KEY (resource_id) REFERENCES resources(id),
    CONSTRAINT fk_resource_assignment_client FOREIGN KEY (client_id) REFERENCES clients(id),
    CONSTRAINT fk_resource_assignment_assigner FOREIGN KEY (assigned_by) REFERENCES users(id),
    CONSTRAINT valid_assignment_status CHECK (status IN ('UNREAD', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'))
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP WITHOUT TIME ZONE,
    action_link VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT valid_notification_type CHECK (type IN (
        'APPOINTMENT_REMINDER',
        'CHECKIN_REMINDER',
        'MESSAGE_RECEIVED',
        'RESOURCE_ASSIGNED',
        'SUPPORT_NEEDED',
        'SYSTEM_UPDATE'
    ))
);

-- Create feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES support_sessions(id),
    client_id UUID NOT NULL REFERENCES clients(id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    areas_of_improvement TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_session FOREIGN KEY (session_id) REFERENCES support_sessions(id),
    CONSTRAINT fk_feedback_client FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create audit_logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Add indexes for performance
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_managed_by_id ON users(managed_by_id);
CREATE INDEX idx_providers_user_id ON providers(user_id);
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_provider_id ON clients(provider_id);
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
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_feedback_session_id ON feedback(session_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at
    BEFORE UPDATE ON providers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_sessions_updated_at
    BEFORE UPDATE ON support_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 