import PostForm from '@/components/dashboard/PostForm'

export const metadata = {
  title: 'Create New Post | Dashboard',
  description: 'Create a new blog post',
}

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <PostForm />
      </div>
    </div>
  )
} 