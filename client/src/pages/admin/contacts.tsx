import React from 'react';
import { useAuth } from '@/context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from '@/config';
import { RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminContacts: React.FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: contacts, isLoading } = useQuery<{ success: boolean; contacts: Contact[] }>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast({
        title: 'Success',
        description: 'Contact message deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete contact message',
        variant: 'destructive',
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['contacts'] })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts?.contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate">{contact.message}</div>
                </TableCell>
                <TableCell>
                  {contact.createdAt ? format(new Date(contact.createdAt), 'MMM d, yyyy h:mm a') : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(contact._id)}
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
    </div>
  );
};

export default AdminContacts; 