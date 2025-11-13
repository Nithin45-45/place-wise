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
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className={className}>
        <Card className={`${cardClassName} bg-white border-2 border-gray-100 shadow-xl`}>
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
  );
}
