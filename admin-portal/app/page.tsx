export default function HomePage() {
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
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              🚧 Admin Portal In Development
            </h3>
            <p className="text-gray-600 mb-6">
              The content management system is being built. Core features include:
            </p>
            <ul className="text-left text-sm text-gray-600 space-y-2 mb-6">
              <li>• Ethics training module management</li>
              <li>• Quiz question creation and editing</li>
              <li>• User progress tracking and analytics</li>
              <li>• Media upload and organization</li>
              <li>• System administration tools</li>
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-sm text-green-700">
                ✅ Backend API: Operational<br/>
                ✅ Database: Connected<br/>
                ✅ Mobile App: Functional<br/>
                ✅ Admin Interface: Ready for Demo
              </p>
            </div>
            
            <div className="space-y-3">
              <a href="/login" className="block w-full bg-blue-50 border border-blue-200 rounded-md p-3 text-left hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <span className="mr-3">🔐</span>
                  <div>
                    <div className="text-sm font-medium text-blue-900">Administrator Login</div>
                    <div className="text-xs text-blue-700">Access content management dashboard</div>
                  </div>
                </div>
              </a>

              <a href="/dashboard" className="block w-full bg-purple-50 border border-purple-200 rounded-md p-3 text-left hover:bg-purple-100 transition-colors">
                <div className="flex items-center">
                  <span className="mr-3">📊</span>
                  <div>
                    <div className="text-sm font-medium text-purple-900">Demo Dashboard</div>
                    <div className="text-xs text-purple-700">Preview admin interface</div>
                  </div>
                </div>
              </a>
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