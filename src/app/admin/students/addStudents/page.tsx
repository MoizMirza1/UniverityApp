import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import {AddStudents} from '@/components/students/AddStudents'

const AddStudentPage = () => {
  return (
    <div>
      <PageHeader 
        title="Add Student" 
        breadcrumbs={["Students", "Add Student"]} 
      />
      <AddStudents/>
    </div>
  )
}

export default AddStudentPage