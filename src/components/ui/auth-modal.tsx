/**
 * Reusable Auth Modal Component
 * Reduces code duplication across pages and improves performance
 */

import React, { useState } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Sparkles, Github } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

interface AuthErrors {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  general: string;
}

export const AuthModal = React.memo(({
  open,
  onOpenChange,
  title = 'Welcome to AI PlacementPredictor',
  description = 'Sign in to access your personalized placement predictions',
  onSuccess
}: AuthModalProps) => {
  const { actions } = useMember();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState<AuthFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [authErrors, setAuthErrors] = useState<AuthErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    general: ''
  });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleAuthInputChange = (field: keyof AuthFormState, value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }));
    setAuthErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateAuthForm = (): boolean => {
    const errors: AuthErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      general: ''
    };

    if (authMode === 'signup') {
      if (!authForm.fullName.trim()) {
        errors.fullName = 'Full name is required';
      }
      if (!authForm.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!authForm.password) {
        errors.password = 'Password is required';
      } else if (authForm.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      if (!authForm.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (authForm.password !== authForm.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!authForm.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!authForm.password) {
        errors.password = 'Password is required';
      }
    }

    setAuthErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const resetAuthForm = () => {
    setAuthForm({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
    setAuthErrors({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      general: ''
    });
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAuthForm()) {
      return;
    }

    setIsAuthLoading(true);

    try {
      if (authMode === 'signup') {
        const newStudentProfile = {
          _id: crypto.randomUUID(),
          fullName: authForm.fullName,
          email: authForm.email,
          studentId: `STU-${Date.now()}`,
          major: '',
          gpa: 0,
          graduationDate: '',
          resumeUrl: '',
          profilePicture: ''
        };

        await BaseCrudService.create('studentprofiles', newStudentProfile);
      }

      resetAuthForm();
      onOpenChange(false);
      onSuccess?.();
      actions.login();
    } catch (error) {
      console.error('Error during authentication:', error);
      setAuthErrors(prev => ({
        ...prev,
        general: authMode === 'signup'
          ? 'Failed to create account. Please try again.'
          : 'Login failed. Please try again.'
      }));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleModalChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      resetAuthForm();
      setAuthMode('login');
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // Redirect to OAuth provider
    resetAuthForm();
    onOpenChange(false);
    actions.login();
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-lg bg-white border-0 text-foreground shadow-2xl">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="relative">
              <Brain className="h-12 w-12 text-primary" />
              <Sparkles className="h-6 w-6 text-brandaccent absolute -top-1 -right-1" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center font-heading text-foreground">
            {title}
          </DialogTitle>
          <p className="text-center text-muted-foreground font-paragraph">
            {description}
          </p>
        </DialogHeader>

        {authErrors.general && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm">
            {authErrors.general}
          </div>
        )}

        <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-subtlebackground/50 h-12">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 mt-8">
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={authForm.email}
                  onChange={(e) => handleAuthInputChange('email', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.email
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.email && (
                  <p className="text-sm text-destructive">{authErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={authForm.password}
                  onChange={(e) => handleAuthInputChange('password', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.password
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.password && (
                  <p className="text-sm text-destructive">{authErrors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? 'Signing In...' : 'Sign In to Your Account'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => handleOAuthLogin('google')}
                disabled={isAuthLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => handleOAuthLogin('github')}
                disabled={isAuthLoading}
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 mt-8">
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={authForm.fullName}
                  onChange={(e) => handleAuthInputChange('fullName', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.fullName
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.fullName && (
                  <p className="text-sm text-destructive">{authErrors.fullName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={authForm.email}
                  onChange={(e) => handleAuthInputChange('email', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.email
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.email && (
                  <p className="text-sm text-destructive">{authErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a secure password"
                  value={authForm.password}
                  onChange={(e) => handleAuthInputChange('password', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.password
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.password && (
                  <p className="text-sm text-destructive">{authErrors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={authForm.confirmPassword}
                  onChange={(e) => handleAuthInputChange('confirmPassword', e.target.value)}
                  className={`h-12 border-2 transition-colors ${
                    authErrors.confirmPassword
                      ? 'border-destructive focus:border-destructive'
                      : 'border-gray-200 focus:border-primary'
                  }`}
                  disabled={isAuthLoading}
                />
                {authErrors.confirmPassword && (
                  <p className="text-sm text-destructive">{authErrors.confirmPassword}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? 'Creating Account...' : 'Create Your Account'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => handleOAuthLogin('google')}
                disabled={isAuthLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => handleOAuthLogin('github')}
                disabled={isAuthLoading}
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
          By continuing, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 font-medium">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 font-medium">
            Privacy Policy
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

AuthModal.displayName = 'AuthModal';
