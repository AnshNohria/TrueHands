import React from 'react';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';

function EarningSummary() {
  const earnings = {
    today: 120,
    week: 750,
    month: 2890,
    pending: 450
  };

  const recentPayments = [
    {
      id: '1',
      date: '2024-03-10',
      amount: 750,
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-03-03',
      amount: 680,
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Earnings Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${earnings.today}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Today's Earnings</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${earnings.week}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">This Week</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${earnings.month}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">${earnings.pending}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Payments</h2>
        <div className="space-y-4">
          {recentPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-4">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EarningSummary;