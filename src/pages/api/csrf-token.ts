import { NextApiRequest, NextApiResponse } from 'next';
import { withApiMiddleware } from '@/lib/apiMiddleware';
import { createCsrfToken } from '@/lib/csrf';
import cookie from 'cookie';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Generate a new CSRF token
    const { token, expires } = createCsrfToken();
    
    // Set the CSRF token as a cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('csrf-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(expires),
      })
    );
    
    // Return the token to the client
    return res.status(200).json({ csrfToken: token });
  }
}

export default withApiMiddleware(handler, {
  methods: ['GET'],
  rateLimit: {
    limit: 10,
    windowMs: 60000 // 1 minute
  },
  csrfProtection: false // No CSRF protection for the CSRF token endpoint
});