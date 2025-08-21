import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import {AddStudents} from '@/components/students/AddStudents'

const AddStudentPage = () => {
  return (
    <div>
      <PageHeader 
        title="All Students List" 
        breadcrumbs={["Students", "All Students List"]} 
      />
      <AddStudents/>
    </div>
  )
}

export default AddStudentPage