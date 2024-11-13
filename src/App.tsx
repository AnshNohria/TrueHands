
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { UserProvider } from './context/UserContext';

// Employer Pages
import EmployerDashboard from './pages/employer/DashboardHome';
import EmployerProfile from './pages/employer/Profile';
import StakeManagement from './pages/employer/StakeManagement';
import WorkerManagement from './pages/employer/WorkerManagement';
import WorkRecords from './pages/employer/WorkRecords';
import ComplianceMetrics from './pages/employer/ComplianceMetrics';

// Worker Pages
import WorkerDashboard from './pages/worker/DashboardHome';
import WorkerProfile from './pages/worker/Profile';
import WorkHistory from './pages/worker/WorkHistory';
import EarningSummary from './pages/worker/EarningSummary';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Employer Routes */}
      <Route path="/employer" element={<Layout />}>
        <Route path="dashboard" element={<EmployerDashboard />} />
        <Route path="profile" element={<EmployerProfile />} />
        <Route path="stake" element={<StakeManagement />} />
        <Route path="workers" element={<WorkerManagement />} />
        <Route path="work-records" element={<WorkRecords />} />
        <Route path="compliance" element={<ComplianceMetrics />} />
      </Route>

      {/* Worker Routes */}
      <Route path="/worker" element={<Layout />}>
        <Route path="dashboard" element={<WorkerDashboard />} />
        <Route path="profile" element={<WorkerProfile />} />
        <Route path="history" element={<WorkHistory />} />
        <Route path="earnings" element={<EarningSummary />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
