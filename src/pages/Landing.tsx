import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '../hooks/useMetaMask';

function Landing() {
  const navigate = useNavigate();
  const { connectWallet, isConnected, error } = useMetaMask();

  const handleConnect = async () => {
    if (!isConnected) {
      await connectWallet();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">WorkFlow</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleConnect}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                {isConnected ? 'Connected' : 'Connect MetaMask'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Decentralized Workforce Management
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Secure, transparent, and efficient platform for managing your workforce using blockchain technology.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={handleConnect}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started with MetaMask
              </button>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">For Employers</h3>
            <p className="text-gray-600">Manage your workforce efficiently with transparent payment systems and performance tracking.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">For Workers</h3>
            <p className="text-gray-600">Access secure payment systems, track your work history, and manage your earnings transparently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Powered</h3>
            <p className="text-gray-600">Built on blockchain technology ensuring security, transparency, and immutability of records.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;