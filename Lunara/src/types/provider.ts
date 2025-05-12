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
    dueDate?: string;
    birthDate?: string;
    birthType?: BirthType;
    feedingStyle?: FeedingStyle;
    birthLocation?: string;
    supportSystem?: string;
    concerns?: string;
    goals?: string;
}

export enum BirthType {
    VAGINAL = 'VAGINAL',
    C_SECTION = 'C_SECTION',
    VBAC = 'VBAC',
    UNMEDICATED = 'UNMEDICATED',
    MEDICATED = 'MEDICATED',
    HOME_BIRTH = 'HOME_BIRTH',
    BIRTH_CENTER = 'BIRTH_CENTER',
    HOSPITAL = 'HOSPITAL'
}

export enum FeedingStyle {
    BREASTFEEDING = 'BREASTFEEDING',
    FORMULA = 'FORMULA',
    MIXED = 'MIXED',
    PUMPING = 'PUMPING',
    SNS = 'SNS',
    TUBE_FEEDING = 'TUBE_FEEDING'
} 