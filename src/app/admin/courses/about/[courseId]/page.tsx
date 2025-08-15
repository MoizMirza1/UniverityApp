import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutCourse from '@/components/courses/AboutCourse'
const About = () => {
  return (
    
    <div>
         <PageHeader  title="Course Details"  breadcrumbs={["Courses", "Course Details"]}/>
         <AboutCourse/>
    </div>
  )
}

export default About