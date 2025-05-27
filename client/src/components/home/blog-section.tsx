import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '@/components/shared/blog-card';
import { API_BASE_URL } from '@/config';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  status: 'Draft' | 'Review' | 'Published';
  publishDate?: string;
  metaDescription?: string;
  estimatedReadTime: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface EventsResponse {
  success: boolean;
  blogs: BlogPost[]; 
}

const BlogSection: React.FC = () => {
  const { data: eventResponse, isLoading } = useQuery<EventsResponse>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    },
  });

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Social Thoughts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Reflections and voices from the field — blogs by experts, doers, and rural change-makers.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventResponse?.blogs?.map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link 
            href="/blog" 
            className="inline-block bg-primary hover:bg-[#F14B05]/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
