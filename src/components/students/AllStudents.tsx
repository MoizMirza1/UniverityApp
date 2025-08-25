"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EditIcon, DeleteIcon } from '../Icons';
import { getStudents, deleteStudent } from '../services';

const AllStudents = () => {
  const [viewMode, setViewMode] = useState('list');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return;
    }
  
    try {
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      await deleteStudent(id);
      await fetchStudents();
  
    } catch (err: any) {
      setError(err?.message || 'Failed to delete student');
      await fetchStudents();
    }
  };

  const totalStudents = students.length;
  const totalPages = Math.ceil(totalStudents / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalStudents);
  const displayedStudents = students.slice(startIndex, endIndex);

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
        <div className="flex flex-col mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Students List</h2>
          <Link
            href="/admin/students/addStudents"
            className="inline-block bg-brand hover:bg-brandhover text-white px-4 py-2 rounded-md font-medium w-fit shadow-sm hover:shadow-md transition-shadow"
          >
            Add New
          </Link>
        </div>

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
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Avatar</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Roll No</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Name</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Department</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Mobile</th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Email</th>
                  <th className="hidden xl:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Admission Date</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedStudents.map((student, index) => (
                  <tr 
                    key={student._id || index} 
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="flex justify-center py-1 sm:py-2">
                      <Image 
                        src={`https://i.pravatar.cc/40?img=${index + 1}`} 
                        alt={student.firstName || 'Student'} 
                        width={32}
                        height={32}
                        className="rounded-full" 
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-700 border-r border-gray-200">{student.rollNumber}</td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">{student.department?.name || '-'}</td>
                    <td className="hidden md:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <a 
                        href={`tel:${(student.mobileNumber || '').replace(/[^\d+]/g, '')}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {student.mobileNumber}
                      </a>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <a 
                        href={`mailto:${student.email}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {student.email}
                      </a>
                    </td>
                    <td className="hidden xl:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      {student.admissionDate ? new Date(student.admissionDate).toLocaleDateString() : ''}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium flex space-x-1 sm:space-x-2">
                      <Link
                        href={`/admin/students/editStudents/${student._id}`}
                        className="p-1 sm:p-2 rounded-full bg-green-200 hover:bg-green-300">
                        <EditIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(student._id)}
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

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedStudents.map((student, idx) => (
              <div key={student._id || idx} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow text-center flex flex-col h-full">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Image 
                    src={`https://i.pravatar.cc/150?img=${idx + 1}`} 
                    alt={student.firstName || 'Student'} 
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-pink-100"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{student.department?.name || '-'}</p>
                  
                  <div className="text-xs text-gray-600 mb-2 sm:mb-3">
                    {student.address && (
                      <p className="mb-1">{student.address}</p>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="mb-1">
                      <a 
                        href={`tel:${(student.mobileNumber || '').replace(/[^\d+]/g, '')}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm"
                      >
                        {student.mobileNumber}
                      </a>
                    </p>
                    <p className="mb-2 sm:mb-3">
                      <a 
                        href={`mailto:${student.email}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm"
                      >
                        {student.email}
                      </a>
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
            Showing {startIndex + 1} to {endIndex} of {totalStudents} entries
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
      </div>
    </div>
  );
};

export default AllStudents;