import React, { useState } from 'react';
import { User } from '../../types/user';

interface AnalyticsSummary {
  totalClients: number;
  activeClients: number;
  averageEngagement: number;
  completedMilestones: number;
  upcomingAppointments: number;
  messageResponseTime: number;
}

interface EngagementMetric {
  date: string;
  value: number;
}

interface AnalyticsInsightsProps {
  clients: User[];
}

export const AnalyticsInsights: React.FC<AnalyticsInsightsProps> = ({ clients }) => {
  const [summary] = useState<AnalyticsSummary>({
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'ACTIVE').length,
    averageEngagement: 85,
    completedMilestones: 24,
    upcomingAppointments: 8,
    messageResponseTime: 15,
  });

  const [engagementTrend] = useState<EngagementMetric[]>([
    { date: '2024-03-01', value: 75 },
    { date: '2024-03-02', value: 80 },
    { date: '2024-03-03', value: 85 },
    { date: '2024-03-04', value: 82 },
    { date: '2024-03-05', value: 88 },
  ]);

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  const StatCard = ({ title, value, description }: { title: string; value: number | string; description: string }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-warm-brown/10">
      <h3 className="text-lg font-medium text-warm-brown mb-2">{title}</h3>
      <p className="text-3xl font-serif text-sage mb-2">{value}</p>
      <p className="text-warm-brown/60 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-warm-brown mb-2">Analytics & Insights</h2>
          <p className="text-warm-brown/60">Track your practice performance and client engagement</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'quarter')}
          className="px-3 py-2 border border-warm-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-sage"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Clients"
          value={summary.totalClients}
          description="Total number of clients in your practice"
        />
        <StatCard
          title="Active Clients"
          value={summary.activeClients}
          description="Clients currently receiving support"
        />
        <StatCard
          title="Average Engagement"
          value={`${summary.averageEngagement}%`}
          description="Client engagement rate this period"
        />
        <StatCard
          title="Completed Milestones"
          value={summary.completedMilestones}
          description="Milestones achieved this period"
        />
        <StatCard
          title="Upcoming Appointments"
          value={summary.upcomingAppointments}
          description="Scheduled sessions in next 7 days"
        />
        <StatCard
          title="Response Time"
          value={`${summary.messageResponseTime}m`}
          description="Average message response time"
        />
      </div>

      {/* Engagement Trend */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-warm-brown/10">
        <h3 className="text-lg font-medium text-warm-brown mb-6">Engagement Trend</h3>
        <div className="h-64 flex items-end space-x-2">
          {engagementTrend.map((metric) => (
            <div key={metric.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-sage/20 rounded-t"
                style={{ height: `${metric.value}%` }}
              >
                <div
                  className="w-full bg-sage rounded-t transition-all duration-500"
                  style={{ height: `${metric.value}%` }}
                />
              </div>
              <p className="text-xs text-warm-brown/60 mt-2">
                {new Date(metric.date).toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Client Insights */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-warm-brown/10">
        <h3 className="text-lg font-medium text-warm-brown mb-4">Client Insights</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-cream/50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-brown">High Engagement</h4>
              <p className="text-warm-brown/60 text-sm">
                {Math.round(clients.length * 0.3)} clients showed increased engagement this week
              </p>
            </div>
            <span className="text-green-600">↑ 15%</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-cream/50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-brown">Support Needs</h4>
              <p className="text-warm-brown/60 text-sm">
                {Math.round(clients.length * 0.2)} clients may need additional support
              </p>
            </div>
            <span className="text-red-600">! Priority</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-cream/50 rounded-lg">
            <div>
              <h4 className="font-medium text-warm-brown">Milestone Progress</h4>
              <p className="text-warm-brown/60 text-sm">
                {Math.round(clients.length * 0.5)} clients on track with their journey
              </p>
            </div>
            <span className="text-sage">On Track</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 