
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function AnimatedTitle({ title, subtitle, className }: AnimatedTitleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("text-center", className)}>
      <h1 
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-extrabold headline-text mb-4",
          "relative overflow-hidden",
          isVisible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-1000"
        )}
      >
        {title.split('').map((char, index) => (
          <span 
            key={index}
            className={cn(
              "inline-block",
              isVisible ? "animate-wave" : "opacity-0",
              index % 3 === 1 ? "animate-wave-delay1" : "",
              index % 3 === 2 ? "animate-wave-delay2" : ""
            )}
            style={{ 
              animationDelay: `${index * 0.05}s`,
              transitionDelay: `${index * 0.05}s` 
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      
      {subtitle && (
        <p 
          className={cn(
            "text-lg md:text-xl text-deepfake-dark/80 max-w-2xl mx-auto",
            isVisible ? "animate-blur-in" : "opacity-0"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
