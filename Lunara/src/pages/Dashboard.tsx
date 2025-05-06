import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.firstName}!</h1>
                <p className="mt-2 text-sm text-gray-700">
                  Your personal postpartum support dashboard
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Quick Actions Card */}
              <div className="bg-indigo-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Quick Actions</dt>
                        <dd className="flex items-baseline">
                          <div className="text-lg font-semibold text-gray-900">Schedule Appointment</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-100 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-indigo-700 hover:text-indigo-900">
                      Schedule Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments Card */}
              <div className="bg-pink-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                        <dd className="flex items-baseline">
                          <div className="text-lg font-semibold text-gray-900">No upcoming appointments</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-pink-100 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-pink-700 hover:text-pink-900">
                      View Calendar
                    </button>
                  </div>
                </div>
              </div>

              {/* Daily Check-in Card */}
              <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Daily Check-in</dt>
                        <dd className="flex items-baseline">
                          <div className="text-lg font-semibold text-gray-900">Not completed today</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 px-5 py-3">
                  <div className="text-sm">
                    <button className="font-medium text-green-700 hover:text-green-900">
                      Complete Check-in
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Your Resources</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <p className="text-sm font-medium text-gray-900">Postpartum Care Guide</p>
                      <p className="text-sm text-gray-500 truncate">Essential tips and information</p>
                    </a>
                  </div>
                </div>
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <p className="text-sm font-medium text-gray-900">Feeding Resources</p>
                      <p className="text-sm text-gray-500 truncate">Breastfeeding and bottle feeding guides</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 