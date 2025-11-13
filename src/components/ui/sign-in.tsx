import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useMember } from '@/integrations';
import { Link } from 'react-router-dom';

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
  cardClassName = "w-fit max-w-xl mx-auto text-white",
  buttonClassName = "w-full h-10 max-w-sm mx-auto bg-cyan-500 hover:bg-cyan-600",
  buttonText = "Sign In"
}: SignInProps) {
  const { actions } = useMember();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Night Sky Background - matching HomePage */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Shooting Stars */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-white to-transparent opacity-70 animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${Math.random() * 50}%`,
                transform: `rotate(${30 + Math.random() * 30}deg)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={className}>
        <Card className={`${cardClassName} bg-black/20 backdrop-blur-md border-white/10`}>
          <CardHeader className="text-center space-y-6 py-10 px-10">
            {/* Large Brain Image */}
            <div className="flex justify-center mb-6">
              <Image
                src="https://static.wixstatic.com/media/52cebc_e0d39c3d5c434f3d8c5a12299105e4a9~mv2.png?originWidth=384&originHeight=384"
                alt="AI Brain Illustration"
                width={200}
                className="w-48 h-48 object-contain"
              />
            </div>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-white/80">{message}</CardDescription>
          </CardHeader>
          <CardContent className="text-center px-10 pb-10 space-y-4">
            <Button onClick={actions.login} className={buttonClassName}>
              {buttonText}
            </Button>
            <div>
              <Link 
                to="/" 
                className="text-white/70 hover:text-white transition-colors underline text-sm"
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
