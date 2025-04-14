
import { FileVideo, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  "Click 'Choose Video' to select a video file",
  "Wait for the file to upload",
  "Press 'Start Analysis' to begin processing",
  "View detailed results and confidence score"
];

export function HowToSection() {
  return (
    <div className="py-16">
      <h2 className="section-title headline-text">How To Use</h2>
      
      <div className="max-w-3xl mx-auto glass-card p-6 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <div className="bg-deepfake/10 rounded-lg p-4 flex items-center justify-center">
              <FileVideo className="h-24 w-24 text-deepfake" />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Video Analysis Method</h3>
            <ol className="space-y-3">
              {steps.map((step, index) => (
                <li 
                  key={index}
                  className={cn(
                    "flex items-center gap-3 opacity-0 animate-slide-right",
                    "p-3 rounded-lg bg-white/40 shadow-sm"
                  )}
                  style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-deepfake flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="h-4 w-4 text-deepfake" />
            <span>For best results, ensure videos are high quality and well-lit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
