'use client';

import { useState, useEffect } from 'react';
import { useRequiredRole } from '@/lib/useSession';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Tag, 
  MessageCircle,
  CheckCircle,
  Archive,
  RefreshCcw,
  Loader2,
  Trash2,
  Filter,
  Search,
  X
} from 'lucide-react';
// import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string | null;
  country: string;
  services: string[];
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
};

export default function ContactSubmissionsPage() {
  const { hasRole } = useRequiredRole('ADMIN');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED'>('ALL');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

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

    if (hasRole) {
      fetchSubmissions();
    }
  }, [hasRole]);

  // Filter submissions based on search term and status
  useEffect(() => {
    let filtered = submissions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, statusFilter]);

  const updateStatus = async (id: string, status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED') => {
    try {
      console.log('Updating status:', { id, status }); // Debug log
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to update status: ${response.status} ${errorText}`);
      }

      const updatedSubmission = await response.json();
      console.log('Status updated successfully:', updatedSubmission); // Debug log

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, status, updatedAt: new Date().toISOString() } : sub
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      // Show user-friendly error
      setError(`Failed to update status: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete submission: ${response.status} ${errorText}`);
      }

      // Remove from local state
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Error deleting submission:', err);
      setError(`Failed to delete submission: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'READ':
        return <Badge className="bg-green-500">Read</Badge>;
      case 'REPLIED':
        return <Badge className="bg-purple-500">Replied</Badge>;
      case 'ARCHIVED':
        return <Badge variant="outline" className="text-gray-500">Archived</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const refreshData = () => {
    setLoading(true);
    setError(null);
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error refreshing submissions:', err);
        setError('Failed to refresh data');
        setLoading(false);
      });
  };

  if (!hasRole) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You need admin privileges to access contact submissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-orange-800">Contact Submissions</h1>
          <p className="text-muted-foreground mt-2">
            View and manage contact form submissions from your website
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={refreshData}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, company, country, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
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
                onClick={() => setStatusFilter(status)}
                className="text-xs"
              >
                                 {status === 'ALL' ? 'All' : status === 'READ' ? 'Read' : status}
                {status !== 'ALL' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {submissions.filter(sub => sub.status === status).length}
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
            {searchTerm && ` for "${searchTerm}"`}
            {statusFilter !== 'ALL' && ` with status "${statusFilter}"`}
          </span>
          {(searchTerm || statusFilter !== 'ALL') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('ALL');
              }}
              className="text-xs"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}

      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
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
            <Card
              key={submission.id}
              className={`overflow-hidden transition-all duration-200 ${
                submission.status === 'ARCHIVED' ? 'opacity-70' : ''
              } ${submission.status === 'NEW' ? 'border-blue-300 shadow-sm shadow-blue-100' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{submission.name}</CardTitle>
                    <CardDescription>
                      {new Date(submission.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(submission.status)}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2" align="end">
                        <div className="flex flex-col space-y-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="justify-start"
                            onClick={() => updateStatus(submission.id, 'READ')}
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Mark as Read
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="justify-start"
                            onClick={() => updateStatus(submission.id, 'REPLIED')}
                          >
                            <MessageCircle className="mr-2 h-4 w-4 text-purple-500" />
                            Mark as Replied
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="justify-start"
                            onClick={() => updateStatus(submission.id, 'ARCHIVED')}
                          >
                            <Archive className="mr-2 h-4 w-4 text-gray-500" />
                            Archive
                          </Button>
                          <hr className="my-1" />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deleteSubmission(submission.id)}
                            disabled={deleteLoading === submission.id}
                          >
                            {deleteLoading === submission.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a 
                        href={`mailto:${submission.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {submission.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <a 
                        href={`tel:${submission.phoneNumber}`}
                        className="hover:underline"
                      >
                        {submission.phoneNumber}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{submission.country}</span>
                    </div>
                    {submission.companyName && (
                      <div className="flex items-center text-sm">
                        <Building className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{submission.companyName}</span>
                      </div>
                    )}
                    <div className="flex items-start text-sm">
                      <Tag className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                      <div className="flex flex-wrap gap-1">
                        {submission.services.map((service, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-100">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm border-l pl-4">
                    <h4 className="font-medium mb-2">Message:</h4>
                    <p className="whitespace-pre-wrap text-gray-600">
                      {submission.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            {submissions.length === 0 ? (
              <>
                <p className="text-lg text-gray-500">No contact submissions yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Submissions will appear here once visitors use your contact form
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-500">No submissions match your filters</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search terms or status filter
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('ALL');
                  }}
                  className="mt-3"
                >
                  Clear all filters
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 