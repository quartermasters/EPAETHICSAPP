'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'demo123') {
        if (!showMFA) {
          setShowMFA(true);
          setError('');
        } else if (mfaCode === '123456') {
          // Simulate successful login
          window.location.href = '/dashboard';
        } else {
          setError('Invalid MFA code. Try: 123456');
        }
      } else {
        setError('Invalid credentials. Try: admin / demo123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            <h1 className="text-2xl font-bold">EPA</h1>
            <p className="text-sm">Ethics Admin</p>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Administrator Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure access to EPA Ethics content management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={showMFA}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={showMFA}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {showMFA && (
              <div>
                <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700">
                  Multi-Factor Authentication Code
                </label>
                <div className="mt-1">
                  <input
                    id="mfaCode"
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    required
                    maxLength={6}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter 6-digit code"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Demo code: 123456
                  </p>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Authenticating...' : showMFA ? 'Verify MFA Code' : 'Sign In'}
              </button>
            </div>

            {showMFA && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowMFA(false)}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  ← Back to login
                </button>
              </div>
            )}
          </form>

          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Username: <code className="bg-blue-100 px-1 rounded">admin</code></p>
                <p>Password: <code className="bg-blue-100 px-1 rounded">demo123</code></p>
                <p>MFA Code: <code className="bg-blue-100 px-1 rounded">123456</code></p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to main page
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-xs text-gray-500 space-y-1">
          <p>FedRAMP Low Authorized • Section 508 Compliant</p>
          <p>U.S. Environmental Protection Agency</p>
          <p className="text-blue-600">Developed by St. Michael Enterprises LLC</p>
          <p className="text-red-600">EPA Contract 68HERD25Q0050</p>
        </div>
      </div>
    </div>
  );
}