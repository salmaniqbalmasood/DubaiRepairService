
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { 
  LayoutDashboard, Settings, Users, Wrench, MessageSquare, 
  BarChart3, Award, Image as ImageIcon, Mail, LogOut, Menu, X, Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = ({ children }) => {
  const { currentAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Company Settings', path: '/admin/company-settings', icon: Settings },
    { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { name: 'Team Members', path: '/admin/team-members', icon: Users },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Statistics', path: '/admin/statistics', icon: BarChart3 },
    { name: 'Certifications', path: '/admin/certifications', icon: Award },
    { name: 'Images', path: '/admin/images', icon: ImageIcon },
    { name: 'Contact Inquiries', path: '/admin/contact-inquiries', icon: Mail },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 w-64 flex-shrink-0">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white tracking-tight">Admin Panel</h2>
        <p className="text-xs text-slate-500 mt-1">DubaiRepairService</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-white font-medium' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
            {currentAdmin?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{currentAdmin?.email}</p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shadow-xl z-20">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative z-50 h-full shadow-2xl">
            <SidebarContent />
            <button 
              className="absolute top-4 -right-12 bg-slate-900 text-white p-2 rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-500 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800">
              {navItems.find(item => item.path === location.pathname)?.name || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">View Site</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
