import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function TransactionTracker() {
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 1000,
      date: '2024-03-10',
      status: 'completed',
      description: 'Stake deposit'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 500,
      date: '2024-03-09',
      status: 'completed',
      description: 'Worker payment'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {transaction.type === 'deposit' ? (
                    <div className="p-2 bg-green-100 rounded-full">
                      <ArrowDownRight className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-red-100 rounded-full">
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}