import { Shield, CheckCircle, Lock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

function FeatureCard({ icon, title, description, className, style }: FeatureCardProps) {
  return (
    <div className={cn(
      "bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-white/20",
      "opacity-0 transform translate-y-8",
      "hover:bg-white/80 transition-all duration-300",
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-deepfake/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="py-16">
      <h2 className="section-title headline-text">About Our Technology</h2>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600">
        DeFakeX uses state-of-the-art deep learning models trained on thousands of real and manipulated 
        media samples. Our algorithm analyzes subtle artifacts in facial movements, lighting inconsistencies, 
        and compression patterns to detect deepfakes with industry-leading accuracy.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <FeatureCard 
          icon={<Shield className="h-6 w-6 text-deepfake" />}
          title="Video Analysis"
          description="Advanced processing of video content to detect manipulation and synthetic generation patterns."
          className="animate-delayed-slide-up"
        />
        <FeatureCard 
          icon={<Zap className="h-6 w-6 text-deepfake" />}
          title="Face Swapped Videos Detection"
          description="Specialized algorithms to identify facial replacement and manipulation in video content."
          className="animate-delayed-slide-up"
          style={{ animationDelay: "0.2s" }}
        />
        <FeatureCard 
          icon={<CheckCircle className="h-6 w-6 text-deepfake" />}
          title="Detailed Confidence Scoring"
          description="Precise probability assessments with comprehensive breakdown of detected anomalies."
          className="animate-delayed-slide-up"
          style={{ animationDelay: "0.4s" }}
        />
        <FeatureCard 
          icon={<Lock className="h-6 w-6 text-deepfake" />}
          title="Privacy-focused Processing"
          description="All analysis happens securely with immediate deletion after processing is complete."
          className="animate-delayed-slide-up"
          style={{ animationDelay: "0.6s" }}
        />
      </div>
    </div>
  );
}
