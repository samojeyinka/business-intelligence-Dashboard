export const metadata = {
  title: {
    default: 'Notepaper AI - Transform Your Notes with AI Magic',
    template: '%s | Notepaper AI'
  },
  description: 'Capture, transform, and collaborate with our intelligent note-taking platform. Convert between formats, edit PDFs, generate code, and study together—all powered by AI.',
  keywords: [
    'AI notes',
    'PDF editor',
    'document conversion',
    'collaborative notes',
    'OCR',
    'text extraction',
    'data analysis',
    'AI note-taking',
    'PDF to text',
    'document AI'
  ],
  authors: [
    {
      name: 'Your Name or Company',
      url: 'https://yourdomain.com',
    },
  ],
  creator: 'Your Name or Company',
  publisher: 'Your Name or Company',
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'Notepaper AI - Transform Your Notes with AI Magic',
    description: 'Capture, transform, and collaborate with our intelligent note-taking platform powered by AI.',
    url: 'https://yourdomain.com',
    siteName: 'Notepaper AI',
    images: [
      {
        url: '/og-image.jpg', // or full URL
        width: 1200,
        height: 630,
        alt: 'Notepaper AI - AI-powered note transformation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notepaper AI - Transform Your Notes with AI Magic',
    description: 'Capture, transform, and collaborate with our intelligent note-taking platform powered by AI.',
    images: ['/twitter-image.jpg'], // or full URL
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  category: 'productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}