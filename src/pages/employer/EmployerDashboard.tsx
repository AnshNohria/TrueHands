import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import StakeManagement from './StakeManagement';
import WorkerManagement from './WorkerManagement';
import WorkRecords from './WorkRecords';
import ComplianceMetrics from './ComplianceMetrics';
import DashboardHome from './DashboardHome';

function EmployerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/stake" element={<StakeManagement />} />
      <Route path="/workers" element={<WorkerManagement />} />
      <Route path="/work-records" element={<WorkRecords />} />
      <Route path="/compliance" element={<ComplianceMetrics />} />
    </Routes>
  );
}

export default EmployerDashboard;