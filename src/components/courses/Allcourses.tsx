"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Heart, GraduationCap, Filter, X } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { getCourses, deleteCourse, getDepartments, getCoursesByDepartment } from "../services";
import { Course } from "../lib/types/course";
import Link from "next/link";
import { MoreVertical, DeleteIcon } from "../Icons";
import Loader from "../common/Loader";

// Department type (from backend)
type Department = {
  _id: string;
  name: string;
};

interface CourseCardProps {
  _id: string;
  title: string;
  image: string;
  date: string;
  duration: string;
  professor: string;
  students: string;
  likes: string;
  onDelete: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  _id,
  title,
  image,
  date,
  duration,
  professor,
  students,
  likes,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!cardRef.current) return;
      if (!cardRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener("mousedown", onDocClick);
    }
    
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [menuOpen]);

  return (
    <div
      ref={cardRef}
      className="relative bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-60">
        <Image
          src={"/images/CourseImg.webp"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false} 
        />
        <button
          aria-label="More actions"
          className="absolute top-2 right-2 z-30 p-1 rounded-full bg-white/90 border border-gray-200 shadow transition-colors transition-shadow duration-150 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md hover:text-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <MoreVertical className="w-5 h-5 text-gray-600 transition-colors duration-150 hover:text-gray-800" />
        </button>
        {menuOpen && (
          <div className="absolute top-10 right-2 z-30 bg-white border border-gray-200 rounded-sm shadow-md">
            <button
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(_id);
              }}
            >
              <DeleteIcon className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-sm font-normal text-gray-900 mb-3">{title}</h3>
        <p className="text-xs text-gray-500 mb-1">
          {format(new Date(date), "MMMM d, yyyy")}
        </p>
        <p className="text-xs text-gray-600 mb-3">
          <span className="font-normal">Duration: </span>
          {duration}
        </p>
        <p className="text-xs font-semibold text-gray-900 mb-3">
          Professor: {professor}
        </p>
        <p className="flex items-center text-xs text-gray-900 mb-4">
          <GraduationCap className="w-4 h-4 mr-1" />
          Students: {students}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <Link
            href={`/admin/courses/about/${_id}`}
            className="bg-[#0aa6ff] cursor-pointer text-white text-xs font-semibold px-3 py-1 rounded-sm hover:bg-[#008ddd] transition-colors duration-200"
          >
            READ MORE
          </Link>
          <div className="flex items-center text-[#0aa6ff] text-xs font-medium select-none">
            <Heart className="w-4 h-4 mr-1" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
};

const DepartmentFilter: React.FC<{
  departments: Department[];
  selectedDepartment: string | null;
  onDepartmentChange: (departmentId: string | null) => void;
}> = ({ departments, selectedDepartment, onDepartmentChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={filterRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0aa6ff] focus:ring-offset-2"
      >
        <Filter className="w-4 h-4" />
        {selectedDepartment
          ? `Department: ${departments.find((d) => d._id === selectedDepartment)?.name}`
          : "Filter by Department"}
        {selectedDepartment && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDepartmentChange(null);
            }}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-sm shadow-lg">
          <div className="py-1">
            {departments.map((department) => (
              <button
                key={department._id}
                onClick={() => {
                  onDepartmentChange(department._id);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  selectedDepartment === department._id
                    ? "bg-[#0aa6ff] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {department.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [coursesRes, deptRes] = await Promise.all([getCourses(), getDepartments()]);
      setCourses(coursesRes);
      setDepartments(deptRes);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // 🔹 Fetch courses by department when filter changes
  useEffect(() => {
    const fetchFiltered = async () => {
      if (!selectedDepartment) {
        setIsFilterLoading(true);
        try {
          const allCourses = await getCourses();
          setCourses(allCourses);
        } catch (err) {
          console.error("Failed to fetch courses", err);
        } finally {
          setIsFilterLoading(false);
        }
        return;
      }
      
      try {
        setIsFilterLoading(true);
        const filtered = await getCoursesByDepartment(selectedDepartment);
        setCourses(filtered);
      } catch (err) {
        console.error("Failed to fetch filtered courses", err);
      } finally {
        setIsFilterLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchFiltered();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedDepartment]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c._id !== id));
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Failed to delete course", err);
      alert("Failed to delete course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader size="large" text="Loading courses..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="text-sm font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-4 sm:mb-0">
            All Courses
          </div>

          <DepartmentFilter
            departments={departments}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
          />
        </div>

        {isFilterLoading ? (
          <div className="flex justify-center py-10">
            <Loader size="small" text="Loading courses..." /> 
          </div>
        ) : courses.length === 0 ? (
          <div className="text-gray-500 text-center py-10">
            {selectedDepartment
              ? `No courses available for ${departments.find((d) => d._id === selectedDepartment)?.name} department`
              : "No courses available"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                _id={course._id}
                title={course.title}
                image={course.image}
                date={course.startDate}
                duration={course.duration}
                professor={course.professor}
                students={course.students.length}
                likes={course.likes}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};