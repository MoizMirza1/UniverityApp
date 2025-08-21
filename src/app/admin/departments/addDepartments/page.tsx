import React from 'react'
import AddDepartment from '@/components/departments/AddDepartments'
import PageHeader from '@/components/common/PageHeader'

const page = () => {
  return (
    <div>
         <PageHeader  title="All Course"  breadcrumbs={["Courses", "Add Course"]}/>
          <AddDepartment />
    </div>
  )
}

export default page
