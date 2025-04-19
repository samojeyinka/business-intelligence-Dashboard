'use client';
import '../../styles/globals.css'
import { useState, useRef, useEffect } from 'react';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { Upload, FileText, Download, Loader2, Send, ChevronRight, Mail, Phone, Pen } from 'lucide-react';
import Head from 'next/head';
import Header from '@/components/globals/Header';
import { BiExport } from 'react-icons/bi';
import ExportButtonGroup from './ExportButtonGroup';
import { useThemeStore } from '@/lib/stores/themeStore';
import { CgDrive } from 'react-icons/cg';
import { DiDropbox, DiGithub, DiGithubAlt, DiGoogleDrive, DiOnedrive } from 'react-icons/di';
import { SiGoogledocs, SiMega } from 'react-icons/si';
import { PiFileCloudFill } from 'react-icons/pi';

export default function PdfToWordConverter() {
  const { darkMode } = useThemeStore();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [activeTab, setActiveTab] = useState('download');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [convertedDocBuffer, setConvertedDocBuffer] = useState<ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);


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
  }, []);


  useEffect(() => {
    if (pdfFile && !isConverting && !convertedDocBuffer) {
      convertToWord();
    }
  }, [pdfFile]);




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
 
    setConvertedDocBuffer(null);
    setError(null);
    
    if (!isPdfFile(file)) {
      setError('Please select a valid PDF document.');
      setPdfFile(null);
      setFileName('');
      setPreviewText('');
      return;
    }

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
      const text = textContent.items.map((item: any) => item.str).join(' ');
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
        const lineMap = new Map<number, any[]>();

        textItems.forEach((item: any) => {
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
      
   
      setConvertedDocBuffer(buffer);
      

      setShowDeliveryModal(true);
    } catch (err) {
      setError(`Error during conversion: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedDocBuffer) {
      saveAs(new Blob([convertedDocBuffer]), fileName.replace('.pdf', '.docx'));
      setDeliverySuccess(true);
      
      setTimeout(() => {
        setDeliverySuccess(false);
        setShowDeliveryModal(false);
      }, 2500);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Email delivery requested:', email);
    setDeliverySuccess(true);
    
    setTimeout(() => {
      setDeliverySuccess(false);
      setShowDeliveryModal(false);
      setEmail('');
    }, 2500);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle WhatsApp delivery
    console.log('WhatsApp delivery requested:', whatsappNumber);
    setDeliverySuccess(true);
    
    setTimeout(() => {
      setDeliverySuccess(false);
      setShowDeliveryModal(false);
      setWhatsappNumber('');
    }, 2500);
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

      <div className={`min-h-screen  transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 tetx-gray-900"}`}>
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Convert PDF to Editable Word Documents
            </h2>
            <p className={`text-xl  ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
              Extract text from PDFs while preserving formatting - 100% free and secure
            </p>
          </div>

          {/* Upload Area */}

          <div className="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
          <div
            ref={dropAreaRef}
            className={`${darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"} w-full border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : isConverting
                ? 'opacity-75'
                : ''
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {isConverting ? (
              // Converting Spinner
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className={`p-4 ${darkMode ? "bg-blue-900/30" :  "bg-blue-100"} rounded-full`}>
                  <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
                <div>
                  <h3 className={`text-lg font-medium  mb-2 ${darkMode ? "text-white":"text-gray-900"}`}>
                    Converting your PDF
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    This will just take a moment...
                  </p>
                </div>
                <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            ) : (
              // Normal Upload UI

          
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className={`p-4  rounded-full ${darkMode ? "bg-gray-700":"bg-blue-100"}`}>
                  <Upload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? "text-white":"text-gray-900"}`}>
                    {pdfFile ? fileName : 'Drag & drop your PDF here'}
                  </h3>
                  <p className={`${darkMode ? "text-gray-300":"text-gray-500"}`}>
                    {pdfFile ? 'Ready to convert' : 'or click to browse files'}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isConverting}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isConverting}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {pdfFile ? 'Change File' : 'Select PDF'}
                </button>
              </div>
             
            )}
          </div>
            <div className="flex flex-col gap-4">
            
              <div className={`p-3 cursor-pointer  rounded-full ${darkMode ? "bg-gray-800":"bg-blue-100"}`}>
                <DiGoogleDrive className="w-7 h-7 text-[#0F9D58]" />
                </div>

                <div className={`p-3 cursor-pointer  rounded-full ${darkMode ? "bg-gray-800":"bg-blue-100"}`}>
                <DiDropbox className="w-7 h-7 text-[#0061FF ]" />
                </div>

                <div className={`p-3 cursor-pointer  rounded-full ${darkMode ? "bg-gray-800":"bg-blue-100"}`}>
                <SiMega className="w-7 h-7 text-[#D9272E] bg-white rounded-full" />
                </div>

                <div className={`p-3 cursor-pointer  rounded-full ${darkMode ? "bg-gray-800":"bg-blue-100"}`}>
                <DiOnedrive className={`w-7 h-7 ${darkMode ? "text-white" :"text-[#094AB2]"}`} />
                </div>

                <div className={`p-3 cursor-pointer  rounded-full ${darkMode ? "bg-gray-800":"bg-blue-100"}`}>
                <SiGoogledocs className={`w-7 h-7 ${darkMode ? "text-[#1A73E8] " :"text-[#1A73E8 ]"}`} />
                </div>

            </div>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto mt-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          {pdfFile && previewText && !isConverting && (
            <div className="max-w-3xl mx-auto mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <FileText className={`${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{fileName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(pdfFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-6 rounded-lg shadow p-6 ${darkMode ? "bg-gray-700" : "bg-whit"}`}>
                <h3 className={`font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  First Page Preview
                </h3>
                <div className={`${darkMode ? "text-gray-200 bg-gray-600" : "text-gray-700 bg-gray-100"} p-4 rounded max-h-60 overflow-y-auto`}>
                  {previewText}
                </div>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto mt-16 grid md:grid-cols-2 gap-8">
            <div className={`rounded-xl shadow p-6  ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-bold  mb-4  ${darkMode ? "text-white" : "text-gray-900"}`}>
                Why Convert PDF to Word?
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Edit text in Microsoft Word or Google Docs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Reuse content from PDFs in new documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Update old documents without retyping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400">✓</span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Extract text from scanned PDFs (OCR)</span>
                </li>
              </ul>
            </div>

            <div className={`rounded-xl shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                How It Works
              </h3>
              <ol className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex gap-3">
                <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full ${darkMode ? "bg-gray-700":"bg-blue-100"} text-blue-600 dark:text-blue-400 font-medium text-sm`}>
                    1
                  </span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Upload your PDF file (max 50MB)</span>
                </li>
                <li className="flex gap-3">
                <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full ${darkMode ? "bg-gray-700":"bg-blue-100"} text-blue-600 dark:text-blue-400 font-medium text-sm`}>
                    2
                  </span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Our tool instantly converts your document</span>
                </li>
                <li className="flex gap-3">
                  <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full ${darkMode ? "bg-gray-700":"bg-blue-100"} text-blue-600 dark:text-blue-400 font-medium text-sm`}>
                    3
                  </span>
                  <span className={`${darkMode ? "text-gray-200" : "text-gray-900"}`}>Choose your preferred delivery method</span>
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

      {/* Delivery Options Modal */}
      {showDeliveryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 animate-scaleIn">
            {deliverySuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {activeTab === 'download' ? 'Download Complete!' : 
                   activeTab === 'email' ? 'Check Your Inbox!' : 
                   'WhatsApp Message Sent!'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeTab === 'download' ? 'Your Word document has been downloaded' : 
                   activeTab === 'email' ? `We've sent your document to ${email}` : 
                   `We've sent your document to ${whatsappNumber}`}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl  font-medium text-gray-900 dark:text-white">
                    Your PDF Has Been Converted!
                  </h3>
                  <div className="hidden md:flex items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 md:mr-2"></div>
                    Ready
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button 
                    onClick={() => setActiveTab('download')}
                    className={`flex items-center gap-2 px-4 py-3 ${
                      activeTab === 'download' 
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button 
                    onClick={() => setActiveTab('email')}
                    className={`flex items-center gap-2 px-4 py-3 ${
                      activeTab === 'email' 
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button 
                    onClick={() => setActiveTab('whatsapp')}
                    className={`flex items-center gap-2 px-4 py-3 ${
                      activeTab === 'whatsapp' 
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </button>
                </div>
                
                {/* Tab Content */}
                {activeTab === 'download' && (
                  <div className="py-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{fileName.replace('.pdf', '.docx')}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ready to download</p>
        
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-end gap-4">
                    <ExportButtonGroup />
                      <button
                        onClick={handleDownload}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 justify-center"
                      >
                        <Download className="w-4 h-4" />
                        Download Now
                      </button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'email' && (
                  <form onSubmit={handleEmailSubmit} className="py-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{fileName.replace('.pdf', '.docx')}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Will be sent to the email</p>
                        </div>
                      </div>
                    </div>
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
                    <div className="flex flex-col md:flex-row justify-end gap-4">
                    <ExportButtonGroup placeText={"Send As"}/>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Send to Email
                      </button>
                    </div>
                  </form>
                )}
                
                {activeTab === 'whatsapp' && (
                  <form onSubmit={handleWhatsAppSubmit} className="py-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{fileName.replace('.pdf', '.docx')}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Will be sent via WhatsApp</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        required
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+1 (123) 456-7890"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Include country code (e.g., +1 for US)
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-end gap-4">
                    <ExportButtonGroup  placeText={"Send As"}/>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Send to WhatsApp
                      </button>
                    </div>
                  </form>
                )}
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <button
                    onClick={() => {
                      setShowDeliveryModal(false);
                      setPdfFile(null);
                      setFileName('');
                      setPreviewText('');
                      setConvertedDocBuffer(null);                    }}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Convert another file
                    </button>
                    <button
  onClick={() => {
  }}
  className="text-base font-semibold bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-[.3rem] shadow-md transition-all flex gap-2 items-center"
>
  <Pen size={18}/>
  <span>Edit Content</span>
</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }