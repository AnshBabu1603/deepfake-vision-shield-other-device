
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onScrollToSection: (section: string) => void;
}

export function Navigation({ onScrollToSection }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'detect', label: 'Detect' },
    { id: 'about', label: 'About' },
    { id: 'how-to', label: 'How To' },
    { id: 'faq', label: 'FAQs' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine which section is currently in view
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));
      
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (sectionElements[i].offset <= scrollPosition) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  return (
    <header 
      className={cn(
        "desktop-nav transition-all duration-300",
        scrolled ? "shadow-md py-2" : "py-4"
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-deepfake" />
          <span className="font-bold text-lg">DeepFake<span className="text-deepfake">Shield</span></span>
        </div>
        
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "font-medium",
                    activeSection === section.id && "text-deepfake" 
                  )}
                  onClick={() => onScrollToSection(section.id)}
                >
                  {section.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        <nav className="md:hidden">
          <Button variant="outline" size="sm">Menu</Button>
        </nav>
      </div>
      
      {/* Mobile navigation at bottom */}
      <div className="md:hidden mobile-nav">
        <ul className="flex items-center justify-between px-2">
          {sections.map((section) => (
            <li key={section.id}>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs",
                  activeSection === section.id 
                    ? "bg-deepfake text-white" 
                    : "text-gray-600"
                )}
                onClick={() => onScrollToSection(section.id)}
              >
                {section.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
