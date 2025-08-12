
import { apiClient } from "@/lib/apiClient";

export const getCourses = async () => {
  const data = await apiClient("/courses");
  console.log(data , "Api data")
  return data.data.courses;
};

export const createCourse = async (courseData: FormData) => {
  const data = await apiClient("/courses", {
    method: "POST",
    body: courseData,
  });
  return data.data.course;
};

export const getCourse = async (id: string) => {
  const data = await apiClient(`/courses/${id}`);
  return data.data.course;
};
