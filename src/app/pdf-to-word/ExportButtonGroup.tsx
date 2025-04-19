import { useState, useRef, useEffect } from 'react';
import {  Download, ChevronDown, ChevronUp } from 'lucide-react';
import { BiFile, BiSpreadsheet, BiImage ,BiExport} from 'react-icons/bi';
import { FiFileText, FiFile } from 'react-icons/fi';

interface ExportButtonGroupProps {
  placeText?: string;
}


export default function ExportButtonGroup({ placeText = "Export As" }: ExportButtonGroupProps) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleExport = () => setIsExportOpen(!isExportOpen);
  const handleDownload = () => {
    // Your download logic here
    console.log('Download clicked');
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsExportOpen(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-end gap-4 relative">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleExport}
          className="w-[21rem] md:w-[fit-content] justify-center px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <BiExport className="w-4 h-4" />
          {placeText}
          {isExportOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isExportOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div className="py-1">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <BiFile className="w-4 h-4 mr-2 text-red-500" />
                Compress (.pdf)
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiFileText className="w-4 h-4 mr-2 text-blue-500" />
                Word (.docx)
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <BiSpreadsheet className="w-4 h-4 mr-2 text-green-500" />
                Excel (.xlsx)
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiFile className="w-4 h-4 mr-2 text-orange-500" />
                PowerPoint (.pptx)
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <BiImage className="w-4 h-4 mr-2 text-purple-500" />
                Image (.jpg)
              </button>
            </div>
          </div>
        )}
      </div>

 
    </div>
  );
}