"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EditIcon, DeleteIcon } from '../Icons';
import { getDepartments, deleteDepartment } from '../services';

const AllDepartments = () => {
  const [viewMode, setViewMode] = useState('list');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [departments, setDepartments] = useState<Array<{
    _id: string;
    name: string;
    code: string;
    headOfDepartment?: string;
    maxStudents?: number;
    departmentDetails?: string;
    createdAt?: string;
    updatedAt?: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load Departments';
      setError(errorMessage);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      return;
    }

    try {
      
      setDepartments(prev => prev.filter(dep => dep._id !== id));

      
      await deleteDepartment(id);

   
      await fetchDepartments();

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete department';
      setError(errorMessage);
      
      await fetchDepartments();
    }
  };

  const totalDepartments = departments.length;
  const totalPages = Math.ceil(totalDepartments / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalDepartments);
  const displayedDepartments = departments.slice(startIndex, endIndex);

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col mb-6 sm:mb-8">
        <div className="inline-flex bg-gray-100 rounded-full p-1 mx-auto sm:mx-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
              viewMode === 'list'
                ? 'bg-brand text-white shadow-lg shadow-blue-500/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
              viewMode === 'grid'
                ? 'bg-brand text-white shadow-lg shadow-blue-500/50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Departments List</h2>
          <Link
            href="/admin/departments/addDepartments"
            className="inline-block bg-brand hover:bg-brandhover text-white px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            Add New
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}



        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading departments...</span>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <span className="text-xs sm:text-sm text-gray-600 mr-2">Show</span>
                <select
                  value={entries}
                  onChange={handleEntriesChange}
                  className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-xs sm:text-sm text-gray-600 ml-2">entries</span>
              </div>
            </div>

        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Logo</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Name</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Code</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Head of Department</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Max Students</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedDepartments.map((dep, index) => (
                  <tr 
                    key={dep._id || index} 
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="flex justify-center py-1 sm:py-2">
                      <Image 
                        src={`https://i.pravatar.cc/40?img=${index + 1}`} 
                        alt={dep.name || 'Department'} 
                        width={32}
                        height={32}
                        className="rounded-full" 
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {dep.name}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {dep.code}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {dep.headOfDepartment || 'Not assigned'}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {dep.maxStudents || 'Unlimited'}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium flex space-x-1 sm:space-x-2">
                      <Link
                        href={`/admin/departments/editDepartments/${dep._id}`}
                        className="p-1 sm:p-2 rounded-full bg-green-200 hover:bg-green-300">
                        <EditIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(dep._id)}
                        className="p-1 sm:p-2 rounded-full bg-red-200 hover:bg-red-300"
                      >
                        <DeleteIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View - Responsive Columns */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedDepartments.map((dep, idx) => (
              <div key={dep._id || idx} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow text-center flex flex-col h-full">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Image 
                    src={`https://i.pravatar.cc/150?img=${idx + 1}`} 
                    alt={dep.name || 'Department'} 
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-pink-100"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1">
                    {dep.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">Code: {dep.code}</p>
                  
                  <div className="text-xs text-gray-600 mb-2 sm:mb-3">
                    {dep.departmentDetails && (
                      <p className="mb-1">{dep.departmentDetails}</p>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="mb-1">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Head: {dep.headOfDepartment || 'Not assigned'}
                      </span>
                    </p>
                    <p className="mb-2 sm:mb-3">
                      <span className="text-gray-600 text-xs sm:text-sm">
                        Max Students: {dep.maxStudents || 'Unlimited'}
                      </span>
                    </p>
                  </div>
                </div>
                
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-medium transition-colors mt-1 sm:mt-2 mx-auto">
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
          <div className="text-xs sm:text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalDepartments} entries
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 sm:px-3 py-1 border rounded-md text-xs sm:text-sm ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            {totalPages > 5 && (
              <span className="px-2 py-1 text-xs sm:text-sm">...</span>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm bg-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllDepartments;
