import React from 'react';
import { BarChart2, TrendingUp, Clock, CheckCircle } from 'lucide-react';

function ComplianceMetrics() {
  const metrics = {
    completionRate: 95,
    onTimeDelivery: 98,
    qualityScore: 4.8,
    activeWorkers: 12
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Compliance Metrics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{metrics.completionRate}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{metrics.onTimeDelivery}%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">On-time Delivery</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{metrics.qualityScore}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Quality Score</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{metrics.activeWorkers}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Active Workers</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Trends</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart placeholder - Implement with your preferred charting library
        </div>
      </div>
    </div>
  );
}

export default ComplianceMetrics;