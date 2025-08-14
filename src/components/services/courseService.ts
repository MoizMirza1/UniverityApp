import { apiClient } from "@/lib/apiClient";

export const getCourses = async () => {
  const data = await apiClient("/courses");
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

// ✅ New function for total students
export const getTotalStudents = async () => {
  const courses = await getCourses();
  let total = 0;

  courses.forEach(course => {
    if (Array.isArray(course.students)) {
      total += course.students.length;
    } else if (typeof course.students === "number") {
      total += course.students;
    }
  });

  return total;
};
