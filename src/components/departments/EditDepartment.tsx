'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MoreVertical } from 'lucide-react';
import { updateDepartment, getDepartment, getDepartments } from '../services';

type DepartmentData = {
  name: string;
  code: string;
  headOfDepartment: string;
  maxStudents: number;
  departmentDetails: string;
};

export const EditDepartment: React.FC = () => {
  const params = useParams();
  const departmentId = params.departmentId as string;
  
  console.log('EditDepartment component params:', params);
  console.log('Department ID from params:', departmentId);
  console.log('All params keys:', Object.keys(params));

  const [formData, setFormData] = useState<DepartmentData>({
    name: '',
    code: '',
    headOfDepartment: '',
    maxStudents: 0,
    departmentDetails: '',
  });

  const [originalData, setOriginalData] = useState<DepartmentData>({
    name: '',
    code: '',
    headOfDepartment: '',
    maxStudents: 0,
    departmentDetails: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch department data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching department with ID:', departmentId);
        
        // Fetch department data
        let department;
        try {
          department = await getDepartment(departmentId);
          console.log('Department data received:', department);
        } catch (apiError) {
          console.error('API call failed:', apiError);
          // Try to get the department from the departments list as fallback
          const allDepartments = await getDepartments();
          department = allDepartments.find((dept: { _id: string }) => dept._id === departmentId);
          console.log('Department found from all departments:', department);
        }
        
        const departmentData: DepartmentData = {
          name: department?.name || '',
          code: department?.code || '',
          headOfDepartment: department?.headOfDepartment || '',
          maxStudents: department?.maxStudents || 0,
          departmentDetails: department?.departmentDetails || '',
        };

        console.log('Processed department data:', departmentData);
        setOriginalData(departmentData);
        setFormData(departmentData);
        
      } catch (err) {
        console.error('Failed to fetch data', err);
        let errorMessage = 'Failed to load department data';
        if (err instanceof Error) {
          errorMessage = `Failed to load department data: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (departmentId) {
      fetchData();
    }
  }, [departmentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const getChangedFields = (): Partial<DepartmentData> => {
    const changed: Partial<DepartmentData> = {};
    
    if (formData.headOfDepartment !== originalData.headOfDepartment) {
      changed.headOfDepartment = formData.headOfDepartment;
    }
    
    if (formData.maxStudents !== originalData.maxStudents) {
      changed.maxStudents = formData.maxStudents;
    }
    
    if (formData.departmentDetails !== originalData.departmentDetails) {
      changed.departmentDetails = formData.departmentDetails;
    }
    
    return changed;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const updates = getChangedFields();
      
      if (Object.keys(updates).length === 0) {
        setError('No changes made');
        setIsSubmitting(false);
        return;
      }
      
      await updateDepartment(departmentId, updates);
      
      // Update original data with new values
      const updatedOriginalData: DepartmentData = {
        ...originalData,
        ...updates,
      };
      
      setOriginalData(updatedOriginalData);
      
      // Show success alert
      alert('Department updated successfully!');
      
    } catch (err: unknown) {
      console.error('Error updating department:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to update department: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    setFormData(originalData);
    setError('');
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
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Edit Department Information</h1>
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
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={originalData.name || "Department Name"}
                  value={formData.name}
                  readOnly
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Department name cannot be changed
                </div>
              </div>
              <div>
                <input
                  type="text"
                  name="code"
                  placeholder={originalData.code || "Department Code"}
                  value={formData.code}
                  readOnly
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Department code cannot be changed
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <input
                type="text"
                name="headOfDepartment"
                placeholder={originalData.headOfDepartment || "Head of Department"}
                value={formData.headOfDepartment}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
              <input
                type="number"
                name="maxStudents"
                placeholder={originalData.maxStudents.toString() || "Max Students"}
                value={formData.maxStudents}
                onChange={handleInputChange}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>

            <div>
              <textarea
                name="departmentDetails"
                placeholder={originalData.departmentDetails || "Department Details"}
                value={formData.departmentDetails}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent resize-none"
              />
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
                  'UPDATE DEPARTMENT'
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

export default EditDepartment;
