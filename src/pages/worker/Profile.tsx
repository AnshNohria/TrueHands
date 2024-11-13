
import { UserCircle, Mail, Phone, Briefcase } from 'lucide-react';
import { useUser } from '../../context/UserContext';

function Profile() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Worker Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <UserCircle className="h-16 w-16 text-gray-400" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">Worker ID: {user?.id}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">worker@example.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">+1 (555) 987-6543</span>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <span className="text-gray-600">Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
