
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="glass-card mt-16 rounded-t-lg shadow-lg border-t border-white/20">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2 headline-text">DeepFake Vision Shield</h3>
          <p className="text-sm text-gray-600 mb-6">
            Protecting reality in the digital age with advanced AI detection
          </p>
        </div>
        
        <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200/50">
          <p>&copy; {new Date().getFullYear()} DeepFake Vision Shield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
