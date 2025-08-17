import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutProfessors from '@/components/professors/AboutProfessor'

const AboutProfessor = () => {
  return (
    <div>
      <PageHeader 
        title="Professor Details" 
        breadcrumbs={["Professor", "Professor Details"]} 
      />
      <AboutProfessors/>
    </div>
  )
}

export default AboutProfessor