'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export default function QuizEditorPage() {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [editingQuiz, setEditingQuiz] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the maximum gift value an EPA employee can accept from a prohibited source?",
      type: 'multiple-choice',
      options: ['$10', '$20', '$50', '$100'],
      correctAnswer: '$20',
      explanation: "Under 5 C.F.R. § 2635.204, the general gift limit is $20 per source per occasion."
    }
  ]);

  const existingQuizzes = [
    { id: 1, title: 'Federal Ethics Basics Quiz', questions: 8, status: 'Published', module: 'Federal Ethics Basics' },
    { id: 2, title: 'Conflict of Interest Assessment', questions: 6, status: 'Draft', module: 'Conflict of Interest' },
    { id: 3, title: 'Gifts and Travel Knowledge Check', questions: 10, status: 'Published', module: 'Gifts and Travel' },
    { id: 4, title: 'Post-Employment Quiz', questions: 7, status: 'Review', module: 'Post-Employment' },
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
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
              <h1 className="text-2xl font-bold text-gray-900">Quiz Editor</h1>
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
                onClick={() => setActiveTab('quizzes')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'quizzes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Existing Quizzes
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'create'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Create New Quiz
              </button>
            </nav>
          </div>
        </div>

        {/* Existing Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Knowledge Assessment Quizzes</h3>
                <button 
                  onClick={() => setActiveTab('create')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  + Create New Quiz
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {existingQuizzes.map((quiz) => (
                      <tr key={quiz.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {quiz.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quiz.module}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quiz.questions} questions
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(quiz.status)}`}>
                            {quiz.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => setEditingQuiz(quiz.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-900">Preview</button>
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

        {/* Create New Quiz Tab */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            {/* Quiz Settings */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Associated Module</label>
                    <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option>Federal Ethics Basics</option>
                      <option>Conflict of Interest</option>
                      <option>Gifts and Travel Restrictions</option>
                      <option>Post-Employment Limitations</option>
                      <option>Financial Disclosure Requirements</option>
                      <option>Whistleblower Protections</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
                    <input
                      type="number"
                      min="5"
                      max="120"
                      defaultValue="15"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
                  <button
                    onClick={addQuestion}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    + Add Question
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-md font-medium text-gray-900">Question {index + 1}</h4>
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Question Text */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                          <textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your question"
                          />
                        </div>

                        {/* Question Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                          <select
                            value={question.type}
                            onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                            <option value="fill-blank">Fill in the Blank</option>
                          </select>
                        </div>

                        {/* Answer Options (for multiple choice) */}
                        {question.type === 'multiple-choice' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                            {question.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center mb-2">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === option}
                                  onChange={() => updateQuestion(question.id, 'correctAnswer', option)}
                                  className="mr-3"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...(question.options || [])];
                                    newOptions[optionIndex] = e.target.value;
                                    updateQuestion(question.id, 'options', newOptions);
                                  }}
                                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* True/False Options */}
                        {question.type === 'true-false' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                            <div className="flex space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`tf-${question.id}`}
                                  checked={question.correctAnswer === 'True'}
                                  onChange={() => updateQuestion(question.id, 'correctAnswer', 'True')}
                                  className="mr-2"
                                />
                                True
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name={`tf-${question.id}`}
                                  checked={question.correctAnswer === 'False'}
                                  onChange={() => updateQuestion(question.id, 'correctAnswer', 'False')}
                                  className="mr-2"
                                />
                                False
                              </label>
                            </div>
                          </div>
                        )}

                        {/* Fill in the Blank */}
                        {question.type === 'fill-blank' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer</label>
                            <input
                              type="text"
                              value={question.correctAnswer}
                              onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter the correct answer"
                            />
                          </div>
                        )}

                        {/* Explanation */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                          <textarea
                            value={question.explanation}
                            onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Explain why this is the correct answer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                    Save as Draft
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Preview Quiz
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Publish Quiz
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