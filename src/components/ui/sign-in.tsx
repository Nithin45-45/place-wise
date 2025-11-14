import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Mail, Lock, User, Phone } from 'lucide-react';
import { useState } from 'react';

interface SignInProps {
  title?: string;
  message?: string;
  className?: string;
  cardClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
}

export function SignIn({
  title = "Sign In Required",
  message = "Please sign in to access this content.",
  className = "min-h-screen flex items-center justify-center px-4",
  cardClassName = "w-fit max-w-xl mx-auto",
  buttonClassName = "w-full h-12 max-w-sm mx-auto bg-primary hover:bg-primary/90 text-primary-foreground",
  buttonText = "Sign In"
}: SignInProps) {
  const { actions } = useMember();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate form submission - in a real app, this would call your authentication API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, redirect to the Wix login since we need to integrate with Wix Members
      actions.login();
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background - matching home page */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Water Reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-800/50 to-transparent">
          <div className="absolute bottom-0 left-1/4 w-32 h-16 bg-black opacity-20 transform scale-y-[-1]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Laptop Image */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <Image 
                src="https://static.wixstatic.com/media/52cebc_9191e6cd8d65454c850f30c1cb08de30~mv2.png?originWidth=384&originHeight=256"
                alt="Modern laptop for AI placement prediction"
                width={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Sign In Card */}
          <div className={className}>
            <Card className={`${cardClassName} bg-white/95 backdrop-blur-sm border-2 border-gray-100 shadow-2xl`}>
              <CardHeader className="text-center space-y-6 py-8 px-10">
                {/* Professional Brain Icon */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Brain className="h-12 w-12 text-primary" />
                    <Sparkles className="h-6 w-6 text-brandaccent absolute -top-1 -right-1" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground font-heading">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground font-paragraph">
                  {isLogin ? 'Sign in to access your placement predictions' : 'Join us to get AI-powered placement insights'}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-10 pb-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                          First Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="pl-10 h-11"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                          Last Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="pl-10 h-11"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className={`${buttonClassName} mt-6`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </Button>
                </form>

                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={actions.login} 
                    className="w-full h-11 border-gray-200 hover:bg-gray-50"
                  >
                    Continue with Social Login
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>

                  <div>
                    <Link 
                      to="/" 
                      className="text-muted-foreground hover:text-foreground transition-colors underline text-sm font-medium"
                    >
                      Return to Home
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
