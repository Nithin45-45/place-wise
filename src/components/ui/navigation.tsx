import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { Brain, Sparkles, LogOut } from 'lucide-react';

interface NavigationProps {
  onAuthModalOpen?: () => void;
  className?: string;
}

export function Navigation({ onAuthModalOpen, className = "" }: NavigationProps) {
  const { member, isAuthenticated, actions } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/careers', label: 'Careers' },
    { path: '/ratings', label: 'Ratings' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className={`bg-black/20 backdrop-blur-md border-b border-white/10 ${className}`}>
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-cyan-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-white">AI PlacementPredictor</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to={link.path} 
                  className={`transition-colors font-medium ${
                    isActive(link.path) 
                      ? 'text-cyan-400' 
                      : 'text-white/90 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Account
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={actions.logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  onClick={onAuthModalOpen}
                >
                  Login / Register
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`transition-colors font-medium px-2 py-1 ${
                    isActive(link.path) 
                      ? 'text-cyan-400' 
                      : 'text-white/90 hover:text-cyan-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    actions.logout();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white w-full mt-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white w-full mt-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onAuthModalOpen?.();
                  }}
                >
                  Login / Register
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}