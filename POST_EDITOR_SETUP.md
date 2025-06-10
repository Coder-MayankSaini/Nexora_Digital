# Post Editor Setup Guide

This guide will help you set up the complete post editor with TipTap rich text editing, Cloudinary image uploads, auto-save functionality, and SEO meta fields.

## 🚀 Features

- **Rich Text Editor**: TipTap-powered WYSIWYG editor with formatting tools
- **Image Upload**: Cloudinary integration for featured images and in-content images
- **Auto-Save**: Automatic draft saving every 30 seconds + on-demand save
- **SEO Optimization**: Complete meta fields with live preview
- **Role-Based Access**: Editor and Admin roles can create/publish content

## 📋 Prerequisites

1. **Cloudinary Account**: Sign up at [cloudinary.com](https://cloudinary.com)
2. **Database**: Prisma with SQLite (already configured)

## ⚙️ Environment Variables

Add these variables to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset-name"
```

### Getting Cloudinary Credentials

1. **Cloud Name**: Found in your Cloudinary dashboard
2. **API Key & Secret**: In Settings > API Keys
3. **Upload Preset**: 
   - Go to Settings > Upload
   - Create new "Unsigned" upload preset
   - Set folder to `nexora/posts` (optional)
   - Enable auto-optimization and auto-format

## 🗄️ Database Migration

Run the Prisma migration to create the Post model:

```bash
npx prisma generate
npx prisma db push
```

## 🎯 Usage

### Accessing the Editor

1. **Login** with an account that has EDITOR or ADMIN role
2. **Navigate** to `/dashboard/editor`
3. **Start writing** your post!

### Editor Features

#### Rich Text Editing
- **Formatting**: Bold, italic, strikethrough
- **Headings**: H1, H2, H3
- **Lists**: Bullet points and numbered lists
- **Alignment**: Left, center, right
- **Media**: Insert images directly in content
- **Links**: Add and remove hyperlinks
- **Code**: Inline code and blockquotes

#### Featured Image
- **Drag & Drop**: Drop images directly onto upload area
- **File Browser**: Click to select files
- **URL Import**: Paste image URLs
- **Alt Text**: Accessibility-friendly descriptions
- **Auto-Upload**: Seamless Cloudinary integration

#### SEO Meta Fields
- **Title Optimization**: Character count guidance (60 max)
- **Meta Description**: Preview how it appears in search (160 max)
- **URL Slug**: Auto-generated or custom
- **Keywords**: Tag-based keyword management
- **Open Graph**: Facebook/LinkedIn preview
- **Twitter Cards**: Twitter-specific meta tags
- **Live Preview**: See how posts appear on different platforms

#### Auto-Save System
- **Smart Detection**: Only saves when content changes
- **Debounced Saves**: 2-second delay after typing stops
- **Periodic Backup**: Every 30 seconds automatically
- **Page Unload**: Saves before leaving the page
- **Manual Save**: Click "Save Draft" anytime
- **Status Indicators**: Visual feedback on save status

### Publishing Workflow

1. **Create Draft**: Start writing and auto-save handles the rest
2. **Add Featured Image**: Upload or paste image URL
3. **Optimize SEO**: Fill in meta fields and preview
4. **Review Content**: Use the rich text editor toolbar
5. **Publish**: Click "Publish" when ready

### API Endpoints

- `POST /api/posts/draft` - Save draft
- `POST /api/posts/publish` - Publish post
- `GET /api/posts/drafts` - List user's drafts
- `GET /api/posts/draft/[id]` - Load specific draft

## 🔐 Permissions

### Role Requirements
- **USER**: Can view dashboard but not access editor
- **EDITOR**: Can create, edit, and publish posts
- **ADMIN**: Full access to all editor features

### Security Features
- **User Isolation**: Users can only edit their own drafts
- **Role Validation**: API routes check user permissions
- **Slug Uniqueness**: Prevents duplicate URLs
- **Input Validation**: Required fields for publishing

## 🎨 Customization

### Editor Toolbar
Modify `components/editor/RichTextEditor.tsx` to add/remove tools:

```typescript
// Add custom extensions
extensions: [
  StarterKit,
  Image,
  Link,
  // Add your custom extensions here
]
```

### SEO Fields
Customize SEO fields in `components/editor/SEOMetaFields.tsx`:

```typescript
// Add custom meta fields
const customFields = {
  robots: 'index,follow',
  author: session?.user?.name,
  // Add more custom fields
}
```

### Auto-Save Timing
Adjust save intervals in `hooks/useAutoSave.ts`:

```typescript
const { saveNow } = useAutoSave({
  data: draftData,
  interval: 60000, // Change to 60 seconds
  // Other options...
});
```

## 📱 Mobile Experience

The editor is fully responsive with:
- **Touch-Friendly**: Large toolbar buttons
- **Mobile Toolbar**: Scrollable button groups
- **Responsive Layout**: Adapts to screen size
- **Drag & Drop**: Works on mobile devices

## 🔧 Troubleshooting

### Common Issues

1. **Images not uploading**
   - Check Cloudinary credentials
   - Verify upload preset is "unsigned"
   - Ensure API keys are correct

2. **Auto-save not working**
   - Check browser console for errors
   - Verify user is logged in
   - Check API route responses

3. **Publishing fails**
   - Ensure user has EDITOR/ADMIN role
   - Check required fields (title, content, slug)
   - Verify slug uniqueness

### Debug Mode

Add debug logging to auto-save:

```typescript
const { saveNow } = useAutoSave({
  data: draftData,
  onSave: (data) => console.log('Saved:', data),
  onError: (error) => console.error('Save failed:', error),
});
```

## 🚀 Next Steps

1. **Test the Editor**: Create a test post with all features
2. **Configure Cloudinary**: Set up your upload presets
3. **Customize Styling**: Adjust the editor theme to match your brand
4. **Add Content Types**: Extend the Post model for different content types
5. **Analytics Integration**: Track editor usage and post performance

---

The post editor is now ready to use! Start creating amazing content with professional editing tools. 🎉 