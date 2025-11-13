import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Night Sky Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
        {/* Moon */}
        <div className="absolute top-8 right-8 md:top-12 md:right-16">
          <Image 
            src="https://static.wixstatic.com/media/52cebc_51409367d1a347ec832ffcdf6adcca68~mv2.png?originWidth=128&originHeight=128"
            alt="Beautiful AI-generated moon in the night sky"
            className="w-24 h-24 md:w-32 md:h-32 opacity-90 drop-shadow-2xl"
          />
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
      <div className="relative z-10 min-h-screen flex items-center justify-center cursor-pointer" onClick={handleClick}>
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