import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import LoginForm from './components/LoginForm';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

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
          EPA Ethics App Administration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure content management portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Secure Access Required
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      This portal requires multi-factor authentication and is restricted to authorized EPA personnel only. 
                      All access is logged and monitored for security compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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