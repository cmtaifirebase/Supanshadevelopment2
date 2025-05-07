import React from 'react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';

interface BlogCardProps {
  post: {
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
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { _id, title, slug, category, content, publishDate, estimatedReadTime } = post;
  
  // Use publishDate if available, otherwise fallback to createdAt
  const dateToFormat = publishDate || post.createdAt;
  const formattedDate = dateToFormat ? format(new Date(dateToFormat), 'MMMM d, yyyy') : '';

  // Create excerpt from content
  const excerpt = content.length > 150 ? `${content.substring(0, 150)}...` : content;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${slug}`} className="block">
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              {category}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{estimatedReadTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
