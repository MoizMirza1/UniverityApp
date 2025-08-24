import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AllDepartments from '@/components/departments/AllDepartments'

const AboutDepartmentPage = () => {
  return (
    <div>
      <PageHeader 
        title="All Departments List" 
        breadcrumbs={["Departments", "All Departments List"]} 
      />
      <AllDepartments/>
    </div>
  )
}

export default AboutDepartmentPage