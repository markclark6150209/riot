import { useState, useEffect } from "react";

interface SpinWheelProps {
  isSpinning: boolean;
}

const SpinWheel = ({ isSpinning }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isSpinning) {
      // Random rotation between 1080 and 1800 degrees (3-5 full rotations)
      const rotations = 3 + Math.floor(Math.random() * 3);
      const degrees = rotations * 360;
      
      // Add extra degrees for the specific prize (0-4)
      const random = Math.floor(Math.random() * 5);
      const extraDegrees = Math.floor(random * (360 / 5));
      
      // Set final rotation value
      const finalRotation = degrees + extraDegrees;
      setRotation(finalRotation);
    }
  }, [isSpinning]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <div 
        className="spinner-wheel w-full h-full rounded-full border-4 border-[#1F2731] shadow-lg"
        style={{ 
          transform: isSpinning ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0F1923] rounded-full border-2 border-[#FF4655] flex items-center justify-center">
          <svg 
            width="70%" 
            height="70%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M38.4146 68.3585L38.4146 32.3082L55.7631 32.3082L68.4146 50.3334L55.7631 68.3585L38.4146 68.3585Z" 
              fill="#FF4655"
            />
            <path 
              d="M31.5855 68.3585L31.5855 32.3082L14.2369 32.3082L1.58545 50.3334L14.2369 68.3585L31.5855 68.3585Z" 
              fill="#FF4655"
            />
            <path 
              d="M50 42.2705L50 0L69.7656 0L100 25.1352L69.7656 50.2705L50 42.2705Z" 
              fill="#FF4655"
            />
            <path 
              d="M50 60.2705L50 102.541L69.7656 102.541L100 77.4056L69.7656 52.2705L50 60.2705Z" 
              fill="#FF4655"
            />
            <path 
              d="M50 42.2705L50 0L30.2344 0L0 25.1352L30.2344 50.2705L50 42.2705Z" 
              fill="#FF4655"
            />
            <path 
              d="M50 60.2705L50 102.541L30.2344 102.541L0 77.4056L30.2344 52.2705L50 60.2705Z" 
              fill="#FF4655"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-[12px] border-l-transparent border-r-transparent border-b-[#FF4655]"></div>
      </div>
    </div>
  );
};

export default SpinWheel;
