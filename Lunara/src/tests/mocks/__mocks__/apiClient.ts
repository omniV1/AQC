export class ApiClient {
    private static instance: ApiClient;
    public get = jest.fn();
    public post = jest.fn();
    public put = jest.fn();
    public delete = jest.fn();

    private constructor() {}

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }
} 