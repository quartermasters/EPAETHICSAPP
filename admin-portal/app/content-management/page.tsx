'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState('modules');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const modules = [
    { id: 1, title: 'Federal Ethics Basics', status: 'Published', lastModified: '2024-01-15', author: 'Admin' },
    { id: 2, title: 'Conflict of Interest', status: 'Draft', lastModified: '2024-01-10', author: 'Admin' },
    { id: 3, title: 'Gifts and Travel Restrictions', status: 'Published', lastModified: '2024-01-08', author: 'Admin' },
    { id: 4, title: 'Post-Employment Limitations', status: 'Review', lastModified: '2024-01-05', author: 'Admin' },
    { id: 5, title: 'Financial Disclosure Requirements', status: 'Published', lastModified: '2024-01-03', author: 'Admin' },
    { id: 6, title: 'Whistleblower Protections', status: 'Draft', lastModified: '2024-01-01', author: 'Admin' },
  ];

  const resources = [
    { id: 1, name: 'CFR_2635_Ethics_Regulations.pdf', type: 'PDF', size: '2.3 MB', uploaded: '2024-01-15' },
    { id: 2, name: 'Hatch_Act_Summary.pdf', type: 'PDF', size: '1.8 MB', uploaded: '2024-01-12' },
    { id: 3, name: 'Ethics_Quick_Reference.pdf', type: 'PDF', size: '890 KB', uploaded: '2024-01-10' },
    { id: 4, name: 'Training_Video_Introduction.mp4', type: 'Video', size: '45.2 MB', uploaded: '2024-01-08' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Published: 'bg-green-100 text-green-800',
      Draft: 'bg-yellow-100 text-yellow-800',
      Review: 'bg-blue-100 text-blue-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-4">
                <h1 className="text-lg font-bold">EPA</h1>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-800">
                ← Dashboard
              </Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('modules')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'modules'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ethics Modules
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resources & Documents
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upload Content
              </button>
            </nav>
          </div>
        </div>

        {/* Ethics Modules Tab */}
        {activeTab === 'modules' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Ethics Training Modules</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  + New Module
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {modules.map((module) => (
                      <tr key={module.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {module.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(module.status)}`}>
                            {module.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {module.lastModified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {module.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Document Library</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  + Upload Document
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">
                        {resource.type === 'PDF' ? '📄' : '🎥'}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{resource.name}</h4>
                        <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Uploaded: {resource.uploaded}</p>
                    <div className="flex justify-between">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Content</h3>
              
              <div className="space-y-6">
                {/* File Upload Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.mp4,.mov,.avi"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">📁</div>
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, MP4, MOV, AVI up to 100MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Type
                  </label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Ethics Module</option>
                    <option>Reference Document</option>
                    <option>Training Video</option>
                    <option>FAQ Document</option>
                    <option>Policy Update</option>
                  </select>
                </div>

                {/* Title and Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter content title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter content description"
                  ></textarea>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ethics, compliance, training (comma separated)"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    disabled={isUploading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Content'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="text-xs text-gray-500 space-y-1">
            <p>FedRAMP Low Authorized • Section 508 Compliant</p>
            <p>U.S. Environmental Protection Agency</p>
            <p className="text-blue-600">Developed by St. Michael Enterprises LLC</p>
            <p className="text-red-600">EPA Contract 68HERD25Q0050</p>
          </div>
        </div>
      </div>
    </div>
  );
}