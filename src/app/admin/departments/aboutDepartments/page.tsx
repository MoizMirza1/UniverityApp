import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutDepartments from '@/components/departments/AboutDepartments'
const About = () => {
  return (
    
    <div>
         <PageHeader  title="Departments Details"  breadcrumbs={["Departments", "Course Details"]}/>
         <AboutDepartments/>
    </div>
  )
}

export default About