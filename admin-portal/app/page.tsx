'use client';

import { useState, useEffect } from 'react';

export default function AdminPortal() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    checkAPI();
  }, []);

  const checkAPI = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/health');
      const data = await response.json();
      setApiStatus('connected');
    } catch (error) {
      setApiStatus('offline');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              EPA Ethics Admin Portal
            </h1>
            <p className="text-gray-600">
              Administrative Interface for EthicsGo Platform
            </p>
            <div className="mt-4 text-sm text-gray-500">
              EPA Contract 68HERD25Q0050 | St. Michael Enterprises LLC
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">System Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Backend API:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    apiStatus === 'connected' ? 'bg-green-100 text-green-800' : 
                    apiStatus === 'offline' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apiStatus === 'connected' ? 'Online' : 
                     apiStatus === 'offline' ? 'Offline' : 'Checking...'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Admin Portal:</span>
                  <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  onClick={checkAPI}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Refresh API Status
                </button>
                <div className="text-sm text-gray-600 mt-4">
                  <p><strong>Demo Credentials:</strong></p>
                  <p>Username: admin</p>
                  <p>Password: demo123</p>
                  <p>MFA Code: 123456</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">
              Access Points:
            </div>
            <div className="mt-2 space-y-1 text-sm">
              <div>Mobile App: <a href="http://localhost:19007" className="text-blue-600 hover:underline">http://localhost:19007</a></div>
              <div>Backend API: <a href="http://localhost:3002/api/health" className="text-blue-600 hover:underline">http://localhost:3002/api/health</a></div>
              <div>Admin Portal: <a href="http://localhost:3003" className="text-blue-600 hover:underline">http://localhost:3003</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
