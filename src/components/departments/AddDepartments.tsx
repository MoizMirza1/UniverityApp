"use client";
import React from "react";

const AddDepartment = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Department</h1>

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <span className="flex items-center">
          <span className="mr-2">🏠</span> Home
        </span>
        <span className="mx-2">{">"}</span>
        <span>Department</span>
        <span className="mx-2">{">"}</span>
        <span className="text-gray-800 font-medium">Add Department</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold border-b border-dashed pb-3 mb-6">
          Add Department
        </h2>

        {/* Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department Name */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Department Name
              </label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Head of Department */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Head Of Department
              </label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Department Start Date */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Department Start Date
              </label>
              <input
                type="date"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Student Capacity */}
            <div>
              <label className="block text-gray-600 text-sm mb-2">
                Student Capacity
              </label>
              <input
                type="number"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>
          </div>

          {/* Department Details */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              Department Details
            </label>
            <textarea
              rows={4}
              className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600 transition"
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
