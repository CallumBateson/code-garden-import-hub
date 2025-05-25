
import { Suspense } from "react";
import Header from "@/components/Header";
import WatchersTable from "@/components/WatchersTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Watchers Dashboard</h1>
              <p className="text-gray-600">Monitor and manage your website watchers</p>
            </div>
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
      </main>
    </div>
  );
};

export default Index;
