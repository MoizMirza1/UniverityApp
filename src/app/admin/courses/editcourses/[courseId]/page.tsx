import React from 'react'
import { EditCourse } from '@/components/courses/Editcourses'
import PageHeader from '@/components/common/PageHeader'

interface PageProps {
  params: {
    courseId: string
  }
}

const EditCoursePage = ({ params }: PageProps) => {
  return (
    <div>
      <PageHeader
        title="Edit Course"
        breadcrumbs={["Courses", "Edit Courses"]}
      />
      <EditCourse />
    </div>
  )
}

export default EditCoursePage