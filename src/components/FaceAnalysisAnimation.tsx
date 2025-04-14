
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function FaceAnalysisAnimation({ className }: { className?: string }) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    
    let rotation = { x: 0, y: 0 };
    const speed = { x: 0.2, y: 0.5 };
    
    const animate = () => {
      if (!cube) return;
      rotation.x += speed.x;
      rotation.y += speed.y;
      cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calculate mouse position relative to the center of the container
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate the distance from the center in percentage (-50% to 50%)
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply tilt effect
      speed.x = 0.2 + distanceY * 0.5;
      speed.y = 0.5 + distanceX * 0.5;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={cn("perspective-container h-96 w-full", className)}
    >
      <div className="flex justify-center items-center h-full">
        <div className="relative w-full max-w-md">
          {/* Floating face analysis box */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4
                       bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg 
                       p-3 text-sm font-mono shadow-lg animate-float"
          >
            <div className="text-xs text-white/70 mb-1">Analyzing facial features...</div>
            <div className="grid grid-cols-5 gap-1 mb-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 rounded-full ${i < 8 ? 'bg-deepfake' : 'bg-white/30'}`}
                ></div>
              ))}
            </div>
            <div className="text-right text-xs text-deepfake">Completed: 80%</div>
          </div>
          
          {/* 3D Rotating Cube */}
          <div 
            ref={cubeRef} 
            className="face-cube scene-3d"
          >
            <div className="face face-front flex items-center justify-center">
              <div className="text-white text-xl font-semibold glitch-effect" data-text="DeepFake">
                DeepFake
              </div>
            </div>
            <div className="face face-back flex items-center justify-center">
              <div className="text-white text-xl font-semibold">Analysis</div>
            </div>
            <div className="face face-left flex items-center justify-center">
              <div className="text-white text-xl font-semibold">Detection</div>
            </div>
            <div className="face face-right flex items-center justify-center">
              <div className="text-white text-xl font-semibold">Security</div>
            </div>
            <div className="face face-top flex items-center justify-center">
              <div className="text-white text-xl font-semibold">Shield</div>
            </div>
            <div className="face face-bottom flex items-center justify-center">
              <div className="text-white text-xl font-semibold">Technology</div>
            </div>
          </div>
          
          {/* Floating data points */}
          <div className="absolute top-1/4 right-1/4 bg-white/30 backdrop-blur-md rounded-full h-10 w-10 
                         flex items-center justify-center animate-pulse-glow shadow-lg">
            <div className="text-xs font-mono">AI</div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/4 bg-deepfake/30 backdrop-blur-md rounded-full h-8 w-8 
                         flex items-center justify-center animate-float shadow-lg">
            <div className="text-xs font-mono">ML</div>
          </div>
          
          {/* Connected lines animation */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            <line 
              x1="50%" y1="50%" 
              x2="25%" y2="75%" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <line 
              x1="50%" y1="50%" 
              x2="75%" y2="25%" 
              stroke="rgba(116,235,213,0.5)" 
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
