import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  TrendingUp,
  Filter,
  Building,
  LogOut,
  Github
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function CareersPage() {
  const { member, isAuthenticated, actions } = useMember();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

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

  const jobTypes = [
    { id: 'all', name: 'All Jobs', count: 45 },
    { id: 'fulltime', name: 'Full-time', count: 25 },
    { id: 'internship', name: 'Internship', count: 12 },
    { id: 'remote', name: 'Remote', count: 8 }
  ];

  const careers = [
    {
      id: 1,
      title: 'Senior AI Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      type: 'fulltime',
      salary: '₹99,60,000 - ₹1,49,40,000',
      experience: '3-5 years',
      skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
      description: 'Lead the development of AI-powered placement prediction algorithms and machine learning models.',
      posted: '2 days ago',
      applicants: 45,
      remote: false
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Innovation Labs',
      location: 'New York, NY',
      type: 'internship',
      salary: '₹2,075 - ₹2,905/hour',
      experience: '0-1 years',
      skills: ['Python', 'SQL', 'Data Analysis', 'Statistics'],
      description: 'Work on data analysis projects to improve career prediction accuracy and student outcomes.',
      posted: '1 week ago',
      applicants: 78,
      remote: true
    },
    {
      id: 3,
      title: 'Machine Learning Researcher',
      company: 'AI Research Institute',
      location: 'Boston, MA',
      type: 'fulltime',
      salary: '₹1,16,20,000 - ₹1,66,00,000',
      experience: '5+ years',
      skills: ['Research', 'PyTorch', 'NLP', 'Computer Vision'],
      description: 'Conduct cutting-edge research in machine learning applications for career guidance and prediction.',
      posted: '3 days ago',
      applicants: 23,
      remote: true
    },
    {
      id: 4,
      title: 'Frontend Developer',
      company: 'UX Design Studio',
      location: 'Austin, TX',
      type: 'fulltime',
      salary: '₹66,40,000 - ₹99,60,000',
      experience: '2-4 years',
      skills: ['React', 'TypeScript', 'UI/UX', 'Tailwind CSS'],
      description: 'Build intuitive user interfaces for AI-powered career guidance platforms.',
      posted: '5 days ago',
      applicants: 67,
      remote: false
    },
    {
      id: 5,
      title: 'Product Manager - AI',
      company: 'Career Tech Inc',
      location: 'Seattle, WA',
      type: 'fulltime',
      salary: '₹1,07,90,000 - ₹1,41,10,000',
      experience: '4-6 years',
      skills: ['Product Strategy', 'AI/ML', 'Analytics', 'Leadership'],
      description: 'Drive product strategy for AI-powered career prediction and guidance solutions.',
      posted: '1 week ago',
      applicants: 34,
      remote: true
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions Ltd',
      location: 'Denver, CO',
      type: 'fulltime',
      salary: '₹83,00,000 - ₹1,16,20,000',
      experience: '3-5 years',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      description: 'Manage cloud infrastructure and deployment pipelines for AI prediction services.',
      posted: '4 days ago',
      applicants: 29,
      remote: true
    }
  ];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || career.type === selectedType;
    return matchesSearch && matchesType;
  });

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
                  <Link to="/careers" className="text-cyan-400 font-medium">
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
                AI-Powered
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block">
                  Career Opportunities
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 font-paragraph">
                Discover exciting career opportunities in AI, machine learning, and technology. Find your perfect match with our intelligent job recommendations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-10 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="h-5 w-5 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              {/* Job Type Filters */}
              <div className="flex flex-wrap gap-3">
                {jobTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    onClick={() => setSelectedType(type.id)}
                    className={`${
                      selectedType === type.id
                        ? "bg-cyan-500 text-white"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {type.name} ({type.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid gap-6">
              {filteredCareers.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl text-white">{job.title}</CardTitle>
                            <Badge className={`${
                              job.type === 'fulltime' ? 'bg-green-500' :
                              job.type === 'internship' ? 'bg-blue-500' :
                              'bg-purple-500'
                            } text-white`}>
                              {job.type === 'fulltime' ? 'Full-time' : 
                               job.type === 'internship' ? 'Internship' : 'Remote'}
                            </Badge>
                            {job.remote && (
                              <Badge className="bg-cyan-500 text-white">Remote</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Building className="h-4 w-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <CardDescription className="text-white/70 text-base">
                            {job.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                            Apply Now
                          </Button>
                          <div className="text-sm text-white/60">
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-sm">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <Briefcase className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <Clock className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">{job.posted}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-white/60 mb-2">Required Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              className="bg-white/10 text-white border-white/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCareers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Search className="h-24 w-24 text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white/80 mb-4">
                  No jobs found
                </h3>
                <p className="text-white/60">
                  Try adjusting your search terms or filters.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Career Learning Suggestions */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-heading">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Skills to Master
                </span>
                {" "}for High-Paying Careers
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-paragraph">
                Based on market trends and salary data, here are the most valuable skills to learn for securing top-tier positions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI & Machine Learning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="h-8 w-8 text-purple-400" />
                      <CardTitle className="text-xl text-white">AI & Machine Learning</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹99L - ₹1.66Cr+</div>
                    <CardDescription className="text-white/80">
                      The highest-paying field in tech with explosive growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-purple-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'].map((skill) => (
                            <Badge key={skill} className="bg-purple-500/30 text-purple-200 border-purple-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-purple-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Start with Python programming</li>
                          <li>• Learn statistics & linear algebra</li>
                          <li>• Master ML frameworks (TensorFlow/PyTorch)</li>
                          <li>• Build portfolio projects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cloud & DevOps */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border-blue-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8 text-blue-400" />
                      <CardTitle className="text-xl text-white">Cloud & DevOps</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹75L - ₹1.33Cr</div>
                    <CardDescription className="text-white/80">
                      High demand with excellent job security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-blue-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'].map((skill) => (
                            <Badge key={skill} className="bg-blue-500/30 text-blue-200 border-blue-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-blue-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Learn Linux fundamentals</li>
                          <li>• Get AWS/Azure certifications</li>
                          <li>• Master containerization (Docker)</li>
                          <li>• Practice infrastructure as code</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Full-Stack Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Github className="h-8 w-8 text-green-400" />
                      <CardTitle className="text-xl text-white">Full-Stack Development</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹66L - ₹1.16Cr</div>
                    <CardDescription className="text-white/80">
                      Versatile skills with broad opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-green-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'].map((skill) => (
                            <Badge key={skill} className="bg-green-500/30 text-green-200 border-green-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-green-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Master JavaScript fundamentals</li>
                          <li>• Learn React for frontend</li>
                          <li>• Study Node.js for backend</li>
                          <li>• Build full-stack projects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Science */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border-orange-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8 text-orange-400" />
                      <CardTitle className="text-xl text-white">Data Science</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹79L - ₹1.41Cr</div>
                    <CardDescription className="text-white/80">
                      Transform data into business insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-orange-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'SQL', 'Pandas', 'Tableau', 'Statistics'].map((skill) => (
                            <Badge key={skill} className="bg-orange-500/30 text-orange-200 border-orange-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-orange-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Learn Python & SQL</li>
                          <li>• Master data manipulation (Pandas)</li>
                          <li>• Study statistics & probability</li>
                          <li>• Create data visualization projects</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cybersecurity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md border-red-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-8 w-8 text-red-400" />
                      <CardTitle className="text-xl text-white">Cybersecurity</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹71L - ₹1.25Cr</div>
                    <CardDescription className="text-white/80">
                      Critical field with growing demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-red-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['Network Security', 'Penetration Testing', 'CISSP', 'Ethical Hacking', 'Risk Assessment'].map((skill) => (
                            <Badge key={skill} className="bg-red-500/30 text-red-200 border-red-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-red-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Learn networking fundamentals</li>
                          <li>• Get security certifications (CISSP, CEH)</li>
                          <li>• Practice ethical hacking</li>
                          <li>• Study compliance frameworks</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Product Management */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-yellow-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-8 w-8 text-yellow-400" />
                      <CardTitle className="text-xl text-white">Product Management</CardTitle>
                    </div>
                    <div className="text-2xl font-bold text-green-400 mb-2">₹91L - ₹1.49Cr</div>
                    <CardDescription className="text-white/80">
                      Bridge technology and business strategy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-semibold text-yellow-300 mb-2">Essential Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Leadership'].map((skill) => (
                            <Badge key={skill} className="bg-yellow-500/30 text-yellow-200 border-yellow-400/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-yellow-300 mb-2">Learning Path:</div>
                        <ul className="text-sm text-white/80 space-y-1">
                          <li>• Learn product strategy frameworks</li>
                          <li>• Master data analytics tools</li>
                          <li>• Study user experience design</li>
                          <li>• Develop leadership skills</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Learning Resources CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border-cyan-400/30 text-white max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    💡 Pro Tip: Start Learning Today
                  </h3>
                  <p className="text-white/80 mb-6 text-lg">
                    The best time to start learning these skills was yesterday. The second best time is now. 
                    Focus on one area, build projects, and create a portfolio that showcases your abilities.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                      📚 Online Courses: Coursera, Udemy, edX
                    </Badge>
                    <Badge className="bg-blue-500 text-white px-4 py-2 text-sm">
                      🛠️ Practice: GitHub, LeetCode, Kaggle
                    </Badge>
                    <Badge className="bg-purple-500 text-white px-4 py-2 text-sm">
                      🏆 Certifications: AWS, Google, Microsoft
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Career Stats */}
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
                Career Success Metrics
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-paragraph">
                Our AI-powered platform has helped thousands of students land their dream careers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">0%</div>
                <div className="text-white/80">Placement Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-400 mb-2">₹0</div>
                <div className="text-white/80">Average Starting Salary</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-blue-400 mb-2">0</div>
                <div className="text-white/80">Partner Companies</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-yellow-400 mb-2">0</div>
                <div className="text-white/80">Days Average Job Search</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-heading">
                Ready to Start Your AI Career Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-paragraph">
                Use our AI prediction tool to discover your ideal career path and get personalized job recommendations.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3">
                <Link to="/">Predict My Career</Link>
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