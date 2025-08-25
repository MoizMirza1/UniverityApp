'use client';

import React, { useState,useEffect } from 'react';
import { MoreVertical, ChevronDown, Calendar, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { format } from 'date-fns';
import { createCourse ,previewCourseCode, getDepartments } from '../services';
import Loader from '../common/Loader';

export const AddCourses: React.FC = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    courseDetails: '',
    startFrom: '',
    courseTimeLength: '',
    coursePrice: '',
    professorName: '',
    maximumStudents: '',
    contactNumber: '',
    coursePhoto: null as File | null,
    level: '',
    department: ''
    
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const professors = [
    'Dr. John Smith',
    'Prof. Sarah Johnson',
    'Dr. Michael Brown',
    'Prof. Emily Davis',
    'Dr. Robert Wilson'
  ];

  const levels = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const depts = await getDepartments();
        setDepartments(depts);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
      finally{
        setIsPageLoading(false)
      }
    };
    
    fetchDepartments();
  }, []);

// Generate course code when department or level changes
  useEffect(() => {
    const generateCourseCode = async () => {
      if (formData.department && formData.level) {
        setIsGeneratingCode(true);
        try {
          const code = await previewCourseCode(formData.department, Number(formData.level));
          setFormData(prev => ({
            ...prev,
            courseCode: code
          }));
        } catch (error) {
          console.error('Error generating course code:', error);
          setError('Failed to generate course code');
        } finally {
          setIsGeneratingCode(false);
        }
      }
    };

    generateCourseCode();
  }, [formData.department, formData.level]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfessorSelect = (professor: string) => {
    setFormData(prev => ({
      ...prev,
      professorName: professor
    }));
    setIsDropdownOpen(false);
  };

   const handleLevelSelect = (level: number) => {
    setFormData(prev => ({
      ...prev,
      level: level.toString()
    }));
    setIsLevelDropdownOpen(false);
  };

   const handleDepartmentSelect = (departmentId: string) => {
    setFormData(prev => ({
      ...prev,
      department: departmentId
    }));
    setIsDepartmentDropdownOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData(prev => ({
      ...prev,
      startFrom: formattedDate
    }));
    setIsCalendarOpen(false);
  };

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMMM yyyy');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        coursePhoto: files[0]
      }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        coursePhoto: files[0]
      }));
    }
  };


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

     try {
    const courseData = {
      title: formData.courseName,
      courseCode: formData.courseCode,
      description: formData.courseDetails,
      startDate: new Date(formData.startFrom).toISOString(),
      duration: formData.courseTimeLength,
      price: Number(formData.coursePrice),
      professor: formData.professorName,
      maxStudents: Number(formData.maximumStudents),
      contactNumber: formData.contactNumber,
      image: formData.coursePhoto?.name || 'no-photo.jpg', 
      students: [],
      level: Number(formData.level),
      department: formData.department
    };


      // Call the API
      const response = await createCourse(courseData);
      console.log('Course created successfully!' , response);
      handleCancel();
    } catch (err) {
      console.error('Error creating course:', err);
      console.log(err instanceof Error ? err.message : 'Failed to create course');
    } 
    finally{
      setIsSubmitting(false)
    }
  };

  const handleCancel = () => {
    setFormData({
      courseName: '',
      courseCode: '',
      courseDetails: '',
      startFrom: '',
      courseTimeLength: '',
      coursePrice: '',
      professorName: '',
      maximumStudents: '',
      contactNumber: '',
      coursePhoto: null,
      level: '',
      department: ''
    });
    setError(null);
  };

   if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader size="large" text="Loading form..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
       {isPageLoading ? (
        <div className="flex items-center justify-center min-h-screen">
        <Loader size="large" text="Loading form..." />
      </div>
       )  : (
  <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-gray-200">
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Course Details</h1>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-4 md:px-8 py-8 space-y-6 md:space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Row 1: Course Name & Course Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <input
                  type="text"
                  name="courseName"
                  placeholder="Course Name"
                  value={formData.courseName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
               <div className="relative">
                <input
                  type="text"
                  name="courseCode"
                  placeholder={isGeneratingCode ? "Generating Course Code..." : "Course Code (auto-generated)"}
                  value={formData.courseCode}
                  readOnly
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-200 bg-gray-100 text-gray-500 placeholder-gray-400  cursor-not-allowed"
                />
                {isGeneratingCode && (
                  <RefreshCcw className="absolute right-0 top-3 w-5 h-5 text-gray-400 animate-spin" />
                )}
              </div>
            </div>

            <div>
              <textarea
                name="courseDetails"
                placeholder="Course Details"
                value={formData.courseDetails}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Level and Department Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.level ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.level ? `Level ${formData.level}` : 'Select Level'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isLevelDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => handleLevelSelect(level)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        Level {level}
                      </button>
                    ))}
                  </div>
                )}
              </div>
                  <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.department ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.department 
                      ? departments.find(d => d._id === formData.department)?.name || 'Selected Department'
                      : 'Select Department'
                    }
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isDepartmentDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {departments.map((department) => (
                      <button
                        key={department._id}
                        type="button"
                        onClick={() => handleDepartmentSelect(department._id)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {department.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              </div>

          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <input
                  type="text"
                  name="startFrom"
                  placeholder="Start From"
                  value={formData.startFrom}
                  onChange={handleInputChange}
                  onClick={handleCalendarToggle}
                  readOnly
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400 cursor-pointer"
                />
                <Calendar className="absolute right-0 top-3 w-5 h-5 text-gray-400" />
                
                {isCalendarOpen && (
                  <div className="absolute z-20 w-72 md:w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 md:p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={goToPreviousMonth}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <h3 className="text-sm font-medium text-gray-900">
                        {formatDate(currentDate)}
                      </h3>
                      <button
                        type="button"
                        onClick={goToNextMonth}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-xs text-gray-500 text-center py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentDate).map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => date && handleDateSelect(date)}
                          disabled={!date}
                          className={`w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm rounded hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            date
                              ? 'text-gray-900 hover:bg-blue-50'
                              : 'text-gray-300 cursor-default'
                          } ${
                            date && formData.startFrom === date.toISOString().split('T')[0]
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : ''
                          }`}
                        >
                          {date ? date.getDate() : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="courseTimeLength"
                  placeholder="Course Time Length (e.g., 8 weeks)"
                  value={formData.courseTimeLength}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <input
                  type="number"
                  name="coursePrice"
                  placeholder="Course Price"
                  value={formData.coursePrice}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.professorName ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.professorName || 'Select Professor'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {professors.map((professor) => (
                      <button
                        key={professor}
                        type="button"
                        onClick={() => handleProfessorSelect(professor)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {professor}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <input
                  type="number"
                  name="maximumStudents"
                  placeholder="Maximum Students"
                  value={formData.maximumStudents}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-16 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-gray-400 text-base">
                  {formData.coursePhoto ? (
                    <span className="text-gray-600">
                      Selected: {formData.coursePhoto.name}
                    </span>
                  ) : (
                    'Drop files here to upload'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-8">
              <button
                type="submit"
                disabled={isSubmitting || !formData.courseCode}
                className={`px-3 py-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm tracking-wide ${
                  isSubmitting || !formData.courseCode ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className={`px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-500 focus:ring-offset-2 font-medium text-sm tracking-wide ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
       )}
    </div>
  );
};