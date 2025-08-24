import { apiClient } from "@/lib/apiClient";

export const getStudents = async () => {
  const data = await apiClient("/students");
  return data.data.students;
};


export const createStudent = async (studentData: Record<string, unknown>) => {
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


export const updateStudent = async (id: string, updatedData: Record<string, unknown>) => {
  const data = await apiClient(`/students/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  
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


export const previewRollNumber = async (departmentId: string) => {
  try {
    const data = await apiClient(`/preview-roll?departmentId=${departmentId}`);;     
    const rollNumber = data.data.rollNumber;
    return rollNumber;
  } catch (error) {
    console.error('Error in previewRollNumber:', error);
    throw error;
  }
};