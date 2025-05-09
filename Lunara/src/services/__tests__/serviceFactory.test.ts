import { ServiceFactory } from '../serviceFactory';
import { NotificationService } from '../notification/notificationService';
import { SystemNotificationService } from '../notification/systemNotificationService';
import { EmailNotificationService } from '../notification/emailNotificationService';
import { PushNotificationService } from '../notification/pushNotificationService';
import { AppointmentService } from '../appointmentService';
import { MessageService } from '../messageService';

jest.mock('../../api/apiClient');

describe('ServiceFactory', () => {
    let factory: ServiceFactory;

    beforeEach(() => {
        factory = ServiceFactory.getInstance();
    });

    afterEach(() => {
        factory.clearServices();
        jest.clearAllMocks();
    });

    it('should be a singleton', () => {
        const factory2 = ServiceFactory.getInstance();
        expect(factory).toBe(factory2);
    });

    it('should get NotificationService instance', () => {
        const service = factory.getNotificationService();
        expect(service).toBeInstanceOf(SystemNotificationService);

        // Should return the same instance
        const service2 = factory.getNotificationService();
        expect(service).toBe(service2);
    });

    it('should get SystemNotificationService instance', () => {
        const service = factory.getSystemNotificationService();
        expect(service).toBeInstanceOf(SystemNotificationService);

        // Should return the same instance
        const service2 = factory.getSystemNotificationService();
        expect(service).toBe(service2);
    });

    it('should get EmailNotificationService instance', () => {
        const service = factory.getEmailNotificationService();
        expect(service).toBeInstanceOf(EmailNotificationService);

        // Should return the same instance
        const service2 = factory.getEmailNotificationService();
        expect(service).toBe(service2);
    });

    it('should get PushNotificationService instance', () => {
        const service = factory.getPushNotificationService();
        expect(service).toBeInstanceOf(PushNotificationService);

        // Should return the same instance
        const service2 = factory.getPushNotificationService();
        expect(service).toBe(service2);
    });

    it('should get AppointmentService instance', () => {
        const service = factory.getAppointmentService();
        expect(service).toBeInstanceOf(AppointmentService);

        // Should return the same instance
        const service2 = factory.getAppointmentService();
        expect(service).toBe(service2);
    });

    it('should get MessageService instance', () => {
        const service = factory.getMessageService();
        expect(service).toBeInstanceOf(MessageService);

        // Should return the same instance
        const service2 = factory.getMessageService();
        expect(service).toBe(service2);
    });

    it('should clear all services', () => {
        // Get all services
        const notification = factory.getNotificationService();
        const system = factory.getSystemNotificationService();
        const email = factory.getEmailNotificationService();
        const push = factory.getPushNotificationService();
        const appointment = factory.getAppointmentService();
        const message = factory.getMessageService();

        // Clear services
        factory.clearServices();

        // Get new instances
        const notification2 = factory.getNotificationService();
        const system2 = factory.getSystemNotificationService();
        const email2 = factory.getEmailNotificationService();
        const push2 = factory.getPushNotificationService();
        const appointment2 = factory.getAppointmentService();
        const message2 = factory.getMessageService();

        // Should be different instances
        expect(notification2).not.toBe(notification);
        expect(system2).not.toBe(system);
        expect(email2).not.toBe(email);
        expect(push2).not.toBe(push);
        expect(appointment2).not.toBe(appointment);
        expect(message2).not.toBe(message);
    });
}); 