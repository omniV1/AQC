import { ApiClient } from '../api/apiClient';
import { 
    UserProfile, 
    PaginatedResponse, 
    QueryParams 
} from '../types/api';

/**
 * Service for handling user-related operations
 */
export class UserService {
    private static instance: UserService;
    private api: ApiClient;

    private constructor() {
        this.api = ApiClient.getInstance();
    }

    /**
     * Get singleton instance of UserService
     */
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    /**
     * Get current user's profile
     * @returns User profile
     */
    public async getCurrentProfile(): Promise<UserProfile> {
        return this.api.get<UserProfile>('/api/users/me');
    }

    /**
     * Update current user's profile
     * @param profile - Updated profile data
     * @returns Updated user profile
     */
    public async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
        return this.api.put<UserProfile>('/api/users/me', profile);
    }

    /**
     * Get user by ID
     * @param id - User ID
     * @returns User profile
     */
    public async getUserById(id: number): Promise<UserProfile> {
        return this.api.get<UserProfile>(`/api/users/${id}`);
    }

    /**
     * Get list of users with pagination
     * @param params - Query parameters for pagination and filtering
     * @returns Paginated list of users
     */
    public async getUsers(params: QueryParams): Promise<PaginatedResponse<UserProfile>> {
        const queryString = this.buildQueryString(params);
        return this.api.get<PaginatedResponse<UserProfile>>(`/api/users${queryString}`);
    }

    /**
     * Get list of providers
     * @param params - Query parameters for pagination and filtering
     * @returns Paginated list of providers
     */
    public async getProviders(params: QueryParams): Promise<PaginatedResponse<UserProfile>> {
        const queryString = this.buildQueryString(params);
        return this.api.get<PaginatedResponse<UserProfile>>(`/api/users/providers${queryString}`);
    }

    /**
     * Get list of clients
     * @param params - Query parameters for pagination and filtering
     * @returns Paginated list of clients
     */
    public async getClients(params: QueryParams): Promise<PaginatedResponse<UserProfile>> {
        const queryString = this.buildQueryString(params);
        return this.api.get<PaginatedResponse<UserProfile>>(`/api/clients${queryString}`);
    }

    /**
     * Build query string from parameters
     * @param params - Query parameters
     * @returns Formatted query string
     */
    private buildQueryString(params: QueryParams): string {
        const queryParams = new URLSearchParams();

        if (params.page) {
            queryParams.append('page', params.page.toString());
        }
        if (params.pageSize) {
            queryParams.append('pageSize', params.pageSize.toString());
        }
        if (params.sortBy) {
            queryParams.append('sortBy', params.sortBy);
        }
        if (params.sortOrder) {
            queryParams.append('sortOrder', params.sortOrder);
        }
        if (params.search) {
            queryParams.append('search', params.search);
        }

        const queryString = queryParams.toString();
        return queryString ? `?${queryString}` : '';
    }
} 