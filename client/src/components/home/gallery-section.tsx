import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { GalleryImage } from '@/lib/types';

const GallerySection: React.FC = () => {
  const { data: apiGalleryItems, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    select: (data) => data.slice(0, 8), // Take only the first 8 items
  });

  // Local gallery items
  const localGalleryItems = [
    {
      id: 101,
      image: '/Gallery/1.jpg',
      caption: 'Community Development'
    },
    {
      id: 102,
      image: '/Gallery/2.jpg',
      caption: 'Education Initiative'
    },
    {
      id: 103,
      image: '/Gallery/3.jpg',
      caption: 'Health Camp'
    },
    {
      id: 104,
      image: '/Gallery/4.jpg',
      caption: 'Women Empowerment'
    },
    {
      id: 105,
      image: '/Gallery/5.jpg',
      caption: 'Environmental Care'
    },
    {
      id: 106,
      image: '/Gallery/6.jpg',
      caption: 'Water Conservation'
    }
  ];

  // Combine both sets of images
  const allGalleryItems = [
    ...(apiGalleryItems || []),
    ...localGalleryItems
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Scenes of Change</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">A visual journal of impact — snapshots of action, energy, and transformation on ground.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allGalleryItems.map((item) => (
              <div 
                key={item.id} 
                className="relative overflow-hidden rounded-lg group h-64"
              >
                <img 
                  src={item.image} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link 
            href="/gallery" 
            className="inline-block bg-primary hover:bg-[#F14B05]/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
