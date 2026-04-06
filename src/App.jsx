
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


function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Service Landing Pages */}
              <Route path="/services/washing-machine-repair" element={<WashingMachineRepairPage />} />
              <Route path="/services/refrigerator-repair" element={<RefrigeratorRepairPage />} />
              <Route path="/services/air-conditioner-repair" element={<AirConditionerRepairPage />} />
              <Route path="/services/oven-repair" element={<OvenRepairPage />} />
              <Route path="/services/oven-cooktop-repair" element={<OvenCooktopRepairPage />} />
              <Route path="/services/washer-dryer-repair" element={<WasherDryerRepairPage />} />
              <Route path="/services/water-heater-repair" element={<WaterHeaterRepairPage />} />
              <Route path="/services/paint-renovation" element={<PaintRenovationPage />} />

  
              
            </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
