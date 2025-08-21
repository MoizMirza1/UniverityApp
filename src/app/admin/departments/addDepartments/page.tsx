import React from 'react'
import AddDepartment from '@/components/departments/AddDepartments'
import PageHeader from '@/components/common/PageHeader'

const page = () => {
  return (
    <div>
         <PageHeader  title="Add Department"  breadcrumbs={["Departments", "Add Department"]}/>
          <AddDepartment />
    </div>
  )
}

export default page
