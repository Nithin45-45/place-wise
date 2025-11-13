import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackButton } from '@/components/ui/back-button';
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
  Award
} from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      description: 'Celebrating 95% placement success rate with our AI prediction platform.'
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
                <Link to="/gallery" className="text-cyan-400 font-medium">
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
                <div className="text-5xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-white/80">Events Hosted</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-400 mb-2">10K+</div>
                <div className="text-white/80">Success Stories</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-white/80">Awards Won</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-yellow-400 mb-2">100+</div>
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
                © 2024 AI PlacementPredictor. Powered by advanced machine learning.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}