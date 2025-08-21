"use client";
import React from "react";

const AddDepartment = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Department</h1>

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
              <input
                type="text"
                placeholder="Department Name"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Department Code"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Head of Department */}
            <div>
              <input
                type="text"
                placeholder="Head of Department"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Student Capacity */}
            <div>
              <input
                type="number"
                placeholder="Student Capacity"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>
          </div>

          {/* Department Details */}
          <div>
            <textarea
              rows={4}
              placeholder="Department Details"
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
