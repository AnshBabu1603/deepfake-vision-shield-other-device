
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "How accurate is the detection?",
    answer: "Our system achieves 95-98% accuracy on standard benchmarks. Real-world performance may vary based on video quality and compression."
  },
  {
    question: "What file formats are supported?",
    answer: "Videos: MP4, AVI, MOV (up to 100MB)"
  },
  {
    question: "Is my data stored or shared?",
    answer: "No. All processing happens in your browser or our secure servers with immediate deletion after analysis."
  },
  {
    question: "How does the technology work?",
    answer: "Our AI analyzes subtle inconsistencies in facial movements, lighting, reflections, and compression artifacts that are typically imperceptible to human eyes but indicative of manipulated content."
  },
  {
    question: "Can it detect all types of deepfakes?",
    answer: "While our technology is highly effective against most common deepfake techniques, the field is rapidly evolving. We continuously update our models to stay ahead of new manipulation methods."
  }
];

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>("item-0");
  
  return (
    <div className="py-16">
      <h2 className="section-title headline-text">Frequently Asked Questions</h2>
      
      <div className="max-w-3xl mx-auto mt-8">
        <Accordion
          type="single"
          collapsible
          value={openItem || undefined}
          onValueChange={(value) => setOpenItem(value)}
          className="bg-white/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-white/20"
        >
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={`item-${index}`}
              value={`item-${index}`}
              className={cn(
                "border-b border-gray-200 last:border-0",
                "opacity-0 animate-slide-up",
              )}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50/50 text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-1 text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
