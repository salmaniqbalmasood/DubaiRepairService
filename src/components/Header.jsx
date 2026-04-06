import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Wrench, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import pb from '@/lib/pocketbaseClient';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const records = await pb.collection('images').getFullList({
          filter: 'filename ~ "logo" || description ~ "logo"',
          sort: '-created',
          $autoCancel: false
        });
        if (records.length > 0 && records[0].image_file) {
          setLogoUrl(pb.files.getUrl(records[0], records[0].image_file));
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    
    fetchLogo();
  }, []);

  const serviceLinks = [
    { name: 'Washing Machine Repair', path: '/services/washing-machine-repair' },
    { name: 'Refrigerator Repair', path: '/services/refrigerator-repair' },
    { name: 'Air Conditioner Repair', path: '/services/air-conditioner-repair' },
    { name: 'Electric/Gas Oven Repair', path: '/services/oven-repair' },
    { name: 'Oven & Cooktop Repair', path: '/services/oven-cooktop-repair' },
    { name: 'Washer/Dryer Repair', path: '/services/washer-dryer-repair' },
    { name: 'Water Heater Repair', path: '/services/water-heater-repair' },
    { name: 'Paint Work & Renovation', path: '/services/paint-renovation' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md shadow-sm border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 transition-all duration-200 hover:opacity-90 shrink-0 group">
            {logoUrl ? (
              <img src={logoUrl} alt="DubaiRepairService Logo" className="h-10 sm:h-12 w-auto object-contain rounded-xl shadow-sm bg-card p-1 border border-border" />
            ) : (
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary shadow-[0_0_15px_rgba(255,122,61,0.2)] shrink-0 group-hover:scale-105 transition-transform">
                <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            )}
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl font-extrabold leading-none tracking-tight text-white">
                DubaiRepair<span className="text-gradient-orange">Service</span>
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider mt-1">
                Expert Appliance Repair in Dubai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                location.pathname === '/' ? 'text-primary bg-card border border-border' : 'text-white/80 hover:text-primary hover:bg-card/50'
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg outline-none ${
                location.pathname.startsWith('/services') ? 'text-primary bg-card border border-border' : 'text-white/80 hover:text-primary hover:bg-card/50'
              }`}>
                Services <ChevronDown className="h-4 w-4 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-card border-border text-white p-2 shadow-xl rounded-xl">
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary focus:text-white rounded-lg mb-1">
                  <Link to="/services" className="font-bold w-full">All Services Overview</Link>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1 mx-2"></div>
                {serviceLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild className="cursor-pointer focus:bg-primary focus:text-white rounded-lg">
                    <Link to={link.path} className="w-full">{link.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  isActive(link.path)
                    ? 'text-primary bg-card border border-border'
                    : 'text-white/80 hover:text-primary hover:bg-card/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ms-4 border-s border-border ps-4">
              <Button asChild className="bg-primary text-white hover:bg-[#e55a2b] shadow-[0_4px_14px_rgba(255,122,61,0.25)] hover:shadow-[0_6px_20px_rgba(255,122,61,0.4)] transition-all duration-300 rounded-xl active:scale-[0.98]">
                <Link to="/contact">Book Repair</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-card hover:text-primary">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-l-border overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    {logoUrl ? (
                      <img src={logoUrl} alt="DubaiRepairService Logo" className="h-12 w-auto object-contain rounded-xl shadow-sm bg-card p-1 border border-border" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                        <Wrench className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xl font-extrabold text-white">
                        DubaiRepair<span className="text-gradient-orange">Service</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg ${
                        location.pathname === '/' ? 'text-primary bg-card border border-border' : 'text-white/80 hover:text-white hover:bg-card/50'
                      }`}
                    >
                      Home
                    </Link>

                    <div className="px-4 py-2 text-sm font-bold text-muted-foreground uppercase tracking-wider mt-2">Services</div>
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-border ml-4">
                      <Link
                        to="/services"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-bold text-white hover:text-primary transition-colors"
                      >
                        All Services Overview
                      </Link>
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                            location.pathname === link.path ? 'text-primary bg-card' : 'text-white/70 hover:text-white hover:bg-card/50'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>

                    
                    {navLinks.slice(1).map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg ${
                          isActive(link.path)
                            ? 'text-primary bg-card border border-border'
                            : 'text-white/80 hover:text-white hover:bg-card/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4 pb-8">
                    <Button asChild className="w-full bg-primary text-white hover:bg-[#e55a2b] shadow-md rounded-xl" size="lg">
                      <Link to="/contact" onClick={() => setIsOpen(false)}>Book Repair</Link>
                    </Button>
                    <a href="tel:+971525419624" className="text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                      Call: +971 52 541 9624
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;