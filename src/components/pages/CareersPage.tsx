import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
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
  Building
} from 'lucide-react';

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

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
      salary: '$120,000 - $180,000',
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
      salary: '$25 - $35/hour',
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
      salary: '$140,000 - $200,000',
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
      salary: '$80,000 - $120,000',
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
      salary: '$130,000 - $170,000',
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
      salary: '$100,000 - $140,000',
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
                <Link to="/careers" className="text-cyan-400 font-medium">
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
                <div className="text-5xl font-bold text-cyan-400 mb-2">95%</div>
                <div className="text-white/80">Placement Success Rate</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-green-400 mb-2">$85K</div>
                <div className="text-white/80">Average Starting Salary</div>
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
                <div className="text-5xl font-bold text-yellow-400 mb-2">30</div>
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