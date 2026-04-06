
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

// Public Pages
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

// Service Landing Pages
import WashingMachineRepairPage from './pages/WashingMachineRepairPage.jsx';
import RefrigeratorRepairPage from './pages/RefrigeratorRepairPage.jsx';
import AirConditionerRepairPage from './pages/AirConditionerRepairPage.jsx';
import OvenRepairPage from './pages/OvenRepairPage.jsx';
import OvenCooktopRepairPage from './pages/OvenCooktopRepairPage.jsx';
import WasherDryerRepairPage from './pages/WasherDryerRepairPage.jsx';
import WaterHeaterRepairPage from './pages/WaterHeaterRepairPage.jsx';
import PaintRenovationPage from './pages/PaintRenovationPage.jsx';

// Admin
import { AdminAuthProvider } from './contexts/AdminAuthContext.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <AdminAuthProvider>
            <Routes>
              
            </Routes>
          </AdminAuthProvider>
          <Toaster />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
