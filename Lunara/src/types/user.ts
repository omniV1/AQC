export enum Role {
    CLIENT = 'CLIENT',
    PROVIDER = 'PROVIDER',
    ASSISTANT = 'ASSISTANT',
    ADMIN = 'ADMIN'
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'PROVIDER' | 'CLIENT' | 'ADMIN';
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    id: string;
    user: User;
    dueDate?: string;
    birthDate?: string;
    birthType?: string;
    feedingStyle?: string;
    birthLocation?: string;
    supportSystem?: string;
    concerns?: string;
    goals?: string;
    createdAt: string;
    updatedAt: string;
} 