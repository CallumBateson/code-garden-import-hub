import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { WatcherService } from "@/api/WatcherService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, ExternalLink, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WatcherResultsModal from "./WatcherResultsModal";

const watcherService = new WatcherService();

const WatchersTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [selectedWatcher, setSelectedWatcher] = useState<{ id: number; name: string } | null>(null);

  const { data: watchers, isLoading, error } = useQuery({
    queryKey: ['watchers'],
    queryFn: () => watcherService.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (watcherId: number) => watcherService.watcherDELETE(watcherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchers'] });
      toast({
        title: "Success",
        description: "Watcher deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Delete watcher error:', error);
      toast({
        title: "Error",
        description: "Failed to delete watcher",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (watcherId: number, watcherName: string) => {
    if (window.confirm(`Are you sure you want to delete "${watcherName}"?`)) {
      deleteMutation.mutate(watcherId);
    }
  };

  const handleViewResults = (watcherId: number, watcherName: string) => {
    setSelectedWatcher({ id: watcherId, name: watcherName });
    setResultsModalOpen(true);
  };

  const closeResultsModal = () => {
    setResultsModalOpen(false);
    setSelectedWatcher(null);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading watchers...</div>;
  }

  if (error) {
    console.error('Watchers fetch error:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading watchers. Please try again.
      </div>
    );
  }

  if (!watchers || watchers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No watchers found. Create your first watcher to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Search Term</TableHead>
            <TableHead>Target URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchers.map((watcher) => (
            <TableRow key={watcher.id}>
              <TableCell className="font-medium">
                {watcher.name || 'Unnamed Watcher'}
              </TableCell>
              <TableCell>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {watcher.searchTerm || 'No search term'}
                </code>
              </TableCell>
              <TableCell>
                {watcher.targetUrl ? (
                  <a
                    href={watcher.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span className="truncate max-w-xs">{watcher.targetUrl}</span>
                    <ExternalLink className="h-3 w-3 flex-shrink-0" />
                  </a>
                ) : (
                  <span className="text-gray-400">No URL</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewResults(watcher.id!, watcher.name || 'Unnamed')}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(watcher.id!, watcher.name || 'Unnamed')}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="text-sm text-gray-500 text-center">
        Total: {watchers.length} watcher{watchers.length !== 1 ? 's' : ''}
      </div>

      <WatcherResultsModal
        isOpen={resultsModalOpen}
        onClose={closeResultsModal}
        watcherId={selectedWatcher?.id || null}
        watcherName={selectedWatcher?.name || ''}
      />
    </div>
  );
};

export default WatchersTable;
