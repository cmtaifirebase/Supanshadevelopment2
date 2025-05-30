import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cause } from '@/lib/types';
import DonateCard from '@/components/shared/donate-card';
import { API_BASE_URL } from '@/config';

const DonateCauses: React.FC = () => {
  const { data: causes, isLoading, error } = useQuery<{ success: boolean; causes: Cause[] }>({
    queryKey: ['causes'],
    queryFn: async () => {
      try {
        console.log("api url",API_BASE_URL)
        const response = await fetch(`${API_BASE_URL}/api/cause/active`, {
          method: 'GET',
          credentials: 'include',
          headers: {  
            'Accept': 'application/json',
          }
        });
        console.log("response",response)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching causes:', error);
        throw error;
      }
    },
  });

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Support Our Causes</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Your contribution helps us create lasting change in communities across India. Choose a cause that resonates with you.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-300">Failed to load causes. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {causes?.causes?.slice(0, 3).map(cause => (
              <DonateCard key={cause.id} cause={cause} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DonateCauses;
