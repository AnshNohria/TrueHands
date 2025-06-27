import { Link } from 'react-router-dom';
import { Shield, Users, Award, TrendingUp, Wallet, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Landing() {
  const { connectWallet, isWalletConnected, walletAddress, loading } = useUser();

  const features = [
    {
      icon: Shield,
      title: "Labor Compliance Tracking",
      description: "Real-time monitoring of working hours, wages, and safety standards with blockchain verification."
    },
    {
      icon: Users,
      title: "Worker Registry",
      description: "Secure, decentralized registry for worker credentials and employment history."
    },
    {
      icon: Award,
      title: "EthiCoin Rewards",
      description: "Incentivize ethical practices with our native token rewards system."
    },
    {
      icon: TrendingUp,
      title: "Compliance Analytics",
      description: "Detailed metrics and reporting to improve workplace standards."
    }
  ];

  const stats = [
    { label: "Workers Protected", value: "10,000+" },
    { label: "Employers Verified", value: "500+" },
    { label: "Compliance Score", value: "95%" },
    { label: "EthiCoins Distributed", value: "1M+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">TrueHands</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isWalletConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">
                      {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                    </span>
                  </div>
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enter App
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Ethical Labor Management
              <span className="block text-blue-600">on the Blockchain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              TrueHands ensures fair labor practices through decentralized compliance tracking, 
              transparent wage payments, and incentivized ethical behavior.
            </p>
            
            {isWalletConnected ? (
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors"
              >
                Launch App
              </Link>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Wallet className="h-6 w-6 mr-3" />
                {loading ? 'Connecting...' : 'Get Started'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600">
              Blockchain technology meets labor rights protection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How TrueHands Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register & Stake</h3>
              <p className="text-gray-600">
                Employers register and stake EthiCoins to demonstrate commitment to fair labor practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Compliance</h3>
              <p className="text-gray-600">
                Smart contracts automatically monitor working hours, wages, and compliance metrics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Earn Rewards</h3>
              <p className="text-gray-600">
                Compliant employers earn EthiCoin rewards, while violations result in token burns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Labor Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the decentralized revolution in ethical labor practices. 
            Protect workers, reward compliance, and build a better future.
          </p>
          
          {isWalletConnected ? (
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Enter Application
            </Link>
          ) : (
            <button
              onClick={connectWallet}
              disabled={loading}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <Wallet className="h-6 w-6 mr-3" />
              {loading ? 'Connecting...' : 'Connect Wallet to Start'}
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold">TrueHands</span>
            </div>
            <p className="text-gray-400">
              © 2025 TrueHands. Building ethical labor standards on blockchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
