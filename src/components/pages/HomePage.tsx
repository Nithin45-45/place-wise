import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Zap
} from 'lucide-react';

export default function HomePage() {
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
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Login / Register
                </Button>
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
                Harness the power of artificial intelligence to predict your placement success. 
                Get personalized insights, salary predictions, and career recommendations.
              </p>
            </motion.div>

            {/* Main Prediction Interface */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Target className="h-6 w-6 text-cyan-400" />
                      Enter Your Details
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Provide your academic and experience details for AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="cgpa" className="text-white/90">CGPA (out of 10)</Label>
                      <Input
                        id="cgpa"
                        type="number"
                        step="0.01"
                        max="10"
                        placeholder="8.5"
                        value={formData.cgpa}
                        onChange={(e) => handleInputChange('cgpa', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="skills" className="text-white/90">Technical Skills (comma-separated)</Label>
                      <Textarea
                        id="skills"
                        placeholder="React, Python, Machine Learning, SQL, AWS"
                        value={formData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="internships" className="text-white/90">Internships</Label>
                        <Input
                          id="internships"
                          type="number"
                          placeholder="2"
                          value={formData.internships}
                          onChange={(e) => handleInputChange('internships', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="projects" className="text-white/90">Projects</Label>
                        <Input
                          id="projects"
                          type="number"
                          placeholder="5"
                          value={formData.projects}
                          onChange={(e) => handleInputChange('projects', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                    
                    <Button
                      onClick={handlePredict}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="flex items-center gap-2"
                        >
                          <Zap className="h-5 w-5" />
                          Analyzing...
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

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
                          <div className="grid grid-cols-2 gap-6">
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
                              <div className="text-4xl font-bold text-cyan-400 mb-2 flex items-center justify-center gap-1">
                                <DollarSign className="h-8 w-8" />
                                {(prediction.expectedSalary / 1000).toFixed(0)}K
                              </div>
                              <div className="text-white/80">Expected Salary</div>
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
                            <Lightbulb className="h-5 w-5 text-yellow-400" />
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
                                <ChevronRight className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                                <span className="text-white/90">{rec}</span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
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
                        Fill in your details and click predict to get your personalized placement insights
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
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
      </div>
    </div>
  );
}