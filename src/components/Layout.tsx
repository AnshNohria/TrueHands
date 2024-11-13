
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  DollarSign, 
  Users, 
  ClipboardList, 
  BarChart2,
  Clock,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useUser } from '../context/UserContext';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, switchRole } = useUser();
  const isEmployer = user?.role === 'employer';

  const handleRoleSwitch = () => {
    switchRole();
    navigate(isEmployer ? '/worker/dashboard' : '/employer/dashboard');
  };

  const employerNavItems = [
    { path: '/employer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/employer/profile', icon: UserCircle, label: 'Profile' },
    { path: '/employer/stake', icon: DollarSign, label: 'Stake' },
    { path: '/employer/workers', icon: Users, label: 'Workers' },
    { path: '/employer/work-records', icon: ClipboardList, label: 'Work Records' },
    { path: '/employer/compliance', icon: BarChart2, label: 'Compliance' },
  ];

  const workerNavItems = [
    { path: '/worker/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/worker/profile', icon: UserCircle, label: 'Profile' },
    { path: '/worker/history', icon: Clock, label: 'Work History' },
    { path: '/worker/earnings', icon: DollarSign, label: 'Earnings' },
  ];

  const navItems = isEmployer ? employerNavItems : workerNavItems;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
              <div className="flex items-center justify-between flex-shrink-0 px-4 mb-5">
                <span className="text-xl font-semibold">Work Platform</span>
                <button
                  onClick={handleRoleSwitch}
                  className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  title={`Switch to ${isEmployer ? 'Worker' : 'Employer'} View`}
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col flex-grow">
                <nav className="flex-1 px-2 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 flex-shrink-0 h-6 w-6 ${
                            isActive ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
