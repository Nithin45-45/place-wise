import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function BackButton({ 
  className = "mb-6", 
  variant = "outline",
  size = "default"
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      onClick={handleBack}
      variant={variant}
      size={size}
      className={className}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}