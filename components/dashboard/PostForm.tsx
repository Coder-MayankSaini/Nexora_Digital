'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  content: string
  featuredImage?: string
  featuredImageAlt?: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string
  status: 'DRAFT' | 'PUBLISHED'
}

export default function PostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      status: 'DRAFT'
    }
  })
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Parse keywords string to array
      const keywordsArray = data.keywords 
        ? data.keywords.split(',').map(k => k.trim()).filter(Boolean)
        : []
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          keywords: keywordsArray
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create post')
      }
      
      const result = await response.json()
      
      // Redirect to the post or dashboard
      if (data.status === 'PUBLISHED') {
        router.push(`/blog/${result.post.slug}`)
      } else {
        router.push('/dashboard')
      }
      
      // Refresh the current route to show updated data
      router.refresh()
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the post')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          rows={10}
          {...register('content', { required: 'Content is required' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="featuredImage" className="block text-sm font-medium">
          Featured Image URL
        </label>
        <input
          id="featuredImage"
          type="text"
          {...register('featuredImage')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="featuredImageAlt" className="block text-sm font-medium">
          Featured Image Alt Text
        </label>
        <input
          id="featuredImageAlt"
          type="text"
          {...register('featuredImageAlt')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="seoTitle" className="block text-sm font-medium">
          SEO Title
        </label>
        <input
          id="seoTitle"
          type="text"
          {...register('seoTitle')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-gray-500 text-xs">If left blank, the post title will be used</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="seoDescription" className="block text-sm font-medium">
          SEO Description
        </label>
        <textarea
          id="seoDescription"
          rows={3}
          {...register('seoDescription')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="keywords" className="block text-sm font-medium">
          Keywords
        </label>
        <input
          id="keywords"
          type="text"
          {...register('keywords')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-gray-500 text-xs">Separate keywords with commas</p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  )
} 