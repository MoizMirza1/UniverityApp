"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EditIcon, DeleteIcon } from '../Icons';

const AllStudents = () => {
  const [viewMode, setViewMode] = useState('list');
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for 50 students
    const students = [
    { id: 1, rollNo: 'CS-101', name: 'Johnathan Williams', department: 'Computer Science', mobile: '(123) 456-7890', email: 'john.w@university.edu', admissionDate: 'Jan 15, 2023' },
    { id: 2, rollNo: 'EE-205', name: 'Sarah Johnson', department: 'Electrical Engineering', mobile: '(987) 654-3210', email: 'sarah.j@university.edu', admissionDate: 'Feb 20, 2023' },
    { id: 3, rollNo: 'ME-312', name: 'Robert Chen', department: 'Mechanical Engineering', mobile: '(555) 123-4567', email: 'robert.c@university.edu', admissionDate: 'Mar 5, 2023' },
    { id: 4, rollNo: 'BT-418', name: 'Emily Rodriguez', department: 'Biotechnology', mobile: '(444) 789-1234', email: 'emily.r@university.edu', admissionDate: 'Apr 10, 2023' },
    { id: 5, rollNo: 'AR-127', name: 'Michael Brown', department: 'Architecture', mobile: '(333) 456-7890', email: 'michael.b@university.edu', admissionDate: 'May 22, 2023' },
    { id: 6, rollNo: 'CS-102', name: 'David Wilson', department: 'Computer Science', mobile: '(222) 333-4444', email: 'david.w@university.edu', admissionDate: 'Jun 7, 2023' },
    { id: 7, rollNo: 'EE-206', name: 'Jennifer Lee', department: 'Electrical Engineering', mobile: '(111) 222-3333', email: 'jennifer.l@university.edu', admissionDate: 'Jul 15, 2023' },
    { id: 8, rollNo: 'ME-313', name: 'Daniel Kim', department: 'Mechanical Engineering', mobile: '(999) 888-7777', email: 'daniel.k@university.edu', admissionDate: 'Aug 3, 2023' },
    { id: 9, rollNo: 'BT-419', name: 'Sophia Martinez', department: 'Biotechnology', mobile: '(777) 666-5555', email: 'sophia.m@university.edu', admissionDate: 'Sep 18, 2023' },
    { id: 10, rollNo: 'AR-128', name: 'William Taylor', department: 'Architecture', mobile: '(555) 444-3333', email: 'william.t@university.edu', admissionDate: 'Oct 5, 2023' },
    { id: 11, rollNo: 'CS-103', name: 'Olivia Anderson', department: 'Computer Science', mobile: '(333) 222-1111', email: 'olivia.a@university.edu', admissionDate: 'Nov 12, 2023' },
    { id: 12, rollNo: 'EE-207', name: 'James Thomas', department: 'Electrical Engineering', mobile: '(111) 999-8888', email: 'james.t@university.edu', admissionDate: 'Dec 1, 2023' },
    { id: 13, rollNo: 'ME-314', name: 'Emma Jackson', department: 'Mechanical Engineering', mobile: '(888) 777-6666', email: 'emma.j@university.edu', admissionDate: 'Jan 9, 2024' },
    { id: 14, rollNo: 'BT-420', name: 'Alexander White', department: 'Biotechnology', mobile: '(666) 555-4444', email: 'alexander.w@university.edu', admissionDate: 'Feb 14, 2024' },
    { id: 15, rollNo: 'AR-129', name: 'Ava Harris', department: 'Architecture', mobile: '(444) 333-2222', email: 'ava.h@university.edu', admissionDate: 'Mar 21, 2024' },
    { id: 16, rollNo: 'CS-104', name: 'Noah Martin', department: 'Computer Science', mobile: '(222) 111-0000', email: 'noah.m@university.edu', admissionDate: 'Apr 3, 2024' },
    { id: 17, rollNo: 'EE-208', name: 'Isabella Thompson', department: 'Electrical Engineering', mobile: '(000) 999-8888', email: 'isabella.t@university.edu', admissionDate: 'May 17, 2024' },
    { id: 18, rollNo: 'ME-315', name: 'Liam Garcia', department: 'Mechanical Engineering', mobile: '(999) 888-7777', email: 'liam.g@university.edu', admissionDate: 'Jun 5, 2024' },
    { id: 19, rollNo: 'BT-421', name: 'Mia Martinez', department: 'Biotechnology', mobile: '(777) 666-5555', email: 'mia.m@university.edu', admissionDate: 'Jul 11, 2024' },
    { id: 20, rollNo: 'AR-130', name: 'Benjamin Robinson', department: 'Architecture', mobile: '(555) 444-3333', email: 'benjamin.r@university.edu', admissionDate: 'Aug 22, 2024' },
    { id: 21, rollNo: 'CS-105', name: 'Charlotte Clark', department: 'Computer Science', mobile: '(333) 222-1111', email: 'charlotte.c@university.edu', admissionDate: 'Sep 8, 2024' },
    { id: 22, rollNo: 'EE-209', name: 'Elijah Rodriguez', department: 'Electrical Engineering', mobile: '(111) 999-8888', email: 'elijah.r@university.edu', admissionDate: 'Oct 15, 2024' },
    { id: 23, rollNo: 'ME-316', name: 'Amelia Lewis', department: 'Mechanical Engineering', mobile: '(888) 777-6666', email: 'amelia.l@university.edu', admissionDate: 'Nov 2, 2024' },
    { id: 24, rollNo: 'BT-422', name: 'Lucas Lee', department: 'Biotechnology', mobile: '(666) 555-4444', email: 'lucas.l@university.edu', admissionDate: 'Dec 9, 2024' },
    { id: 25, rollNo: 'AR-131', name: 'Harper Walker', department: 'Architecture', mobile: '(444) 333-2222', email: 'harper.w@university.edu', admissionDate: 'Jan 16, 2025' },
    { id: 26, rollNo: 'CS-106', name: 'Mason Hall', department: 'Computer Science', mobile: '(222) 111-0000', email: 'mason.h@university.edu', admissionDate: 'Feb 3, 2025' },
    { id: 27, rollNo: 'EE-210', name: 'Evelyn Young', department: 'Electrical Engineering', mobile: '(000) 999-8888', email: 'evelyn.y@university.edu', admissionDate: 'Mar 12, 2025' },
    { id: 28, rollNo: 'ME-317', name: 'Logan Hernandez', department: 'Mechanical Engineering', mobile: '(999) 888-7777', email: 'logan.h@university.edu', admissionDate: 'Apr 7, 2025' },
    { id: 29, rollNo: 'BT-423', name: 'Abigail King', department: 'Biotechnology', mobile: '(777) 666-5555', email: 'abigail.k@university.edu', admissionDate: 'May 19, 2025' },
    { id: 30, rollNo: 'AR-132', name: 'Jacob Wright', department: 'Architecture', mobile: '(555) 444-3333', email: 'jacob.w@university.edu', admissionDate: 'Jun 4, 2025' },
    { id: 31, rollNo: 'CS-107', name: 'Emily Lopez', department: 'Computer Science', mobile: '(333) 222-1111', email: 'emily.l@university.edu', admissionDate: 'Jul 11, 2025' },
    { id: 32, rollNo: 'EE-211', name: 'Michael Hill', department: 'Electrical Engineering', mobile: '(111) 999-8888', email: 'michael.h@university.edu', admissionDate: 'Aug 22, 2025' },
    { id: 33, rollNo: 'ME-318', name: 'Elizabeth Scott', department: 'Mechanical Engineering', mobile: '(888) 777-6666', email: 'elizabeth.s@university.edu', admissionDate: 'Sep 5, 2025' },
    { id: 34, rollNo: 'BT-424', name: 'Daniel Green', department: 'Biotechnology', mobile: '(666) 555-4444', email: 'daniel.g@university.edu', admissionDate: 'Oct 14, 2025' },
    { id: 35, rollNo: 'AR-133', name: 'Avery Adams', department: 'Architecture', mobile: '(444) 333-2222', email: 'avery.a@university.edu', admissionDate: 'Nov 1, 2025' },
    { id: 36, rollNo: 'CS-108', name: 'Sofia Baker', department: 'Computer Science', mobile: '(222) 111-0000', email: 'sofia.b@university.edu', admissionDate: 'Dec 8, 2025' },
    { id: 37, rollNo: 'EE-212', name: 'Matthew Nelson', department: 'Electrical Engineering', mobile: '(000) 999-8888', email: 'matthew.n@university.edu', admissionDate: 'Jan 15, 2026' },
    { id: 38, rollNo: 'ME-319', name: 'Victoria Carter', department: 'Mechanical Engineering', mobile: '(999) 888-7777', email: 'victoria.c@university.edu', admissionDate: 'Feb 2, 2026' },
    { id: 39, rollNo: 'BT-425', name: 'David Mitchell', department: 'Biotechnology', mobile: '(777) 666-5555', email: 'david.m@university.edu', admissionDate: 'Mar 9, 2026' },
    { id: 40, rollNo: 'AR-134', name: 'Scarlett Perez', department: 'Architecture', mobile: '(555) 444-3333', email: 'scarlett.p@university.edu', admissionDate: 'Apr 16, 2026' },
    { id: 41, rollNo: 'CS-109', name: 'Joseph Roberts', department: 'Computer Science', mobile: '(333) 222-1111', email: 'joseph.r@university.edu', admissionDate: 'May 3, 2026' },
    { id: 42, rollNo: 'EE-213', name: 'Madison Turner', department: 'Electrical Engineering', mobile: '(111) 999-8888', email: 'madison.t@university.edu', admissionDate: 'Jun 10, 2026' },
    { id: 43, rollNo: 'ME-320', name: 'Jackson Phillips', department: 'Mechanical Engineering', mobile: '(888) 777-6666', email: 'jackson.p@university.edu', admissionDate: 'Jul 17, 2026' },
    { id: 44, rollNo: 'BT-426', name: 'Lily Campbell', department: 'Biotechnology', mobile: '(666) 555-4444', email: 'lily.c@university.edu', admissionDate: 'Aug 4, 2026' },
    { id: 45, rollNo: 'AR-135', name: 'Samuel Parker', department: 'Architecture', mobile: '(444) 333-2222', email: 'samuel.p@university.edu', admissionDate: 'Sep 11, 2026' },
    { id: 46, rollNo: 'CS-110', name: 'Chloe Evans', department: 'Computer Science', mobile: '(222) 111-0000', email: 'chloe.e@university.edu', admissionDate: 'Oct 18, 2026' },
    { id: 47, rollNo: 'EE-214', name: 'Ryan Edwards', department: 'Electrical Engineering', mobile: '(000) 999-8888', email: 'ryan.e@university.edu', admissionDate: 'Nov 5, 2026' },
    { id: 48, rollNo: 'ME-321', name: 'Zoey Collins', department: 'Mechanical Engineering', mobile: '(999) 888-7777', email: 'zoey.c@university.edu', admissionDate: 'Dec 12, 2026' },
    { id: 49, rollNo: 'BT-427', name: 'Nathan Stewart', department: 'Biotechnology', mobile: '(777) 666-5555', email: 'nathan.s@university.edu', admissionDate: 'Jan 19, 2027' },
    { id: 50, rollNo: 'AR-136', name: 'Hannah Sanchez', department: 'Architecture', mobile: '(555) 444-3333', email: 'hannah.s@university.edu', admissionDate: 'Feb 6, 2027' }
  ];

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
    <h2 className="text-xl font-semibold text-gray-800 mb-4">All Students List</h2>
    <Link
      href="/admin/students/addStudents"
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
                    key={student.id} 
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="flex justify-center py-1 sm:py-2">
                      <Image 
                        src={`https://i.pravatar.cc/40?img=${student.id}`} 
                        alt={student.name} 
                        width={32}
                        height={32}
                        className="rounded-full" 
                      />
                    </td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-700 border-r border-gray-200">{student.rollNo}</td>
                    <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r border-gray-200">
                      {student.name}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">{student.department}</td>
                    <td className="hidden md:table-cell px-6 py-2 whitespace-nowrap text-sm text-gray-700 border-r border-gray-200">
                      <a 
                        href={`tel:${student.mobile.replace(/[^\d+]/g, '')}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {student.mobile}
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
                      {student.admissionDate}
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
            {displayedStudents.map((student) => (
              <div key={student.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow text-center flex flex-col h-full">
                {/* Student Image */}
                <div className="flex justify-center mb-2 sm:mb-3">
                  <Image 
                    src={`https://i.pravatar.cc/150?img=${student.id}`} 
                    alt={student.name} 
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-pink-100"
                  />
                </div>
                
                {/* Student Info */}
                <div className="flex-grow">
                  <h3 className="text-md sm:text-lg font-bold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{student.department}</p>
                  
                  <div className="text-xs text-gray-600 mb-2 sm:mb-3">
                    <p className="mb-1">123 University Avenue</p>
                    <p className="mb-1 sm:mb-2">United States</p>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="mb-1">
                      <a 
                        href={`tel:${student.mobile.replace(/[^\d+]/g, '')}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm"
                      >
                        {student.mobile}
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
                
                {/* Read More Button */}
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-medium transition-colors mt-1 sm:mt-2 mx-auto">
                  Read More
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
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
              // Show limited page numbers on mobile
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