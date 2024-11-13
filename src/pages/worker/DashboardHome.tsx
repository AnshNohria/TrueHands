import React from 'react';
import { Clock, DollarSign, Award, Activity } from 'lucide-react';

function DashboardHome() {
  const stats = {
    hoursWorked: 156,
    earnings: 3240,
    completedTasks: 24,
    rating: 4.8
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.hoursWorked}h</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Hours Worked</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${stats.earnings}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats.rating}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Rating</h3>
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
                    Task #{item} completed
                  </p>
                  <p className="text-sm text-gray-500">
                    Frontend Development
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            {[
              { label: 'Task Completion', value: 95 },
              { label: 'On-time Delivery', value: 98 },
              { label: 'Client Satisfaction', value: 92 }
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">{metric.label}</span>
                  <span className="text-sm font-medium text-gray-900">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${metric.value}%` }}
                  ></div>
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