import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';
import { Link } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background - matching home page */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Moon */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16">
          <img 
            src="https://static.wixstatic.com/media/52cebc_4e3caa22a8e9444ba7c96e71be912d00~mv2.png?originWidth=128&originHeight=128"
            alt="Beautiful AI-generated moon in the night sky"
            className="w-24 h-24 md:w-32 md:h-32 opacity-90 drop-shadow-2xl"
          />
        </div>

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
              <CardHeader className="text-center space-y-6 py-12 px-10">
                {/* Professional Brain Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Brain className="h-16 w-16 text-primary" />
                    <Sparkles className="h-8 w-8 text-brandaccent absolute -top-2 -right-2" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-foreground font-heading">
                  {title}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground font-paragraph">
                  {message}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center px-10 pb-12 space-y-6">
                <Button onClick={actions.login} className={buttonClassName}>
                  {buttonText}
                </Button>
                <div>
                  <Link 
                    to="/" 
                    className="text-muted-foreground hover:text-foreground transition-colors underline text-sm font-medium"
                  >
                    Return to Home
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
