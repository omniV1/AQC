import { ApiClient } from '../api/apiClient';

/**
 * Mock data for testing
 */
export const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'CLIENT' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
};

export const mockProvider = {
    id: 2,
    email: 'provider@example.com',
    firstName: 'Test',
    lastName: 'Provider',
    role: 'PROVIDER' as const,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
};

export const mockAppointment = {
    id: 1,
    providerId: 2,
    clientId: 1,
    startTime: '2024-01-01T10:00:00Z',
    endTime: '2024-01-01T11:00:00Z',
    status: 'SCHEDULED' as const,
    type: 'VIRTUAL' as const,
    notes: 'Test appointment',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
};

export const mockMessage = {
    id: 1,
    senderId: 1,
    recipientId: 2,
    content: 'Test message',
    read: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
};

/**
 * Mock ApiClient for testing
 */
export class MockApiClient {
    private static instance: MockApiClient;
    public mockGet = jest.fn();
    public mockPost = jest.fn();
    public mockPut = jest.fn();
    public mockDelete = jest.fn();

    private constructor() {}

    public static getInstance(): MockApiClient {
        if (!MockApiClient.instance) {
            MockApiClient.instance = new MockApiClient();
        }
        return MockApiClient.instance;
    }

    public get = this.mockGet;
    public post = this.mockPost;
    public put = this.mockPut;
    public delete = this.mockDelete;
}

/**
 * Setup mock API client for testing
 */
export const setupMockApiClient = () => {
    const mockClient = MockApiClient.getInstance();
    jest.spyOn(ApiClient, 'getInstance').mockReturnValue(mockClient as unknown as ApiClient);
    return mockClient;
}; 