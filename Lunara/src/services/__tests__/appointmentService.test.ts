import { AppointmentService } from '../appointmentService';
import { MockApiClient, setupMockApiClient } from '../../tests/mocks/apiClientMock';
import { mockAppointment } from '../../tests/testUtils';
import { CreateAppointmentRequest, UpdateAvailabilityRequest } from '../../types/api';

jest.mock('../../api/apiClient');

describe('AppointmentService', () => {
    let service: AppointmentService;
    let mockApiClient: MockApiClient;

    beforeEach(() => {
        mockApiClient = setupMockApiClient();
        service = AppointmentService.getInstance();
        // @ts-ignore - Set the API client directly
        service.api = mockApiClient;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAppointment', () => {
        it('should create an appointment successfully', async () => {
            const request: CreateAppointmentRequest = {
                providerId: 2,
                startTime: '2024-01-01T10:00:00Z',
                endTime: '2024-01-01T11:00:00Z',
                type: 'VIRTUAL'
            };

            mockApiClient.mockPost.mockResolvedValueOnce(mockAppointment);

            const result = await service.createAppointment(request);

            expect(mockApiClient.mockPost).toHaveBeenCalledWith('/appointments', request);
            expect(result).toEqual(mockAppointment);
        });
    });

    describe('getAppointment', () => {
        it('should get appointment by ID with caching', async () => {
            mockApiClient.mockGet.mockResolvedValueOnce(mockAppointment);

            const result = await service.getAppointment(1);

            expect(mockApiClient.mockGet).toHaveBeenCalledWith(
                '/appointments/1',
                expect.any(Number)
            );
            expect(result).toEqual(mockAppointment);
        });
    });

    describe('updateAppointment', () => {
        it('should update appointment details', async () => {
            const updates = {
                notes: 'Updated notes'
            };

            mockApiClient.mockPut.mockResolvedValueOnce({ ...mockAppointment, ...updates });

            const result = await service.updateAppointment(1, updates);

            expect(mockApiClient.mockPut).toHaveBeenCalledWith('/appointments/1', updates);
            expect(result).toEqual({ ...mockAppointment, ...updates });
        });
    });

    describe('cancelAppointment', () => {
        it('should cancel an appointment with reason', async () => {
            const reason = 'Schedule conflict';

            await service.cancelAppointment(1, reason);

            expect(mockApiClient.mockPost).toHaveBeenCalledWith('/appointments/1/cancel', { reason });
        });
    });

    describe('getMyAppointments', () => {
        it('should get paginated list of user appointments', async () => {
            const params = { page: 1, pageSize: 10 };
            const mockResponse = {
                data: [mockAppointment],
                meta: {
                    currentPage: 1,
                    totalPages: 1,
                    pageSize: 10,
                    totalCount: 1
                }
            };

            mockApiClient.mockGet.mockResolvedValueOnce(mockResponse);

            const result = await service.getMyAppointments(params);

            expect(mockApiClient.mockGet).toHaveBeenCalledWith('/appointments/me?page=1&pageSize=10');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('checkAvailability', () => {
        it('should check provider availability for time slot', async () => {
            const mockResponse = { available: true };
            mockApiClient.mockGet.mockResolvedValueOnce(mockResponse);

            const result = await service.checkAvailability(
                2,
                '2024-01-01T10:00:00Z',
                '2024-01-01T11:00:00Z'
            );

            expect(mockApiClient.mockGet).toHaveBeenCalledWith(
                expect.stringContaining('/appointments/check-availability')
            );
            expect(result).toBe(true);
        });
    });

    describe('updateProviderAvailability', () => {
        it('should update provider availability settings', async () => {
            const availability: UpdateAvailabilityRequest = {
                dayOfWeek: 1,
                startTime: '09:00',
                endTime: '17:00',
                isAvailable: true
            };

            const mockResponse = {
                id: 1,
                providerId: 2,
                ...availability
            };

            mockApiClient.mockPut.mockResolvedValueOnce(mockResponse);

            const result = await service.updateProviderAvailability(2, availability);

            expect(mockApiClient.mockPut).toHaveBeenCalledWith(
                '/providers/2/availability',
                availability
            );
            expect(result).toEqual(mockResponse);
        });
    });
}); 