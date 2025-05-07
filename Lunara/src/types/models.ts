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
export interface Appointment {
    id: number;
    clientId: number;
    providerId: number;
    startTime: string;
    endTime: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    location: string;
    createdAt: string;
    updatedAt: string;
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