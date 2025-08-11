import React from 'react'
import {AllCourses} from '@/components/courses/Allcourses'
import PageHeader from '@/components/common/PageHeader'

const page = () => {
  return (
    <div>
       <PageHeader
        title="All Course"
        breadcrumbs={["Courses", "All Courses"]}
      />
      <AllCourses />  
      
    </div>
  )
}

export default page
