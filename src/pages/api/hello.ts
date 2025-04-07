// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withApiMiddleware } from '@/lib/apiMiddleware';

type Data = {
  name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" });
}

export default withApiMiddleware(handler, {
  methods: ['GET'],
  rateLimit: {
    limit: 100,
    windowMs: 60000 // 1 minute
  }
});