import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  User,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Star,
  TrendingUp,
  Award,
  Target,
  Settings
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2024',
    gpa: '3.85',
    bio: 'Passionate computer science student with a focus on artificial intelligence and machine learning. Experienced in full-stack development and data analysis.',
    skills: ['Python', 'JavaScript', 'React', 'Machine Learning', 'SQL', 'AWS'],
    experience: [
      {
        title: 'Software Engineering Intern',
        company: 'Google',
        duration: 'Summer 2023',
        description: 'Developed machine learning models for search optimization'
      },
      {
        title: 'Research Assistant',
        company: 'Stanford AI Lab',
        duration: '2022-2023',
        description: 'Conducted research on natural language processing applications'
      }
    ],
    projects: [
      {
        name: 'AI Career Predictor',
        description: 'Built a machine learning model to predict career outcomes',
        technologies: ['Python', 'TensorFlow', 'Flask']
      },
      {
        name: 'Social Media Analytics Dashboard',
        description: 'Real-time analytics platform for social media insights',
        technologies: ['React', 'Node.js', 'MongoDB']
      }
    ]
  });

  const [predictionHistory] = useState([
    {
      date: '2024-03-15',
      placementChance: 92,
      expectedSalary: 125000,
      topSkills: ['Python', 'Machine Learning', 'React']
    },
    {
      date: '2024-02-20',
      placementChance: 88,
      expectedSalary: 118000,
      topSkills: ['JavaScript', 'SQL', 'AWS']
    },
    {
      date: '2024-01-10',
      placementChance: 85,
      expectedSalary: 112000,
      topSkills: ['Python', 'Data Analysis', 'React']
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
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
                <Link to="/ratings" className="text-white/90 hover:text-cyan-400 transition-colors font-medium">
                  Ratings
                </Link>
                <Link to="/profile" className="text-cyan-400 font-medium">
                  Profile
                </Link>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Login / Register
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Profile Header */}
        <section className="py-20 px-6">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{profileData.name}</h1>
                        <div className="flex items-center gap-4 text-white/70 mb-2">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            {profileData.major} • {profileData.university}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Class of {profileData.graduationYear}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-white/70">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {profileData.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {profileData.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white"
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-10 px-6">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Personal Info & Bio */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-cyan-400" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-white/90">Full Name</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-white/90">Email</Label>
                            <Input
                              id="email"
                              value={profileData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-white/90">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location" className="text-white/90">Location</Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="gpa" className="text-white/90">GPA</Label>
                            <Input
                              id="gpa"
                              value={profileData.gpa}
                              onChange={(e) => handleInputChange('gpa', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="graduationYear" className="text-white/90">Graduation Year</Label>
                            <Input
                              id="graduationYear"
                              value={profileData.graduationYear}
                              onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-cyan-400" />
                              <span>{profileData.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span>GPA: {profileData.gpa}</span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-green-400" />
                              <span>Dean's List (3 semesters)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-blue-400" />
                              <span>Career Focus: AI/ML</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <Textarea
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          className="bg-white/10 border-white/20 text-white min-h-[100px]"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="text-white/80 leading-relaxed">{profileData.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-cyan-400" />
                        Experience
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-cyan-400 pl-4">
                          <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                          <div className="text-cyan-400 mb-2">{exp.company} • {exp.duration}</div>
                          <p className="text-white/70">{exp.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column - Skills & Predictions */}
              <div className="space-y-8">
                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Latest Prediction */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        Latest Prediction
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {new Date(predictionHistory[0].date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          {predictionHistory[0].placementChance}%
                        </div>
                        <div className="text-white/80 mb-3">Placement Chance</div>
                        <Progress 
                          value={predictionHistory[0].placementChance} 
                          className="h-2 bg-white/20"
                        />
                      </div>
                      
                      <div className="text-center pt-4 border-t border-white/10">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">
                          ${(predictionHistory[0].expectedSalary / 1000).toFixed(0)}K
                        </div>
                        <div className="text-white/80">Expected Salary</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Prediction History */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle>Prediction History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {predictionHistory.slice(1).map((prediction, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div>
                            <div className="text-sm text-white/70">
                              {new Date(prediction.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-cyan-400">
                              {prediction.placementChance}% • ${(prediction.expectedSalary / 1000).toFixed(0)}K
                            </div>
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
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