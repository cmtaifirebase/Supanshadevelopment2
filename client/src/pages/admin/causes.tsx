import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Cause {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: 'health' | 'education' | 'environment' | 'other';
  goal: number;
  raised: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

interface CauseFormData {
  title: string;
  description: string;
  image: string;
  category: 'health' | 'education' | 'environment' | 'other';
  goal: number;
  raised?: number;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

const Causes = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [formData, setFormData] = useState<CauseFormData>({
    title: '',
    description: '',
    image: '',
    category: 'other',
    goal: 0,
    raised: 0,
    isActive: true,
    startDate: '',
    endDate: ''
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch causes
  const { data: causes, isLoading } = useQuery<{ success: boolean; causes: Cause[] }>({
    queryKey: ['causes'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/cause`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch causes');
      return response.json();
    },
  });

  // Create cause mutation
  const createMutation = useMutation({
    mutationFn: async (data: CauseFormData) => {
      const response = await fetch(`${API_BASE_URL}/api/cause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create cause');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['causes'] });
      setIsCreateDialogOpen(false);
      setFormData({
        title: '',
        description: '',
        image: '',
        category: 'other',
        goal: 0,
        raised: 0,
        isActive: true,
        startDate: '',
        endDate: ''
      });
      toast({
        title: 'Success',
        description: 'Cause created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create cause',
        variant: 'destructive',
      });
    },
  });

  // Update cause mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: CauseFormData }) => {
      const response = await fetch(`${API_BASE_URL}/api/cause/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update cause');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['causes'] });
      setIsEditDialogOpen(false);
      setSelectedCause(null);
      toast({
        title: 'Success',
        description: 'Cause updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update cause',
        variant: 'destructive',
      });
    },
  });

  // Delete cause mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/api/cause/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete cause');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['causes'] });
      toast({
        title: 'Success',
        description: 'Cause deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete cause',
        variant: 'destructive',
      });
    },
  });

  // Toggle cause status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const response = await fetch(`${API_BASE_URL}/api/cause/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isActive }),
      });
      if (!response.ok) throw new Error('Failed to update cause status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['causes'] });
      toast({
        title: 'Success',
        description: 'Cause status updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update cause status',
        variant: 'destructive',
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      category: 'other',
      goal: 0,
      raised: 0,
      isActive: true,
      startDate: '',
      endDate: ''
    });
  };

  const handleCreateDialogOpen = (open: boolean) => {
    setIsCreateDialogOpen(open);
    if (open) {
      resetForm();
    }
  };

  const formatFormData = (data: CauseFormData) => {
    return {
      ...data,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
    };
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formatFormData(formData));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCause) {
      updateMutation.mutate({ 
        id: selectedCause._id, 
        data: formatFormData(formData) 
      });
    }
  };

  const handleEdit = (cause: Cause) => {
    setSelectedCause(cause);
    setFormData({
      title: cause.title,
      description: cause.description,
      image: cause.image,
      category: cause.category,
      goal: cause.goal,
      raised: cause.raised || 0,
      isActive: cause.isActive,
      startDate: cause.startDate ? new Date(cause.startDate).toISOString().split('T')[0] : '',
      endDate: cause.endDate ? new Date(cause.endDate).toISOString().split('T')[0] : ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this cause?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    toggleStatusMutation.mutate({ id, isActive: !currentStatus });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'goal' | 'raised') => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Causes</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['causes'] })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={handleCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Cause
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Cause</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Goal Amount</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.goal || ''}
                    onChange={(e) => handleNumberChange(e, 'goal')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Cause
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Raised</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {causes?.causes.map((cause) => (
              <TableRow key={cause._id}>
                <TableCell>{cause.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {cause.category}
                  </Badge>
                </TableCell>
                <TableCell>${cause?.goal?.toLocaleString()}</TableCell>
                <TableCell>${cause?.raised?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={cause.isActive ? "default" : "secondary"}>
                    {cause.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {cause.createdAt ? format(new Date(cause.createdAt), 'MMM d, yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(cause._id, cause.isActive)}
                    >
                      {cause.isActive ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(cause)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cause._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Cause</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Goal Amount</label>
              <Input
                type="number"
                min="0"
                value={formData.goal || ''}
                onChange={(e) => handleNumberChange(e, 'goal')}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Raised Amount</label>
              <Input
                type="number"
                min="0"
                value={formData.raised || ''}
                onChange={(e) => handleNumberChange(e, 'raised')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Update Cause
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    );
  };

  export default Causes;