import { VentureListResponse, VentureWithRelations, CommentListResponse, UpvoteResponse } from '@/types/venture';

export async function fetchVentures(params: Record<string, string | string[] | undefined> = {}): Promise<VentureListResponse> {
  // Convert params to query string
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        queryParams.set(key, value.join(','));
      } else {
        queryParams.set(key, value);
      }
    }
  });
  
  const queryString = queryParams.toString();
  const url = `/api/ventures${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ventures');
  }
  
  return response.json();
}

export async function fetchVentureBySlug(slug: string): Promise<VentureWithRelations> {
  const response = await fetch(`/api/ventures/${slug}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch venture');
  }
  
  return response.json();
}

export async function upvoteVenture(ventureId: string): Promise<UpvoteResponse> {
  const response = await fetch('/api/ventures/upvote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ventureId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to upvote venture');
  }
  
  return response.json();
}

export async function fetchComments(ventureId: string, page = 1, limit = 10): Promise<CommentListResponse> {
  const response = await fetch(`/api/ventures/comments?ventureId=${ventureId}&page=${page}&limit=${limit}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
}

export async function addComment(ventureId: string, content: string): Promise<any> {
  const response = await fetch('/api/ventures/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ventureId, content }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  
  return response.json();
}