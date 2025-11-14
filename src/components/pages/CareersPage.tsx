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
import { Textarea } from '@/components/ui/textarea';
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
  Github,
  BookOpen,
  Award,
  ExternalLink
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
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [displayedJobsCount, setDisplayedJobsCount] = useState(12);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    experience: '',
    expectedSalary: '',
    availableFrom: ''
  });

  const handleAuthInputChange = (field, value) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationInputChange = (field, value) => {
    setApplicationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!applicationForm.fullName || !applicationForm.email || !applicationForm.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate application submission
    console.log('Application submitted for:', selectedJob.title);
    console.log('Application data:', applicationForm);
    
    // Show success message
    alert(`Application submitted successfully for ${selectedJob.title} at ${selectedJob.company}! You will receive a confirmation email shortly.`);
    
    // Reset form and close modal
    setApplicationForm({
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      experience: '',
      expectedSalary: '',
      availableFrom: ''
    });
    setShowApplicationModal(false);
    setSelectedJob(null);
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
    { id: 'all', name: 'All Jobs', count: 24 },
    { id: 'fulltime', name: 'Full-time', count: 17 },
    { id: 'internship', name: 'Internship', count: 7 },
    { id: 'remote', name: 'Remote', count: 12 }
  ];

  const careers = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Infosys',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹4,00,000 - ₹8,00,000',
      experience: '0-2 years',
      skills: ['Java', 'Spring Boot', 'SQL', 'REST APIs'],
      description: 'Join our digital transformation team to build enterprise solutions for global clients.',
      posted: '2 days ago',
      applicants: 156,
      remote: false
    },
    {
      id: 2,
      title: 'Summer Internship Program',
      company: 'TCS',
      location: 'Mumbai, Maharashtra',
      type: 'internship',
      salary: '₹12,000 - ₹18,000/month',
      experience: '0 years',
      skills: ['Programming', 'Problem Solving', 'Communication', 'Teamwork'],
      description: 'Comprehensive 3-month internship program with hands-on training and mentorship.',
      posted: '1 week ago',
      applicants: 234,
      remote: false
    },
    {
      id: 3,
      title: 'Associate Software Engineer',
      company: 'Wipro',
      location: 'Hyderabad, Telangana',
      type: 'fulltime',
      salary: '₹4,50,000 - ₹7,50,000',
      experience: '0-1 years',
      skills: ['Python', 'JavaScript', 'Database', 'Agile'],
      description: 'Work on innovative projects in AI, cloud computing, and digital solutions.',
      posted: '3 days ago',
      applicants: 89,
      remote: true
    },
    {
      id: 4,
      title: 'Technology Analyst',
      company: 'Deloitte',
      location: 'Pune, Maharashtra',
      type: 'fulltime',
      salary: '₹6,00,000 - ₹12,00,000',
      experience: '1-3 years',
      skills: ['Data Analytics', 'Consulting', 'Business Intelligence', 'SQL'],
      description: 'Drive digital transformation initiatives for Fortune 500 clients.',
      posted: '5 days ago',
      applicants: 67,
      remote: false
    },
    {
      id: 5,
      title: 'Software Development Intern',
      company: 'Microsoft',
      location: 'Bangalore, Karnataka',
      type: 'internship',
      salary: '₹18,000 - ₹20,000/month',
      experience: '0 years',
      skills: ['C#', '.NET', 'Azure', 'Software Development'],
      description: 'Work alongside Microsoft engineers on cutting-edge cloud and AI technologies.',
      posted: '1 week ago',
      applicants: 312,
      remote: true
    },
    {
      id: 6,
      title: 'Associate',
      company: 'Cognizant',
      location: 'Chennai, Tamil Nadu',
      type: 'fulltime',
      salary: '₹4,20,000 - ₹7,00,000',
      experience: '0-2 years',
      skills: ['Java', 'React', 'Node.js', 'Cloud Technologies'],
      description: 'Join our digital engineering team to build next-generation applications.',
      posted: '4 days ago',
      applicants: 98,
      remote: false
    },
    {
      id: 7,
      title: 'Data Science Intern',
      company: 'Accenture',
      location: 'Gurgaon, Haryana',
      type: 'internship',
      salary: '₹15,000 - ₹20,000/month',
      experience: '0 years',
      skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
      description: 'Work on real-world data science projects with our analytics team.',
      posted: '6 days ago',
      applicants: 145,
      remote: true
    },
    {
      id: 8,
      title: 'Software Engineer',
      company: 'HCL Technologies',
      location: 'Noida, Uttar Pradesh',
      type: 'fulltime',
      salary: '₹4,00,000 - ₹8,50,000',
      experience: '0-2 years',
      skills: ['Full Stack Development', 'Angular', 'Spring', 'Microservices'],
      description: 'Develop scalable enterprise applications for global technology solutions.',
      posted: '3 days ago',
      applicants: 76,
      remote: false
    },
    {
      id: 9,
      title: 'Cloud Engineering Intern',
      company: 'Amazon',
      location: 'Bangalore, Karnataka',
      type: 'internship',
      salary: '₹20,000/month',
      experience: '0 years',
      skills: ['AWS', 'Cloud Computing', 'DevOps', 'Linux'],
      description: 'Gain hands-on experience with AWS cloud services and infrastructure.',
      posted: '2 days ago',
      applicants: 289,
      remote: false
    },
    {
      id: 10,
      title: 'Business Technology Analyst',
      company: 'Capgemini',
      location: 'Mumbai, Maharashtra',
      type: 'fulltime',
      salary: '₹5,00,000 - ₹9,00,000',
      experience: '0-2 years',
      skills: ['Business Analysis', 'SAP', 'Process Improvement', 'Project Management'],
      description: 'Bridge business requirements with technology solutions for enterprise clients.',
      posted: '1 week ago',
      applicants: 54,
      remote: true
    },
    {
      id: 11,
      title: 'Graduate Engineer Trainee',
      company: 'Tech Mahindra',
      location: 'Pune, Maharashtra',
      type: 'fulltime',
      salary: '₹3,80,000 - ₹6,50,000',
      experience: '0-1 years',
      skills: ['Programming', 'Database Management', 'Software Testing', 'Communication'],
      description: 'Comprehensive training program leading to software development roles.',
      posted: '5 days ago',
      applicants: 123,
      remote: false
    },
    {
      id: 12,
      title: 'Software Development Intern',
      company: 'IBM',
      location: 'Bangalore, Karnataka',
      type: 'internship',
      salary: '₹16,000 - ₹18,000/month',
      experience: '0 years',
      skills: ['AI/ML', 'Cloud', 'Blockchain', 'Data Science'],
      description: 'Work on innovative IBM technologies including Watson AI and hybrid cloud.',
      posted: '4 days ago',
      applicants: 198,
      remote: true
    },
    {
      id: 13,
      title: 'Frontend Developer',
      company: 'Flipkart',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹6,00,000 - ₹12,00,000',
      experience: '1-3 years',
      skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux'],
      description: 'Build engaging user interfaces for millions of customers on India\'s leading e-commerce platform.',
      posted: '1 day ago',
      applicants: 87,
      remote: false
    },
    {
      id: 14,
      title: 'DevOps Engineer',
      company: 'Paytm',
      location: 'Noida, Uttar Pradesh',
      type: 'fulltime',
      salary: '₹8,00,000 - ₹15,00,000',
      experience: '2-4 years',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      description: 'Manage and scale infrastructure for India\'s largest digital payments platform.',
      posted: '3 days ago',
      applicants: 65,
      remote: true
    },
    {
      id: 15,
      title: 'Mobile App Developer',
      company: 'Swiggy',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹7,00,000 - ₹14,00,000',
      experience: '1-3 years',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      description: 'Develop mobile applications that connect millions of users with their favorite restaurants.',
      posted: '2 days ago',
      applicants: 112,
      remote: false
    },
    {
      id: 16,
      title: 'Backend Developer Intern',
      company: 'Zomato',
      location: 'Gurgaon, Haryana',
      type: 'internship',
      salary: '₹25,000 - ₹30,000/month',
      experience: '0 years',
      skills: ['Node.js', 'Python', 'MongoDB', 'REST APIs', 'Microservices'],
      description: 'Work on scalable backend systems for food delivery and restaurant discovery.',
      posted: '1 week ago',
      applicants: 156,
      remote: true
    },
    {
      id: 17,
      title: 'QA Engineer',
      company: 'Ola',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹5,00,000 - ₹9,00,000',
      experience: '1-2 years',
      skills: ['Selenium', 'TestNG', 'API Testing', 'Mobile Testing', 'Automation'],
      description: 'Ensure quality and reliability of mobility solutions used by millions of riders.',
      posted: '5 days ago',
      applicants: 78,
      remote: false
    },
    {
      id: 18,
      title: 'Product Manager Intern',
      company: 'Razorpay',
      location: 'Bangalore, Karnataka',
      type: 'internship',
      salary: '₹35,000/month',
      experience: '0 years',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'SQL', 'Communication'],
      description: 'Drive product initiatives for India\'s leading fintech payment gateway.',
      posted: '6 days ago',
      applicants: 89,
      remote: true
    },
    {
      id: 19,
      title: 'Machine Learning Engineer',
      company: 'Myntra',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹12,00,000 - ₹20,00,000',
      experience: '2-4 years',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
      description: 'Build AI-powered recommendation systems and computer vision solutions for fashion e-commerce.',
      posted: '1 week ago',
      applicants: 134,
      remote: false
    },
    {
      id: 20,
      title: 'Cybersecurity Analyst',
      company: 'PhonePe',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹9,00,000 - ₹16,00,000',
      experience: '2-3 years',
      skills: ['Network Security', 'Incident Response', 'SIEM', 'Penetration Testing', 'Compliance'],
      description: 'Protect digital payment infrastructure and ensure security compliance.',
      posted: '4 days ago',
      applicants: 45,
      remote: true
    },
    {
      id: 21,
      title: 'UI/UX Designer',
      company: 'BYJU\'S',
      location: 'Bangalore, Karnataka',
      type: 'fulltime',
      salary: '₹6,00,000 - ₹11,00,000',
      experience: '1-3 years',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      description: 'Design engaging educational experiences for millions of students worldwide.',
      posted: '3 days ago',
      applicants: 92,
      remote: false
    },
    {
      id: 22,
      title: 'Data Analyst Intern',
      company: 'Nykaa',
      location: 'Mumbai, Maharashtra',
      type: 'internship',
      salary: '₹20,000 - ₹25,000/month',
      experience: '0 years',
      skills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistics'],
      description: 'Analyze customer behavior and market trends in the beauty and fashion industry.',
      posted: '1 week ago',
      applicants: 167,
      remote: true
    },
    {
      id: 23,
      title: 'Cloud Architect',
      company: 'Freshworks',
      location: 'Chennai, Tamil Nadu',
      type: 'fulltime',
      salary: '₹15,00,000 - ₹25,00,000',
      experience: '4-6 years',
      skills: ['AWS', 'Azure', 'GCP', 'Microservices', 'Serverless'],
      description: 'Design and implement cloud infrastructure for SaaS products serving global customers.',
      posted: '2 days ago',
      applicants: 56,
      remote: true
    },
    {
      id: 24,
      title: 'Software Test Engineer',
      company: 'Zoho',
      location: 'Chennai, Tamil Nadu',
      type: 'fulltime',
      salary: '₹4,50,000 - ₹8,00,000',
      experience: '0-2 years',
      skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Java', 'API Testing'],
      description: 'Ensure quality of business software solutions used by millions of organizations.',
      posted: '5 days ago',
      applicants: 103,
      remote: false
    }
  ];

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || career.type === selectedType;
    return matchesSearch && matchesType;
  });

  const displayedCareers = filteredCareers.slice(0, displayedJobsCount);
  const hasMoreJobs = displayedJobsCount < filteredCareers.length;

  const handleLoadMore = () => {
    setDisplayedJobsCount(prev => Math.min(prev + 6, filteredCareers.length));
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
              {displayedCareers.map((job, index) => (
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
                          <Button 
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                            onClick={() => handleApplyNow(job)}
                          >
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

            {/* Load More Button */}
            {hasMoreJobs && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mt-12"
              >
                <Button
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-lg font-semibold"
                  size="lg"
                >
                  Load More Jobs ({filteredCareers.length - displayedJobsCount} remaining)
                </Button>
              </motion.div>
            )}

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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹18L - ₹45L+</div>
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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹12L - ₹25L</div>
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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹8L - ₹20L</div>
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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹12L - ₹30L</div>
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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹10L - ₹25L</div>
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
                    <div className="text-2xl font-bold text-green-400 mb-2">₹15L - ₹35L</div>
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

        {/* Recommended Courses Section */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Recommended Courses
                </span>
                {" "}for Tech Skills
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-paragraph">
                Get certified in the most in-demand tech skills with these curated courses from top platforms
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Programming Fundamentals */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="h-8 w-8 text-green-400" />
                      <CardTitle className="text-xl text-white">Programming Fundamentals</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Master the basics of programming with Python and Java
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-green-300 mb-2">Python for Everybody Specialization</h4>
                          <p className="text-sm text-white/70 mb-3">University of Michigan • Coursera</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.8★ • 890k+ enrolled</span>
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => window.open('https://www.coursera.org/specializations/python', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-green-300 mb-2">Java Programming Masterclass</h4>
                          <p className="text-sm text-white/70 mb-3">Tim Buchalka • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.6★ • 850k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/java-the-complete-java-developer-course/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Web Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border-blue-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-8 w-8 text-blue-400" />
                      <CardTitle className="text-xl text-white">Web Development</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Build modern web applications with React and Node.js
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">The Complete Web Developer Bootcamp</h4>
                          <p className="text-sm text-white/70 mb-3">Angela Yu • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.7★ • 900k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/the-complete-web-development-bootcamp/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-300 mb-2">React - The Complete Guide</h4>
                          <p className="text-sm text-white/70 mb-3">Maximilian Schwarzmüller • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.6★ • 750k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/react-the-complete-guide-incl-redux/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Science & Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                      <CardTitle className="text-xl text-white">Data Science & Analytics</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Master data analysis, visualization, and machine learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-300 mb-2">IBM Data Science Professional Certificate</h4>
                          <p className="text-sm text-white/70 mb-3">IBM • Coursera</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.6★ • 450k+ enrolled</span>
                            <Button 
                              size="sm" 
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                              onClick={() => window.open('https://www.coursera.org/professional-certificates/ibm-data-science', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-300 mb-2">Machine Learning Specialization</h4>
                          <p className="text-sm text-white/70 mb-3">Andrew Ng • Coursera</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.9★ • 320k+ enrolled</span>
                            <Button 
                              size="sm" 
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                              onClick={() => window.open('https://www.coursera.org/specializations/machine-learning-introduction', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cloud Computing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border-orange-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="h-8 w-8 text-orange-400" />
                      <CardTitle className="text-xl text-white">Cloud Computing</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Learn AWS, Azure, and cloud architecture fundamentals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-300 mb-2">AWS Certified Solutions Architect</h4>
                          <p className="text-sm text-white/70 mb-3">Stephane Maarek • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.7★ • 650k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-300 mb-2">Microsoft Azure Fundamentals</h4>
                          <p className="text-sm text-white/70 mb-3">Microsoft • Microsoft Learn</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.5★ • Free Course</span>
                            <Button 
                              size="sm" 
                              className="bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={() => window.open('https://docs.microsoft.com/en-us/learn/paths/azure-fundamentals/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          </div>
                        </div>
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
                      <Award className="h-8 w-8 text-red-400" />
                      <CardTitle className="text-xl text-white">Cybersecurity</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Protect systems and networks from cyber threats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-red-300 mb-2">Google Cybersecurity Professional Certificate</h4>
                          <p className="text-sm text-white/70 mb-3">Google • Coursera</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.8★ • 280k+ enrolled</span>
                            <Button 
                              size="sm" 
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => window.open('https://www.coursera.org/professional-certificates/google-cybersecurity', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-red-300 mb-2">Ethical Hacking Bootcamp</h4>
                          <p className="text-sm text-white/70 mb-3">Zaid Sabih • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.5★ • 420k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/learn-ethical-hacking-from-scratch/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mobile Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-md border-teal-400/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="h-8 w-8 text-teal-400" />
                      <CardTitle className="text-xl text-white">Mobile Development</CardTitle>
                    </div>
                    <CardDescription className="text-white/80">
                      Build iOS and Android apps with React Native and Flutter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-300 mb-2">React Native - The Practical Guide</h4>
                          <p className="text-sm text-white/70 mb-3">Maximilian Schwarzmüller • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.6★ • 180k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-teal-500 hover:bg-teal-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/react-native-the-practical-guide/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                          <h4 className="font-semibold text-teal-300 mb-2">Flutter & Dart Complete Development Course</h4>
                          <p className="text-sm text-white/70 mb-3">Angela Yu • Udemy</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">4.6★ • 250k+ students</span>
                            <Button 
                              size="sm" 
                              className="bg-teal-500 hover:bg-teal-600 text-white"
                              onClick={() => window.open('https://www.udemy.com/course/flutter-bootcamp-with-dart/', '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Course Platform Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="text-white/60 mb-6 font-paragraph">Trusted learning platforms:</p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2 text-sm">
                  Coursera • University Partnerships
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2 text-sm">
                  Udemy • Expert Instructors
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2 text-sm">
                  Microsoft Learn • Official Certification
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-4 py-2 text-sm">
                  Google • Industry Recognition
                </Badge>
              </div>
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

      {/* Job Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cyan-400">
              Apply for {selectedJob?.title}
            </DialogTitle>
            <p className="text-slate-300">
              {selectedJob?.company} • {selectedJob?.location}
            </p>
          </DialogHeader>
          
          <form onSubmit={handleApplicationSubmit} className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={applicationForm.fullName}
                  onChange={(e) => handleApplicationInputChange('fullName', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={applicationForm.email}
                  onChange={(e) => handleApplicationInputChange('email', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={applicationForm.phone}
                  onChange={(e) => handleApplicationInputChange('phone', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience" className="text-white">Years of Experience</Label>
                <Input
                  id="experience"
                  type="text"
                  value={applicationForm.experience}
                  onChange={(e) => handleApplicationInputChange('experience', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="e.g., 2 years, Fresh Graduate"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedSalary" className="text-white">Expected Salary</Label>
                <Input
                  id="expectedSalary"
                  type="text"
                  value={applicationForm.expectedSalary}
                  onChange={(e) => handleApplicationInputChange('expectedSalary', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="e.g., ₹5,00,000 per annum"
                />
              </div>
              <div>
                <Label htmlFor="availableFrom" className="text-white">Available From</Label>
                <Input
                  id="availableFrom"
                  type="date"
                  value={applicationForm.availableFrom}
                  onChange={(e) => handleApplicationInputChange('availableFrom', e.target.value)}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="coverLetter" className="text-white">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                value={applicationForm.coverLetter}
                onChange={(e) => handleApplicationInputChange('coverLetter', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white min-h-[120px]"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>

            <div>
              <Label htmlFor="resume" className="text-white">Resume/CV</Label>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleApplicationInputChange('resume', e.target.files?.[0] || null)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-sm text-slate-400 mt-1">
                Upload your resume in PDF, DOC, or DOCX format (Max 5MB)
              </p>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-400 mb-2">Job Requirements:</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedJob?.skills.map((skill, index) => (
                  <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-slate-300">
                <strong>Experience:</strong> {selectedJob?.experience} | 
                <strong> Salary:</strong> {selectedJob?.salary}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}