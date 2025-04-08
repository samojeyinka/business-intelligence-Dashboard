// Client-side security utilities

// Fetch a CSRF token from the server
export async function fetchCsrfToken(): Promise<string> {
  try {
    const response = await fetch('/api/csrf-token');
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw new Error('Failed to fetch CSRF token');
  }
}

// Create a fetch wrapper that includes the CSRF token
export async function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Only add CSRF token for non-GET requests
  if (options.method && options.method !== 'GET') {
    try {
      const csrfToken = await fetchCsrfToken();
      
      // Add CSRF token to headers
      const headers = new Headers(options.headers || {});
      headers.append('x-csrf-token', csrfToken);
      
      // Return fetch with CSRF token
      return fetch(url, {
        ...options,
        headers
      });
    } catch (error) {
      console.error('Secure fetch error:', error);
      throw new Error('Security validation failed');
    }
  }
  
  // For GET requests, just use regular fetch
  return fetch(url, options);
}

// Sanitize user input on the client side
export function sanitizeInput(input: string): string {
  // Basic client-side sanitization
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}