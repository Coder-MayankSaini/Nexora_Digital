'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Edit, 
  Eye, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  User,
  MessageSquare,
  Heart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ContentItem {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'review' | 'scheduled';
  publishedAt: string;
  views: number;
  comments: number;
  likes: number;
  category: string;
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    author: 'John Doe',
    status: 'published',
    publishedAt: '2024-01-15',
    views: 2847,
    comments: 23,
    likes: 156,
    category: 'Tutorial'
  },
  {
    id: '2',
    title: 'React Best Practices for Modern Development',
    author: 'Jane Smith',
    status: 'draft',
    publishedAt: '2024-01-14',
    views: 0,
    comments: 0,
    likes: 0,
    category: 'Best Practices'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with TypeScript',
    author: 'Mike Johnson',
    status: 'review',
    publishedAt: '2024-01-13',
    views: 1234,
    comments: 18,
    likes: 89,
    category: 'Backend'
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    author: 'Sarah Wilson',
    status: 'scheduled',
    publishedAt: '2024-01-20',
    views: 0,
    comments: 0,
    likes: 0,
    category: 'CSS'
  },
  {
    id: '5',
    title: 'Advanced Framer Motion Techniques',
    author: 'Alex Brown',
    status: 'published',
    publishedAt: '2024-01-12',
    views: 3456,
    comments: 45,
    likes: 234,
    category: 'Animation'
  }
];

const getStatusBadge = (status: ContentItem['status']) => {
  const variants = {
    published: 'bg-green-100 text-green-800 hover:bg-green-200',
    draft: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    review: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    scheduled: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  };

  const labels = {
    published: 'Published',
    draft: 'Draft',
    review: 'In Review',
    scheduled: 'Scheduled'
  };

  return (
    <Badge variant="secondary" className={variants[status]}>
      {labels[status]}
    </Badge>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default function ContentPreviewTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>
                Manage and monitor your latest posts and articles
              </CardDescription>
            </div>
            <Button size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-1 font-medium text-sm text-muted-foreground">
                    Title
                  </th>
                  <th className="text-left py-2 px-1 font-medium text-sm text-muted-foreground hidden md:table-cell">
                    Author
                  </th>
                  <th className="text-left py-2 px-1 font-medium text-sm text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-2 px-1 font-medium text-sm text-muted-foreground hidden lg:table-cell">
                    Published
                  </th>
                  <th className="text-left py-2 px-1 font-medium text-sm text-muted-foreground hidden sm:table-cell">
                    Engagement
                  </th>
                  <th className="text-right py-2 px-1 font-medium text-sm text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockContent.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-muted/50 transition-colors"
                  >
                    {/* Title Column */}
                    <td className="py-3 px-1">
                      <div className="space-y-1">
                        <p className="font-medium text-sm leading-tight line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground md:hidden">
                            by {item.author}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Author Column */}
                    <td className="py-3 px-1 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {item.author}
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3 px-1">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Published Date Column */}
                    <td className="py-3 px-1 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                    </td>

                    {/* Engagement Column */}
                    <td className="py-3 px-1 hidden sm:table-cell">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatNumber(item.views)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{item.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 px-1 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 