import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutStudent  from '@/components/students/AboutStudents'

const AboutStudentPage = () => {
  return (
    <div>
      <PageHeader 
        title="Student Details" 
        breadcrumbs={["Students", "Student Details"]} 
      />
      <AboutStudent />
    </div>
  )
}

export default AboutStudentPage