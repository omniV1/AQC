// User related types
export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'PROVIDER' | 'CLIENT' | 'ADMIN';
    createdAt?: string;
}

export interface UserProfile {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'PROVIDER' | 'CLIENT' | 'ADMIN';
    specialties?: string[];
    bio?: string;
    availability?: {
        start: string;
        end: string;
    }[];
}

// Daily Check-in types
export interface DailyCheckIn {
    id: number;
    userId: number;
    moodLevel: 'VERY_LOW' | 'LOW' | 'NEUTRAL' | 'GOOD' | 'EXCELLENT';
    physicalSymptoms?: string;
    emotionalNotes?: string;
    sleepHours?: number;
    tookMedication?: boolean;
    medicationNotes?: string;
    supportNeeded?: string;
    createdAt: string;
}

// Appointment/Support Session types
export enum SupportSessionStatus {
    SCHEDULED = 'SCHEDULED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    NO_SHOW = 'NO_SHOW'
}

export enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum SupportSessionType {
    INITIAL_CONSULTATION = 'INITIAL_CONSULTATION',
    FOLLOW_UP = 'FOLLOW_UP',
    EMERGENCY = 'EMERGENCY',
    ROUTINE = 'ROUTINE'
}

export interface SupportSession {
    id: string;
    provider: {
        id: string;
        name: string;
    };
    client: {
        id: string;
        name: string;
    };
    startTime: string;
    endTime: string;
    status: SupportSessionStatus;
    approvalStatus: ApprovalStatus;
    sessionType: SupportSessionType;
    notes?: string;
    followUpNotes?: string;
    cancellationReason?: string;
    location: string;
}

// Message types
export interface Message {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

// Authentication types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface CreateProviderRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    specialties?: string[];
    bio?: string;
}

export interface UpdateProviderRequest {
    firstName?: string;
    lastName?: string;
    specialties?: string[];
    bio?: string;
    availability?: {
        start: string;
        end: string;
    }[];
}

export interface Provider {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    specialties?: string[];
    bio?: string;
    availability?: {
        start: string;
        end: string;
    }[];
}

export interface Appointment {
    id: number;
    provider: Provider;
    client: {
        id: number;
        firstName: string;
        lastName: string;
    };
    startTime: string;
    endTime: string;
    status: string;
    location: string;
    notes?: string;
} 