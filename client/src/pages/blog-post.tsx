import React from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { CalendarDays, Clock, User } from 'lucide-react';
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
  seoKeywords?: string[];
  tags?: string[];
  estimatedReadTime: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  audioRequired: boolean;
  imageLink?: string;
}

interface BlogResponse {
  success: boolean;
  blog: BlogPost;
}

const BlogPost: React.FC = () => {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  const { data: blogResponse, isLoading, error } = useQuery<BlogResponse>({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/blog/${slug}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !blogResponse?.blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const { blog } = blogResponse;
  const dateToFormat = blog.publishDate || blog.createdAt;
  const formattedDate = dateToFormat ? format(new Date(dateToFormat), 'MMMM d, yyyy') : '';

  return (
    <>
      <Helmet>
        <title>{blog.title} | Supansha Development Foundation</title>
        <meta name="description" content={blog.metaDescription || blog.content.substring(0, 160)} />
        {blog.seoKeywords && <meta name="keywords" content={blog.seoKeywords.join(', ')} />}
      </Helmet>

      <article className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {blog.imageLink && (
            <img
              src={blog.imageLink}
              alt={blog.title}
              className="w-full max-h-96 object-cover rounded-lg mb-8"
            />
          )}
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {blog.category}
            </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.estimatedReadTime}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                  ))}
                </div>
              </div>
            )}
          </div>
      </article>
    </>
  );
};

export default BlogPost;
