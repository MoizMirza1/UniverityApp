'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MoreVertical, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { updateStudent, getStudent } from '@/components/services/studentService';
import { getDepartments } from '@/components/services/departmentService';

type StudentData = {
  firstName: string;
  lastName: string;
  rollNumber: string;
  email: string;
  admissionDate: string;
  department: {
    _id: string;
    name: string;
    code: string;
    headOfDepartment?: string;
    maxStudents?: number;
    departmentDetails?: string;
  };
  gender: string;
  mobileNumber: string;
  parentName: string;
  parentNumber: string;
  address: string;
  image?: string;
  status?: string;
};

type Department = {
  _id: string;
  name: string;
  code: string;
  headOfDepartment?: string;
  maxStudents?: number;
  departmentDetails?: string;
};

export const EditStudents: React.FC = () => {
  const params = useParams();
  const studentId = params.studentId as string;

  const [formData, setFormData] = useState<Omit<StudentData, 'department'> & { department: string }>({
    firstName: '',
    lastName: '',
    rollNumber: '',
    email: '',
    admissionDate: '',
    department: '',
    gender: '',
    mobileNumber: '',
    parentName: '',
    parentNumber: '',
    address: '',
    image: '',
  });

  const [originalData, setOriginalData] = useState<StudentData>({
    firstName: '',
    lastName: '',
    rollNumber: '',
    email: '',
    admissionDate: '',
    department: {
      _id: '',
      name: '',
      code: ''
    },
    gender: '',
    mobileNumber: '',
    parentName: '',
    parentNumber: '',
    address: '',
    image: '',
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isRegistrationCalendarOpen, setIsRegistrationCalendarOpen] = useState(false);
  const [currentRegistrationDate, setCurrentRegistrationDate] = useState<Date>(new Date());
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const genders = ['Male', 'Female', 'Other'];

  // Fetch student data and departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch departments
        const deps = await getDepartments();
        setDepartments(deps);

        // Fetch student data
        const student = await getStudent(studentId);
        
        const studentData: StudentData = {
          firstName: student?.firstName || '',
          lastName: student?.lastName || '',
          rollNumber: student?.rollNumber || '',
          email: student?.email || '',
          admissionDate: student?.admissionDate ? new Date(student.admissionDate).toISOString().split('T')[0] : '',
          department: student?.department || {
            _id: '',
            name: '',
            code: ''
          },
          gender: student?.gender || '',
          mobileNumber: student?.mobileNumber || '',
          parentName: student?.parentName || '',
          parentNumber: student?.parentNumber || '',
          address: student?.address || '',
          image: student?.image || '',
          status: student?.status || ''
        };

        setOriginalData(studentData);
        
        // Set form data with department ID as string for dropdown
        setFormData({
          ...studentData,
          department: studentData.department?._id || ''
        });
        
      } catch (err) {
        console.error('Failed to fetch data', err);
        setError('Failed to load student data');
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDepartmentSelect = (departmentId: string) => {
    const selectedDepartment = departments.find(d => d._id === departmentId);
    if (!selectedDepartment) return;

    // Keep the original roll number - don't change it when switching departments
    setFormData(prev => ({
      ...prev,
      department: departmentId
      // rollNumber remains unchanged
    }));
    setIsDepartmentDropdownOpen(false);
  };

  const handleGenderSelect = (selectedGender: string) => {
    setFormData(prev => ({ ...prev, gender: selectedGender }));
    setIsGenderDropdownOpen(false);
  };

  const handleRegistrationDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData(prev => ({ ...prev, admissionDate: formattedDate }));
    setIsRegistrationCalendarOpen(false);
  };

  const getChangedFields = (): Partial<StudentData> => {
    const changed: Partial<StudentData> = {};
    
    if (formData.firstName !== originalData.firstName) {
      changed.firstName = formData.firstName;
    }
    
    if (formData.lastName !== originalData.lastName) {
      changed.lastName = formData.lastName;
    }
    
    // Roll number remains the same - no need to check for changes
    if (formData.rollNumber !== originalData.rollNumber) {
      changed.rollNumber = formData.rollNumber;
    }
    
    if (formData.email !== originalData.email) {
      changed.email = formData.email;
    }
    
    if (formData.admissionDate !== originalData.admissionDate) {
      changed.admissionDate = formData.admissionDate;
    }
    
    // Handle department changes
    if (formData.department !== originalData.department._id) {
      const selectedDepartment = departments.find(d => d._id === formData.department);
      if (selectedDepartment) {
        changed.department = selectedDepartment;
      }
    }
    
    if (formData.gender !== originalData.gender) {
      changed.gender = formData.gender;
    }
    
    if (formData.mobileNumber !== originalData.mobileNumber) {
      changed.mobileNumber = formData.mobileNumber;
    }
    
    if (formData.parentName !== originalData.parentName) {
      changed.parentName = formData.parentName;
    }
    
    if (formData.parentNumber !== originalData.parentNumber) {
      changed.parentNumber = formData.parentNumber;
    }
    
    if (formData.address !== originalData.address) {
      changed.address = formData.address;
    }
    
    if (imageFile) {
      changed.image = imageFile.name;
    }
    
    return changed;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const updates = getChangedFields();
      
      if (Object.keys(updates).length === 0 && !imageFile) {
        setError('No changes made');
        setIsSubmitting(false);
        return;
      }
      
      await updateStudent(studentId, updates);
      
      // Update original data with new values
      const updatedOriginalData: StudentData = {
        ...originalData,
        ...updates,
        department: updates.department || originalData.department
      };
      
      setOriginalData(updatedOriginalData);
      
             // Show success alert
       alert('Student updated successfully!');
      
    } catch (err: unknown) {
      console.error('Error updating student:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to update student: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    setFormData({
      ...originalData,
      department: originalData.department._id
    });
    setError('');
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
    if (files && files[0] && files[0].type.startsWith('image/')) {
      setImageFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      setImageFile(files[0]);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: Array<Date | null> = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4 border">Loading...</div>
      </div>
    );
  }

  const selectedDepartment = departments.find(d => d._id === formData.department);
  const originalDepartmentName = originalData.department?.name || '';

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-gray-200">
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Edit Student Information</h1>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-4 md:px-8 py-8 space-y-6 md:space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
                {error}
                <button onClick={() => setError('')} className="ml-4 text-red-700 hover:text-red-900">×</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="firstName"
                placeholder={originalData.firstName || "First Name"}
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="text"
                name="lastName"
                placeholder={originalData.lastName || "Last Name"}
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                             <div>
                 <input
                   type="text"
                   name="rollNumber"
                   placeholder={originalData.rollNumber || "Roll Number"}
                   value={formData.rollNumber}
                   onChange={handleInputChange}
                   className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
                 />
                 <div className="text-xs text-gray-500 mt-1">
                   Roll number remains unchanged when switching departments
                 </div>
               </div>
              <input
                type="email"
                name="email"
                placeholder={originalData.email || "Email"}
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <input
                  type="text"
                  name="admissionDate"
                  placeholder={originalData.admissionDate || "Admission Date"}
                  value={formData.admissionDate}
                  onChange={handleInputChange}
                  onClick={() => setIsRegistrationCalendarOpen(!isRegistrationCalendarOpen)}
                  readOnly
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent cursor-pointer"
                />
                <Calendar className="absolute right-0 top-3 w-5 h-5 text-gray-400" />
                {isRegistrationCalendarOpen && (
                  <div className="absolute z-20 w-72 md:w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 md:p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button type="button" onClick={() => setCurrentRegistrationDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <h3 className="text-sm font-medium text-gray-900">{format(currentRegistrationDate, 'MMMM yyyy')}</h3>
                      <button type="button" onClick={() => setCurrentRegistrationDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-xs text-gray-500 text-center py-1">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentRegistrationDate).map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => date && handleRegistrationDateSelect(date)}
                          disabled={!date}
                          className={`w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm rounded hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            date ? 'text-gray-900 hover:bg-blue-50' : 'text-gray-300 cursor-default'
                          } ${
                            date && formData.admissionDate === date.toISOString().split('T')[0]
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
              
              {/* Department Dropdown */}
              <div className="relative">
                <button 
                  type="button" 
                  onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)} 
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.department ? 'text-gray-900' : 'text-gray-400'}>
                    {selectedDepartment?.name || originalDepartmentName || 'Select Department'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isDepartmentDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {departments.map((dept) => (
                      <button 
                        key={dept._id} 
                        type="button" 
                        onClick={() => handleDepartmentSelect(dept._id)} 
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {dept.name} ({dept.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <button type="button" onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)} className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between">
                  <span className={formData.gender ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.gender || originalData.gender || 'Gender'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isGenderDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {genders.map((g) => (
                      <button key={g} type="button" onClick={() => handleGenderSelect(g)} className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900">
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                name="mobileNumber"
                placeholder={originalData.mobileNumber || "Mobile Number"}
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="parentName"
                placeholder={originalData.parentName || "Parent's Name"}
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="tel"
                name="parentNumber"
                placeholder={originalData.parentNumber || "Parent's Mobile Number"}
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div>
              <textarea
                name="address"
                placeholder={originalData.address || "Address"}
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Update Student Photo</label>
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
                  ) : originalData.image ? (
                    <span className="text-gray-600">
                      Current image: {originalData.image}
                    </span>
                  ) : (
                    'Drop files here to upload or click to select'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm min-w-[120px] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    UPDATING...
                  </div>
                ) : (
                  'UPDATE STUDENT'
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className={`px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-sm min-w-[100px] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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

export default EditStudents;