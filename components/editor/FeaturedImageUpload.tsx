'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';

interface FeaturedImageUploadProps {
  imageUrl: string;
  imageAlt: string;
  onImageChange: (url: string, alt: string) => void;
}

export default function FeaturedImageUpload({ 
  imageUrl, 
  imageAlt, 
  onImageChange 
}: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [altInput, setAltInput] = useState(imageAlt);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadToCloudinary(file);
      onImageChange(uploadedUrl, altInput || 'Featured image');
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [altInput, onImageChange]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [handleFileUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim(), altInput || 'Featured image');
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  const removeImage = () => {
    onImageChange('', '');
    setAltInput('');
  };

  const handleAltChange = (newAlt: string) => {
    setAltInput(newAlt);
    if (imageUrl) {
      onImageChange(imageUrl, newAlt);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Featured Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl ? (
          /* Image Preview */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-lg border bg-muted">
              <img
                src={imageUrl}
                alt={imageAlt || 'Featured image'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeImage}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            
            {/* Alt Text Input */}
            <div className="mt-3">
              <Label htmlFor="alt-text" className="text-sm font-medium">
                Alt Text (for accessibility)
              </Label>
              <Input
                id="alt-text"
                type="text"
                placeholder="Describe the image..."
                value={altInput}
                onChange={(e) => handleAltChange(e.target.value)}
                className="mt-1"
              />
            </div>
          </motion.div>
        ) : (
          /* Upload Area */
          <div className="space-y-4">
            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-muted-foreground/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isUploading ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  ) : (
                    <Upload className="w-12 h-12 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <p className="text-lg font-medium">
                    {isUploading ? 'Uploading...' : 'Drop your image here'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse files
                  </p>
                </div>

                {!isUploading && (
                  <div className="flex justify-center gap-2">
                    <label htmlFor="file-upload">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </span>
                      </Button>
                    </label>
                    <Button
                      variant="outline"
                      onClick={() => setShowUrlInput(true)}
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Add URL
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />

            {/* URL Input */}
            <AnimatePresence>
              {showUrlInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 border rounded-lg p-4 bg-muted/30"
                >
                  <Label htmlFor="image-url" className="text-sm font-medium">
                    Image URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="image-url"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleUrlSubmit();
                        }
                        if (e.key === 'Escape') {
                          setShowUrlInput(false);
                          setUrlInput('');
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={handleUrlSubmit}
                      disabled={!urlInput.trim()}
                    >
                      Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setShowUrlInput(false);
                        setUrlInput('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="url-alt-text" className="text-sm font-medium">
                      Alt Text
                    </Label>
                    <Input
                      id="url-alt-text"
                      type="text"
                      placeholder="Describe the image..."
                      value={altInput}
                      onChange={(e) => setAltInput(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Format Guidelines */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Supported formats: JPG, PNG, WebP, GIF</p>
              <p>• Recommended size: 1200x630px for optimal display</p>
              <p>• Maximum file size: 10MB</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 