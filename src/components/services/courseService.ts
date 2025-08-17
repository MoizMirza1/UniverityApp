import { apiClient } from "@/lib/apiClient";

export const getCourses = async () => {
  const data = await apiClient("/courses");
  return data.data.courses;
};
export const createCourse = async (courseData: FormData) => {

const data = await apiClient("/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",       
  },
  body: JSON.stringify(courseData),                 
});

return data.data.course;
};


export const getCourse = async (id: string) => {
  const data = await apiClient(`/courses/${id}`);
  return data.data.course;
};

export const deleteCourse = async (id: string) => {
  const data = await apiClient(`/courses/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data; 
};

export const updateCourse = async (id: string, updatedData: any) => {
  const data = await apiClient(`/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return data.data.course;
};




export const getCourseStudents = async (courseId: string) => {
  const course = await getCourse(courseId);
  if (Array.isArray(course.students)) {
    return course.students.length;
  } else if (typeof course.students === "number") {
    return course.students;
  }
  return 0;
};