import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import WorkHistory from './WorkHistory';
import EarningSummary from './EarningSummary';
import DashboardHome from './DashboardHome';

function WorkerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<WorkHistory />} />
      <Route path="/earnings" element={<EarningSummary />} />
    </Routes>
  );
}