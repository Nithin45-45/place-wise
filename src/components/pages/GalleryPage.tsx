import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/back-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { 
  Brain, 
  Sparkles, 
  Filter,
  Search,
  Calendar,
  MapPin,
  Users,
  Award,
  LogOut,
  Github
} from 'lucide-react';

export default function GalleryPage() {
  const { member, isAuthenticated, actions } = useMember();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

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
    
    setShowAuthModal(false);
    actions.login();
  };

  // Auto-scrolling slider data for placement photos, events, and success stories
  const sliderItems = [
    {
      id: 1,
      image: 'https://static.wixstatic.com/media/52cebc_770f9f479d824533a63ac55dbd04438b~mv2.png?originWidth=640&originHeight=448',
      caption: 'Our Achievers — Students Who Got Placed with AI Insights',
      type: 'placement'
    },
    {
      id: 2,
      image: 'https://static.wixstatic.com/media/52cebc_b313fa9027324c928d060e52f7595b3f~mv2.png?originWidth=640&originHeight=448',
      caption: 'AI Career Summit 2024 — Connecting Future Tech Leaders',
      type: 'event'
    },
    {
      id: 3,
      image: 'https://static.wixstatic.com/media/52cebc_40c247e95686466fb4dcba99d65cc464~mv2.png?originWidth=640&originHeight=448',
      caption: 'Success Story — From Campus to Silicon Valley',
      type: 'success'
    },
    {
      id: 4,
      image: 'https://static.wixstatic.com/media/52cebc_b18126af61894c1b94e5437d01f0cbce~mv2.png?originWidth=640&originHeight=448',
      caption: 'Our Achievers — 0% Placement Rate Through AI Predictions',
      type: 'placement'
    },
    {
      id: 5,
      image: 'https://static.wixstatic.com/media/52cebc_8339e63f2a154e08a9a9abcecd07b276~mv2.png?originWidth=640&originHeight=448',
      caption: 'Machine Learning Workshop — Building Tomorrow\'s Careers',
      type: 'event'
    },
    {
      id: 6,
      image: 'https://static.wixstatic.com/media/52cebc_cf743f20154444df97bb90ec5df24881~mv2.png?originWidth=640&originHeight=448',
      caption: 'Success Story — AI-Powered Career Transformation',
      type: 'success'
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sliderItems.length]);

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'events', name: 'Events', count: 8 },
    { id: 'success', name: 'Success Stories', count: 6 },
    { id: 'workshops', name: 'Workshops', count: 5 },
    { id: 'awards', name: 'Awards', count: 5 }
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'AI Career Summit 2024',
      category: 'events',
      date: '2024-03-15',
      location: 'Tech Convention Center',
      attendees: 500,
      image: 'https://static.wixstatic.com/media/52cebc_b6a031dd65754b34b02722646314fee0~mv2.png?originWidth=384&originHeight=192',
      description: 'Annual summit bringing together industry leaders and students for career guidance.'
    },
    {
      id: 2,
      title: 'Student Success Celebration',
      category: 'success',
      date: '2024-02-28',
      location: 'University Auditorium',
      attendees: 200,
      image: 'https://static.wixstatic.com/media/52cebc_f24d4adc32864047b522759acb046b13~mv2.png?originWidth=384&originHeight=192',
      description: 'Celebrating 0% placement success rate with our AI prediction platform.'
    },
    {
      id: 3,
      title: 'Machine Learning Workshop',
      category: 'workshops',
      date: '2024-01-20',
      location: 'Innovation Lab',
      attendees: 150,
      image: 'https://static.wixstatic.com/media/52cebc_1be379ed8290435486094a88a0fcbfd3~mv2.png?originWidth=384&originHeight=192',
      description: 'Hands-on workshop on machine learning applications in career prediction.'
    },
    {
      id: 4,
      title: 'Excellence in AI Award',
      category: 'awards',
      date: '2024-01-10',
      location: 'Tech Awards Ceremony',
      attendees: 300,
      image: 'https://static.wixstatic.com/media/52cebc_29a41a49da194a0ea3d2145eb3f00b2e~mv2.png?originWidth=384&originHeight=192',
      description: 'Recognized for outstanding innovation in AI-powered career guidance.'
    },
    {
      id: 5,
      title: 'Campus Recruitment Drive',
      category: 'events',
      date: '2023-12-15',
      location: 'Multiple Campuses',
      attendees: 1000,
      image: 'https://static.wixstatic.com/media/52cebc_3fda5a7946f7415082ea1d19975f5c40~mv2.png?originWidth=384&originHeight=192',
      description: 'Nationwide recruitment drive with top tech companies.'
    },
    {
      id: 6,
      title: 'Top Performer Recognition',
      category: 'success',
      date: '2023-11-30',
      location: 'Corporate Headquarters',
      attendees: 100,
      image: 'https://static.wixstatic.com/media/52cebc_f4b25c3089a04f708957ceac8131e89f~mv2.png?originWidth=384&originHeight=192',
      description: 'Honoring students who achieved exceptional placement outcomes.'
    },
    {
      id: 7,
      title: 'Data Science Bootcamp',
      category: 'workshops',
      date: '2023-10-25',
      location: 'Learning Center',
      attendees: 80,
      image: 'https://static.wixstatic.com/media/52cebc_c6c7e5c8da77497a824d58847c5c7be6~mv2.png?originWidth=384&originHeight=192',
      description: 'Intensive bootcamp covering data science fundamentals and applications.'
    },
    {
      id: 8,
      title: 'Innovation Excellence Award',
      category: 'awards',
      date: '2023-09-20',
      location: 'Innovation Summit',
      attendees: 250,
      image: 'https://static.wixstatic.com/media/52cebc_b283f89e78464caf8a94b8f550b3b3e7~mv2.png?originWidth=384&originHeight=192',
      description: 'Awarded for breakthrough innovations in predictive career analytics.'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/20 backdrop-blur-md border-b border-white/10"
        >
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Home
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/about" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    About
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/gallery" className="text-cyan-400 font-medium">
                    Gallery
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/careers" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Careers
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/ratings" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Ratings
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/profile" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Profile
                  </Link>
                </motion.div>
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
                      onClick={() => setShowAuthModal(true)}
                    >
                      Login / Register
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <BackButton className="mb-6 bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-heading">
                Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block">
                  Gallery
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 font-paragraph">
                Explore our journey of innovation, success stories, and memorable moments in AI-powered career guidance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Auto-Scrolling Slider Section */}
        <section className="py-16 px-6 bg-black/30 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                Our Journey in
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Pictures</span>
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto font-paragraph">
                Witness the moments that define our success in AI-powered career guidance
              </p>
            </motion.div>

            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
              <div className="relative h-96 md:h-[500px]">
                {sliderItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.caption}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 30 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          <Badge className={`mb-4 ${
                            item.type === 'placement' ? 'bg-green-500' :
                            item.type === 'event' ? 'bg-blue-500' :
                            'bg-purple-500'
                          } text-white`}>
                            {item.type === 'placement' ? 'Placement Success' :
                             item.type === 'event' ? 'Event Highlight' :
                             'Success Story'}
                          </Badge>
                          <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 font-heading leading-tight">
                            {item.caption}
                          </h3>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliderItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-cyan-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  key={currentSlide}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-10 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-cyan-500 text-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden h-full">
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={`${
                          item.category === 'events' ? 'bg-blue-500' :
                          item.category === 'success' ? 'bg-green-500' :
                          item.category === 'workshops' ? 'bg-purple-500' :
                          'bg-yellow-500'
                        } text-white`}>
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/70 mb-4 text-sm leading-relaxed">{item.description}</p>
                      
                      <div className="space-y-2 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {item.attendees} attendees
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="h-24 w-24 text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white/80 mb-4">
                  No items found
                </h3>
                <p className="text-white/60">
                  Try adjusting your filters or search terms.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">0</div>
                <div className="text-white/80">Events Hosted</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-400 mb-2">0</div>
                <div className="text-white/80">Success Stories</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-blue-400 mb-2">0</div>
                <div className="text-white/80">Awards Won</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-yellow-400 mb-2">0</div>
                <div className="text-white/80">Workshops Conducted</div>
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
                © 2026 AI PlacementPredictor. Powered by JBREC students.
              </div>
            </div>
          </div>
        </footer>

        {/* Professional Auth Modal */}
        <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
          <DialogContent className="sm:max-w-lg bg-white border-0 text-foreground shadow-2xl">
            <DialogHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Brain className="h-12 w-12 text-primary" />
                  <Sparkles className="h-6 w-6 text-brandaccent absolute -top-1 -right-1" />
                </div>
              </div>
              <DialogTitle className="text-3xl font-bold text-center font-heading text-foreground">
                Welcome to AI PlacementPredictor
              </DialogTitle>
              <p className="text-center text-muted-foreground font-paragraph">
                Sign in to access your personalized placement predictions
              </p>
            </DialogHeader>
            
            <Tabs value={authMode} onValueChange={setAuthMode} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-subtlebackground/50 h-12">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  Create Account
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-6 mt-8">
                <form onSubmit={handleAuthSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={authForm.email}
                      onChange={(e) => handleAuthInputChange('email', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={authForm.password}
                      onChange={(e) => handleAuthInputChange('password', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAuthModal(false);
                        actions.login();
                      }}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
                  >
                    Sign In to Your Account
                  </Button>
                </form>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 mt-8">
                <form onSubmit={handleAuthSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={authForm.fullName}
                      onChange={(e) => handleAuthInputChange('fullName', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={authForm.email}
                      onChange={(e) => handleAuthInputChange('email', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a secure password"
                      value={authForm.password}
                      onChange={(e) => handleAuthInputChange('password', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={authForm.confirmPassword}
                      onChange={(e) => handleAuthInputChange('confirmPassword', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  {authForm.password !== authForm.confirmPassword && authForm.confirmPassword && (
                    <p className="text-sm text-destructive">Passwords do not match</p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
                    disabled={authForm.password !== authForm.confirmPassword}
                  >
                    Create Your Account
                  </Button>
                </form>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setShowAuthModal(false);
                      actions.login();
                    }}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 font-medium">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 font-medium">
                Privacy Policy
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}