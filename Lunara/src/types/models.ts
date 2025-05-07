// User related types
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
}

export interface UserProfile {
    id: number;
    userId: number;
    dueDate?: string;
    birthDate?: string;
    birthType?: 'VAGINAL' | 'C_SECTION' | 'OTHER';
    feedingStyle?: 'BREAST' | 'BOTTLE' | 'MIXED' | 'OTHER';
    birthLocation?: string;
    supportSystem?: string;
    concerns?: string;
    goals?: string;
    createdAt: string;
    updatedAt: string;
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
    id: number;
    provider: {
        id: number;
        name: string;
    };
    client: {
        id: number;
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

export interface RegisterData extends LoginCredentials {
    firstName: string;
    lastName: string;
    dueDate?: string;
    birthDate?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
} 