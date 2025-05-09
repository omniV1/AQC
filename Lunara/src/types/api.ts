/**
 * Base API response interface
 * All API responses should extend this
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

/**
 * Pagination metadata interface
 */
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginationMeta;
}

/**
 * Base query parameters interface
 */
export interface QueryParams {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

/**
 * Authentication related types
 */
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
    };
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: string;
}

/**
 * User related types
 */
export interface UserProfile {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'CLIENT' | 'PROVIDER' | 'ADMIN';
    dueDate?: string;
    birthDate?: string;
    birthType?: 'NATURAL' | 'CSECTION';
    feedingStyle?: 'BREAST' | 'BOTTLE' | 'MIXED';
    birthLocation?: string;
    supportSystem?: string;
    concerns?: string;
    goals?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Appointment related types
 */
export interface Appointment {
    id: number;
    providerId: number;
    clientId: number;
    startTime: string;
    endTime: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    type: 'VIRTUAL' | 'IN_PERSON';
    notes?: string;
    location?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAppointmentRequest {
    providerId: number;
    startTime: string;
    endTime: string;
    type: 'VIRTUAL' | 'IN_PERSON';
    notes?: string;
    location?: string;
}

/**
 * Provider availability types
 */
export interface ProviderAvailability {
    id: number;
    providerId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface UpdateAvailabilityRequest {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

/**
 * Message related types
 */
export interface Message {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SendMessageRequest {
    recipientId: number;
    content: string;
} 