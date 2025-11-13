import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/ui/back-button';
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
  Calendar
} from 'lucide-react';

export default function RatingsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Reviews', count: '-' },
    { id: '5star', name: '5 Stars', count: '-' },
    { id: '4star', name: '4 Stars', count: '-' },
    { id: '3star', name: '3 Stars', count: '-' },
    { id: 'recent', name: 'Recent', count: '-' }
  ];

  const reviews = [];

  const overallStats = {
    averageRating: 4.8,
    totalReviews: 156,
    ratingDistribution: {
      5: 89,
      4: 45,
      3: 15,
      2: 5,
      1: 2
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
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
                <Link to="/ratings" className="text-cyan-400 font-medium">
                  Ratings
                </Link>
                <Link to="/profile" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Profile
                </Link>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Login / Register
                </Button>
              </div>
            </div>
          </div>
        </nav>

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
                        -
                      </div>
                      <div>
                        <div className="flex gap-1 mb-2">
                          {renderStars(0)}
                        </div>
                        <div className="text-white/70">
                          Based on - reviews
                        </div>
                      </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-16">
                            <span className="text-sm">-</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>
                          <Progress 
                            value={0} 
                            className="flex-1 h-2 bg-white/20"
                          />
                          <span className="text-sm text-white/70 w-8">
                            -
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
                    <CardTitle className="text-3xl">-%</CardTitle>
                    <CardDescription className="text-white/70">Success Rate</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">-%</CardTitle>
                    <CardDescription className="text-white/70">Satisfaction Rate</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">-</CardTitle>
                    <CardDescription className="text-white/70">Students Helped</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <MessageSquare className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <CardTitle className="text-3xl">-</CardTitle>
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
    </div>
  );
}