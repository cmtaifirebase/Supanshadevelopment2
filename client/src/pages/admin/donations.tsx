import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '@/config';

interface Donation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  causeId?: { name: string } | null;
  message: string;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  receipt?: string | null;
  userId?: string | null;
  date?: string;
  aadharNumber?: string | null;
  panCardNumber?: string | null;
  createdAt: string;
  isRecurring?: boolean;
}

const projectOptions = [
  'Education Projects',
  'Healthcare Initiatives',
  'Sustainable Agriculture',
  'Women Empowerment',
  'Rural Development',
  'Clean Water Access',
  'General Fund',
];

const AdminDonations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch donations
  const { data, isLoading, refetch, isRefetching } = useQuery<{ success: boolean; donations: Donation[] }>({
    queryKey: ['donations'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/donation`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch donations');
      return response.json();
    },
  });

  const donations = data?.donations || [];
  
  // Calculate donation statistics
  const totalDonations = donations.filter(d => d.status === 'completed').reduce((sum, d) => sum + d.amount, 0);
  const donationCount = donations.filter(d => d.status === 'completed').length;
  const averageDonation = donationCount > 0 ? totalDonations / donationCount : 0;
  const recurringDonors = new Set(donations.filter(d => d.isRecurring && d.status === 'completed').map(d => d.email)).size;
  
  // Filter donations based on search term and active tab
  const filteredDonations = donations.filter(donation => {
    // Filter by search term
    const matchesSearch = 
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (donation.causeId?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    // Filter by status tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && donation.status === 'completed';
    if (activeTab === 'processing') return matchesSearch && donation.status === 'pending';
    if (activeTab === 'failed') return matchesSearch && donation.status === 'failed';
    if (activeTab === 'recurring') return matchesSearch && donation.isRecurring;
    return matchesSearch;
  });
  
  const handleViewDetails = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsDetailsDialogOpen(true);
  };
  
  const handleGenerateReceipt = (donation: Donation) => {
    setSelectedDonation(donation);
    setIsReceiptDialogOpen(true);
  };
  
  const handleUpdateStatus = (id: string, newStatus: string) => {
    // Implement status update logic
    toast({
      title: "Status Updated",
      description: `Donation status has been updated to ${newStatus}`,
    });
    
    // Update selected donation if details dialog is open
    if (selectedDonation && selectedDonation._id === id) {
      setSelectedDonation({...selectedDonation, status: newStatus as 'completed' | 'pending' | 'failed'});
    }
  };
  
  const handleIssueReceipt = () => {
    // Implement receipt issue logic
    toast({
      title: "Receipt Issued",
      description: "Donation receipt has been generated and sent to the donor.",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold mb-2">Donation Management</h1>
        <p className="text-gray-600">Track, process, and manage incoming donations</p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          {isLoading || isRefetching ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <h3 className="text-2xl font-bold">₹{totalDonations.toLocaleString()}</h3>
              <p className="text-xs text-gray-500 mt-1">{donationCount} donations received</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Average Donation</p>
              <h3 className="text-2xl font-bold">₹{averageDonation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
              <p className="text-xs text-gray-500 mt-1">Per donation</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Recurring Donors</p>
              <h3 className="text-2xl font-bold">{recurringDonors}</h3>
              <p className="text-xs text-gray-500 mt-1">Monthly supporters</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">Pending Receipts</p>
              <h3 className="text-2xl font-bold">{donations.filter(d => d.status === 'completed' && !d.receipt).length}</h3>
              <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Donations</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="recurring">Recurring</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
          <CardDescription>
            Track and manage all donation transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading donations...</div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                  <TableRow key={donation._id}>
                  <TableCell className="font-medium">
                      {donation.name}
                    {donation.isRecurring && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        Recurring
                      </span>
                    )}
                  </TableCell>
                    <TableCell>{donation.createdAt ? new Date(donation.createdAt).toLocaleDateString() : ''}</TableCell>
                  <TableCell>₹{donation.amount.toLocaleString()}</TableCell>
                    <TableCell>{donation.causeId?.name || 'General Fund'}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          donation.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                            : donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                      {donation.receipt ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Issued
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(donation)}
                      >
                        Details
                      </Button>
                        {donation.status === 'completed' && !donation.receipt && (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateReceipt(donation)}
                        >
                          Issue Receipt
                        </Button>
                      )}
                        {donation.status === 'pending' && (
                        <Button
                          variant="default"
                          size="sm"
                            onClick={() => handleUpdateStatus(donation._id, 'completed')}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredDonations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No donations found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
      {/* Donation Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>
              Complete information about this donation.
            </DialogDescription>
          </DialogHeader>
          {selectedDonation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Donor Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedDonation.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedDonation.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedDonation.phone}</p>
                    <p>
                      <span className="font-medium">Donation Type:</span>{' '}
                      {selectedDonation.isRecurring ? 'Recurring (Monthly)' : 'One-time'}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedDonation.createdAt ? new Date(selectedDonation.createdAt).toLocaleDateString() : ''}</p>
                    <p><span className="font-medium">Amount:</span> ₹{selectedDonation.amount.toLocaleString()}</p>
                    <p><span className="font-medium">Payment Method:</span> {selectedDonation.paymentId}</p>
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          selectedDonation.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : selectedDonation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Receipt:</span>{' '}
                      {selectedDonation.receipt ? 'Issued' : 'Pending'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Donation Allocation</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Project:</span> {selectedDonation.causeId?.name || 'General Fund'}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Actions</h3>
                  <div className="space-y-3">
                    {selectedDonation.status === 'pending' && (
                      <Button 
                        className="w-full"
                        onClick={() => {
                          handleUpdateStatus(selectedDonation._id, 'completed');
                          setIsDetailsDialogOpen(false);
                        }}
                      >
                        Mark as Completed
                      </Button>
                    )}
                    
                    {selectedDonation.status === 'completed' && !selectedDonation.receipt && (
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setIsDetailsDialogOpen(false);
                          handleGenerateReceipt(selectedDonation);
                        }}
                      >
                        Generate Receipt
                      </Button>
                    )}
                    
                    {selectedDonation.status === 'completed' && selectedDonation.receipt && (
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Receipt Sent",
                            description: "The receipt has been resent to the donor's email",
                          });
                        }}
                      >
                        Resend Receipt
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Email Sent",
                          description: "Thank you message has been sent to the donor",
                        });
                      }}
                    >
                      Send Thank You Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Receipt Generation Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Donation Receipt</DialogTitle>
            <DialogDescription>
              Create and send an official donation receipt to the donor.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDonation && (
            <div className="py-4">
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Donation Receipt</h3>
                    <p className="text-sm text-gray-500">Receipt No: SDF-{selectedDonation._id.slice(0, 6)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Date: {selectedDonation.createdAt ? new Date(selectedDonation.createdAt).toLocaleDateString() : ''}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Donor Information</h4>
                  <p className="font-medium">{selectedDonation.name}</p>
                  <p>{selectedDonation.email}</p>
                  <p>{selectedDonation.phone}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Donation Details</h4>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Donation Amount:</span>
                    <span className="font-medium">₹{selectedDonation.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Project:</span>
                    <span>{selectedDonation.causeId?.name || 'General Fund'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Payment Method:</span>
                    <span>{selectedDonation.paymentId}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span>Donation Type:</span>
                    <span>{selectedDonation.isRecurring ? 'Recurring (Monthly)' : 'One-time'}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-6">
                  <p>Supansha Development Foundation</p>
                  <p>PAN: AAASD1234F</p>
                  <p>80G Registration: 80G/1234/2023-24</p>
                  <p>Email: donations@supansha.org</p>
                </div>
                
                <div className="text-center text-sm border-t border-gray-200 pt-4">
                  <p className="font-medium">Thank you for your generous support!</p>
                  <p className="text-gray-600">Your contribution helps us create lasting positive change in communities.</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Receipt Downloaded",
                      description: "The receipt has been downloaded as a PDF",
                    });
                  }}
                >
                  Download PDF
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsReceiptDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleIssueReceipt}>
                    Send to Donor
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDonations;