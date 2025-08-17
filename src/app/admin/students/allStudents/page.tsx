import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AllStudents from '@/components/students/AllStudents'

const AboutStudentPage = () => {
  return (
    <div>
      <PageHeader 
        title="All Students List" 
        breadcrumbs={["Students", "All Students List"]} 
      />
      <AllStudents/>
    </div>
  )
}

export default AboutStudentPage