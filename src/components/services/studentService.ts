import { apiClient } from "@/lib/apiClient";

// ✅ Get all students
export const getStudents = async () => {
  const data = await apiClient("/students");
  return data.data.students;
};

// ✅ Create student (only admin can do this)
export const createStudent = async (studentData: any) => {
  const data = await apiClient("/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return data.data.student;
};

// ✅ Get single student by ID
export const getStudent = async (id: string) => {
  const data = await apiClient(`/students/${id}`);
  return data.data.student;
};

// ✅ Delete student
export const deleteStudent = async (id: string) => {
  const data = await apiClient(`/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data.message; // e.g. "Student deleted successfully"
};

// ✅ Update student
export const updateStudent = async (id: string, updatedData: any) => {
  const data = await apiClient(`/students/${id}`, {
    method: "PUT", // or PATCH if backend supports partial update
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return data.data.student;
};
