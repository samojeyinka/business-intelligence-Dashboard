import { VentureListResponse, VentureWithRelations, CommentListResponse, UpvoteResponse } from '@/types/venture';

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { error: 'Unknown error' };
    }
    
    throw new ApiError(
      errorData.error || `API error: ${response.status}`,
      response.status,
      errorData
    );
  }
  
  return response.json();
}

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
  
  try {
    const response = await fetch(url);
    return handleResponse<VentureListResponse>(response);
  } catch (error) {
    console.error('Error fetching ventures:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch ventures', 500);
  }
}

export async function fetchVentureBySlug(slug: string): Promise<VentureWithRelations> {
  try {
    const response = await fetch(`/api/ventures/${slug}`);
    return handleResponse<VentureWithRelations>(response);
  } catch (error) {
    console.error('Error fetching venture:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch venture', 500);
  }
}

export async function upvoteVenture(ventureId: string): Promise<UpvoteResponse> {
  try {
    const response = await fetch('/api/ventures/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ventureId }),
    });
    
    return handleResponse<UpvoteResponse>(response);
  } catch (error) {
    console.error('Error upvoting venture:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to upvote venture', 500);
  }
}

export async function fetchComments(ventureId: string, page = 1, limit = 10): Promise<CommentListResponse> {
  try {
    const response = await fetch(`/api/ventures/comments?ventureId=${ventureId}&page=${page}&limit=${limit}`);
    return handleResponse<CommentListResponse>(response);
  } catch (error) {
    console.error('Error fetching comments:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch comments', 500);
  }
}

export async function addComment(ventureId: string, content: string): Promise<any> {
  try {
    const response = await fetch('/api/ventures/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ventureId, content }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error adding comment:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to add comment', 500);
  }
}