import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutStudent  from '@/components/students/AboutStudents'
import AboutProfessor from '@/components/professors/AboutProfessor'

const AboutProfessorPage = () => {
  return (
    <div>
      <PageHeader 
        title="Professor Details" 
        breadcrumbs={["Professor", "Professor Details"]} 
      />
      <AboutProfessor />
    </div>
  )
}

export default AboutProfessorPage