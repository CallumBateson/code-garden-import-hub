
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WatcherService } from "@/api/WatcherService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface CreateWatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const watcherService = new WatcherService();

const CreateWatcherModal = ({ isOpen, onClose }: CreateWatcherModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    searchTerm: "",
    targetUrl: ""
  });

  const createMutation = useMutation({
    mutationFn: (watcherData: { name: string; searchTerm: string; targetUrl: string }) => 
      watcherService.watcherPOST(watcherData),
    onSuccess: (watcherId) => {
      queryClient.invalidateQueries({ queryKey: ['watchers'] });
      toast({
        title: "Success",
        description: `Watcher created successfully with ID: ${watcherId}`,
      });
      handleClose();
    },
    onError: (error) => {
      console.error('Create watcher error:', error);
      toast({
        title: "Error",
        description: "Failed to create watcher",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.searchTerm.trim() || !formData.targetUrl.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleClose = () => {
    setFormData({ name: "", searchTerm: "", targetUrl: "" });
    onClose();
  };

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Watcher</DialogTitle>
          <DialogDescription>
            Add a new watcher to monitor your website content.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="col-span-3"
                placeholder="Enter watcher name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="searchTerm" className="text-right">
                Search Term
              </Label>
              <Input
                id="searchTerm"
                value={formData.searchTerm}
                onChange={handleInputChange("searchTerm")}
                className="col-span-3"
                placeholder="Enter search term"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetUrl" className="text-right">
                Target URL
              </Label>
              <Input
                id="targetUrl"
                value={formData.targetUrl}
                onChange={handleInputChange("targetUrl")}
                className="col-span-3"
                placeholder="Enter target URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creating..." : "Create Watcher"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWatcherModal;
