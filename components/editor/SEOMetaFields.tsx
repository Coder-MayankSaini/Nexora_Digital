'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Globe, Eye, Hash } from 'lucide-react';
import slugify from 'slugify';

export interface SEOData {
  title: string;
  description: string;
  slug: string;
  keywords: string[];
  canonicalUrl?: string;
  openGraph: {
    title: string;
    description: string;
    type: 'article' | 'website';
  };
  twitter: {
    title: string;
    description: string;
    card: 'summary' | 'summary_large_image';
  };
}

interface SEOMetaFieldsProps {
  data: SEOData;
  onChange: (data: SEOData) => void;
  postTitle?: string;
  postContent?: string;
}

export default function SEOMetaFields({ 
  data, 
  onChange, 
  postTitle = '',
  postContent = ''
}: SEOMetaFieldsProps) {
  const [keywordInput, setKeywordInput] = useState('');
  const [previewMode, setPreviewMode] = useState<'google' | 'twitter' | 'facebook'>('google');

  // Auto-generate slug from title
  useEffect(() => {
    if (postTitle && !data.slug) {
      const autoSlug = slugify(postTitle, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      onChange({
        ...data,
        slug: autoSlug
      });
    }
  }, [postTitle, data.slug, data, onChange]);

  // Auto-generate meta description from content
  useEffect(() => {
    if (postContent && !data.description) {
      const textContent = postContent.replace(/<[^>]*>/g, '');
      const autoDescription = textContent.substring(0, 160).trim();
      if (autoDescription) {
        onChange({
          ...data,
          description: autoDescription + (textContent.length > 160 ? '...' : '')
        });
      }
    }
  }, [postContent, data.description, data, onChange]);

  const handleFieldChange = (field: keyof SEOData | string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onChange({
        ...data,
        [parent]: {
          ...(data as any)[parent],
          [child]: value
        }
      });
    } else {
      onChange({
        ...data,
        [field]: value
      });
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !data.keywords.includes(keywordInput.trim())) {
      onChange({
        ...data,
        keywords: [...data.keywords, keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange({
      ...data,
      keywords: data.keywords.filter(k => k !== keyword)
    });
  };

  const generateSlug = () => {
    if (data.title || postTitle) {
      const newSlug = slugify(data.title || postTitle, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      handleFieldChange('slug', newSlug);
    }
  };

  const titleLength = data.title.length;
  const descriptionLength = data.description.length;
  const slugLength = data.slug.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          SEO & Meta Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SEO Title */}
        <div className="space-y-2">
          <Label htmlFor="seo-title" className="text-sm font-medium">
            SEO Title
            <span className={`ml-2 text-xs ${
              titleLength > 60 ? 'text-red-500' : titleLength > 50 ? 'text-yellow-500' : 'text-green-500'
            }`}>
              {titleLength}/60
            </span>
          </Label>
          <Input
            id="seo-title"
            type="text"
            placeholder="Enter SEO title..."
            value={data.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className={titleLength > 60 ? 'border-red-300' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Keep it under 60 characters for optimal display in search results
          </p>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="meta-description" className="text-sm font-medium">
            Meta Description
            <span className={`ml-2 text-xs ${
              descriptionLength > 160 ? 'text-red-500' : descriptionLength > 140 ? 'text-yellow-500' : 'text-green-500'
            }`}>
              {descriptionLength}/160
            </span>
          </Label>
          <Textarea
            id="meta-description"
            placeholder="Enter meta description..."
            value={data.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            rows={3}
            className={descriptionLength > 160 ? 'border-red-300' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Keep it under 160 characters. This appears in search engine results.
          </p>
        </div>

        {/* URL Slug */}
        <div className="space-y-2">
          <Label htmlFor="url-slug" className="text-sm font-medium">
            URL Slug
            <span className={`ml-2 text-xs ${
              slugLength > 50 ? 'text-red-500' : 'text-green-500'
            }`}>
              {slugLength} characters
            </span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="url-slug"
              type="text"
              placeholder="url-slug"
              value={data.slug}
              onChange={(e) => handleFieldChange('slug', e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={generateSlug}
              disabled={!data.title && !postTitle}
            >
              Generate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            yoursite.com/posts/<span className="font-medium">{data.slug || 'your-slug'}</span>
          </p>
        </div>

        {/* Keywords */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Keywords & Tags
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add keyword..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addKeyword();
                }
              }}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={addKeyword}
              disabled={!keywordInput.trim()}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[2rem] p-2 border rounded-md bg-muted/30">
            {data.keywords.map((keyword, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="cursor-pointer hover:bg-red-100 hover:text-red-800"
                onClick={() => removeKeyword(keyword)}
              >
                <Hash className="w-3 h-3 mr-1" />
                {keyword}
                <span className="ml-1 text-xs">×</span>
              </Badge>
            ))}
            {data.keywords.length === 0 && (
              <span className="text-sm text-muted-foreground">No keywords added yet</span>
            )}
          </div>
        </div>

        {/* Open Graph */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Open Graph (Facebook/LinkedIn)
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="og-title" className="text-sm">OG Title</Label>
              <Input
                id="og-title"
                placeholder="Leave empty to use SEO title"
                value={data.openGraph.title}
                onChange={(e) => handleFieldChange('openGraph.title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="og-description" className="text-sm">OG Description</Label>
              <Textarea
                id="og-description"
                placeholder="Leave empty to use meta description"
                value={data.openGraph.description}
                onChange={(e) => handleFieldChange('openGraph.description', e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Twitter Card */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-sm font-medium">Twitter Card</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="twitter-title" className="text-sm">Twitter Title</Label>
              <Input
                id="twitter-title"
                placeholder="Leave empty to use SEO title"
                value={data.twitter.title}
                onChange={(e) => handleFieldChange('twitter.title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="twitter-description" className="text-sm">Twitter Description</Label>
              <Textarea
                id="twitter-description"
                placeholder="Leave empty to use meta description"
                value={data.twitter.description}
                onChange={(e) => handleFieldChange('twitter.description', e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Preview</span>
            <div className="flex gap-1 ml-auto">
              {(['google', 'facebook', 'twitter'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={previewMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode(mode)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Google Preview */}
          {previewMode === 'google' && (
            <div className="border rounded-lg p-4 bg-white">
              <div className="text-xs text-green-600 mb-1">
                yoursite.com › posts › {data.slug || 'your-slug'}
              </div>
              <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer mb-1">
                {data.title || postTitle || 'Your Post Title'}
              </div>
              <div className="text-sm text-gray-600 line-clamp-2">
                {data.description || 'Your meta description will appear here...'}
              </div>
            </div>
          )}

          {/* Facebook Preview */}
          {previewMode === 'facebook' && (
            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Featured Image</span>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase mb-1">yoursite.com</div>
                <div className="font-medium text-gray-900 mb-1">
                  {data.openGraph.title || data.title || postTitle || 'Your Post Title'}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {data.openGraph.description || data.description || 'Your description will appear here...'}
                </div>
              </div>
            </div>
          )}

          {/* Twitter Preview */}
          {previewMode === 'twitter' && (
            <div className="border rounded-xl overflow-hidden bg-white">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Featured Image</span>
              </div>
              <div className="p-3">
                <div className="font-medium text-gray-900 mb-1 line-clamp-1">
                  {data.twitter.title || data.title || postTitle || 'Your Post Title'}
                </div>
                <div className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {data.twitter.description || data.description || 'Your description will appear here...'}
                </div>
                <div className="text-xs text-gray-500">yoursite.com</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 