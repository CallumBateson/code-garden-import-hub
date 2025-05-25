
import { Button } from "@/components/ui/button";
import { Github, Code, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Code Import Hub</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
              Projects
            </Link>
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              Connect GitHub
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/projects" 
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <div className="px-3 py-2">
              <Button variant="outline" size="sm" className="w-full">
                <Github className="h-4 w-4 mr-2" />
                Connect GitHub
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
