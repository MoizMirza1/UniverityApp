"use client";
import React, { useState } from "react";
import { createDepartment, type CreateDepartmentPayload } from "../services";

const AddDepartment = () => {
  const [formValues, setFormValues] = useState<{
    name: string;
    code: string;
    headOfDepartment: string;
    maxStudents: string;
    departmentDetails: string;
  }>({
    name: "",
    code: "",
    headOfDepartment: "",
    maxStudents: "",
    departmentDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const payload: CreateDepartmentPayload = {
      name: formValues.name.trim(),
      code: formValues.code.trim(),
      headOfDepartment: formValues.headOfDepartment.trim(),
      maxStudents: Number(formValues.maxStudents) || 0,
      departmentDetails: formValues.departmentDetails.trim(),
    };
    try {
      await createDepartment(payload);
      setSuccessMessage("Department created successfully.");
      setFormValues({ name: "", code: "", headOfDepartment: "", maxStudents: "", departmentDetails: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create department";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Department Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Department Name"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="code"
                value={formValues.code}
                onChange={handleChange}
                placeholder="Department Code"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
                required
              />
            </div>

            {/* Head of Department */}
            <div>
              <input
                type="text"
                name="headOfDepartment"
                value={formValues.headOfDepartment}
                onChange={handleChange}
                placeholder="Head of Department"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
              />
            </div>

            {/* Student Capacity */}
            <div>
              <input
                type="number"
                name="maxStudents"
                value={formValues.maxStudents}
                onChange={handleChange}
                placeholder="Student Capacity"
                className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
                min={0}
              />
            </div>
          </div>

          {/* Department Details */}
          <div>
            <textarea
              rows={4}
              name="departmentDetails"
              value={formValues.departmentDetails}
              onChange={handleChange}
              placeholder="Department Details"
              className="w-full border-b border-gray-300 focus:border-blue-500 outline-none p-2"
            ></textarea>
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm">{successMessage}</div>
          )}

          {/* Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "SUBMIT"}
            </button>
            <button
              type="button"
              onClick={() => setFormValues({ name: "", code: "", headOfDepartment: "", maxStudents: "", departmentDetails: "" })}
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
  );
};

export default AddDepartment;
