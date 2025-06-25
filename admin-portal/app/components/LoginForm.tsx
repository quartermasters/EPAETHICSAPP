'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  username: string;
  password: string;
  mfaCode?: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    try {
      if (!username) {
        setErrors(prev => ({...prev, username: 'Username is required'}));
        return;
      }
      if (!password) {
        setErrors(prev => ({...prev, password: 'Password is required'}));
        return;
      }
      if (showMFA && !mfaCode) {
        setErrors(prev => ({...prev, mfaCode: 'MFA code is required'}));
        return;
      }

      // Simulate login - replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, mfaCode }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        if (data.requiresMFA) {
          setShowMFA(true);
        } else {
          setErrors(prev => ({...prev, general: 'Invalid credentials'}));
        }
      }
    } catch (error) {
      setErrors(prev => ({...prev, general: 'Login failed. Please try again.'}));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            disabled={showMFA}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <p id="username-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.username}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={showMFA}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="mt-2 text-sm text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>
      </div>

      {showMFA && (
        <div>
          <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700">
            Multi-Factor Authentication Code
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-describedby={errors.mfaCode ? 'mfa-error' : 'mfa-help'}
            />
            {errors.mfaCode && (
              <p id="mfa-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.mfaCode}
              </p>
            )}
            {!errors.mfaCode && (
              <p id="mfa-help" className="mt-2 text-sm text-gray-500">
                Enter the 6-digit code from your authenticator app
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            <>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {showMFA ? 'Verify MFA Code' : 'Sign in'}
            </>
          )}
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
  );
}