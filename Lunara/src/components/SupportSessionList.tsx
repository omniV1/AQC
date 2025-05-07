import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supportSessionService } from '../services/supportSessionService';
import { SupportSession, SupportSessionStatus, ApprovalStatus, SupportSessionType } from '../types/models';
import { useAuth } from '../hooks/useAuth';

interface SupportSessionListProps {
  role: 'provider' | 'client';
  onSessionUpdate?: () => void;
}

export const SupportSessionList: React.FC<SupportSessionListProps> = ({ role, onSessionUpdate }) => {
  const [sessions, setSessions] = useState<SupportSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<SupportSessionStatus | 'ALL'>('ALL');
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await (role === 'provider' 
        ? supportSessionService.getProviderSessions(user.id)
        : supportSessionService.getClientSessions(user.id));
      setSessions(data);
    } catch (err) {
      setError('Failed to load support sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [user, role]);

  const handleStatusChange = async (sessionId: number, status: SupportSessionStatus) => {
    try {
      await supportSessionService.updateSessionStatus(sessionId, status);
      onSessionUpdate?.();
      await fetchSessions();
    } catch (err) {
      setError('Failed to update session status');
    }
  };

  const handleApprovalChange = async (sessionId: number, approvalStatus: ApprovalStatus) => {
    try {
      await supportSessionService.updateApprovalStatus(sessionId, approvalStatus);
      onSessionUpdate?.();
      await fetchSessions();
    } catch (err) {
      setError('Failed to update approval status');
    }
  };

  const filteredSessions = statusFilter === 'ALL'
    ? sessions
    : sessions.filter(session => session.status === statusFilter);

  if (loading) return <div className="text-center py-4">Loading sessions...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!sessions.length) return <div className="text-center py-4">No sessions found</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif text-brown-dark">Support Sessions</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as SupportSessionStatus | 'ALL')}
          className="p-2 border border-sage rounded"
        >
          <option value="ALL">All Sessions</option>
          {Object.values(SupportSessionStatus).map(status => (
            <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredSessions.map(session => (
          <div key={session.id} className="border border-sage rounded p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  {role === 'provider' 
                    ? `Client: ${session.client.name}`
                    : `Provider: ${session.provider.name}`}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(session.startTime), 'PPP p')} - {format(new Date(session.endTime), 'p')}
                </p>
                <p className="text-sm">Type: {session.sessionType.replace(/_/g, ' ')}</p>
                <p className="text-sm">Location: {session.location}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Status:</span>
                  <select
                    value={session.status}
                    onChange={(e) => handleStatusChange(session.id, e.target.value as SupportSessionStatus)}
                    className="text-sm p-1 border border-sage rounded"
                    disabled={role === 'client'}
                  >
                    {Object.values(SupportSessionStatus).map(status => (
                      <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
                {role === 'provider' && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Approval:</span>
                    <select
                      value={session.approvalStatus}
                      onChange={(e) => handleApprovalChange(session.id, e.target.value as ApprovalStatus)}
                      className="text-sm p-1 border border-sage rounded"
                    >
                      {Object.values(ApprovalStatus).map(status => (
                        <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            {session.notes && (
              <div className="text-sm">
                <strong>Notes:</strong> {session.notes}
              </div>
            )}
            {session.followUpNotes && (
              <div className="text-sm">
                <strong>Follow-up Notes:</strong> {session.followUpNotes}
              </div>
            )}
            {session.cancellationReason && (
              <div className="text-sm text-red-500">
                <strong>Cancellation Reason:</strong> {session.cancellationReason}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 