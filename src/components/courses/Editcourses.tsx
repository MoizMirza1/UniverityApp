'use client';

import React, { useState, useEffect } from 'react';
import { MoreVertical, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { updateCourse } from '@/components/services/courseService';

interface CourseData {
  _id?: string;
  title: string;
  courseCode: string;
  description: string;
  startDate: string;
  duration: string;
  price: string;
  professor: string;
  maxStudents: string;
  contactNumber: string;
  image: string;
}

interface UpdateCourseData {
  title?: string;
  courseCode?: string;
  description?: string;
  startDate?: string;
  duration?: string;
  price?: number;
  professor?: string;
  maxStudents?: number;
  contactNumber?: string;
  image?: string;
}

export const EditCourse: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const { data: session } = useSession();
  
  const [formData, setFormData] = useState<CourseData>({
    title: '',
    courseCode: '',
    description: '',
    startDate: '',
    duration: '',
    price: '',
    professor: '',
    maxStudents: '',
    contactNumber: '',
    image: ''
  });

  const [originalData, setOriginalData] = useState<CourseData>({
    title: '',
    courseCode: '',
    description: '',
    startDate: '',
    duration: '',
    price: '',
    professor: '',
    maxStudents: '',
    contactNumber: '',
    image: ''
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const professors = [
    'Dr. John Smith',
    'Prof. Sarah Johnson',
    'Dr. Michael Brown',
    'Prof. Emily Davis',
    'Dr. Robert Wilson'
  ];

  // Handler functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessorSelect = (professor: string) => {
    setFormData(prev => ({ ...prev, professor }));
    setIsDropdownOpen(false);
  };

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date: Date) => {
    setFormData(prev => ({ ...prev, startDate: date.toISOString().split('T')[0] }));
    setIsCalendarOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
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
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Function to get only changed fields
  const getChangedFields = (): UpdateCourseData => {
    const changedFields: UpdateCourseData = {};
    
    if (formData.title !== originalData.title) changedFields.title = formData.title;
    if (formData.courseCode !== originalData.courseCode) changedFields.courseCode = formData.courseCode;
    if (formData.description !== originalData.description) changedFields.description = formData.description;
    if (formData.startDate !== originalData.startDate) changedFields.startDate = formData.startDate;
    if (formData.duration !== originalData.duration) changedFields.duration = formData.duration;
    if (formData.price !== originalData.price) changedFields.price = Number(formData.price);
    if (formData.professor !== originalData.professor) changedFields.professor = formData.professor;
    if (formData.maxStudents !== originalData.maxStudents) changedFields.maxStudents = Number(formData.maxStudents);
    if (formData.contactNumber !== originalData.contactNumber) changedFields.contactNumber = formData.contactNumber;
    if (formData.image !== originalData.image) changedFields.image = formData.image;
    
    return changedFields;
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const response = await fetch(`http://localhost:8000/api/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${(session as any)?.accessToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data?.course) {
          throw new Error('Course data not found in response');
        }

        const course = data.data.course;
        
        const courseFormData = {
          title: course.title || '',
          courseCode: course.courseCode || '',
          description: course.description || '',
          startDate: course.startDate ? course.startDate.split('T')[0] : '',
          duration: course.duration || '',
          price: course.price ? course.price.toString() : '',
          professor: course.professor || '',
          maxStudents: course.maxStudents ? course.maxStudents.toString() : '',
          contactNumber: course.contactNumber || '',
          image: course.image || ''
        };
        
        setFormData(courseFormData);
        setOriginalData(courseFormData);
      } catch (error) {
        console.error("Fetch error:", error);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, (session as any)?.accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    try {
      // Get only the fields that have been changed
      const changedFields = getChangedFields();
      
      console.log('Sending only changed fields:', changedFields);

      const result = await updateCourse(courseId, changedFields);
      console.log("Success:", result);
      
      // Update the original data to reflect the changes
      const updatedOriginalData = { ...originalData };
      Object.keys(changedFields).forEach(key => {
        const fieldKey = key as keyof UpdateCourseData;
        if (changedFields[fieldKey] !== undefined) {
          if (fieldKey === 'price' || fieldKey === 'maxStudents') {
            // Convert number back to string for originalData
            (updatedOriginalData as any)[fieldKey] = String(changedFields[fieldKey]);
          } else {
            (updatedOriginalData as any)[fieldKey] = changedFields[fieldKey];
          }
        }
      });
      setOriginalData(updatedOriginalData);
      
      // Show success message instead of redirecting
      setError('');
      setIsSubmitting(false);
      
      // Optional: Show a success notification
      alert('Course updated successfully!');
    } catch (error) {
      console.error("Error:", error);
      setError('Failed to save course data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/courses');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading course data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-gray-200">
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Edit Course</h1>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 md:px-8 py-8 space-y-6 md:space-y-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Row 1: Course Name & Course Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 cursor-not-allowed">Course Code</label>
                <input 
                  type="text"
                  name="courseCode"
                  placeholder="Course Code"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  required
                  disabled
                  
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Course Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
              <textarea
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Row 3: Start Date & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  onClick={handleCalendarToggle}
                  readOnly
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
                <Calendar className="absolute right-3 bottom-2 w-5 h-5 text-gray-400" />
                
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
                            date && formData.startDate === date.toISOString().split('T')[0]
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration (number of weeks)"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Row 4: Price & Professor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Course Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professor</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-left flex items-center justify-between"
                >
                  <span className={formData.professor ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.professor || 'Select Professor'}
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
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {professor}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 5: Max Students & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Students</label>
                <input
                  type="number"
                  name="maxStudents"
                  placeholder="Maximum Students"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Course Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Photo</label>
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
                  {imageFile ? (
                    <span className="text-gray-600">
                      Selected: {imageFile.name}
                    </span>
                  ) : formData.image ? (
                    <span className="text-gray-600">
                      Current image: {formData.image.split('/').pop()}
                    </span>
                  ) : (
                    'Drop files here to upload or click to select'
                  )}
                </div>
              </div>
              {formData.image && !imageFile && (
                <div className="mt-2 text-sm text-gray-500">
                  Current image will be kept if no new image is selected
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-6 pt-8">
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium text-sm tracking-wide ${
                  isSubmitting
                    ? 'bg-blue-400 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {isSubmitting ? 'UPDATING...' : 'UPDATE COURSE'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-500 focus:ring-offset-2 font-medium text-sm tracking-wide"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
    
  );
};