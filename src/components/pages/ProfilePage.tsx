import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BackButton } from '@/components/ui/back-button';
import { motion, AnimatePresence } from 'framer-motion';
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
  Settings,
  Code,
  Trophy,
  MessageSquare,
  Zap,
  Upload,
  FileText,
  Download,
  X,
  Camera
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    degreeType: '',
    branch: '',
    graduationStatus: '',
    completionYear: '',
    cgpa: '',
    tenthPercentage: '',
    twelfthPercentage: '',
    skills: '',
    interests: '',
    internship: '',
    hackathon: '',
    majorProjects: '',
    miniProjects: '',
    certifications: '',
    communicationRating: '',
    backlogs: '',
    resumeFile: null,
    resumeFileName: '',
    profilePicture: null,
    profilePictureUrl: '',
    internshipCertification: null,
    internshipCertificationName: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setProfileData(prev => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name
      }));
    }
  };

  const handleRemoveResume = () => {
    setProfileData(prev => ({
      ...prev,
      resumeFile: null,
      resumeFileName: ''
    }));
  };

  const handleDownloadResume = () => {
    if (profileData.resumeFile) {
      const url = URL.createObjectURL(profileData.resumeFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = profileData.resumeFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is image (JPG/PNG)
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Please upload only JPG or PNG image files');
        return;
      }
      
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setProfileData(prev => ({
        ...prev,
        profilePicture: file,
        profilePictureUrl: imageUrl
      }));
    }
  };

  const handleRemoveProfilePicture = () => {
    if (profileData.profilePictureUrl) {
      URL.revokeObjectURL(profileData.profilePictureUrl);
    }
    setProfileData(prev => ({
      ...prev,
      profilePicture: null,
      profilePictureUrl: ''
    }));
  };

  const handleInternshipCertificationUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      
      setProfileData(prev => ({
        ...prev,
        internshipCertification: file,
        internshipCertificationName: file.name
      }));
    }
  };

  const handleRemoveInternshipCertification = () => {
    setProfileData(prev => ({
      ...prev,
      internshipCertification: null,
      internshipCertificationName: ''
    }));
  };

  const handleDownloadInternshipCertification = () => {
    if (profileData.internshipCertification) {
      const url = URL.createObjectURL(profileData.internshipCertification);
      const a = document.createElement('a');
      a.href = url;
      a.download = profileData.internshipCertificationName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handlePredict = async () => {
    setIsLoading(true);
    // Simulate AI prediction with enhanced algorithm
    setTimeout(() => {
      const cgpaScore = parseFloat(profileData.cgpa) || 0;
      const tenthScore = parseFloat(profileData.tenthPercentage) || 0;
      const twelfthScore = parseFloat(profileData.twelfthPercentage) || 0;
      const skillsCount = profileData.skills.split(',').filter(s => s.trim()).length;
      const majorProjectsCount = parseInt(profileData.majorProjects) || 0;
      const miniProjectsCount = parseInt(profileData.miniProjects) || 0;
      const certificationsCount = parseInt(profileData.certifications) || 0;
      const communicationScore = parseInt(profileData.communicationRating) || 0;
      const backlogsCount = parseInt(profileData.backlogs) || 0;
      const hasInternship = profileData.internship === 'yes' ? 1 : 0;
      const hasHackathon = profileData.hackathon === 'yes' ? 1 : 0;
      
      // Enhanced scoring algorithm
      const academicScore = (cgpaScore / 10) * 25 + (tenthScore / 100) * 10 + (twelfthScore / 100) * 10;
      const experienceScore = hasInternship * 15 + hasHackathon * 10 + majorProjectsCount * 8 + miniProjectsCount * 3;
      const skillsScore = skillsCount * 3 + certificationsCount * 5;
      const communicationScore_weighted = communicationScore * 4;
      const backlogsPenalty = backlogsCount * -5;
      
      const totalScore = academicScore + experienceScore + skillsScore + communicationScore_weighted + backlogsPenalty;
      const placementChance = Math.min(98, Math.max(10, totalScore + Math.random() * 15));
      
      // Salary calculation based on branch and performance
      const branchMultiplier = {
        'Computer Science': 1.2,
        'Information Technology': 1.15,
        'Electronics': 1.1,
        'Mechanical': 1.0,
        'Civil': 0.9,
        'Electrical': 1.05,
        'Chemical': 1.1,
        'Other': 1.0
      };
      
      const baseSalary = 400000; // 4 LPA base
      const expectedSalary = Math.round(baseSalary * (branchMultiplier[profileData.branch] || 1) * (placementChance / 100) * (1 + Math.random() * 0.5));
      
      // Generate personalized skill recommendations based on user's profile
      const userSkills = profileData.skills.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const branch = profileData.branch;
      const interests = profileData.interests;
      
      // Define skill recommendations based on branch and current skills
      const getPersonalizedSkillRecommendations = () => {
        const recommendations = [];
        
        // Branch-specific recommendations
        if (branch === 'Computer Science' || branch === 'Information Technology') {
          if (!userSkills.some(skill => skill.includes('react') || skill.includes('angular') || skill.includes('vue'))) {
            recommendations.push({
              category: 'Frontend Development',
              skills: ['React.js', 'TypeScript', 'Next.js'],
              priority: 'High',
              reason: 'Essential for modern web development roles'
            });
          }
          if (!userSkills.some(skill => skill.includes('node') || skill.includes('express') || skill.includes('spring'))) {
            recommendations.push({
              category: 'Backend Development',
              skills: ['Node.js', 'Express.js', 'RESTful APIs'],
              priority: 'High',
              reason: 'Critical for full-stack development positions'
            });
          }
          if (!userSkills.some(skill => skill.includes('aws') || skill.includes('azure') || skill.includes('cloud'))) {
            recommendations.push({
              category: 'Cloud Computing',
              skills: ['AWS', 'Docker', 'Kubernetes'],
              priority: 'Medium',
              reason: 'High demand in current job market'
            });
          }
        }
        
        if (branch === 'Data Science' || interests === 'Data Science' || interests === 'Machine Learning') {
          if (!userSkills.some(skill => skill.includes('python') || skill.includes('pandas') || skill.includes('numpy'))) {
            recommendations.push({
              category: 'Data Science Fundamentals',
              skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
              priority: 'High',
              reason: 'Foundation for data science careers'
            });
          }
          if (!userSkills.some(skill => skill.includes('machine learning') || skill.includes('tensorflow') || skill.includes('pytorch'))) {
            recommendations.push({
              category: 'Machine Learning',
              skills: ['TensorFlow', 'PyTorch', 'Scikit-learn'],
              priority: 'High',
              reason: 'Essential for AI/ML roles'
            });
          }
        }
        
        if (interests === 'Cybersecurity') {
          recommendations.push({
            category: 'Cybersecurity',
            skills: ['Network Security', 'Penetration Testing', 'CISSP'],
            priority: 'High',
            reason: 'Growing field with excellent opportunities'
          });
        }
        
        if (interests === 'DevOps') {
          recommendations.push({
            category: 'DevOps & Infrastructure',
            skills: ['Jenkins', 'Terraform', 'Ansible'],
            priority: 'Medium',
            reason: 'High-paying DevOps roles available'
          });
        }
        
        // General recommendations based on gaps
        if (skillsCount < 5) {
          recommendations.push({
            category: 'Programming Languages',
            skills: ['Java', 'JavaScript', 'Python'],
            priority: 'High',
            reason: 'Expand your programming foundation'
          });
        }
        
        if (!userSkills.some(skill => skill.includes('git') || skill.includes('github'))) {
          recommendations.push({
            category: 'Version Control',
            skills: ['Git', 'GitHub', 'GitLab'],
            priority: 'High',
            reason: 'Essential for any development role'
          });
        }
        
        return recommendations.slice(0, 4); // Limit to 4 recommendations
      };
      
      // Generate personalized learning paths
      const getPersonalizedLearningPaths = () => {
        const paths = [];
        
        if (branch === 'Computer Science' || branch === 'Information Technology') {
          if (interests === 'Web Development' || interests === 'Software Development') {
            paths.push({
              title: 'Full-Stack Web Developer',
              duration: '6-8 months',
              steps: [
                'Master HTML, CSS, JavaScript fundamentals',
                'Learn React.js for frontend development',
                'Study Node.js and Express.js for backend',
                'Practice with databases (MongoDB/PostgreSQL)',
                'Build 3-5 full-stack projects for portfolio'
              ],
              outcome: 'Ready for junior full-stack developer roles (₹4-8L)'
            });
          }
          
          if (interests === 'Data Science' || interests === 'Machine Learning') {
            paths.push({
              title: 'Data Scientist',
              duration: '8-10 months',
              steps: [
                'Learn Python programming and statistics',
                'Master data manipulation with Pandas',
                'Study machine learning algorithms',
                'Practice with real datasets on Kaggle',
                'Complete 2-3 data science projects'
              ],
              outcome: 'Qualified for data analyst/scientist roles (₹6-12L)'
            });
          }
          
          if (interests === 'DevOps') {
            paths.push({
              title: 'DevOps Engineer',
              duration: '5-7 months',
              steps: [
                'Learn Linux fundamentals and scripting',
                'Get AWS/Azure cloud certifications',
                'Master containerization with Docker',
                'Study CI/CD pipelines and automation',
                'Practice infrastructure as code'
              ],
              outcome: 'Ready for DevOps engineer positions (₹8-15L)'
            });
          }
        }
        
        // Default path based on branch
        if (paths.length === 0) {
          paths.push({
            title: 'Software Developer',
            duration: '4-6 months',
            steps: [
              'Strengthen programming fundamentals',
              'Learn popular frameworks in your field',
              'Build practical projects',
              'Contribute to open source projects',
              'Prepare for technical interviews'
            ],
            outcome: 'Ready for entry-level developer roles (₹3-6L)'
          });
        }
        
        return paths.slice(0, 2); // Limit to 2 learning paths
      };
      
      setPrediction({
        placementChance: Math.round(placementChance),
        expectedSalary,
        confidence: Math.round(88 + Math.random() * 10),
        topSkills: profileData.skills.split(',').slice(0, 3).map(s => s.trim()).filter(Boolean),
        recommendations: [
          backlogsCount > 0 ? 'Clear pending backlogs to improve placement chances' : 'Maintain excellent academic record',
          communicationScore < 4 ? 'Focus on improving communication skills' : 'Leverage strong communication skills',
          !hasInternship ? 'Consider pursuing internship opportunities' : 'Highlight internship experience in interviews',
          skillsCount < 5 ? 'Expand technical skill set' : 'Showcase diverse technical expertise',
          majorProjectsCount < 2 ? 'Work on more substantial projects' : 'Document project achievements effectively'
        ].slice(0, 4),
        skillRecommendations: getPersonalizedSkillRecommendations(),
        learningPaths: getPersonalizedLearningPaths()
      });
      setIsLoading(false);
    }, 2500);
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
            <BackButton className="mb-6 bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        {profileData.profilePictureUrl ? (
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400">
                            <Image src={profileData.profilePictureUrl} alt="Profile" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {profileData.firstName && profileData.lastName 
                              ? `${profileData.firstName[0]}${profileData.lastName[0]}` 
                              : 'ST'}
                          </div>
                        )}
                        <button
                          onClick={() => document.getElementById('profile-picture-upload').click()}
                          className="absolute -bottom-1 -right-1 bg-cyan-500 hover:bg-cyan-600 rounded-full p-2 text-white transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleProfilePictureUpload}
                          className="hidden"
                          id="profile-picture-upload"
                        />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                          {profileData.firstName || profileData.lastName 
                            ? `${profileData.firstName} ${profileData.middleName} ${profileData.lastName}`.trim()
                            : 'Student Profile'}
                        </h1>
                        <div className="flex items-center gap-4 text-white/70 mb-2">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            {profileData.branch || 'Select Branch'} • {profileData.cgpa ? `CGPA: ${profileData.cgpa}` : 'Enter CGPA'}
                          </div>
                        </div>
                        <div className="text-white/70">
                          Complete your profile to get accurate placement predictions
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
                            Save Profile
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
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
              {/* Left Column - Student Information Form */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <User className="h-6 w-6 text-cyan-400" />
                        Student Information
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Complete your profile for accurate placement predictions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-white/90">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="Yagandla"
                              value={profileData.firstName}
                              onChange={(e) => handleInputChange('firstName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="middleName" className="text-white/90">Middle Name</Label>
                            <Input
                              id="middleName"
                              placeholder="Nithin"
                              value={profileData.middleName}
                              onChange={(e) => handleInputChange('middleName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-white/90">Last Name *</Label>
                            <Input
                              id="lastName"
                              placeholder="Goud"
                              value={profileData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>

                        {/* Profile Picture Section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Camera className="h-5 w-5 text-cyan-400" />
                            <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
                          </div>
                          <div className="space-y-4">
                            {profileData.profilePictureUrl ? (
                              <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
                                      <Image src={profileData.profilePictureUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <p className="text-white font-medium">Profile Picture</p>
                                      <p className="text-white/60 text-sm">
                                        {profileData.profilePicture ? `${(profileData.profilePicture.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => document.getElementById('profile-picture-upload-2').click()}
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Upload className="h-4 w-4 mr-1" />
                                      Change
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={handleRemoveProfilePicture}
                                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-colors">
                                <Camera className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                                <div className="space-y-2">
                                  <p className="text-white/90 font-medium">Upload your profile picture</p>
                                  <p className="text-white/60 text-sm">JPG or PNG files only, max 2MB</p>
                                </div>
                                <Button 
                                  type="button" 
                                  className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
                                  onClick={() => document.getElementById('profile-picture-upload-2').click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Choose Image File
                                </Button>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              onChange={handleProfilePictureUpload}
                              className="hidden"
                              id="profile-picture-upload-2"
                            />
                            <div className="text-xs text-white/50">
                              💡 Tip: A professional profile picture helps recruiters recognize you
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Academic Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Academic Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="degreeType" className="text-white/90">Degree Type *</Label>
                            <Select value={profileData.degreeType} onValueChange={(value) => handleInputChange('degreeType', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select your degree type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="B.Tech">B.Tech (Bachelor of Technology)</SelectItem>
                                <SelectItem value="B.E.">B.E. (Bachelor of Engineering)</SelectItem>
                                <SelectItem value="B.Sc">B.Sc (Bachelor of Science)</SelectItem>
                                <SelectItem value="BCA">BCA (Bachelor of Computer Applications)</SelectItem>
                                <SelectItem value="M.Tech">M.Tech (Master of Technology)</SelectItem>
                                <SelectItem value="M.E.">M.E. (Master of Engineering)</SelectItem>
                                <SelectItem value="M.Sc">M.Sc (Master of Science)</SelectItem>
                                <SelectItem value="MCA">MCA (Master of Computer Applications)</SelectItem>
                                <SelectItem value="MBA">MBA (Master of Business Administration)</SelectItem>
                                <SelectItem value="PhD">PhD (Doctor of Philosophy)</SelectItem>
                                <SelectItem value="Diploma">Diploma</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="branch" className="text-white/90">Branch/Department *</Label>
                            <Select value={profileData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select your branch" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Computer Science">Computer Science & Engineering</SelectItem>
                                <SelectItem value="Information Technology">Information Technology</SelectItem>
                                <SelectItem value="Electronics">Electronics & Communication Engineering</SelectItem>
                                <SelectItem value="Electrical">Electrical & Electronics Engineering</SelectItem>
                                <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                                <SelectItem value="Civil">Civil Engineering</SelectItem>
                                <SelectItem value="Chemical">Chemical Engineering</SelectItem>
                                <SelectItem value="Aerospace">Aerospace Engineering</SelectItem>
                                <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                                <SelectItem value="Data Science">Data Science & Analytics</SelectItem>
                                <SelectItem value="Artificial Intelligence">Artificial Intelligence & Machine Learning</SelectItem>
                                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                                <SelectItem value="Mathematics">Mathematics</SelectItem>
                                <SelectItem value="Physics">Physics</SelectItem>
                                <SelectItem value="Chemistry">Chemistry</SelectItem>
                                <SelectItem value="Business Administration">Business Administration</SelectItem>
                                <SelectItem value="Management">Management Studies</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="graduationStatus" className="text-white/90">Graduation Status *</Label>
                            <Select value={profileData.graduationStatus} onValueChange={(value) => handleInputChange('graduationStatus', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select graduation status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Pursuing">Pursuing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="completionYear" className="text-white/90">
                              {profileData.graduationStatus === 'Completed' ? 'Completion Year' : 'Expected Completion Year'} *
                            </Label>
                            <Select value={profileData.completionYear} onValueChange={(value) => handleInputChange('completionYear', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder={profileData.graduationStatus === 'Completed' ? 'Select completion year' : 'Select expected year'} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2026">2026</SelectItem>
                                <SelectItem value="2027">2027</SelectItem>
                                <SelectItem value="2028">2028</SelectItem>
                                <SelectItem value="2029">2029</SelectItem>
                                <SelectItem value="2030">2030</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="cgpa" className="text-white/90">CGPA (out of 10) *</Label>
                            <Input
                              id="cgpa"
                              type="number"
                              step="0.01"
                              max="10"
                              placeholder="8.5"
                              value={profileData.cgpa}
                              onChange={(e) => handleInputChange('cgpa', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tenthPercentage" className="text-white/90">10th Percentage *</Label>
                            <Input
                              id="tenthPercentage"
                              type="number"
                              max="100"
                              placeholder="85.5"
                              value={profileData.tenthPercentage}
                              onChange={(e) => handleInputChange('tenthPercentage', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="twelfthPercentage" className="text-white/90">12th Percentage *</Label>
                            <Input
                              id="twelfthPercentage"
                              type="number"
                              max="100"
                              placeholder="78.2"
                              value={profileData.twelfthPercentage}
                              onChange={(e) => handleInputChange('twelfthPercentage', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Skills and Interests */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Code className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Skills & Interests</h3>
                        </div>
                        <div>
                          <Label htmlFor="skills" className="text-white/90">Technical Skills (comma-separated) *</Label>
                          <Textarea
                            id="skills"
                            placeholder="Python, Java, React, Machine Learning, SQL, AWS, Docker"
                            value={profileData.skills}
                            onChange={(e) => handleInputChange('skills', e.target.value)}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="interests" className="text-white/90">Interests/Career Goals</Label>
                          <Select value={profileData.interests} onValueChange={(value) => handleInputChange('interests', value)}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select your primary interest" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Software Development">Software Development</SelectItem>
                              <SelectItem value="Data Science">Data Science & Analytics</SelectItem>
                              <SelectItem value="Machine Learning">Machine Learning/AI</SelectItem>
                              <SelectItem value="Web Development">Web Development</SelectItem>
                              <SelectItem value="Mobile Development">Mobile App Development</SelectItem>
                              <SelectItem value="DevOps">DevOps & Cloud</SelectItem>
                              <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                              <SelectItem value="Product Management">Product Management</SelectItem>
                              <SelectItem value="Research">Research & Development</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Experience & Activities</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-white/90">Internship Experience *</Label>
                            <RadioGroup 
                              value={profileData.internship} 
                              onValueChange={(value) => handleInputChange('internship', value)}
                              className="flex gap-6 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="internship-yes" />
                                <Label htmlFor="internship-yes" className="text-white/90">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="internship-no" />
                                <Label htmlFor="internship-no" className="text-white/90">No</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div>
                            <Label className="text-white/90">Hackathon Participation *</Label>
                            <RadioGroup 
                              value={profileData.hackathon} 
                              onValueChange={(value) => handleInputChange('hackathon', value)}
                              className="flex gap-6 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="hackathon-yes" />
                                <Label htmlFor="hackathon-yes" className="text-white/90">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="hackathon-no" />
                                <Label htmlFor="hackathon-no" className="text-white/90">No</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>

                        {/* Internship Certification Upload */}
                        {profileData.internship === 'yes' && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FileText className="h-5 w-5 text-cyan-400" />
                              <h3 className="text-lg font-semibold text-white">Internship Certification</h3>
                            </div>
                            <div className="space-y-4">
                              {!profileData.internshipCertification ? (
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-colors">
                                  <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                                  <div className="space-y-2">
                                    <p className="text-white/90 font-medium">Upload your internship certification</p>
                                    <p className="text-white/60 text-sm">PDF files only, max 5MB</p>
                                  </div>
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleInternshipCertificationUpload}
                                    className="hidden"
                                    id="internship-certification-upload"
                                  />
                                  <Button 
                                    type="button" 
                                    className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
                                    onClick={() => document.getElementById('internship-certification-upload').click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Choose PDF File
                                  </Button>
                                </div>
                              ) : (
                                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-8 w-8 text-cyan-400" />
                                      <div>
                                        <p className="text-white font-medium">{profileData.internshipCertificationName}</p>
                                        <p className="text-white/60 text-sm">
                                          {profileData.internshipCertification ? `${(profileData.internshipCertification.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleDownloadInternshipCertification}
                                        className="border-white/20 text-white hover:bg-white/10"
                                      >
                                        <Download className="h-4 w-4 mr-1" />
                                        Download
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRemoveInternshipCertification}
                                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="text-xs text-white/50">
                                💡 Tip: Upload your internship completion certificate or offer letter to validate your experience
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Projects and Achievements */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Projects & Achievements</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="majorProjects" className="text-white/90">Major Projects</Label>
                            <Input
                              id="majorProjects"
                              type="number"
                              min="0"
                              placeholder="2"
                              value={profileData.majorProjects}
                              onChange={(e) => handleInputChange('majorProjects', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="miniProjects" className="text-white/90">Mini Projects</Label>
                            <Input
                              id="miniProjects"
                              type="number"
                              min="0"
                              placeholder="5"
                              value={profileData.miniProjects}
                              onChange={(e) => handleInputChange('miniProjects', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor="certifications" className="text-white/90">Certifications</Label>
                            <Input
                              id="certifications"
                              type="number"
                              min="0"
                              placeholder="3"
                              value={profileData.certifications}
                              onChange={(e) => handleInputChange('certifications', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageSquare className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Additional Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="communicationRating" className="text-white/90">Communication Rating (1-5) *</Label>
                            <Select value={profileData.communicationRating} onValueChange={(value) => handleInputChange('communicationRating', value)}>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Rate your communication skills" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 - Poor</SelectItem>
                                <SelectItem value="2">2 - Below Average</SelectItem>
                                <SelectItem value="3">3 - Average</SelectItem>
                                <SelectItem value="4">4 - Good</SelectItem>
                                <SelectItem value="5">5 - Excellent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="backlogs" className="text-white/90">Number of Backlogs</Label>
                            <Input
                              id="backlogs"
                              type="number"
                              min="0"
                              placeholder="0"
                              value={profileData.backlogs}
                              onChange={(e) => handleInputChange('backlogs', e.target.value)}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Resume Upload Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-5 w-5 text-cyan-400" />
                          <h3 className="text-lg font-semibold text-white">Resume Upload</h3>
                        </div>
                        <div className="space-y-4">
                          {!profileData.resumeFile ? (
                            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-colors">
                              <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                              <div className="space-y-2">
                                <p className="text-white/90 font-medium">Upload your resume</p>
                                <p className="text-white/60 text-sm">PDF files only, max 5MB</p>
                              </div>
                              <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="resume-upload"
                              />
                              <Label htmlFor="resume-upload">
                                <Button 
                                  type="button" 
                                  className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
                                  onClick={() => document.getElementById('resume-upload').click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  Choose PDF File
                                </Button>
                              </Label>
                            </div>
                          ) : (
                            <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-8 w-8 text-cyan-400" />
                                  <div>
                                    <p className="text-white font-medium">{profileData.resumeFileName}</p>
                                    <p className="text-white/60 text-sm">
                                      {profileData.resumeFile ? `${(profileData.resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDownloadResume}
                                    className="border-white/20 text-white hover:bg-white/10"
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRemoveResume}
                                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="text-xs text-white/50">
                            💡 Tip: A well-formatted resume with relevant keywords can improve your placement predictions
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={handlePredict}
                        disabled={isLoading || !profileData.firstName || !profileData.lastName || !profileData.degreeType || !profileData.branch || !profileData.graduationStatus || !profileData.completionYear || !profileData.cgpa}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-4 text-lg"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="flex items-center gap-2"
                          >
                            <Zap className="h-5 w-5" />
                            Analyzing Your Profile...
                          </motion.div>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Brain className="h-5 w-5" />
                            Predict My Placement
                          </span>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Column - Prediction Results */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <AnimatePresence mode="wait">
                    {prediction ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                      >
                        {/* Main Results Card */}
                        <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-md border-white/20 text-white">
                          <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                              <Sparkles className="h-6 w-6 text-yellow-400" />
                              AI Prediction Results
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-green-400 mb-2">
                                  {prediction.placementChance}%
                                </div>
                                <div className="text-white/80">Placement Chance</div>
                                <Progress 
                                  value={prediction.placementChance} 
                                  className="mt-2 h-2 bg-white/20"
                                />
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-cyan-400 mb-2">
                                  ₹{(prediction.expectedSalary / 100000).toFixed(1)}L
                                </div>
                                <div className="text-white/80">Expected Salary (LPA)</div>
                                <div className="text-sm text-green-400 mt-1">
                                  {prediction.confidence}% confidence
                                </div>
                              </div>
                            </div>
                            
                            {prediction.topSkills.length > 0 && (
                              <div>
                                <div className="text-sm text-white/80 mb-2">Top Skills Detected:</div>
                                <div className="flex flex-wrap gap-2">
                                  {prediction.topSkills.map((skill, index) => (
                                    <Badge key={index} className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>

                        {/* AI Recommendations */}
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                          <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Target className="h-5 w-5 text-yellow-400" />
                              AI Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {prediction.recommendations.map((rec, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                                >
                                  <Star className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                                  <span className="text-white/90">{rec}</span>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Personalized Skill Recommendations */}
                        {prediction.skillRecommendations && prediction.skillRecommendations.length > 0 && (
                          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border-purple-400/30 text-white">
                            <CardHeader>
                              <CardTitle className="text-xl flex items-center gap-2">
                                <Code className="h-5 w-5 text-purple-400" />
                                Personalized Skill Recommendations
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                Skills to focus on based on your profile and career goals
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {prediction.skillRecommendations.map((skillRec, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-lg bg-white/10 border border-purple-400/30"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-semibold text-purple-300">{skillRec.category}</h4>
                                      <Badge className={`${
                                        skillRec.priority === 'High' ? 'bg-red-500/30 text-red-300 border-red-400/30' :
                                        skillRec.priority === 'Medium' ? 'bg-yellow-500/30 text-yellow-300 border-yellow-400/30' :
                                        'bg-green-500/30 text-green-300 border-green-400/30'
                                      }`}>
                                        {skillRec.priority} Priority
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      {skillRec.skills.map((skill, skillIndex) => (
                                        <Badge key={skillIndex} className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <p className="text-sm text-white/70">{skillRec.reason}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Personalized Learning Paths */}
                        {prediction.learningPaths && prediction.learningPaths.length > 0 && (
                          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-md border-cyan-400/30 text-white">
                            <CardHeader>
                              <CardTitle className="text-xl flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-cyan-400" />
                                Personalized Learning Paths
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                Structured roadmaps to achieve your career goals
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-6">
                                {prediction.learningPaths.map((path, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="p-4 rounded-lg bg-white/10 border border-cyan-400/30"
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-semibold text-cyan-300 text-lg">{path.title}</h4>
                                      <Badge className="bg-cyan-500/30 text-cyan-200 border-cyan-400/30">
                                        {path.duration}
                                      </Badge>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                      {path.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start gap-3">
                                          <div className="w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center text-xs font-bold text-cyan-300 mt-0.5 flex-shrink-0">
                                            {stepIndex + 1}
                                          </div>
                                          <span className="text-white/80 text-sm">{step}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="p-3 rounded-lg bg-green-500/20 border border-green-400/30">
                                      <div className="flex items-center gap-2 mb-1">
                                        <Trophy className="h-4 w-4 text-green-400" />
                                        <span className="font-semibold text-green-300">Expected Outcome</span>
                                      </div>
                                      <p className="text-sm text-green-200">{path.outcome}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                      >
                        <Brain className="h-24 w-24 text-cyan-400/50 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold text-white/80 mb-4">
                          Ready for AI Analysis
                        </h3>
                        <p className="text-white/60">
                          Complete your profile and click predict to get personalized placement insights
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                © 2026 AI PlacementPredictor. Powered by JBREC students.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}