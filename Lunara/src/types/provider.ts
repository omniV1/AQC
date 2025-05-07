export enum ProviderRole {
    ADMIN = 'ADMIN',
    PROVIDER = 'PROVIDER',
    ASSISTANT = 'ASSISTANT'
}

export type DeliveryType = 'VAGINAL' | 'CESAREAN' | 'VBAC';

export interface Provider {
    id: string;
    name: string;
    email: string;
    role: ProviderRole;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProviderRequest {
    name: string;
    email: string;
    password: string;
}

export interface UpdateProviderRequest {
    name: string;
    email: string;
    password?: string;
}

export interface CreateClientRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: string;
    deliveryDate: string;
    deliveryType: DeliveryType;
    complications: string;
    supportPreferences: string[];
} 