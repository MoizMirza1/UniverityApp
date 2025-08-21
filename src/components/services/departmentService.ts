import { apiClient } from "@/lib/apiClient";


export const getDepartments = async () => {
  const data = await apiClient("/departments");
  return data.data.departments;
};

export const createDepartment = async (departmentData: { name: string; code: string }) => {
  const data = await apiClient("/departments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentData),
  });
  return data.data.department;
};


export const getDepartment = async (id: string) => {
  const data = await apiClient(`/departments/${id}`);
  return data.data.department;
};


export const updateDepartment = async (id: string, updatedData: { name?: string; code?: string }) => {
  const data = await apiClient(`/departments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return data.data.department;
};

export const deleteDepartment = async (id: string) => {
  const data = await apiClient(`/departments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
};
