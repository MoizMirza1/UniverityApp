import { apiClient } from "@/lib/apiClient";

export const getStudents = async () => {
  const data = await apiClient("/students");
  return data.data.students;
};


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


export const getStudent = async (id: string) => {
  const data = await apiClient(`/students/${id}`);
  return data.data.student;
};


export const deleteStudent = async (id: string) => {
  const data = await apiClient(`/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data.message; 
};


export const updateStudent = async (id: string, updatedData: any) => {
  const data = await apiClient(`/students/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return data.data.student;
};
