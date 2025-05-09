import { ApiClient } from '../../api/apiClient';
import {
    Notification,
    NotificationPreferences,
    NotificationType,
    NotificationPriority
} from '../../types/notification';
import { PaginatedResponse, QueryParams } from '../../types/api';

/**
 * Base NotificationService class for managing notifications
 * Handles:
 * - System notifications
 * - Email notifications
 * - Push notifications
 * - Notification preferences
 */
export abstract class NotificationService {
    protected readonly api: ApiClient;
    protected readonly NOTIFICATION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    protected constructor() {
        this.api = ApiClient.getInstance();
    }

    /**
     * Get all notifications for the current user
     */
    public async getNotifications(params: QueryParams): Promise<PaginatedResponse<Notification>> {
        const queryString = this.buildQueryString(params);
        return this.api.get<PaginatedResponse<Notification>>(`/notifications${queryString}`);
    }

    /**
     * Get unread notifications count
     */
    public async getUnreadCount(): Promise<number> {
        const response = await this.api.get<{ count: number }>('/notifications/unread/count');
        return response.count;
    }

    /**
     * Mark a notification as read
     */
    public async markAsRead(id: number): Promise<void> {
        await this.api.post(`/notifications/${id}/read`, {});
    }

    /**
     * Mark all notifications as read
     */
    public async markAllAsRead(): Promise<void> {
        await this.api.post('/notifications/read-all', {});
    }

    /**
     * Delete a notification
     */
    public async deleteNotification(id: number): Promise<void> {
        await this.api.delete(`/notifications/${id}`);
    }

    /**
     * Get notification preferences
     */
    public async getPreferences(): Promise<NotificationPreferences> {
        return this.api.get<NotificationPreferences>(
            '/notifications/preferences',
            this.NOTIFICATION_CACHE_DURATION
        );
    }

    /**
     * Update notification preferences
     */
    public async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
        return this.api.put<NotificationPreferences>('/notifications/preferences', preferences);
    }

    /**
     * Send a notification
     */
    public abstract sendNotification(notification: {
        type: NotificationType;
        title: string;
        message: string;
        priority?: NotificationPriority;
        data?: Record<string, any>;
    }): Promise<Notification>;

    /**
     * Build query string from params
     */
    protected buildQueryString(params: QueryParams): string {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString());
        return queryParams.toString() ? `?${queryParams.toString()}` : '';
    }
} 