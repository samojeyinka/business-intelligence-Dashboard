import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// In a real application, you would store these tokens in a database
// For this demo, we'll use an in-memory store
const verificationTokens: Record<string, {
  email: string;
  articleData: any;
  expiresAt: number;
}> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Handle the initial verification request
    try {
      const { email, articleData } = req.body;
      
      if (!email || !articleData) {
        return res.status(400).json({ error: 'Email and article data are required' });
      }
      
      // Generate a verification token
      const token = crypto.randomBytes(32).toString('hex');
      
      // Store the token with article data (expires in 24 hours)
      verificationTokens[token] = {
        email,
        articleData,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
      };
      
      // In a real application, you would send an email with the verification link
      // For this demo, we'll just return the token
      console.log(`Verification email would be sent to ${email} with token: ${token}`);
      
      // Return success response with the token (in a real app, you wouldn't return the token)
      return res.status(200).json({ 
        success: true, 
        message: 'Verification email sent',
        token // Only for demo purposes
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      return res.status(500).json({ error: 'Failed to send verification email' });
    }
  } else if (req.method === 'GET') {
    // Handle verification token confirmation
    try {
      const { token } = req.query;
      
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'Invalid verification token' });
      }
      
      // Check if token exists and is valid
      const verification = verificationTokens[token];
      
      if (!verification) {
        return res.status(404).json({ error: 'Verification token not found' });
      }
      
      // Check if token has expired
      if (verification.expiresAt < Date.now()) {
        // Remove expired token
        delete verificationTokens[token];
        return res.status(400).json({ error: 'Verification token has expired' });
      }
      
      // In a real application, you would publish the article here
      console.log(`Article verified and would be published for ${verification.email}`);
      
      // Remove the used token
      delete verificationTokens[token];
      
      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: 'Article verified and published'
      });
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(500).json({ error: 'Failed to verify token' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}