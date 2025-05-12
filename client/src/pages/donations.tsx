import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { API_BASE_URL } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { useLocation } from 'wouter';

interface Donation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  causeId: string | null;
  message: string;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  receipt: string | null;
  userId: string | null;
  date: string;
  aadharNumber: string | null;
  panCardNumber: string | null;
  createdAt: string;
  updatedAt: string;
  causeSlug: string | null;
}

interface DonationsResponse {
  success: boolean;
  donations: Donation[];
}

const Donations: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: donationsResponse, isLoading } = useQuery<DonationsResponse>({
    queryKey: ['donations', user?._id],
    queryFn: async () => {
      if (!isAuthenticated || !user) {
        throw new Error('Not authenticated');
      }
      const response = await fetch(`${API_BASE_URL}/api/donation/user/${user._id}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      return response.json();
    },
    enabled: isAuthenticated && !!user,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your donations history.
            </p>
            <Button 
              onClick={() => setLocation('/pages/admin/login?redirect=/donations')}
              className="w-full"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Donations | Supansha Development Foundation</title>
        <meta name="description" content="View your donation history and receipts" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" 
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">My Donations</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Track your contributions and download receipts
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {donationsResponse?.donations && donationsResponse.donations.length > 0 ? (
                donationsResponse.donations.map((donation) => (
                  <Card key={donation._id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            donation.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : donation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(donation.createdAt), 'MMMM d, yyyy')}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">₹{donation.amount.toLocaleString()}</h3>
                        <p className="text-gray-600 text-sm mb-2">{donation.message}</p>
                        <p className="text-sm text-gray-500">
                          Cause: {donation.causeSlug || 'General'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {donation.receipt && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              // Handle receipt download
                              window.open(donation.receipt || '', '_blank');
                            }}
                          >
                            Download Receipt
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Handle view details
                            toast({
                              title: "Coming Soon",
                              description: "Detailed view will be available soon.",
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">No Donations Found</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't made any donations yet.
                  </p>
                  <Button
                    onClick={() => setLocation('/donate')}
                  >
                    Make Your First Donation
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Donations; 