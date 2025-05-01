import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";

interface Skin {
  name: string;
  img: string;
}

interface SkinDisplayProps {
  skin: Skin;
  onRedirectComplete: () => void;
}

const SkinDisplay = ({ skin, onRedirectComplete }: SkinDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(5);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onRedirectComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onRedirectComplete]);
  
  return (
    <div className="valorant-card bg-[#1F2731]/90 p-8 mx-auto max-w-2xl animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center bg-[#0F1923]/50 p-2 w-full mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4AFF8F]">
            🎉 You won: {skin.name}
          </h2>
        </div>
        
        <div className="relative overflow-hidden rounded border-2 border-[#ECE8E1]/30">
          <img 
            src={skin.img} 
            alt={skin.name} 
            className="w-full max-w-lg object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/70 to-transparent"></div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xl mb-4">Login to claim your reward!</p>
          <CountdownTimer timeLeft={timeLeft} />
        </div>
      </div>
    </div>
  );
};

export default SkinDisplay;
