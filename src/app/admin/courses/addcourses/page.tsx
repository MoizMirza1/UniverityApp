import React from 'react'
import Addcourses from '@/components/courses/Addcourses'
import { HomeIcon } from '@/components/Icons'

const page = () => {
  return (
    <div>
        {/* Header */}
        <div className="max-w-full mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Add Course</h1>
          <nav className="flex items-center text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1 gap-1 select-none">
            <span className="flex items-center gap-1 cursor-pointer hover:text-[#0aa6ff]"><HomeIcon className="w-3 h-3 text-gray-700" />Home</span>
            <span className="text-gray-400">&gt;</span>
            <span className="hover:text-[#0aa6ff] cursor-pointer">Courses</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-800">All Courses List</span>
          </nav>
        </div>
      <Addcourses />
    </div>
  )
}

export default page
