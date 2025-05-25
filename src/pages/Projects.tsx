
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Github, ExternalLink, Calendar } from "lucide-react";

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">Browse and manage your imported GitHub projects</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Github className="h-4 w-4 mr-2" />
            Import New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Project Cards */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Sample Project</CardTitle>
                  <CardDescription>Ready for your first import</CardDescription>
                </div>
                <Badge variant="secondary">Template</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created today
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Github className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Empty State Cards */}
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="border-dashed border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-8 text-center">
                <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Import Slot {i}</h3>
                <p className="text-gray-600 mb-4">Ready for your GitHub repository</p>
                <Button variant="outline" size="sm">
                  Import Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
