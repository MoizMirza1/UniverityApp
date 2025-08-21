'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MoreVertical, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { updateStudent, getStudent } from '@/components/services/studentService';

type StudentData = {
  firstName: string;
  lastName: string;
  rollNumber: string;
  email: string;
  admissionDate: string;
  department: string;
  gender: string;
  mobileNumber: string;
  parentName: string;
  parentNumber: string;
  address: string;
  image?: string;
};

type UpdateStudentData = Partial<StudentData>;

const departments = ['Computer Science', 'Software', 'AI', 'Cyber Security'];
const genders = ['Male', 'Female', 'Other'];

export const EditStudents: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;

  const [formData, setFormData] = useState<StudentData>({
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
    department: '',
    gender: '',
    mobileNumber: '',
    parentName: '',
    parentNumber: '',
    address: '',
    image: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isRegistrationCalendarOpen, setIsRegistrationCalendarOpen] = useState(false);
  const [currentRegistrationDate, setCurrentRegistrationDate] = useState<Date>(new Date());
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const s = await getStudent(studentId);
        const admissionDate = s?.admissionDate
          ? new Date(s.admissionDate).toISOString().split('T')[0]
          : '';
        
        let address = '';
        if (typeof s?.address === 'string') {
          address = s.address;
        } else if (s?.address && typeof s.address === 'object') {
          const a = s.address;
          address = [a.line1 || a.street || a.addressLine1 || a.address, a.city, a.state || a.province, a.country, a.zip || a.postalCode]
            .filter(Boolean)
            .join(', ');
        }
        
        const data: StudentData = {
          firstName: s?.firstName || '',
          lastName: s?.lastName || '',
          rollNumber: s?.rollNumber || s?.rollNo || '',
          email: s?.email || '',
          admissionDate,
          department: s?.department || '',
          gender: s?.gender || '',
          mobileNumber: s?.mobileNumber || s?.mobile || '',
          parentName: s?.parentName || s?.parentsName || '',
          parentNumber: s?.parentNumber || s?.parentsMobileNumber || '',
          address,
          image: s?.image || '',
        };
        setFormData(data);
        setOriginalData(data);
      } catch {
        setError('Failed to load student');
      } finally {
        setIsLoading(false);
      }
    };
    if (studentId) fetchStudent();
  }, [studentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const getChangedFields = (): UpdateStudentData => {
    const changed: UpdateStudentData = {};
    (Object.keys(formData) as Array<keyof StudentData>).forEach(key => {
      if (formData[key] !== originalData[key]) {
        changed[key] = formData[key];
      }
    });
    
    if (changed.admissionDate) {
      try {
        changed.admissionDate = new Date(changed.admissionDate).toISOString();
      } catch {}
    }
    return changed;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const updates = getChangedFields();
      
      if (imageFile) {
        updates.image = imageFile.name;
      }
      
      if (Object.keys(updates).length === 0 && !imageFile) {
        setIsSubmitting(false);
        return;
      }
      await updateStudent(studentId, updates);
      setOriginalData(formData);
      alert('Student updated successfully!');
    } catch {
      setError('Failed to update student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/students');
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4 border">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-gray-200">
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Basic Information</h1>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-4 md:px-8 py-8 space-y-6 md:space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                  placeholder="Admission Date"
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
                      {(() => {
                        const days: Array<Date | null> = [];
                        const year = currentRegistrationDate.getFullYear();
                        const month = currentRegistrationDate.getMonth();
                        const firstDay = new Date(year, month, 1);
                        const lastDay = new Date(year, month + 1, 0);
                        const startingDay = firstDay.getDay();
                        for (let i = 0; i < startingDay; i++) days.push(null);
                        for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
                        return days;
                      })().map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => date && (setFormData(prev => ({ ...prev, admissionDate: `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` })), setIsRegistrationCalendarOpen(false))}
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
              <div className="relative">
                <button type="button" onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)} className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between">
                  <span className={formData.department ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.department || 'Department'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isDepartmentDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {departments.map((d) => (
                      <button key={d} type="button" onClick={() => { setFormData(prev => ({ ...prev, department: d })); setIsDepartmentDropdownOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900">
                        {d}
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
                    {formData.gender || 'Gender'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isGenderDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {genders.map((g) => (
                      <button key={g} type="button" onClick={() => { setFormData(prev => ({ ...prev, gender: g })); setIsGenderDropdownOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900">
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="parentName"
                placeholder="Parent's Name"
                value={formData.parentName}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="tel"
                name="parentNumber"
                placeholder="Parent's Mobile Number"
                value={formData.parentNumber}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div>
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent resize-none"
              />
            </div>

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

            <div className="flex items-center justify-center space-x-6 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-3 py-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm tracking-wide ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
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
    </div>
  );
};

export default EditStudents;