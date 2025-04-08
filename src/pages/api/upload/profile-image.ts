import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { validateFile, generateSecureFilename } from '@/lib/secureUploads';

// Disable the default body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Parse the incoming form data
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      filter: (part) => {
        return part.mimetype?.startsWith('image/') || false;
      },
    });

    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Get the uploaded file
    const fileArray = files.file;
    if (!fileArray) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Validate the file
    const validation = validateFile({
      mimetype: file.mimetype?.toString() || '',
      size: file.size || 0,
      originalname: file.originalFilename?.toString() || '',
    });

    if (!validation.valid) {
      // Remove the uploaded file
      if (file.filepath) {
        fs.unlinkSync(file.filepath);
      }
      return res.status(400).json({ error: validation.error });
    }

    // Generate a secure filename
    const secureFilename = generateSecureFilename(file.originalFilename?.toString() || 'unknown');
    const newFilePath = path.join(uploadsDir, secureFilename);

    // Rename the file
    if (file.filepath) {
      fs.renameSync(file.filepath, newFilePath);
    }

    // Return the file path that can be used in the frontend
    const publicPath = `/uploads/${secureFilename}`;
    
    // Log successful upload
    console.log(`Profile image uploaded: ${publicPath}`);
    
    return res.status(200).json({ 
      success: true, 
      filePath: publicPath 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
}