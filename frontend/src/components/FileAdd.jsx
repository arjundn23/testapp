import React, { useRef } from "react";

const FileAdd = ({ activeFilter }) => {
  const fileInputRef = useRef(null);

  const getAcceptedFileTypes = () => {
    switch (activeFilter) {
      case 'documents':
        return '.docx,.pdf';
      case 'images':
        return '.jpeg,.jpg,.png';
      case 'videos':
        return '.mp4,.webm,.mkv';
      default:
        return '*';
    }
  };

  const getUploadText = () => {
    switch (activeFilter) {
      case 'documents':
        return 'Upload Documents (PDF, DOCX)';
      case 'images':
        return 'Upload Images (JPEG, PNG)';
      case 'videos':
        return 'Upload Videos (MP4, WEBM, MKV)';
      default:
        return 'Click or drag files here to upload';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle file upload logic here
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-10">
      {/* Header */}
      <h2 className="text-[24px] font-semibold mb-4 font-bitter">ADD FILES</h2>

      {/* File Upload Input */}
      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dotted border-gray-300 rounded-lg bg-gray-50 cursor-pointer text-gray-400 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <span className="text-sm">{getUploadText()}</span>
        <input 
          type="file" 
          id="fileUpload" 
          className="hidden" 
          ref={fileInputRef}
          accept={getAcceptedFileTypes()}
        />
      </label>
    </div>
  );
};

export default FileAdd;
