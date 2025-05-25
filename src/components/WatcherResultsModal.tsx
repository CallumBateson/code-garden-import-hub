
import { useQuery } from "@tanstack/react-query";
import { WatcherService } from "@/api/WatcherService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WatcherResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  watcherId: number | null;
  watcherName: string;
}

const watcherService = new WatcherService();

const WatcherResultsModal = ({ isOpen, onClose, watcherId, watcherName }: WatcherResultsModalProps) => {
  const { data: results, isLoading, error } = useQuery({
    queryKey: ['watcher-results', watcherId],
    queryFn: () => watcherId ? watcherService.results(watcherId) : Promise.resolve([]),
    enabled: !!watcherId && isOpen,
  });

  const getHeatmapColor = (indexes: number[] | undefined) => {
    if (!indexes || indexes.length === 0) return 'bg-gray-100';
    
    const maxIndex = Math.max(...indexes);
    const intensity = Math.min(maxIndex / 100, 1); // Normalize to 0-1 range
    
    if (intensity <= 0.2) return 'bg-blue-100';
    if (intensity <= 0.4) return 'bg-blue-200';
    if (intensity <= 0.6) return 'bg-blue-400';
    if (intensity <= 0.8) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  const getTextColor = (indexes: number[] | undefined) => {
    if (!indexes || indexes.length === 0) return 'text-gray-600';
    
    const maxIndex = Math.max(...indexes);
    const intensity = Math.min(maxIndex / 100, 1);
    
    return intensity > 0.6 ? 'text-white' : 'text-gray-900';
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Results for "{watcherName}"</DialogTitle>
          <DialogDescription>
            View the search results with index heatmap (1-100 scale)
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center">Loading results...</div>
          )}
          
          {error && (
            <div className="p-4 text-center text-red-600">
              Error loading results. Please try again.
            </div>
          )}
          
          {results && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No results found for this watcher.
            </div>
          )}
          
          {results && results.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Indexes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {formatDate(result.date)}
                    </TableCell>
                    <TableCell>
                      <div className={`px-3 py-2 rounded text-center font-medium ${getHeatmapColor(result.indexes)} ${getTextColor(result.indexes)}`}>
                        {result.indexes && result.indexes.length > 0 
                          ? result.indexes.join(', ')
                          : 'No indexes'
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatcherResultsModal;
