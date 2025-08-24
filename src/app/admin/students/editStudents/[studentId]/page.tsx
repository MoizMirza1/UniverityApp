'use client'
import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import  {EditStudents}  from '@/components/students/EditStudents';

const EditStudentsPage = () => {
  return (
    <div>
      <PageHeader 
        title="Edit Students" 
        breadcrumbs={["Edit Students", "Edit Students"]} 
      />
      <EditStudents />
    </div>
  );
};

export default EditStudentsPage;