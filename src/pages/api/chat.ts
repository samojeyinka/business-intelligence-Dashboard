import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Add this config to bypass CSRF for API routes
export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { message, websiteInfo } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
    
    if (!apiKey) {
      console.error("Google API key is missing");
      return res.status(500).json({ error: 'API configuration error' });
    }

    console.log("API Key found, initializing Gemini..."); // Debug log

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a helpful chatbot for a website. Here is information about the website:
    ${websiteInfo}
    
    User: ${message}`;

    console.log("Sending prompt to Gemini:", prompt); // Debug log

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log("Received response from Gemini"); // Debug log
    
    return res.status(200).json({ response });
  } catch (error) {
    console.error("Detailed Error in chat API:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}