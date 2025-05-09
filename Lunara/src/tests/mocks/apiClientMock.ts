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

// Helper function to setup mock API client
export const setupMockApiClient = () => {
    const mockClient = MockApiClient.getInstance();
    jest.mock('../../api/apiClient', () => ({
        ApiClient: {
            getInstance: () => mockClient
        }
    }));
    return mockClient;
}; 