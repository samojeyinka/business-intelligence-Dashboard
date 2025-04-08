import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import crypto from 'crypto';

// Allowed file types and their corresponding MIME types
const ALLOWED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
};

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Validate file type and size
export function validateFile(
  file: { mimetype: string; size: number; originalname: string }
): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds the maximum allowed size of ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    };
  }
  
  // Check file type
  const allowedExtensions = ALLOWED_FILE_TYPES[file.mimetype];
  if (!allowedExtensions) {
    return {
      valid: false,
      error: 'File type not allowed'
    };
  }
  
  // Check file extension
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: `Invalid file extension. Expected one of: ${allowedExtensions.join(', ')}`
    };
  }
  
  return { valid: true };
}

// Generate a secure filename
export function generateSecureFilename(originalFilename: string): string {
  const fileExtension = path.extname(originalFilename);
  const randomString = crypto.randomBytes(16).toString('hex');
  const timestamp = Date.now();
  
  return `${randomString}-${timestamp}${fileExtension}`;
}

// Middleware for handling file uploads
export function withFileUploadValidation(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check if request contains files
    if (req.files) {
      // Validate each file
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      
      for (const file of files) {
        const validation = validateFile(file);
        
        if (!validation.valid) {
          return res.status(400).json({
            error: validation.error
          });
        }
        
        // Replace original filename with secure filename
        file.originalname = generateSecureFilename(file.originalname);
      }
    }
    
    // Continue to the handler
    return handler(req, res);
  };
}