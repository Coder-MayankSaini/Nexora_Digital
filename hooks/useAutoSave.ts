'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useSession } from '@/lib/useSession';

export interface DraftData {
  id?: string;
  title: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  seo: {
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  };
  status: 'draft' | 'published';
  lastSaved?: string;
}

interface UseAutoSaveOptions {
  data: DraftData;
  onSave?: (data: DraftData) => void;
  onError?: (error: Error) => void;
  interval?: number; // in milliseconds
  enabled?: boolean;
}

export function useAutoSave({
  data,
  onSave,
  onError,
  interval = 30000, // 30 seconds
  enabled = true
}: UseAutoSaveOptions) {
  const { session } = useSession();
  const lastSavedData = useRef<string>('');
  const saveTimeout = useRef<NodeJS.Timeout>();
  const isSaving = useRef(false);

  const saveDraft = useCallback(async (draftData: DraftData): Promise<void> => {
    if (!session?.user?.id || isSaving.current) return;

    try {
      isSaving.current = true;
      
      const response = await fetch('/api/posts/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...draftData,
          authorId: session.user.id,
          lastSaved: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save draft');
      }

      const savedDraft = await response.json();
      lastSavedData.current = JSON.stringify(draftData);
      
      if (onSave) {
        onSave(savedDraft);
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      if (onError) {
        onError(error as Error);
      }
    } finally {
      isSaving.current = false;
    }
  }, [session, onSave, onError]);

  const debouncedSave = useCallback((draftData: DraftData) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      saveDraft(draftData);
    }, 2000); // Wait 2 seconds after last change
  }, [saveDraft]);

  // Auto-save when data changes
  useEffect(() => {
    if (!enabled || !session?.user?.id) return;

    const currentDataString = JSON.stringify(data);
    
    // Only save if data has actually changed and has meaningful content
    if (
      currentDataString !== lastSavedData.current &&
      (data.title.trim() || data.content.trim())
    ) {
      debouncedSave(data);
    }
  }, [data, enabled, session, debouncedSave]);

  // Periodic auto-save
  useEffect(() => {
    if (!enabled || !session?.user?.id) return;

    const autoSaveInterval = setInterval(() => {
      const currentDataString = JSON.stringify(data);
      
      if (
        currentDataString !== lastSavedData.current &&
        (data.title.trim() || data.content.trim())
      ) {
        saveDraft(data);
      }
    }, interval);

    return () => clearInterval(autoSaveInterval);
  }, [data, enabled, session, interval, saveDraft]);

  // Save on page unload
  useEffect(() => {
    if (!enabled || !session?.user?.id) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const currentDataString = JSON.stringify(data);
      
      if (
        currentDataString !== lastSavedData.current &&
        (data.title.trim() || data.content.trim())
      ) {
        // Trigger synchronous save
        navigator.sendBeacon('/api/posts/draft', JSON.stringify({
          ...data,
          authorId: session.user.id,
          lastSaved: new Date().toISOString(),
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [data, enabled, session]);

  // Manual save function
  const saveNow = useCallback(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }
    return saveDraft(data);
  }, [saveDraft, data]);

  // Load draft function
  const loadDraft = useCallback(async (draftId: string): Promise<DraftData | null> => {
    try {
      const response = await fetch(`/api/posts/draft/${draftId}`);
      if (!response.ok) {
        throw new Error('Failed to load draft');
      }
      
      const draft = await response.json();
      lastSavedData.current = JSON.stringify(draft);
      return draft;
    } catch (error) {
      console.error('Load draft error:', error);
      if (onError) {
        onError(error as Error);
      }
      return null;
    }
  }, [onError]);

  // List drafts function
  const listDrafts = useCallback(async (): Promise<DraftData[]> => {
    try {
      const response = await fetch('/api/posts/drafts');
      if (!response.ok) {
        throw new Error('Failed to load drafts');
      }
      
      return await response.json();
    } catch (error) {
      console.error('List drafts error:', error);
      if (onError) {
        onError(error as Error);
      }
      return [];
    }
  }, [onError]);

  return {
    saveNow,
    loadDraft,
    listDrafts,
    isSaving: isSaving.current,
    lastSaved: data.lastSaved,
  };
} 