import { NotificationService } from './notificationService';
import { NotificationPriority, NotificationType, EmailNotification } from '../../types/notification';

/**
 * Service for handling email notifications
 */
export class EmailNotificationService extends NotificationService {
    private static _instance: EmailNotificationService | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): EmailNotificationService {
        if (!EmailNotificationService._instance) {
            EmailNotificationService._instance = new EmailNotificationService();
        }
        return EmailNotificationService._instance;
    }

    public static clearInstance(): void {
        EmailNotificationService._instance = null;
    }

    /**
     * Send an email notification
     */
    public async sendNotification(notification: {
        type: NotificationType;
        title: string;
        message: string;
        priority?: NotificationPriority;
        data?: Record<string, any>;
        recipientEmail: string;
        subject: string;
        htmlContent: string;
    }): Promise<EmailNotification> {
        return this.api.post<EmailNotification>('/notifications/email', {
            ...notification,
            type: 'EMAIL'
        });
    }

    /**
     * Get email notification templates
     */
    public async getTemplates(): Promise<Array<{
        id: string;
        name: string;
        subject: string;
        htmlTemplate: string;
    }>> {
        return this.api.get('/notifications/email/templates');
    }

    /**
     * Send email using template
     */
    public async sendEmailTemplate(params: {
        templateId: string;
        recipientEmail: string;
        data: Record<string, any>;
    }): Promise<EmailNotification> {
        return this.api.post<EmailNotification>('/notifications/email/template', params);
    }
} 