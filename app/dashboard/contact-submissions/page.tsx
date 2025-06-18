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
  Loader2
} from 'lucide-react';
// import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const updateStatus = async (id: string, status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED') => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id ? { ...sub, status, updatedAt: new Date().toISOString() } : sub
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-orange-800">Contact Submissions</h1>
          <p className="text-muted-foreground mt-2">
            View and manage contact form submissions from your website
          </p>
        </div>
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
      </motion.div>

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
      ) : submissions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {submissions.map((submission) => (
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
            <p className="text-lg text-gray-500">No contact submissions yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Submissions will appear here once visitors use your contact form
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 