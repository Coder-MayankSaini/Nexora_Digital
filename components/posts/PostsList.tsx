'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

type Author = {
  name: string | null
  image: string | null
}

type Post = {
  id: string
  title: string
  slug: string
  featuredImage: string | null
  featuredImageAlt: string | null
  seoDescription: string | null
  publishedAt: string | null
  author: Author
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        setError('Error loading posts. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-pulse text-center">
          <div className="h-6 bg-gray-200 rounded-md w-48 mb-4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-md w-64 mb-2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded-md w-56 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">No posts found</h2>
        <p className="text-gray-600">Check back later for new content.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link 
          href={`/blog/${post.slug}`} 
          key={post.id}
          className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative h-48 w-full overflow-hidden">
            {post.featuredImage ? (
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 h-full w-full flex items-center justify-center">
                <span className="text-white text-lg font-medium">{post.title.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">
              {post.title}
            </h3>
            {post.seoDescription && (
              <p className="text-gray-600 line-clamp-2 mb-3">{post.seoDescription}</p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name || 'Author'}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                )}
                <span>{post.author.name || 'Anonymous'}</span>
              </div>
              {post.publishedAt && (
                <span>{formatDate(post.publishedAt)}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 