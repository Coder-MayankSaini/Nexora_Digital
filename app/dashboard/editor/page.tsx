'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/useSession';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RichTextEditor from '@/components/editor/RichTextEditor';
import FeaturedImageUpload from '@/components/editor/FeaturedImageUpload';
import SEOMetaFields, { type SEOData } from '@/components/editor/SEOMetaFields';
import { useAutoSave, type DraftData } from '@/hooks/useAutoSave';
import {
  Save,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Search,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function PostEditorPage() {
  const { session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published'>('draft');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<string>('');

  const [seoData, setSeoData] = useState<SEOData>({
    title: '',
    description: '',
    slug: '',
    keywords: [],
    openGraph: {
      title: '',
      description: '',
      type: 'article'
    },
    twitter: {
      title: '',
      description: '',
      card: 'summary_large_image'
    }
  });

  // Create draft data object for auto-save
  const draftData: DraftData = {
    title,
    content,
    featuredImage,
    featuredImageAlt,
    seo: {
      title: seoData.title,
      description: seoData.description,
      slug: seoData.slug,
      keywords: seoData.keywords,
    },
    status: publishStatus,
    lastSaved
  };

  // Auto-save functionality
  const { saveNow, isSaving } = useAutoSave({
    data: draftData,
    onSave: (savedData) => {
      setSaveStatus('saved');
      setLastSaved(savedData.lastSaved || new Date().toISOString());
      setTimeout(() => setSaveStatus('idle'), 2000);
    },
    onError: (error) => {
      console.error('Auto-save failed:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    },
    enabled: true,
    interval: 30000 // 30 seconds
  });

  // Update save status when saving
  useEffect(() => {
    if (isSaving) {
      setSaveStatus('saving');
    }
  }, [isSaving]);

  const handleFeaturedImageChange = (url: string, alt: string) => {
    setFeaturedImage(url);
    setFeaturedImageAlt(alt);
  };

  const handlePublish = async () => {
    try {
      setSaveStatus('saving');
      
      const postData = {
        ...draftData,
        status: 'published',
        publishedAt: new Date().toISOString()
      };

      const response = await fetch('/api/posts/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to publish post');
      }

      setPublishStatus('published');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Publish failed:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const getStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <Clock className="w-4 h-4 animate-spin" />;
      case 'saved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Save className="w-4 h-4" />;
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return `Saved ${lastSaved ? new Date(lastSaved).toLocaleTimeString() : 'now'}`;
      case 'error':
        return 'Save failed';
      default:
        return 'Ready to save';
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You need to be signed in to access the editor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="text-sm text-muted-foreground">
                  {getStatusText()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={publishStatus === 'published' ? 'default' : 'secondary'}>
                {publishStatus === 'published' ? 'Published' : 'Draft'}
              </Badge>
              
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={saveNow}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              
              <Button 
                size="sm"
                onClick={handlePublish}
                disabled={isSaving || !title.trim() || !content.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                {publishStatus === 'published' ? 'Update' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Editor Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Post Title
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="Enter your post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-semibold"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Rich Text Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your post..."
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeaturedImageUpload
                imageUrl={featuredImage}
                imageAlt={featuredImageAlt}
                onImageChange={handleFeaturedImageChange}
              />
            </motion.div>

            {/* SEO Fields */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SEOMetaFields
                data={seoData}
                onChange={setSeoData}
                postTitle={title}
                postContent={content}
              />
            </motion.div>

            {/* Post Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Post Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Publication Status
                    </label>
                    <select
                      value={publishStatus}
                      onChange={(e) => setPublishStatus(e.target.value as 'draft' | 'published')}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Auto-save: Every 30 seconds</p>
                    <p>• Word count: {content.replace(/<[^>]*>/g, '').split(' ').filter(Boolean).length}</p>
                    <p>• Reading time: ~{Math.ceil(content.replace(/<[^>]*>/g, '').split(' ').filter(Boolean).length / 200)} min</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 