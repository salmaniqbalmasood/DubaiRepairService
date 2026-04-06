
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useAdminAuth } from '@/contexts/AdminAuthContext.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Wrench, MessageSquare, Mail, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const { currentAdmin } = useAdminAuth();
  const [stats, setStats] = useState({
    team: 0,
    services: 0,
    testimonials: 0,
    inquiries: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [team, services, testimonials, inquiries] = await Promise.all([
          pb.collection('team_members').getList(1, 1, { $autoCancel: false }),
          pb.collection('services').getList(1, 1, { $autoCancel: false }),
          pb.collection('testimonials').getList(1, 1, { $autoCancel: false }),
          pb.collection('contact_inquiries').getList(1, 1, { filter: 'is_read=false', $autoCancel: false })
        ]);
        
        setStats({
          team: team.totalItems,
          services: services.totalItems,
          testimonials: testimonials.totalItems,
          inquiries: inquiries.totalItems
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Team Members', value: stats.team, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', link: '/admin/team-members' },
    { title: 'Services', value: stats.services, icon: Wrench, color: 'text-emerald-600', bg: 'bg-emerald-100', link: '/admin/services' },
    { title: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-100', link: '/admin/testimonials' },
    { title: 'Unread Inquiries', value: stats.inquiries, icon: Mail, color: 'text-rose-600', bg: 'bg-rose-100', link: '/admin/contact-inquiries' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back!</h2>
        <p className="text-slate-500 mt-2">Here's an overview of your website's content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                </div>
                <h3 className="text-sm font-medium text-slate-500 mb-4">{stat.title}</h3>
                <Link to={stat.link} className="text-sm text-primary font-medium flex items-center hover:underline">
                  Manage <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
