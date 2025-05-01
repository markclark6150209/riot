import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SpinWheel from "@/components/SpinWheel";
import SkinDisplay from "@/components/SkinDisplay";
import { skinData } from "@/lib/skins";

const Home = () => {
  const [hasSpun, setHasSpun] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setLocation] = useLocation();

  // Check if user has already spun when the component mounts
  useEffect(() => {
    const alreadySpun = localStorage.getItem("alreadySpun") === "true";
    if (alreadySpun) {
      setHasSpun(true);
      setErrorMessage("❌ You have already used your spin!");
    }
  }, []);

  const handleSpin = () => {
    if (hasSpun || isSpinning) return;
    
    setIsSpinning(true);
    setErrorMessage("Spinning...");
    
    // Select a random skin
    const randomIndex = Math.floor(Math.random() * skinData.length);
    const skin = skinData[randomIndex];
    
    // Wait for the spinning animation to complete (3 seconds)
    setTimeout(() => {
      setSelectedSkin(skin);
      setHasSpun(true);
      setIsSpinning(false);
      localStorage.setItem("alreadySpun", "true");
    }, 3000);
  };

  // Redirect to login after winning
  const handleRedirectToLogin = () => {
    setLocation("/login");
  };

  return (
    <div className="min-h-screen hexagon-bg overflow-x-hidden font-valorant text-[#ECE8E1]">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Logo/Header */}
        <div className="flex justify-center mb-8">
          <div className="valorant-card bg-[#0F1923] inline-block px-8 py-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-wider uppercase text-[#FF4655]">
              <span className="inline-block transform -rotate-3">Spin</span> 
              <span className="text-[#ECE8E1]">&</span> 
              <span className="inline-block transform rotate-3">Win</span>
            </h1>
            <p className="text-lg md:text-xl mt-2 text-[#ECE8E1]/80">
              A FREE VALORANT PREMIUM SKIN
            </p>
          </div>
        </div>
        
        {!selectedSkin ? (
          <div id="spinner-section" className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <SpinWheel isSpinning={isSpinning} />
              
              {/* Instructions */}
              <div className="valorant-card bg-[#0F1923]/80 p-6 max-w-md">
                <h2 className="text-2xl font-bold mb-4 uppercase">How It Works:</h2>
                <ul className="list-disc list-inside space-y-2 text-[#ECE8E1]/90">
                  <li>Click the SPIN button to try your luck</li>
                  <li>Win one of five premium Valorant skins</li>
                  <li>Sign in to claim your prize</li>
                  <li>Skin will be added to your account</li>
                </ul>
                <p className="mt-4 text-sm text-[#ECE8E1]/70">
                  * Limited to one spin per user. Prize must be claimed within 24 hours.
                </p>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleSpin}
                disabled={hasSpun || isSpinning}
                className={`valorant-button bg-[#FF4655] text-white text-xl md:text-2xl uppercase py-3 px-16 font-bold tracking-wider transition duration-300 ${
                  hasSpun || isSpinning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:glow-effect hover:brightness-110 focus:outline-none"
                }`}
              >
                SPIN NOW
              </button>
            </div>
            
            {/* Result Text */}
            <p className={`h-8 mt-4 text-lg text-center ${
              errorMessage === "❌ You have already used your spin!" 
                ? "text-[#FF4A4A]" 
                : ""
            }`}>
              {errorMessage}
            </p>
          </div>
        ) : (
          <SkinDisplay 
            skin={selectedSkin} 
            onRedirectComplete={handleRedirectToLogin} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;
