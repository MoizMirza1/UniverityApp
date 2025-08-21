"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EditIcon, DeleteIcon } from '../Icons';

const AllDepartments = () => {
  const [viewMode, setViewMode] = useState('list');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for departments
  const departments = [
    { id: 1, code: 'CS', name: 'Computer Science', head: 'Dr. John Williams', students: 450, courses: 28, established: 'Jan 15, 2005' },
    { id: 2, code: 'EE', name: 'Electrical Engineering', head: 'Dr. Sarah Johnson', students: 320, courses: 22, established: 'Feb 20, 2003' },
    { id: 3, code: 'ME', name: 'Mechanical Engineering', head: 'Dr. Robert Chen', students: 380, courses: 25, established: 'Mar 5, 2001' },
    { id: 4, code: 'BT', name: 'Biotechnology', head: 'Dr. Emily Rodriguez', students: 210, courses: 18, established: 'Apr 10, 2008' },
    { id: 5, code: 'AR', name: 'Architecture', head: 'Dr. Michael Brown', students: 180, courses: 15, established: 'May 22, 2007' },
    { id: 6, code: 'CH', name: 'Chemical Engineering', head: 'Dr. David Wilson', students: 270, courses: 20, established: 'Jun 7, 2004' },
    { id: 7, code: 'CE', name: 'Civil Engineering', head: 'Dr. Jennifer Lee', students: 290, courses: 21, established: 'Jul 15, 2002' },
    { id: 8, code: 'PH', name: 'Physics', head: 'Dr. Daniel Kim', students: 150, courses: 16, established: 'Aug 3, 2006' },
    { id: 9, code: 'MA', name: 'Mathematics', head: 'Dr. Sophia Martinez', students: 130, courses: 14, established: 'Sep 18, 2000' },
    { id: 10, code: 'EC', name: 'Economics', head: 'Dr. William Taylor', students: 240, courses: 19, established: 'Oct 5, 2009' },
    { id: 11, code: 'EN', name: 'English', head: 'Dr. Olivia Anderson', students: 170, courses: 15, established: 'Nov 12, 2010' },
    { id: 12, code: 'PS', name: 'Political Science', head: 'Dr. James Thomas', students: 190, courses: 16, established: 'Dec 1, 2011' },
    { id: 13, code: 'PY', name: 'Psychology', head: 'Dr. Emma Jackson', students: 260, courses: 18, established: 'Jan 9, 2012' },
    { id: 14, code: 'BI', name: 'Business Informatics', head: 'Dr. Alexander White', students: 310, courses: 22, established: 'Feb 14, 2013' },
    { id: 15, code: 'MT', name: 'Media Technology', head: 'Dr. Ava Harris', students: 140, courses: 12, established: 'Mar 21, 2014' }
  ];

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
      {/* Header Section */}
      <div className="flex flex-col mb-6 sm:mb-8">
        {/* Toggle Switch Container */}
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

      {/* Main Content Box */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        {/* Box Header with Add New Button */}
        <div className="flex flex-col mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">All Departments List</h2>
          <Link
            href="/admin/departments/addDepartment"
            className="inline-block bg-brand hover:bg-brandhover text-white px-4 py-2 rounded-md font-medium w-fit shadow-sm hover:shadow-md transition-shadow"
          >
            Add New
          </Link>
        </div>
        
        {/* Entries Selector */}
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

        {/* List View */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Code</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Department Name</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Head of Department</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Students</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Courses</th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Established</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedDepartments.map((department, index) => (
                  <tr 
                    key={department.id} 
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-bold text-gray-900 border-r border-gray-200">
                      {department.code}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {department.name}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-700 border-r border-gray-200">
                      {department.head}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-800 bg-blue-100 rounded-full">
                        {department.students}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-800 bg-green-100 rounded-full">
                        {department.courses}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      {department.established}
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium flex space-x-1 sm:space-x-2">
                      <button className="p-1 sm:p-2 rounded-full bg-green-200 hover:bg-green-300">
                        <EditIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                      </button>
                      <button className="p-1 sm:p-2 rounded-full bg-red-200 hover:bg-red-300">
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
            {displayedDepartments.map((department) => (
              <div key={department.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow text-center flex flex-col h-full">
                {/* Department Icon */}
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600">{department.code}</span>
                  </div>
                </div>
                
                {/* Department Info */}
                <div className="flex-grow">
                  <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1">{department.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">Head: {department.head}</p>
                  
                  <div className="flex justify-center space-x-4 my-3">
                    <div className="bg-blue-50 px-3 py-1 rounded-lg">
                      <p className="text-xs text-gray-600">Students</p>
                      <p className="font-bold text-blue-700">{department.students}</p>
                    </div>
                    <div className="bg-green-50 px-3 py-1 rounded-lg">
                      <p className="text-xs text-gray-600">Courses</p>
                      <p className="font-bold text-green-700">{department.courses}</p>
                    </div>
                  </div>
                  
                  <div className="mt-auto text-xs text-gray-500 mb-2">
                    Established: {department.established}
                  </div>
                </div>
                
                
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-medium transition-colors mt-1 sm:mt-2 mx-auto">
                  View Details
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
      </div>
    </div>
  );
};

export default AllDepartments;