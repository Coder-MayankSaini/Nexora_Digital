'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Image, 
  Send,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  post: string;
  status: 'pending' | 'approved' | 'spam';
  createdAt: string;
}

const recentComments: Comment[] = [
  {
    id: '1',
    author: 'John Smith',
    content: 'Great article! This really helped me understand the concepts better.',
    post: 'Getting Started with Next.js',
    status: 'pending',
    createdAt: '5 minutes ago'
  },
  {
    id: '2',
    author: 'Sarah Wilson',
    content: 'Could you provide more examples of this in practice?',
    post: 'React Best Practices',
    status: 'approved',
    createdAt: '1 hour ago'
  },
  {
    id: '3',
    author: 'Mike Johnson',
    content: 'Amazing tutorial! Keep up the great work.',
    post: 'TypeScript Guide',
    status: 'approved',
    createdAt: '2 hours ago'
  }
];

const getCommentStatusBadge = (status: Comment['status']) => {
  const variants = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    spam: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
  };

  const { color, icon: Icon } = variants[status];

  return (
    <Badge variant="secondary" className={color}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function QuickAccessPanel() {
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // Handle post creation logic here
      console.log('Creating post:', { title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const handleCommentAction = (commentId: string, action: 'approve' | 'reject' | 'spam') => {
    // Handle comment moderation logic here
    console.log(`${action} comment:`, commentId);
  };

  return (
    <div className="space-y-6">
      {/* Quick Create Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Create
            </CardTitle>
            <CardDescription>
              Start a new post or manage content quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button className="justify-start h-auto p-4 flex-col" variant="outline">
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">New Post</span>
                <span className="text-xs text-muted-foreground">Create article</span>
              </Button>
              <Button className="justify-start h-auto p-4 flex-col" variant="outline">
                <Image className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Upload Media</span>
                <span className="text-xs text-muted-foreground">Add images</span>
              </Button>
              <Button className="justify-start h-auto p-4 flex-col" variant="outline">
                <MessageSquare className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Quick Note</span>
                <span className="text-xs text-muted-foreground">Save idea</span>
              </Button>
            </div>

            {/* Quick Post Form */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                                 <Input
                   placeholder="Post title..."
                   value={newPostTitle}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPostTitle(e.target.value)}
                   className="font-medium"
                 />
              </div>
              <div>
                                 <Textarea
                   placeholder="What's on your mind? Start writing your post..."
                   value={newPostContent}
                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                   rows={3}
                   className="resize-none"
                 />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4 mr-1" />
                    Add Image
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Save Draft
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleCreatePost}
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Publish
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comment Moderation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Comments
                </CardTitle>
                <CardDescription>
                  Moderate and respond to user comments
                </CardDescription>
              </div>
              <Badge variant="outline">
                {recentComments.filter(c => c.status === 'pending').length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                    </div>
                    {getCommentStatusBadge(comment.status)}
                  </div>
                  
                  <p className="text-sm mb-2 line-clamp-2">{comment.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      on "{comment.post}"
                    </span>
                    
                    {comment.status === 'pending' && (
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-green-600 hover:text-green-700"
                          onClick={() => handleCommentAction(comment.id, 'approve')}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-red-600 hover:text-red-700"
                          onClick={() => handleCommentAction(comment.id, 'reject')}
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-4 border-t mt-4">
              <Button variant="outline" className="w-full">
                View All Comments
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 