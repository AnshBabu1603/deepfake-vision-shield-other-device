import { useRef } from 'react';
import { AnimatedTitle } from '@/components/AnimatedTitle';
import { FaceAnalysisAnimation } from '@/components/FaceAnalysisAnimation';
import { FileUploadAnalyzer } from '@/components/FileUploadAnalyzer';
import { AboutSection } from '@/components/AboutSection';
import { HowToSection } from '@/components/HowToSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { theme, setTheme } = useTheme();
  
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    detect: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    howTo: useRef<HTMLElement>(null),
    faq: useRef<HTMLElement>(null)
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation onScrollToSection={scrollToSection} />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section id="home" ref={sectionRefs.home} className="min-h-[80vh] flex flex-col items-center justify-center px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <AnimatedTitle
                  title="Advanced DeepFake Detection"
                  subtitle="Our cutting-edge AI technology helps you identify manipulated media with over 95% accuracy. Protect yourself from misinformation."
                  className="text-left"
                />
                
                <div className="mt-8 opacity-0 animate-delayed-slide-up">
                  <Button 
                    className="deepfake-button group"
                    onClick={() => scrollToSection('detect')}
                  >
                    Start Detection Now
                    <ChevronDown 
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" 
                    />
                  </Button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <FaceAnalysisAnimation className="opacity-0 animate-blur-in" />
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce opacity-50">
            <ChevronDown className="h-6 w-6" />
          </div>
        </section>
        
        {/* Upload Section */}
        <section 
          id="detect" 
          ref={sectionRefs.detect}
          className={cn(
            "py-16 px-4",
            "bg-gradient-to-b from-transparent to-white/30"
          )}
        >
          <div className="container max-w-6xl mx-auto">
            <h2 className="section-title headline-text">Upload Video for Analysis</h2>
            <p className="text-center max-w-xl mx-auto mb-8 text-gray-600">
              Select a video file to check for deepfake manipulations
            </p>
            
            <div className="mt-8 opacity-0 animate-slide-up">
              <FileUploadAnalyzer />
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section 
          id="about" 
          ref={sectionRefs.about}
          className="py-16 px-4"
        >
          <div className="container max-w-6xl mx-auto">
            <AboutSection />
          </div>
        </section>
        
        {/* How To Use Section */}
        <section 
          id="how-to" 
          ref={sectionRefs.howTo}
          className={cn(
            "py-16 px-4",
            "bg-gradient-to-b from-transparent to-white/30"
          )}
        >
          <div className="container max-w-6xl mx-auto">
            <HowToSection />
          </div>
        </section>
        
        {/* FAQ Section */}
        <section 
          id="faq" 
          ref={sectionRefs.faq}
          className="py-16 px-4"
        >
          <div className="container max-w-6xl mx-auto">
            <FaqSection />
          </div>
        </section>
        
        {/* Theme Section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="section-title headline-text">Customize Theme</h2>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {['light', 'dark', 'blue', 'green', 'purple'].map((themeOption) => (
                <Button 
                  key={themeOption}
                  variant={theme === themeOption ? "default" : "outline"}
                  className={cn(
                    "px-6 py-2 rounded-full capitalize",
                    themeOption === 'light' && "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800",
                    themeOption === 'dark' && "bg-gradient-to-r from-gray-800 to-gray-900 text-white",
                    themeOption === 'blue' && "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
                    themeOption === 'green' && "bg-gradient-to-r from-green-400 to-green-500 text-white", 
                    themeOption === 'purple' && "bg-gradient-to-r from-purple-400 to-purple-500 text-white",
                    "opacity-0 animate-slide-up",
                    theme === themeOption && "ring-2 ring-offset-2 ring-primary"
                  )}
                  style={{ animationDelay: `${['light', 'dark', 'blue', 'green', 'purple'].indexOf(themeOption) * 0.1}s` }}
                  onClick={() => setTheme(themeOption as 'light' | 'dark' | 'blue' | 'green' | 'purple')}
                >
                  {themeOption}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
