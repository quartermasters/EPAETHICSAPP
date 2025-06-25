'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [stats] = useState({
    totalModules: 6,
    totalQuizzes: 12,
    activeUsers: 145,
    completionRate: 78
  });

  const recentActivity = [
    { action: 'New user registration', user: 'john.doe@epa.gov', time: '2 minutes ago' },
    { action: 'Quiz completed', user: 'jane.smith@epa.gov', time: '15 minutes ago' },
    { action: 'Module updated', user: 'admin@epa.gov', time: '1 hour ago' },
    { action: 'New FAQ added', user: 'admin@epa.gov', time: '3 hours ago' },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Ethics Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Administrator</span>
              <Link href="/login" className="text-sm text-blue-600 hover:text-blue-800">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Modules</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalModules}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">❓</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Quizzes</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalQuizzes}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.activeUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.completionRate}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/content-management" className="block w-full bg-blue-50 border border-blue-200 rounded-md p-3 text-left hover:bg-blue-100 transition-colors">
                    <div className="flex items-center">
                      <span className="mr-3">📄</span>
                      <div>
                        <div className="text-sm font-medium text-blue-900">Manage Content</div>
                        <div className="text-xs text-blue-700">Upload ethics modules & resources</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/quiz-editor" className="block w-full bg-green-50 border border-green-200 rounded-md p-3 text-left hover:bg-green-100 transition-colors">
                    <div className="flex items-center">
                      <span className="mr-3">✏️</span>
                      <div>
                        <div className="text-sm font-medium text-green-900">Create Quiz</div>
                        <div className="text-xs text-green-700">Build knowledge assessments</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/users" className="block w-full bg-purple-50 border border-purple-200 rounded-md p-3 text-left hover:bg-purple-100 transition-colors">
                    <div className="flex items-center">
                      <span className="mr-3">👥</span>
                      <div>
                        <div className="text-sm font-medium text-purple-900">Manage Users</div>
                        <div className="text-xs text-purple-700">View user progress & permissions</div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/analytics" className="block w-full bg-orange-50 border border-orange-200 rounded-md p-3 text-left hover:bg-orange-100 transition-colors">
                    <div className="flex items-center">
                      <span className="mr-3">📈</span>
                      <div>
                        <div className="text-sm font-medium text-orange-900">View Analytics</div>
                        <div className="text-xs text-orange-700">Track usage & performance</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="flow-root">
                  <ul className="-my-5 divide-y divide-gray-200">
                    {recentActivity.map((activity, index) => (
                      <li key={index} className="py-5">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm">•</span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {activity.user}
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

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