import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, UserCircle, LayoutDashboard, History } from 'lucide-react';
import { useUser } from '../context/UserContext';

function Navbar() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">WorkFlow</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              {user?.type === 'employer' ? (
                <>
                  <Link to="/employer" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${location.pathname.startsWith('/employer') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/worker" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${location.pathname.startsWith('/worker') ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'}`}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </>
              )}
              <Link to="/transactions" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/transactions' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600'}`}>
                <History className="h-4 w-4" />
                <span>Transactions</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-8 w-8 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}