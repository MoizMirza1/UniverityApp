'use client';

import React, { useState } from 'react';
import { MoreVertical, ChevronDown, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { createStudent } from '@/components/services/studentService';
import { getStudents } from '@/components/services/studentService';

export const AddStudents: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    email: '',
    registrationDate: '',
    department: '',
    gender: '',
    mobileNumber: '',
    parentsName: '',
    parentsMobileNumber: '',
    address: '',
    studentPhoto: null as File | null
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isRegistrationCalendarOpen, setIsRegistrationCalendarOpen] = useState(false);
  const [currentRegistrationDate, setCurrentRegistrationDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rollPrefix, setRollPrefix] = useState<string>('');
  const [rollSerial, setRollSerial] = useState<string>('');
  const [rollYear, setRollYear] = useState<string>('2025');

  const departments = [
    'Computer Science',
    'Software',
    'AI',
    'Cyber Security'
  ];

  const genders = [
    'Male',
    'Female',
    'Other'
  ];

  const departmentToCode: Record<string, string> = {
    'Computer Science': 'CS',
    'Software': 'SE',
    'AI': 'AI',
    'Cyber Security': 'IT'
  };

  const rollPrefixes = [
    'CS',
    'IT',
    'SE',
    'AI'
  ];

  const buildRollNo = (prefix: string, serial: string, year: string) => {
    if (!prefix || !serial || !year) return '';
    const paddedSerial = serial.replace(/\D/g, '').slice(0, 3).padStart(3, '0');
    const yy = year.replace(/\D/g, '');
    const normalizedYear = yy.length === 2 ? `20${yy}` : yy.slice(-4).padStart(4, '0');
    return `${prefix.toUpperCase()}-${paddedSerial}-${normalizedYear}`;
  };

  const updateRollNo = (nextPrefix: string, nextSerial: string, nextYear: string) => {
    const combined = buildRollNo(nextPrefix, nextSerial, nextYear);
    setFormData(prev => ({
      ...prev,
      rollNo: combined
    }));
  };

  const computeNextSerial = async (prefix: string, year: string) => {
    type Student = { rollNumber?: string; rollNo?: string };
    type Parsed = { code: string; serial: number; yr: string } | null;
    try {
      const students: Student[] = await getStudents();
      const allRns = (students || [])
        .map(s => (s?.rollNumber || s?.rollNo || '') as string)
        .map(rn => (typeof rn === 'string' ? rn : ''))
        .filter(rn => rn)
        .map(rn => rn.replace(/\s+/g, ''))
        .map(rn => rn.toUpperCase());

      const targetYear = year.replace(/\D/g, '').length === 2 ? `20${year.replace(/\D/g, '')}` : year.replace(/\D/g, '').slice(-4);

      const parsed = allRns
        .map<Parsed>(rn => {
          // New format: CODE-SSS-YYYY
          const hy = rn.match(/^([A-Z]{1,4})-([0-9]{1,3})-([0-9]{4})$/);
          if (hy) return { code: hy[1], serial: parseInt(hy[2], 10), yr: hy[3] };
          // Old format tolerant: CODE|SSS|YY
          const old = rn.match(/^([A-Z]{1,4})[\|\-_:]*([0-9]{1,3})[\|\-_:]*([0-9]{2})$/);
          if (old) return { code: old[1], serial: parseInt(old[2], 10), yr: `20${old[3]}` };
          return null;
        })
        .filter((m): m is Exclude<Parsed, null> => Boolean(m));

      const used = new Set<number>(
        parsed
          .filter(m => m.code === prefix.toUpperCase() && m.yr === targetYear)
          .map(m => m.serial)
          .filter(n => Number.isInteger(n) && n >= 1 && n <= 50)
      );

      let assigned: number | null = null;
      for (let i = 1; i <= 50; i++) {
        if (!used.has(i)) { assigned = i; break; }
      }

      if (assigned === null) {
        setError('No available roll numbers for the selected code (limit 50).');
        setRollSerial('');
        updateRollNo(prefix, '', targetYear);
        return;
      }

      const nextSerialNumber = String(assigned).padStart(3, '0');
      setRollSerial(nextSerialNumber);
      setError(null);
      updateRollNo(prefix, nextSerialNumber, targetYear);
    } catch {
      setError('Failed to fetch existing students to assign roll number');
      setRollSerial('');
      updateRollNo(prefix, '', year);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartmentSelect = (selectedDepartment: string) => {
    setFormData(prev => ({
      ...prev,
      department: selectedDepartment
    }));
    setIsDepartmentDropdownOpen(false);

    const code = departmentToCode[selectedDepartment];
    if (code) {
      setRollPrefix(code);
      computeNextSerial(code, rollYear);
    }
  };

  const handleGenderSelect = (selectedGender: string) => {
    setFormData(prev => ({
      ...prev,
      gender: selectedGender
    }));
    setIsGenderDropdownOpen(false);
  };

  // Department is sent as-is to match backend enum values

  const handleRegistrationDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData(prev => ({
      ...prev,
      registrationDate: formattedDate
    }));
    setIsRegistrationCalendarOpen(false);
  };

  const handleRegistrationCalendarToggle = () => {
    setIsRegistrationCalendarOpen(!isRegistrationCalendarOpen);
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

  const goToPreviousMonth = (calendarType: 'registration' | 'birth') => {
    if (calendarType === 'registration') {
      setCurrentRegistrationDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }
  };

  const goToNextMonth = (calendarType: 'registration' | 'birth') => {
    if (calendarType === 'registration') {
      setCurrentRegistrationDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
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
        studentPhoto: files[0]
      }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        studentPhoto: files[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.rollNo) {
        setError('Roll Number is required in the format CS-001-2025');
        setIsSubmitting(false);
        return;
      }
      const studentData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        rollNumber: formData.rollNo,
        email: formData.email,
        admissionDate: new Date(formData.registrationDate).toISOString(),
        department: formData.department,
        gender: formData.gender,
        mobileNumber: formData.mobileNumber,
        parentName: formData.parentsName,
        parentNumber: formData.parentsMobileNumber,
        address: formData.address,
      };

      const response = await createStudent(studentData);
      console.log('Student created successfully!', response);
      
      
      // Reset form after successful submission
      handleCancel();
    } catch (err) {
      console.error('Error creating student:', err);
      setError(err instanceof Error ? err.message : 'Failed to create student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      rollNo: '',
      email: '',
      registrationDate: '',
      department: '',
      gender: '',
      mobileNumber: '',
      parentsName: '',
      parentsMobileNumber: '',
      address: '',
      studentPhoto: null
    });
    setError(null);
    setRollPrefix('');
    setRollSerial('');
    setRollYear('2025');
  };

  const renderCalendar = (
    isOpen: boolean,
    currentDate: Date,
    selectedDate: string,
    onDateSelect: (date: Date) => void,
    calendarType: 'registration'
  ) => {
    if (!isOpen) return null;

    return (
      <div className="absolute z-20 w-72 md:w-80 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 md:p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => goToPreviousMonth(calendarType)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-medium text-gray-900">
            {formatDate(currentDate)}
          </h3>
          <button
            type="button"
            onClick={() => goToNextMonth(calendarType)}
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
              onClick={() => date && onDateSelect(date)}
              disabled={!date}
              className={`w-7 h-7 md:w-8 md:h-8 text-xs md:text-sm rounded hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                date
                  ? 'text-gray-900 hover:bg-blue-50'
                  : 'text-gray-300 cursor-default'
              } ${
                date && selectedDate === date.toISOString().split('T')[0]
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : ''
              }`}
            >
              {date ? date.getDate() : ''}
            </button>
          ))}
        </div>
      </div>
    );
  };

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

            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 2: Roll No & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[80px]">
                    <select
                      value={rollPrefix}
                      disabled
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                      aria-disabled="true"
                    >
                      <option value="" disabled>
                        Code
                      </option>
                      {rollPrefixes.map((rp) => (
                        <option key={rp} value={rp}>{rp}</option>
                      ))}
                    </select>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="min-w-[72px]">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="001"
                      value={rollSerial}
                      readOnly
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="min-w-[56px]">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="2025"
                      value={rollYear}
                      readOnly
                      disabled
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
                <input type="hidden" name="rollNo" value={formData.rollNo} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 3: Registration Date & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <input
                  type="text"
                  name="registrationDate"
                  placeholder="Registration Date"
                  value={formData.registrationDate}
                  onChange={handleInputChange}
                  onClick={handleRegistrationCalendarToggle}
                  readOnly
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400 cursor-pointer"
                />
                <Calendar className="absolute right-0 top-3 w-5 h-5 text-gray-400" />
                {renderCalendar(
                  isRegistrationCalendarOpen,
                  currentRegistrationDate,
                  formData.registrationDate,
                  handleRegistrationDateSelect,
                  'registration'
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.department ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.department || 'Department'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isDepartmentDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {departments.map((departmentOption) => (
                      <button
                        key={departmentOption}
                        type="button"
                        onClick={() => handleDepartmentSelect(departmentOption)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {departmentOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: Gender & Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-left flex items-center justify-between"
                >
                  <span className={formData.gender ? 'text-gray-900' : 'text-gray-400'}>
                    {formData.gender || 'Gender'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isGenderDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {genders.map((genderOption) => (
                      <button
                        key={genderOption}
                        type="button"
                        onClick={() => handleGenderSelect(genderOption)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-gray-900"
                      >
                        {genderOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 5: Parent's Name & Parent's Mobile Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <input
                  type="text"
                  name="parentsName"
                  placeholder="Parent's Name"
                  value={formData.parentsName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="parentsMobileNumber"
                  placeholder="Parent's Mobile Number"
                  value={formData.parentsMobileNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Row 6: Address */}
            <div>
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Upload Photo Section */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Upload Photo</h3>
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
                  {formData.studentPhoto ? (
                    <span className="text-gray-600">
                      Selected: {formData.studentPhoto.name}
                    </span>
                  ) : (
                    'Drop files here to upload'
                  )}
                </div>
              </div>
            </div>

            {/* Submit and Cancel Buttons */}
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