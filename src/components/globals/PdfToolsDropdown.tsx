'use client';

import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, FileText, FilePlus, FileOutput, Settings, Edit, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/themeStore';

export default function PdfToolsDropdown() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useThemeStore();
  const modalRef = useRef(null);

  const categories = [
    {
      id: 'organize',
      title: 'ORGANIZE PDF',
      icon: <FileText />,
      features: [
        { name: 'Merge PDF', description: 'Combine multiple PDFs into a single document' },
        { name: 'Split PDF', description: 'Divide a PDF into separate files' },
        { name: 'Remove pages', description: 'Delete specific pages from your PDF' },
        { name: 'Extract pages', description: 'Save selected pages as a new PDF' },
        { name: 'Organize PDF', description: 'Rearrange pages within your document' },
        { name: 'Scan to PDF', description: 'Convert scanned images into PDF format' }
      ]
    },
    {
      id: 'optimize',
      title: 'OPTIMIZE PDF',
      icon: <Settings />,
      features: [
        { name: 'Compress PDF', description: 'Reduce file size while maintaining quality' },
        { name: 'Repair PDF', description: 'Fix corrupted or damaged PDF files' },
        { name: 'OCR PDF', description: 'Convert images to searchable, editable text' }
      ]
    },
    {
      id: 'convert-to',
      title: 'CONVERT TO PDF',
      icon: <FileOutput />,
      features: [
        { name: 'JPG to PDF', description: 'Transform images into PDF documents' },
        { name: 'WORD to PDF', description: 'Convert Word documents to PDF format' },
        { name: 'POWERPOINT to PDF', description: 'Turn presentations into PDF files' },
        { name: 'EXCEL to PDF', description: 'Convert spreadsheets to PDF format' },
        { name: 'HTML to PDF', description: 'Transform web pages into PDF documents' }
      ]
    },
    {
      id: 'convert-from',
      title: 'CONVERT FROM PDF',
      icon: <FilePlus />,
      features: [
        { name: 'PDF to JPG', description: 'Extract images from your PDF files' },
        { name: 'PDF to WORD', description: 'Convert PDFs to editable Word documents' },
        { name: 'PDF to POWERPOINT', description: 'Transform PDFs into presentation slides' },
        { name: 'PDF to EXCEL', description: 'Convert PDF tables into Excel spreadsheets' },
        { name: 'PDF to PDF/A', description: 'Create archival-quality PDF documents' }
      ]
    },
    {
      id: 'edit',
      title: 'EDIT PDF',
      icon: <Edit />,
      features: [
        { name: 'Rotate PDF', description: 'Change page orientation as needed' },
        { name: 'Add page numbers', description: 'Insert automatic page numbering' },
        { name: 'Add watermark', description: 'Overlay text or images on your PDF' },
        { name: 'Edit PDF', description: 'Make direct changes to PDF content' }
      ]
    }
  ];

  // Filter features based on search query
  const filteredCategories = categories.map(category => ({
    ...category,
    features: category.features.filter(feature => 
      feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.features.length > 0);

  // Scroll functions
  const scrollUp = () => {
    if (modalRef.current) {
      modalRef.current.scrollBy({ top: -200, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (modalRef.current) {
      modalRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setHoveredCategory('features')}
        className="hover:text-blue-600 transition-colors"
      >
        PDF Tools
      </button>
      
      {hoveredCategory === 'features' && (
        <div 
          ref={modalRef}
          onMouseLeave={() => setHoveredCategory(null)}
          className={`
            fixed inset-x-0 top-20 mx-auto 
            w-[95vw] max-w-[1400px] p-6 rounded-xl shadow-2xl z-50
            ${darkMode 
              ? 'bg-gray-900 border border-gray-700 text-gray-200' 
              : 'bg-white border border-gray-200 text-gray-800'
            } backdrop-blur-lg
            max-h-[85vh]  min-h-[85vh] 
          `}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Search Bar */}
          <div className={`relative mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className={`flex items-center px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className="h-5 w-5 mr-3" />
              <input
                type="text"
                placeholder="Search PDF tools..."
                className={`w-full bg-transparent outline-none ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className={`ml-2 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  ×
                </button>
              )}
            </div>
          </div>

         

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-y-auto  max-h-[60vh]">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <div className={`flex items-center space-x-2 font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    <span>{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className={`p-2 rounded-md transition-all hover:scale-105 ${
                          darkMode 
                            ? 'hover:bg-gray-800' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <p className="font-medium">{feature.name}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No tools found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
          
          <div className={`mt-6 pt-4 text-center ${darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Transform your notes with our AI-powered PDF tools
            </span>
          </div>
        </div>
      )}
    </div>
  );
}