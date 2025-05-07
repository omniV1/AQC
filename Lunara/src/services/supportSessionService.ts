import axios from 'axios';
import { SupportSession, SupportSessionStatus, ApprovalStatus, SupportSessionType } from '../types/models';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const supportSessionService = {
    // Get all sessions
    getAllSessions: async (): Promise<SupportSession[]> => {
        const response = await axios.get(`${API_URL}/support-sessions`);
        return response.data;
    },

    // Get sessions by client ID
    getClientSessions: async (clientId: number): Promise<SupportSession[]> => {
        const response = await axios.get(`${API_URL}/support-sessions/client/${clientId}`);
        return response.data;
    },

    // Get sessions by provider ID
    getProviderSessions: async (providerId: number): Promise<SupportSession[]> => {
        const response = await axios.get(`${API_URL}/support-sessions/provider/${providerId}`);
        return response.data;
    },

    // Create a new session
    createSession: async (sessionData: {
        clientId: number;
        providerId: number;
        startTime: string;
        endTime: string;
        sessionType: SupportSessionType;
        notes?: string;
        location: string;
    }): Promise<SupportSession> => {
        const response = await axios.post(`${API_URL}/support-sessions`, sessionData);
        return response.data;
    },

    // Update a session
    updateSession: async (
        sessionId: number,
        updateData: Partial<{
            startTime: string;
            endTime: string;
            status: SupportSessionStatus;
            approvalStatus: ApprovalStatus;
            notes: string;
            followUpNotes: string;
            cancellationReason: string;
            location: string;
        }>
    ): Promise<SupportSession> => {
        const response = await axios.put(`${API_URL}/support-sessions/${sessionId}`, updateData);
        return response.data;
    },

    // Delete a session
    deleteSession: async (sessionId: number): Promise<void> => {
        await axios.delete(`${API_URL}/support-sessions/${sessionId}`);
    },

    // Update session status
    updateSessionStatus: async (
        sessionId: number,
        status: SupportSessionStatus
    ): Promise<SupportSession> => {
        const response = await axios.put(`${API_URL}/support-sessions/${sessionId}/status`, { status });
        return response.data;
    },

    // Update approval status
    updateApprovalStatus: async (
        sessionId: number,
        approvalStatus: ApprovalStatus
    ): Promise<SupportSession> => {
        const response = await axios.put(`${API_URL}/support-sessions/${sessionId}/approval`, { approvalStatus });
        return response.data;
    }
}; 