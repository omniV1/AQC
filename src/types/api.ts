/**
 * Appointment related types
 */
export interface Appointment {
    id: number;
    clientId: number;
    providerId: number;
    provider: Provider;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    location: string;
    notes?: string;
    sessionType: SessionType;
    createdAt: string;
    updatedAt: string;
}

export enum AppointmentStatus {
    SCHEDULED = 'SCHEDULED',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    RESCHEDULED = 'RESCHEDULED'
}

export enum SessionType {
    INITIAL_CONSULTATION = 'INITIAL_CONSULTATION',
    FOLLOW_UP = 'FOLLOW_UP',
    EMERGENCY = 'EMERGENCY',
    ROUTINE = 'ROUTINE'
}

export interface CreateAppointmentRequest {
    providerId: number;
    startTime: string;
    endTime: string;
    location: string;
    notes?: string;
    sessionType: SessionType;
}

export interface UpdateAppointmentRequest {
    startTime?: string;
    endTime?: string;
    location?: string;
    notes?: string;
    status?: AppointmentStatus;
    sessionType?: SessionType;
}

export interface AppointmentQueryParams {
    startDate?: string;
    endDate?: string;
    providerId?: number;
    status?: AppointmentStatus;
    page?: number;
    pageSize?: number;
}

export interface ProviderAvailability {
    providerId: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    breakStartTime?: string;
    breakEndTime?: string;
}

/**
 * Provider related types
 */
export interface Provider {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    specialties?: string[];
    availability?: ProviderAvailability[];
    createdAt: string;
    updatedAt: string;
} 