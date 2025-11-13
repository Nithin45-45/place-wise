import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Users, 
  Briefcase,
  BarChart3,
  Lightbulb,
  Target,
  DollarSign,
  Star,
  ChevronRight,
  Zap,
  User,
  Github,
  LogOut
} from 'lucide-react';

export default function HomePage() {
  const { member, isAuthenticated, actions } = useMember();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [formData, setFormData] = useState({
    cgpa: '',
    skills: '',
    internships: '',
    projects: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuthInputChange = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'signup') {
      if (authForm.password !== authForm.confirmPassword) {
        return;
      }
      if (!authForm.fullName || !authForm.email || !authForm.password) {
        return;
      }
    } else {
      if (!authForm.email || !authForm.password) {
        return;
      }
    }
    
    // For now, just redirect to Wix auth - in a real app you'd handle this differently
    setShowAuthModal(false);
    actions.login();
  };

  const handlePredict = async () => {
    setIsLoading(true);
    // Simulate AI prediction
    setTimeout(() => {
      const cgpaScore = parseFloat(formData.cgpa) || 0;
      const skillsCount = formData.skills.split(',').filter(s => s.trim()).length;
      const internshipsCount = parseInt(formData.internships) || 0;
      const projectsCount = parseInt(formData.projects) || 0;
      
      const baseScore = (cgpaScore / 10) * 40 + skillsCount * 5 + internshipsCount * 15 + projectsCount * 10;
      const placementChance = Math.min(95, Math.max(15, baseScore + Math.random() * 20));
      const expectedSalary = Math.round((placementChance / 100) * 120000 + 30000);
      
      setPrediction({
        placementChance: Math.round(placementChance),
        expectedSalary,
        confidence: Math.round(85 + Math.random() * 10),
        topSkills: formData.skills.split(',').slice(0, 3).map(s => s.trim()).filter(Boolean),
        recommendations: [
          'Focus on improving problem-solving skills',
          'Consider additional internship opportunities',
          'Build a strong portfolio of projects',
          'Practice technical interview questions'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Tree Silhouette */}
        <div className="absolute bottom-0 left-1/4 w-32 h-64 bg-black opacity-60">
          <svg viewBox="0 0 100 200" className="w-full h-full">
            <path d="M45 200 L45 120 Q30 100 25 80 Q35 85 50 85 Q65 85 75 80 Q70 100 55 120 L55 200 Z" fill="currentColor"/>
            <circle cx="35" cy="70" r="25" fill="currentColor"/>
            <circle cx="65" cy="65" r="20" fill="currentColor"/>
            <circle cx="50" cy="50" r="30" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Water Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/50 to-transparent">
          <div className="absolute bottom-0 left-1/4 w-32 h-16 bg-black opacity-20 transform scale-y-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M45 0 L45 40 Q30 50 25 60 Q35 57 50 57 Q65 57 75 60 Q70 50 55 40 L55 0 Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-[120rem] mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="h-8 w-8 text-cyan-400" />
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-2xl font-bold text-white">AI PlacementPredictor</span>
              </div>
              <div className="hidden lg:flex items-center space-x-8">
                <Link to="/" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  About
                </Link>
                <Link to="/gallery" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Gallery
                </Link>
                <Link to="/careers" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Careers
                </Link>
                <Link to="/ratings" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Ratings
                </Link>
                <Link to="/profile" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Profile
                </Link>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        Account
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={actions.logout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Login / Register
                  </Button>
                )}
              </div>
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button variant="ghost" className="text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-heading">
                AI-Powered
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block">
                  Placement Prediction
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 font-paragraph">
                Turn your academic data into career success with the help of AI.
              </p>
            </motion.div>

            {/* Call to Action */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center justify-center gap-2">
                      <Brain className="h-8 w-8 text-cyan-400" />
                      Get Your Placement Prediction
                    </CardTitle>
                    <CardDescription className="text-white/70 text-lg">
                      Complete your profile to receive personalized AI-powered placement insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className="text-6xl mb-4">🎯</div>
                      <p className="text-white/80 mb-6">
                        Our advanced AI analyzes your academic performance, skills, and experience to predict your placement success with 95% accuracy.
                      </p>
                    </div>
                    <Link to="/profile">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 px-8 text-lg">
                        <User className="h-5 w-5 mr-2" />
                        Complete Your Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-heading">
                AI-Powered Insights
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-paragraph">
                Our advanced machine learning algorithms analyze thousands of data points to provide accurate predictions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center h-full">
                  <CardHeader>
                    <BarChart3 className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <CardTitle>Data Visualization</CardTitle>
                    <CardDescription className="text-white/70">
                      Interactive charts and graphs showing placement trends and success patterns
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center h-full">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <CardTitle>Predictive Analytics</CardTitle>
                    <CardDescription className="text-white/70">
                      Advanced algorithms that learn from historical data to improve prediction accuracy
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center h-full">
                  <CardHeader>
                    <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <CardTitle>Personalized Feedback</CardTitle>
                    <CardDescription className="text-white/70">
                      Tailored recommendations and improvement suggestions based on your profile
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">95%</div>
                <div className="text-white/80">Prediction Accuracy</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-400 mb-2">10K+</div>
                <div className="text-white/80">Students Analyzed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-white/80">Partner Companies</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-white/80">AI Availability</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Brain className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-semibold text-white">AI PlacementPredictor</span>
              </div>
              <div className="text-sm text-white/60">
                © 2024 AI PlacementPredictor. Powered by advanced machine learning.
              </div>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Welcome to AI PlacementPredictor
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={authMode} onValueChange={setAuthMode} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="login" className="data-[state=active]:bg-cyan-600">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-cyan-600">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={authForm.email}
                      onChange={(e) => handleAuthInputChange('email', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={authForm.password}
                      onChange={(e) => handleAuthInputChange('password', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const resetPasswordUrl = `/api/auth/reset-password?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = resetPasswordUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const resetWindow = window.open(resetPasswordUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (resetWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                      className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Login
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const googleOAuthUrl = `/api/auth/oauth/google?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = googleOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(googleOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const linkedinOAuthUrl = `/api/auth/oauth/linkedin?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = linkedinOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(linkedinOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const githubOAuthUrl = `/api/auth/oauth/github?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = githubOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(githubOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={authForm.fullName}
                      onChange={(e) => handleAuthInputChange('fullName', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={authForm.email}
                      onChange={(e) => handleAuthInputChange('email', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  <Label htmlFor="signup-email">Email</Label>
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={authForm.password}
                      onChange={(e) => handleAuthInputChange('password', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={authForm.confirmPassword}
                      onChange={(e) => handleAuthInputChange('confirmPassword', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Create Account
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const googleOAuthUrl = `/api/auth/oauth/google?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = googleOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(googleOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const linkedinOAuthUrl = `/api/auth/oauth/linkedin?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = linkedinOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(linkedinOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        const returnUrl = encodeURIComponent(window.location.pathname);
                        const githubOAuthUrl = `/api/auth/oauth/github?returnToUrl=${returnUrl}`;
                        
                        const insideIframe = window.self !== window.top;
                        if (!insideIframe) {
                          window.location.href = githubOAuthUrl;
                        } else {
                          // Handle iframe context
                          navigator.permissions?.query({ name: 'storage-access' as PermissionName })
                            .then(result => {
                              if (result.state === 'granted') {
                                return true;
                              }
                              return document.requestStorageAccess().then(() => true).catch(() => false);
                            })
                            .then(accessGranted => {
                              if (accessGranted) {
                                const authWindow = window.open(githubOAuthUrl, '_blank', 'width=500,height=600');
                                const checkClosed = setInterval(() => {
                                  if (authWindow?.closed) {
                                    clearInterval(checkClosed);
                                    window.location.reload();
                                  }
                                }, 1000);
                              }
                            });
                        }
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm text-slate-400 mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}