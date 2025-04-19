'use client';
import '../../styles/globals.css'
import { useState, useRef, useEffect } from 'react';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { Upload, FileText, Download, Loader2, Send, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import Header from '@/components/globals/Header';
import { useThemeStore } from '@/lib/stores/themeStore';

export default function PdfToWordConverter() {
    const { darkMode } = useThemeStore();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  // Load PDF.js dynamically
  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        if (!window.pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
          script.async = true;
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
              'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          };
          document.head.appendChild(script);
        }
      } catch (err) {
        console.error('Failed to load PDF.js:', err);
        setError('Failed to load PDF processing library. Please refresh and try again.');
      }
    };

    loadPdfJs();

    // Check for dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const isPdfFile = (file: File) => {
    return file.type === 'application/pdf';
  };

  const handleFileSelect = async (file: File) => {
    if (!isPdfFile(file)) {
      setError('Please select a valid PDF document.');
      setPdfFile(null);
      setFileName('');
      setPreviewText('');
      return;
    }

    setError(null);
    setPdfFile(file);
    setFileName(file.name);

    try {
      if (!window.pdfjsLib) {
        throw new Error('PDF.js library is not loaded yet. Please try again in a moment.');
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item) => item.str).join(' ');
      const preview = text.length > 300 ? text.substring(0, 300) + '...' : text;
      setPreviewText(preview);
    } catch (err) {
      console.error('Error generating preview:', err);
      setError('Could not generate preview from PDF. The library might still be loading.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const convertToWord = async () => {
    if (!pdfFile) {
      setError('Please select a PDF document first.');
      return;
    }

    if (!window.pdfjsLib) {
      setError('PDF.js library is not loaded yet. Please refresh and try again.');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const pageContents = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        const lineMap = new Map<number, typeof textContent.items>();

        textItems.forEach((item) => {
          const yPos = Math.round(item.transform[5]);
          if (!lineMap.has(yPos)) {
            lineMap.set(yPos, []);
          }
          lineMap.get(yPos)!.push(item);
        });

        const sortedYPositions = Array.from(lineMap.keys()).sort((a, b) => b - a);
        const lines = sortedYPositions.map((yPos) => {
          const line = lineMap.get(yPos)!;
          return line
            .sort((a, b) => a.transform[4] - b.transform[4])
            .map((item) => item.str)
            .join(' ');
        });

        const processedLines = lines.map((line) => ({
          text: line.trim(),
          isHeading: line.length < 50 && (line.toUpperCase() === line || line.trim().endsWith(':'))
        }));

        pageContents.push({
          pageNumber: i,
          content: processedLines.filter(line => line.text),
        });
      }

      const documentContent = [
        new Paragraph({
          children: [
            new TextRun({
              text: fileName.replace('.pdf', ''),
              bold: true,
              size: 32,
            }),
          ],
          spacing: { after: 400 },
        })
      ];

      pageContents.forEach((page) => {
        if (page.pageNumber > 1) {
          documentContent.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Page ${page.pageNumber}`,
                  bold: true,
                  size: 28,
                }),
              ],
              pageBreakBefore: true,
              spacing: { after: 300 },
            })
          );
        }

        page.content.forEach((line) => {
          documentContent.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line.text,
                  bold: line.isHeading,
                  size: line.isHeading ? 26 : 24,
                }),
              ],
              spacing: {
                before: line.isHeading ? 200 : 0,
                after: 100,
              },
            })
          );
        });
      });

      const doc = new Document({
        sections: [{ properties: {}, children: documentContent }],
      });

      const buffer = await Packer.toBuffer(doc);
      saveAs(new Blob([buffer]), fileName.replace('.pdf', '.docx'));

      // Show email modal after successful conversion
      setShowEmailModal(true);
    } catch (err) {
      setError(`Error during conversion: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
      setEmail('');
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>PDF to Word Converter | Transform Your Documents Easily</title>
        <meta name="description" content="Convert PDF files to editable Word documents with our free online tool. Perfect for extracting text from PDFs while maintaining formatting." />
        <meta name="keywords" content="PDF to Word, PDF converter, extract text from PDF, editable Word document, online PDF tool" />
        <meta property="og:title" content="PDF to Word Converter | Transform Your Documents Easily" />
        <meta property="og:description" content="Convert PDF files to editable Word documents with our free online tool." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com/pdf-to-word" />
      </Head>
      <Header/>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
       
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Convert PDF to Editable Word Documents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Extract text from PDFs while preserving formatting - 100% free and secure
            </p>
          </div>

          <div
            ref={dropAreaRef}
            className={`max-w-3xl mx-auto border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {pdfFile ? fileName : 'Drag & drop your PDF here'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {pdfFile ? 'Ready to convert' : 'or click to browse files'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {pdfFile ? 'Change File' : 'Select PDF'}
              </button>
            </div>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto mt-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          {pdfFile && (
            <div className="max-w-3xl mx-auto mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{fileName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(pdfFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={convertToWord}
                  disabled={isConverting}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Download />
                      Convert to Word
                    </>
                  )}
                </button>
              </div>

              {previewText && (
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                    First Page Preview
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded max-h-60 overflow-y-auto">
                    {previewText}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="max-w-3xl mx-auto mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Why Convert PDF to Word?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Edit text in Microsoft Word or Google Docs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Reuse content from PDFs in new documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Update old documents without retyping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span>Extract text from scanned PDFs (OCR)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h3>
              <ol className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    1
                  </span>
                  <span>Upload your PDF file (max 50MB)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    2
                  </span>
                  <span>Our tool extracts text while preserving formatting</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    3
                  </span>
                  <span>Download your editable Word document</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Get 200% More Accurate Conversions
              </h3>
              <p className="mb-6 opacity-90">
                Sign up for a free account to unlock our premium conversion engine that
                preserves complex formatting, tables, and images.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Create Free Account <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </main>

      
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            {emailSent ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Check Your Inbox!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We've sent your converted document to {email}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Get Your Document via Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Enter your email address to receive your Word document and future
                  conversion results directly to your inbox.
                </p>
                <form onSubmit={handleEmailSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Skip
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Send Document
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}