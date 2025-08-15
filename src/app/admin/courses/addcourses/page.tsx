import React from 'react'
import { AddCourses } from '@/components/courses/Addcourses'
import PageHeader from '@/components/common/PageHeader'

const page = () => {
  return (
    <div>
         <PageHeader  title="All Course"  breadcrumbs={["Courses", "Add Course"]}/>
          <AddCourses />
    </div>
  )
}

export default page
