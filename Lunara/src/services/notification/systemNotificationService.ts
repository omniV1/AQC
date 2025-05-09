import { NotificationService } from './notificationService';
import { NotificationPriority, NotificationType, SystemNotification } from '../../types/notification';

/**
 * Service for handling system notifications
 */
export class SystemNotificationService extends NotificationService {
    private static _instance: SystemNotificationService | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): SystemNotificationService {
        if (!SystemNotificationService._instance) {
            SystemNotificationService._instance = new SystemNotificationService();
        }
        return SystemNotificationService._instance;
    }

    public static clearInstance(): void {
        SystemNotificationService._instance = null;
    }

    /**
     * Send a system notification
     */
    public async sendNotification(notification: {
        type: NotificationType;
        title: string;
        message: string;
        priority?: NotificationPriority;
        data?: Record<string, any>;
        category?: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
        autoHide?: boolean;
        duration?: number;
    }): Promise<SystemNotification> {
        return this.api.post<SystemNotification>('/notifications/system', {
            ...notification,
            type: 'SYSTEM'
        });
    }
} 