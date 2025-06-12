import PostsList from '@/components/posts/PostsList'

export const metadata = {
  title: 'Blog | Nexora Digital',
  description: 'Read the latest articles and insights from Nexora Digital',
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600 mb-8">Read the latest articles and insights from our team</p>
        
        <PostsList />
      </div>
    </div>
  )
} 