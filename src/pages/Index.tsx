
import { Suspense, useState } from "react";
import WatchersTable from "@/components/WatchersTable";
import CreateWatcherModal from "@/components/CreateWatcherModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Watchers Dashboard</h1>
                <p className="text-gray-600">Monitor and manage your website watchers</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Watcher</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Watchers</CardTitle>
            <CardDescription>
              View and manage all your configured watchers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="p-4 text-center">Loading watchers...</div>}>
              <WatchersTable />
            </Suspense>
          </CardContent>
        </Card>

        <CreateWatcherModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default Index;
