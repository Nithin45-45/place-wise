import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/ui/back-button';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Users, 
  Target,
  Award,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Moon */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16">
          <Image src="https://static.wixstatic.com/media/52cebc_37cb5a707ec94be0ac5655826a6c4536~mv2.png?originWidth=128&originHeight=128" alt="Beautiful AI-generated moon in the night sky" className="w-24 h-24 md:w-32 md:h-32 opacity-90 drop-shadow-2xl" />
        </div>

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
                <Link to="/about" className="text-cyan-400 font-medium">
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
                About
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 block">
                  AI PlacementPredictor
                </span>
              </h1>
              <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 font-paragraph">
                Revolutionizing career guidance through cutting-edge artificial intelligence and machine learning technologies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6 bg-black/20 backdrop-blur-sm">
          <div className="max-w-[120rem] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white mb-6 font-heading">
                  Our Mission
                </h2>
                <p className="text-lg text-white/80 mb-6 font-paragraph leading-relaxed">
                  We believe every student deserves personalized career guidance backed by data-driven insights. 
                  Our AI-powered platform analyzes thousands of placement patterns to provide accurate predictions 
                  and actionable recommendations.
                </p>
                <p className="text-lg text-white/80 font-paragraph leading-relaxed">
                  By combining academic performance, skills assessment, and market trends, we help students 
                  make informed decisions about their career paths and maximize their placement potential.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Target className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl">95%</CardTitle>
                    <CardDescription className="text-white/70">Accuracy Rate</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Users className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl">10K+</CardTitle>
                    <CardDescription className="text-white/70">Students Helped</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl">500+</CardTitle>
                    <CardDescription className="text-white/70">Partner Companies</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white text-center">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl">85%</CardTitle>
                    <CardDescription className="text-white/70">Success Rate</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
                Why Choose AI PlacementPredictor?
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-paragraph">
                Our platform combines advanced AI algorithms with comprehensive data analysis to deliver unparalleled career guidance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full">
                  <CardHeader>
                    <Brain className="h-12 w-12 text-cyan-400 mb-4" />
                    <CardTitle className="text-xl">Advanced AI Technology</CardTitle>
                    <CardDescription className="text-white/70">
                      State-of-the-art machine learning algorithms that continuously learn and improve from placement data.
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
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-green-400 mb-4" />
                    <CardTitle className="text-xl">Data Security</CardTitle>
                    <CardDescription className="text-white/70">
                      Your personal information is protected with enterprise-grade security and privacy measures.
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
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full">
                  <CardHeader>
                    <Clock className="h-12 w-12 text-yellow-400 mb-4" />
                    <CardTitle className="text-xl">Real-time Analysis</CardTitle>
                    <CardDescription className="text-white/70">
                      Get instant predictions and recommendations based on the latest market trends and data.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our Core Values
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: "Accuracy", description: "Providing reliable and precise predictions" },
                { icon: Users, title: "Student-Centric", description: "Putting student success at the center of everything" },
                { icon: Brain, title: "Innovation", description: "Continuously improving through AI advancement" },
                { icon: Shield, title: "Trust", description: "Building confidence through transparency and reliability" }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                    <value.icon className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </div>
                </motion.div>
              ))}
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
                Ready to Predict Your Future?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-paragraph">
                Join thousands of students who have successfully predicted and achieved their career goals with our AI platform.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3">
                <Link to="/">Start Predicting Now</Link>
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