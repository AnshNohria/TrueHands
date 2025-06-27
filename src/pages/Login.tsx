import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '../hooks/useMetaMask';

const SUPPORTED_CHAIN_IDS = [1, 11155111]; // Mainnet and Sepolia

function Login() {
  const navigate = useNavigate();
  const { account, chainId, switchNetwork } = useMetaMask();
  const [role, setRole] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chainId && !SUPPORTED_CHAIN_IDS.includes(chainId)) {
      setError('Please connect to Ethereum Mainnet or Sepolia Testnet');
    } else {
      setError(null);
    }
  }, [chainId]);

  const handleLogin = async () => {
    if (!account) return;

    if (!SUPPORTED_CHAIN_IDS.includes(chainId!)) {
      try {
        await switchNetwork(SUPPORTED_CHAIN_IDS[0]);
      } catch {
        return;
      }
    }

    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'employer':
        navigate('/employer/dashboard');
        break;
      case 'worker':
        navigate('/worker/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Login to WorkFlow</h2>
        
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Connected Address</label>
            <div className="mt-1">
              <input
                type="text"
                value={account || 'Not Connected'}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Network</label>
            <div className="mt-1">
              <input
                type="text"
                value={chainId === 1 ? 'Ethereum Mainnet' : chainId === 11155111 ? 'Sepolia Testnet' : 'Unsupported Network'}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="employer">Employer</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          <button
            onClick={handleLogin}
            disabled={!account || !role || !SUPPORTED_CHAIN_IDS.includes(chainId!)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;