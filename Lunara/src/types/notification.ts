export type NotificationType = 'SYSTEM' | 'EMAIL' | 'PUSH';

export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface NotificationPreferences {
    email: boolean;
    push: boolean;
    system: boolean;
    emailFrequency: 'INSTANT' | 'DAILY' | 'WEEKLY';
    pushEnabled: boolean;
    doNotDisturb: {
        enabled: boolean;
        startTime: string; // HH:mm format
        endTime: string; // HH:mm format
    };
}

export interface Notification {
    id: number;
    userId: number;
    type: NotificationType;
    title: string;
    message: string;
    priority: NotificationPriority;
    read: boolean;
    data?: Record<string, any>;
    createdAt: string;
    readAt?: string;
}

export interface EmailNotification extends Notification {
    type: 'EMAIL';
    recipientEmail: string;
    subject: string;
    htmlContent: string;
    sentAt?: string;
}

export interface PushNotification extends Notification {
    type: 'PUSH';
    deviceToken: string;
    payload: {
        title: string;
        body: string;
        data?: Record<string, any>;
    };
    sentAt?: string;
}

export interface SystemNotification extends Notification {
    type: 'SYSTEM';
    category: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
    autoHide?: boolean;
    duration?: number; // in milliseconds
} 