import { NotificationService } from './notificationService';
import { NotificationPriority, NotificationType, PushNotification } from '../../types/notification';

/**
 * Service for handling push notifications
 */
export class PushNotificationService extends NotificationService {
    private static _instance: PushNotificationService | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): PushNotificationService {
        if (!PushNotificationService._instance) {
            PushNotificationService._instance = new PushNotificationService();
        }
        return PushNotificationService._instance;
    }

    public static clearInstance(): void {
        PushNotificationService._instance = null;
    }

    /**
     * Send a push notification
     */
    public async sendNotification(notification: {
        type: NotificationType;
        title: string;
        message: string;
        priority?: NotificationPriority;
        data?: Record<string, any>;
        deviceToken: string;
        body: string;
    }): Promise<PushNotification> {
        return this.api.post<PushNotification>('/notifications/push', {
            ...notification,
            type: 'PUSH'
        });
    }

    /**
     * Register device token for push notifications
     */
    public async registerDevice(params: {
        deviceToken: string;
        platform: 'ios' | 'android' | 'web';
        deviceId: string;
    }): Promise<void> {
        await this.api.post('/notifications/push/register', params);
    }

    /**
     * Unregister device from push notifications
     */
    public async unregisterDevice(deviceId: string): Promise<void> {
        await this.api.delete(`/notifications/push/devices/${deviceId}`);
    }

    /**
     * Send push notification to multiple devices
     */
    public async sendBulkPush(notifications: Array<{
        deviceToken: string;
        title: string;
        body: string;
        data?: Record<string, any>;
        priority?: NotificationPriority;
    }>): Promise<PushNotification[]> {
        return this.api.post<PushNotification[]>('/notifications/push/bulk', {
            notifications: notifications.map(n => ({ ...n, type: 'PUSH' }))
        });
    }

    /**
     * Get registered devices for current user
     */
    public async getDevices(): Promise<Array<{
        deviceId: string;
        deviceToken: string;
        platform: 'ios' | 'android' | 'web';
        lastActive: string;
    }>> {
        return this.api.get('/notifications/push/devices');
    }
} 