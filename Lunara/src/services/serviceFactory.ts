import { NotificationService } from './notification/notificationService';
import { SystemNotificationService } from './notification/systemNotificationService';
import { EmailNotificationService } from './notification/emailNotificationService';
import { PushNotificationService } from './notification/pushNotificationService';
import { AppointmentService } from './appointmentService';
import { MessageService } from './messageService';

/**
 * Factory class for managing service instances
 * Handles:
 * - Centralized service creation
 * - Dependency injection
 * - Service lifecycle management
 */
export class ServiceFactory {
    private static instance: ServiceFactory;
    private systemNotificationService?: SystemNotificationService;
    private emailNotificationService?: EmailNotificationService;
    private pushNotificationService?: PushNotificationService;
    private appointmentService?: AppointmentService;
    private messageService?: MessageService;

    private constructor() {}

    public static getInstance(): ServiceFactory {
        if (!ServiceFactory.instance) {
            ServiceFactory.instance = new ServiceFactory();
        }
        return ServiceFactory.instance;
    }

    /**
     * Get notification service
     */
    public getNotificationService(): NotificationService {
        return this.getSystemNotificationService();
    }

    /**
     * Get system notification service
     */
    public getSystemNotificationService(): SystemNotificationService {
        if (!this.systemNotificationService) {
            this.systemNotificationService = SystemNotificationService.getInstance();
        }
        return this.systemNotificationService;
    }

    /**
     * Get email notification service
     */
    public getEmailNotificationService(): EmailNotificationService {
        if (!this.emailNotificationService) {
            this.emailNotificationService = EmailNotificationService.getInstance();
        }
        return this.emailNotificationService;
    }

    /**
     * Get push notification service
     */
    public getPushNotificationService(): PushNotificationService {
        if (!this.pushNotificationService) {
            this.pushNotificationService = PushNotificationService.getInstance();
        }
        return this.pushNotificationService;
    }

    /**
     * Get appointment service
     */
    public getAppointmentService(): AppointmentService {
        if (!this.appointmentService) {
            this.appointmentService = AppointmentService.getInstance();
        }
        return this.appointmentService;
    }

    /**
     * Get message service
     */
    public getMessageService(): MessageService {
        if (!this.messageService) {
            this.messageService = MessageService.getInstance();
        }
        return this.messageService;
    }

    /**
     * Clear all service instances
     */
    public clearServices(): void {
        SystemNotificationService.clearInstance();
        this.systemNotificationService = undefined;

        if ('clearInstance' in EmailNotificationService) {
            (EmailNotificationService as any).clearInstance();
        }
        this.emailNotificationService = undefined;

        if ('clearInstance' in PushNotificationService) {
            (PushNotificationService as any).clearInstance();
        }
        this.pushNotificationService = undefined;

        if ('clearInstance' in AppointmentService) {
            (AppointmentService as any).clearInstance();
        }
        this.appointmentService = undefined;

        if ('clearInstance' in MessageService) {
            (MessageService as any).clearInstance();
        }
        this.messageService = undefined;
    }
} 