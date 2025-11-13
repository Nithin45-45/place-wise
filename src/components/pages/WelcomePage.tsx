import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-center space-y-8 px-6 animate-fade-in">
        <div className="flex justify-center">
          <Brain className="h-24 w-24 text-cyan-400 animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white font-heading">
          Welcome to your
        </h1>
        
        <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-heading">
          bright future.
        </h2>
        
        <p className="text-xl md:text-2xl text-white/80 font-paragraph mt-8">
          Click anywhere to continue
        </p>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}