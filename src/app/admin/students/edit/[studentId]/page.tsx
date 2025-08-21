import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { EditStudents } from '@/components/students/EditStudents';

interface PageProps {
  params: { studentId: string };
}

const EditStudentPage = ({ params }: PageProps) => {
  return (
    <div>
      <PageHeader title="Edit Student" breadcrumbs={["Students", "Edit Student"]} />
      <EditStudents />
    </div>
  );
};

export default EditStudentPage;


