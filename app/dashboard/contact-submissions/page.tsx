'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Trash2, Eye, Mail, Archive, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminProtection from '@/components/auth/AdminProtection';

// Type definitions
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  services: string[];
  budget: string;
  country: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

// Debounced search hook
function useDebounced<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function ContactSubmissionsContent() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED'>('ALL');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Debounced search term for performance
  const debouncedSearchTerm = useDebounced(searchTerm, 300);

  // Memoized filtering function
  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;

    // Filter by search term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(searchLower) ||
        sub.email.toLowerCase().includes(searchLower) ||
        sub.companyName?.toLowerCase().includes(searchLower) ||
        sub.country.toLowerCase().includes(searchLower) ||
        sub.message.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    return filtered;
  }, [submissions, debouncedSearchTerm, statusFilter]);

  // Memoized status counts
  const statusCounts = useMemo(() => {
    return submissions.reduce((counts, sub) => {
      counts[sub.status] = (counts[sub.status] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }, [submissions]);

  // Memoized handlers
  const handleStatusChange = useCallback((newStatus: typeof statusFilter) => {
    setStatusFilter(newStatus);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('ALL');
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete submission');
      }

      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('Failed to delete submission. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  }, []);

  const updateStatus = useCallback(async (id: string, newStatus: ContactSubmission['status']) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === id ? { ...sub, status: newStatus } : sub
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  }, []);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/contact');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
        
        // Auto-mark NEW submissions as READ when page loads
        const newSubmissions = data.filter((sub: ContactSubmission) => sub.status === 'NEW');
        if (newSubmissions.length > 0) {
          await Promise.all(
            newSubmissions.map((sub: ContactSubmission) => 
              fetch(`/api/contact/${sub.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'READ' })
              })
            )
          );
          
          // Update local state
          setSubmissions(prev => 
            prev.map(sub => 
              sub.status === 'NEW' ? { ...sub, status: 'READ' as const } : sub
            )
          );
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load contact submissions. Please try again later.');
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-2">Manage and respond to contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-6 rounded-lg shadow"
      >
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
          </div>
          <div className="flex gap-1">
            {(['ALL', 'NEW', 'READ', 'REPLIED', 'ARCHIVED'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(status)}
                className="text-xs"
              >
                {status === 'ALL' ? 'All' : status === 'READ' ? 'Read' : status}
                {status !== 'ALL' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {statusCounts[status] || 0}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      {!loading && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredSubmissions.length} of {submissions.length} submissions
            {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
            {statusFilter !== 'ALL' && ` with status "${statusFilter}"`}
          </span>
          {(debouncedSearchTerm || statusFilter !== 'ALL') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 animate-pulse" />
            </Card>
          ))}
        </div>
      ) : filteredSubmissions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {filteredSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onDelete={handleDelete}
              onUpdateStatus={updateStatus}
              deleteLoading={deleteLoading === submission.id}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-500">
            {debouncedSearchTerm || statusFilter !== 'ALL' 
              ? 'Try adjusting your filters to see more submissions.'
              : 'No contact submissions have been received yet.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Optimized submission card component
interface SubmissionCardProps {
  submission: ContactSubmission;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: ContactSubmission['status']) => void;
  deleteLoading: boolean;
}

const SubmissionCard = ({ submission, onDelete, onUpdateStatus, deleteLoading }: SubmissionCardProps) => {
  const formatDate = useMemo(() => {
    return new Date(submission.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [submission.createdAt]);

  const statusColor = useMemo(() => {
    const colors = {
      'NEW': 'bg-blue-100 text-blue-800',
      'READ': 'bg-gray-100 text-gray-800',
      'REPLIED': 'bg-green-100 text-green-800',
      'ARCHIVED': 'bg-yellow-100 text-yellow-800'
    };
    return colors[submission.status] || colors['READ'];
  }, [submission.status]);

  return (
    <Card className={`overflow-hidden transition-all duration-200 ${
      submission.status === 'ARCHIVED' ? 'opacity-70' : ''
    } ${submission.status === 'NEW' ? 'border-blue-300 shadow-sm shadow-blue-100' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {submission.name}
              {submission.companyName && (
                <span className="text-gray-500 font-normal"> • {submission.companyName}</span>
              )}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {submission.email}
              </span>
              <span>{submission.country}</span>
              <span>{formatDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColor}>
              {submission.status === 'READ' ? 'Read' : submission.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Services and Budget */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Services:</span>
          {submission.services.map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
          <Badge variant="secondary" className="text-xs ml-2">
            Budget: {submission.budget}
          </Badge>
        </div>

        {/* Message */}
        <div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {submission.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            {submission.status !== 'REPLIED' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateStatus(submission.id, 'REPLIED')}
                className="text-xs"
              >
                <Mail className="h-3 w-3 mr-1" />
                Mark as Replied
              </Button>
            )}
            
            {submission.status !== 'ARCHIVED' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateStatus(submission.id, 'ARCHIVED')}
                className="text-xs"
              >
                <Archive className="h-3 w-3 mr-1" />
                Archive
              </Button>
            )}
          </div>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(submission.id)}
            disabled={deleteLoading}
            className="text-xs"
          >
            {deleteLoading ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
            ) : (
              <Trash2 className="h-3 w-3 mr-1" />
            )}
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Export the main component wrapped with AdminProtection
export default function ContactSubmissionsPage() {
  return (
    <AdminProtection>
      <ContactSubmissionsContent />
    </AdminProtection>
  );
} 