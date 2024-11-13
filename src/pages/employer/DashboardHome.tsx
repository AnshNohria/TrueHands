import React from 'react';
import { Activity, Users, DollarSign, Clock } from 'lucide-react';

function DashboardHome() {
  const stats = {
    activeWorkers: 12,
    totalStake: 25000,
    pendingTasks: 8,
    completedTasks: 45
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.activeWorkers}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Workers</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${stats.totalStake}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Stake</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.completedTasks}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Completed Tasks</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 py-3 border-b">
                <div className="flex-shrink-0">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    New work record submitted
                  </p>
                  <p className="text-sm text-gray-500">
                    Worker completed task #{item}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {item}h ago
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Worker Performance</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 py-3 border-b">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    Worker {item}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${85 + item * 5}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {85 + item * 5}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;