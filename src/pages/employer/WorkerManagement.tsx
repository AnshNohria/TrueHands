import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

interface Worker {
  address: string;
  name: string;
  position: string;
  qualifications: string;
  startDate: number;
  endDate: number;
  isActive: boolean;
  complianceScore?: number;
}

export default function WorkerManagement() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading] = useState(false);

  const [newWorker, setNewWorker] = useState({
    address: '',
    name: '',
    position: '',
    qualifications: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  // Mock data for demo
  useEffect(() => {
    // Simulate loading workers
    setWorkers([
      {
        address: '0x742d35cc6734052532d93f642f64180aa7',
        name: 'John Doe',
        position: 'Construction Worker',
        qualifications: 'Safety certified, 5 years experience',
        startDate: Math.floor(new Date('2024-01-15').getTime() / 1000),
        endDate: 0,
        isActive: true,
        complianceScore: 92
      },
      {
        address: '0x853c24e8c734c8523d93f642f64180bb8',
        name: 'Jane Smith',
        position: 'Site Manager',
        qualifications: 'Project management, construction engineering',
        startDate: Math.floor(new Date('2024-02-01').getTime() / 1000),
        endDate: 0,
        isActive: true,
        complianceScore: 88
      }
    ]);
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // For demo, just add to local state
      const newWorkerData: Worker = {
        address: newWorker.address,
        name: newWorker.name,
        position: newWorker.position,
        qualifications: newWorker.qualifications,
        startDate: Math.floor(new Date(newWorker.startDate).getTime() / 1000),
        endDate: 0,
        isActive: true,
        complianceScore: 100
      };

      setWorkers(prev => [...prev, newWorkerData]);
      setShowAddWorker(false);
      setNewWorker({
        address: '',
        name: '',
        position: '',
        qualifications: '',
        startDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error registering worker:', error);
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getComplianceColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceIcon = (score?: number) => {
    if (!score) return AlertCircle;
    if (score >= 90) return CheckCircle;
    return AlertCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Worker Management</h1>
          <p className="text-gray-600 mt-2">Manage your workforce and track compliance</p>
        </div>
        <button
          onClick={() => setShowAddWorker(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Worker
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => {
            const ComplianceIcon = getComplianceIcon(worker.complianceScore);
            return (
              <div key={worker.address} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
                    <p className="text-gray-600">{worker.position}</p>
                  </div>
                  <div className={`flex items-center ${getComplianceColor(worker.complianceScore)}`}>
                    <ComplianceIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">
                      {worker.complianceScore ? `${worker.complianceScore}%` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Address:</span>
                    <span className="ml-2 font-mono text-xs">
                      {worker.address.slice(0, 6)}...{worker.address.slice(-4)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Qualifications:</span>
                    <span className="ml-2">{worker.qualifications}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Started: {new Date(worker.startDate * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className={worker.isActive ? 'text-green-600' : 'text-red-600'}>
                      {worker.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white p-12 rounded-lg shadow-sm text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'No workers match your search.' : 'Start by adding your first worker.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddWorker(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Worker
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Worker Modal */}
      {showAddWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Worker</h2>
            
            <form onSubmit={handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Address
                </label>
                <input
                  type="text"
                  required
                  value={newWorker.address}
                  onChange={(e) => setNewWorker({ ...newWorker, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newWorker.name}
                  onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  required
                  value={newWorker.position}
                  onChange={(e) => setNewWorker({ ...newWorker, position: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Software Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications
                </label>
                <textarea
                  required
                  value={newWorker.qualifications}
                  onChange={(e) => setNewWorker({ ...newWorker, qualifications: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bachelor's in Computer Science, 3 years experience..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={newWorker.startDate}
                  onChange={(e) => setNewWorker({ ...newWorker, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddWorker(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Worker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
