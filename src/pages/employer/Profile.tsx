import React from 'react';
import { UserCircle, Mail, Phone, Building } from 'lucide-react';
import { useUser } from '../../context/UserContext';

function Profile() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Employer Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <UserCircle className="h-16 w-16 text-gray-400" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">Employer ID: {user?.id}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">employer@example.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Example Corporation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;