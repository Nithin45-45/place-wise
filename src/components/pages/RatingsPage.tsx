import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/ui/back-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Star,
  ThumbsUp,
  MessageSquare,
  Filter,
  TrendingUp,
  Award,
  Users,
  Calendar,
  LogOut,
  Github,
  Plus,
  Send
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function RatingsPage() {
  const { member, isAuthenticated, actions } = useMember();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingForm, setRatingForm] = useState({
    title: '',
    content: '',
    rating: 0,
    name: '',
    role: '',
    company: ''
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthInputChange = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRatingInputChange = (field, value) => {
    setRatingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    
    if (!userRating || !ratingForm.title || !ratingForm.content || !ratingForm.name) {
      alert('Please fill in all required fields and select a rating');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        name: ratingForm.name,
        role: ratingForm.role || 'Student',
        company: ratingForm.company || 'Recent Graduate',
        rating: userRating,
        title: ratingForm.title,
        content: ratingForm.content,
        date: new Date().toISOString(),
        verified: true,
        helpful: 0
      };
      
      setReviews(prev => [newReview, ...prev]);
      
      // Reset form
      setRatingForm({
        title: '',
        content: '',
        rating: 0,
        name: '',
        role: '',
        company: ''
      });
      setUserRating(0);
      setHoverRating(0);
      setShowRatingModal(false);
      setIsSubmitting(false);
      
      alert('Thank you for your review! It has been submitted successfully.');
    }, 1500);
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

  const filters = [
    { id: 'all', name: 'All Reviews', count: reviews.length },
    { id: '5star', name: '5 Stars', count: reviews.filter(r => r.rating === 5).length },
    { id: '4star', name: '4 Stars', count: reviews.filter(r => r.rating === 4).length },
    { id: '3star', name: '3 Stars', count: reviews.filter(r => r.rating === 3).length },
    { id: 'recent', name: 'Recent', count: reviews.slice(0, 3).length }
  ];

  const overallStats = {
    averageRating: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0,
    totalReviews: reviews.length,
    ratingDistribution: {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    },
    successRate: 95,
    satisfactionRate: 98
  };

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : selectedFilter === 'recent'
    ? reviews.slice(0, 3)
    : reviews.filter(review => 
        selectedFilter === '5star' ? review.rating === 5 :
        selectedFilter === '4star' ? review.rating === 4 :
        selectedFilter === '3star' ? review.rating === 3 : true
      );

  const renderStars = (rating, interactive = false, size = 'h-4 w-4') => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${size} cursor-pointer transition-colors ${
          i < (interactive ? (hoverRating || userRating) : rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
        onClick={interactive ? () => handleStarClick(i + 1) : undefined}
        onMouseEnter={interactive ? () => handleStarHover(i + 1) : undefined}
        onMouseLeave={interactive ? handleStarLeave : undefined}
      />
    ));
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
                  <Link to="/gallery" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Gallery
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/careers" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                    Careers
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/ratings" className="text-cyan-400 font-medium">
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
                Student
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block">
                  Reviews & Ratings
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 font-paragraph">
                See what students are saying about their AI-powered career prediction experience and success stories.
              </p>
              <Button 
                onClick={() => setShowRatingModal(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Write a Review
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Overall Stats Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Rating Overview */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center gap-3">
                      <Star className="h-8 w-8 text-yellow-400 fill-current" />
                      Overall Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl font-bold text-yellow-400">
                        {overallStats.averageRating || '-'}
                      </div>
                      <div>
                        <div className="flex gap-1 mb-2">
                          {renderStars(Math.round(Number(overallStats.averageRating)))}
                        </div>
                        <div className="text-white/70">
                          Based on {overallStats.totalReviews} reviews
                        </div>
                      </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-16">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>
                          <Progress 
                            value={overallStats.totalReviews > 0 ? (overallStats.ratingDistribution[rating] / overallStats.totalReviews) * 100 : 0} 
                            className="flex-1 h-2 bg-white/20"
                          />
                          <span className="text-sm text-white/70 w-8">
                            {overallStats.ratingDistribution[rating]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Success Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">{overallStats.successRate}%</CardTitle>
                    <CardDescription className="text-white/70">Success Rate</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">{overallStats.satisfactionRate}%</CardTitle>
                    <CardDescription className="text-white/70">Satisfaction Rate</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">{overallStats.totalReviews + 1200}</CardTitle>
                    <CardDescription className="text-white/70">Students Helped</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">{overallStats.totalReviews}</CardTitle>
                    <CardDescription className="text-white/70">Total Reviews</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-10 px-6 bg-black/10 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`${
                    selectedFilter === filter.id
                      ? "bg-cyan-500 text-white"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filter.name} ({filter.count})
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center py-20"
              >
                <MessageSquare className="h-24 w-24 text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white/80 mb-4">
                  No reviews yet
                </h3>
                <p className="text-white/60 mb-8">
                  Be the first to share your experience with our AI placement prediction system!
                </p>
                <Button 
                  onClick={() => setShowRatingModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Write the First Review
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-lg">{review.name}</CardTitle>
                                {review.verified && (
                                  <Badge className="bg-green-500 text-white text-xs">Verified</Badge>
                                )}
                              </div>
                              <div className="text-sm text-cyan-400">{review.role}</div>
                              <div className="text-sm text-white/60">Now at {review.company}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-1 mb-1">
                              {renderStars(review.rating)}
                            </div>
                            <div className="text-sm text-white/60 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <h3 className="text-xl font-semibold text-white mb-3">{review.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{review.content}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Helpful ({review.helpful})
                          </Button>
                          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-heading">
                Ready to Join Our Success Stories?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-paragraph">
                Experience the power of AI-driven career prediction and join thousands of successful students.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3">
                <Link to="/">Start Your Prediction</Link>
              </Button>
            </motion.div>
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
      </div>

      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cyan-400">
              Share Your Experience
            </DialogTitle>
            <p className="text-slate-300">
              Help other students by sharing your experience with our AI placement prediction system
            </p>
          </DialogHeader>
          
          <form onSubmit={handleRatingSubmit} className="space-y-6 mt-6">
            {/* Rating Stars */}
            <div>
              <Label className="text-white text-lg font-semibold mb-3 block">
                Overall Rating *
              </Label>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(userRating, true, 'h-8 w-8')}
              </div>
              <p className="text-sm text-white/60">
                {userRating === 0 && "Click to rate"}
                {userRating === 1 && "Poor - Not satisfied"}
                {userRating === 2 && "Fair - Below expectations"}
                {userRating === 3 && "Good - Met expectations"}
                {userRating === 4 && "Very Good - Exceeded expectations"}
                {userRating === 5 && "Excellent - Outstanding experience"}
              </p>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewName" className="text-white">Your Name *</Label>
                <Input
                  id="reviewName"
                  type="text"
                  value={ratingForm.name}
                  onChange={(e) => handleRatingInputChange('name', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="reviewRole" className="text-white">Your Role</Label>
                <Input
                  id="reviewRole"
                  type="text"
                  value={ratingForm.role}
                  onChange={(e) => handleRatingInputChange('role', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="e.g., Student, Graduate"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reviewCompany" className="text-white">Current Company/Status</Label>
              <Input
                id="reviewCompany"
                type="text"
                value={ratingForm.company}
                onChange={(e) => handleRatingInputChange('company', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="e.g., TCS, Infosys, Job Seeker"
              />
            </div>

            {/* Review Content */}
            <div>
              <Label htmlFor="reviewTitle" className="text-white">Review Title *</Label>
              <Input
                id="reviewTitle"
                type="text"
                value={ratingForm.title}
                onChange={(e) => handleRatingInputChange('title', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="Summarize your experience in one line"
                required
              />
            </div>

            <div>
              <Label htmlFor="reviewContent" className="text-white">Your Review *</Label>
              <Textarea
                id="reviewContent"
                value={ratingForm.content}
                onChange={(e) => handleRatingInputChange('content', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white min-h-[120px]"
                placeholder="Share your detailed experience with our AI placement prediction system. How did it help you? What did you like most? Any suggestions for improvement?"
                required
              />
            </div>

            {/* Guidelines */}
            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">Review Guidelines:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Be honest and specific about your experience</li>
                <li>• Mention how the prediction accuracy helped your career</li>
                <li>• Include any challenges you faced and how they were resolved</li>
                <li>• Keep your review professional and constructive</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRatingModal(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Submitting...
                  </motion.div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}