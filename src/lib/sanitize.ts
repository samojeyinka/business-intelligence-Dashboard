import DOMPurify from 'isomorphic-dompurify';

// Sanitize HTML content to prevent XSS attacks
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

// Sanitize plain text (remove all HTML)
export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
}

// Sanitize URL to prevent javascript: protocol and other malicious URLs
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Basic URL sanitization
  const sanitized = url.trim();
  
  // Check for javascript: protocol
  if (/^javascript:/i.test(sanitized)) {
    return '';
  }
  
  // Check for data: protocol
  if (/^data:/i.test(sanitized)) {
    return '';
  }
  
  return sanitized;
}

// Sanitize an object's string properties
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj } as T;
  
  for (const key in result) {
    if (typeof result[key] === 'string') {
      // Use type assertion to handle the string case
      result[key] = sanitizeText(result[key] as string) as any;
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      // Use type assertion for nested objects
      result[key] = sanitizeObject(result[key] as Record<string, any>) as any;
    }
  }
  
  return result;
}