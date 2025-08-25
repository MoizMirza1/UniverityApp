import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import {EditDepartment} from '@/components/departments/EditDepartment'

const EditDepartmentPage = () => {
  return (
    <div>
      <PageHeader 
        title="Edit Departments" 
        breadcrumbs={["Departments", "Edit Departments"]} 
      />
      <EditDepartment/>
    </div>
  )
}

export default EditDepartmentPage