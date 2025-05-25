
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Code, FolderOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Code Import Hub</h1>
            </div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FolderOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready for Your GitHub Import
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            This project is set up and ready to receive your code imports from GitHub. 
            Clean structure, modern tooling, and organized components await your code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Github className="h-5 w-5 mr-2" />
              Import from GitHub
            </Button>
            <Button variant="outline" size="lg">
              <Code className="h-5 w-5 mr-2" />
              Browse Structure
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Built with React, TypeScript, Tailwind CSS, and Shadcn UI components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FolderOpen className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Organized Structure</CardTitle>
              <CardDescription>
                Clean file organization with proper component separation and routing setup
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>GitHub Ready</CardTitle>
              <CardDescription>
                Optimized for seamless GitHub integration and code imports
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Project Structure Preview */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Project Structure
            </CardTitle>
            <CardDescription>
              Your imported code will fit perfectly into this organized structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
              <div className="space-y-1 text-gray-700">
                <div>📁 src/</div>
                <div className="ml-4">📁 components/</div>
                <div className="ml-8">📁 ui/ (Shadcn components)</div>
                <div className="ml-8">📄 [Your components here]</div>
                <div className="ml-4">📁 pages/</div>
                <div className="ml-8">📄 Index.tsx</div>
                <div className="ml-8">📄 [Your pages here]</div>
                <div className="ml-4">📁 hooks/</div>
                <div className="ml-4">📁 lib/</div>
                <div className="ml-8">📄 utils.ts</div>
                <div className="ml-4">📄 App.tsx</div>
                <div className="ml-4">📄 main.tsx</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>Ready to import your GitHub repository and start building amazing things!</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
