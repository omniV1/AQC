import { MessageService } from '../messageService';
import { MockApiClient, setupMockApiClient } from '../../tests/mocks/apiClientMock';
import { mockMessage } from '../../tests/testUtils';
import { SendMessageRequest } from '../../types/api';

jest.mock('../../api/apiClient');

describe('MessageService', () => {
    let service: MessageService;
    let mockApiClient: MockApiClient;

    beforeEach(() => {
        mockApiClient = setupMockApiClient();
        service = MessageService.getInstance();
        // @ts-ignore - Set the API client directly
        service.api = mockApiClient;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('sendMessage', () => {
        it('should send a message successfully', async () => {
            const request: SendMessageRequest = {
                recipientId: 2,
                content: 'Test message'
            };

            mockApiClient.mockPost.mockResolvedValueOnce(mockMessage);

            const result = await service.sendMessage(request);

            expect(mockApiClient.mockPost).toHaveBeenCalledWith('/messages', request);
            expect(result).toEqual(mockMessage);
        });
    });

    describe('getMessage', () => {
        it('should get message by ID with caching', async () => {
            mockApiClient.mockGet.mockResolvedValueOnce(mockMessage);

            const result = await service.getMessage(1);

            expect(mockApiClient.mockGet).toHaveBeenCalledWith(
                '/messages/1',
                expect.any(Number)
            );
            expect(result).toEqual(mockMessage);
        });
    });

    describe('getConversation', () => {
        it('should get paginated conversation messages', async () => {
            const params = { page: 1, pageSize: 10 };
            const mockResponse = {
                data: [mockMessage],
                meta: {
                    currentPage: 1,
                    totalPages: 1,
                    pageSize: 10,
                    totalCount: 1
                }
            };

            mockApiClient.mockGet.mockResolvedValueOnce(mockResponse);

            const result = await service.getConversation(2, params);

            expect(mockApiClient.mockGet).toHaveBeenCalledWith(
                '/messages/conversation/2?page=1&pageSize=10'
            );
            expect(result).toEqual(mockResponse);
        });
    });

    describe('markAsRead', () => {
        it('should mark message as read', async () => {
            await service.markAsRead(1);

            expect(mockApiClient.mockPost).toHaveBeenCalledWith('/messages/1/read', {});
        });
    });

    describe('markConversationAsRead', () => {
        it('should mark all messages in conversation as read', async () => {
            await service.markConversationAsRead(2);

            expect(mockApiClient.mockPost).toHaveBeenCalledWith('/messages/conversation/2/read', {});
        });
    });

    describe('getUnreadCount', () => {
        it('should get unread message count', async () => {
            const mockResponse = { count: 5 };
            mockApiClient.mockGet.mockResolvedValueOnce(mockResponse);

            const result = await service.getUnreadCount();

            expect(mockApiClient.mockGet).toHaveBeenCalledWith('/messages/unread/count');
            expect(result).toBe(5);
        });
    });

    describe('deleteMessage', () => {
        it('should delete a message', async () => {
            await service.deleteMessage(1);

            expect(mockApiClient.mockDelete).toHaveBeenCalledWith('/messages/1');
        });
    });
}); 