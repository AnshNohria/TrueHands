import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';

function StakeManagement() {
  const { user } = useUser();
  const [amount, setAmount] = useState('');

  const handleDeposit = () => {
    // Implement deposit logic
    console.log('Deposit:', amount);
  };

  const handleWithdraw = () => {
    // Implement withdraw logic
    console.log('Withdraw:', amount);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Stake Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Current Balance</h2>
            <Wallet className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">${user?.balance}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Stake</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDeposit}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Deposit
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakeManagement;