"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getCourse,getCourseStudents} from "../services";
import Link from 'next/link';

interface CourseDetails {
  _id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  price: number;
  professor: string;
  startDate: string;
  students: string[] | number;
  syllabus: string[];
  outcomes: string[];
}

const AboutCourse = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCourse(courseId);
        setCourse(courseData);
       const studentsCount = await getCourseStudents(courseId);
        setTotalStudents(studentsCount);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-80 flex-shrink-0 p-4 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-t-4 border-[#72bcd4]">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Course not found</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-80 flex-shrink-0 p-4 space-y-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="aspect-video bg-gray-100">
            <Image
              src={"https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"}
              alt={course.title}
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
          </div>
        </div>
        

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-gray-200 md:p-2 border-b-[1px]">About Course</h3>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {course.description || "Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without."}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center border-gray-200 border-b border-t md:p-2">
              <span className="text-gray-700 text-sm font-bold">Duration</span>
              <span className="text-gray-600 text-sm">{course.duration || "1 Year"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 md:p-2">
              <span className="text-gray-700 text-sm font-bold">Price</span>
              <span className="text-gray-600 text-sm">${course.price?.toFixed(2) || '230.00'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 md:p-2">
              <span className="text-gray-700 text-sm font-bold">Professor Name</span>
              <span className="text-gray-600 text-sm">{course.professor || "Abdul Saleh"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 md:p-2">
              <span className="text-gray-700 text-sm font-bold">Date</span>
              <span className="text-gray-600 text-sm">
                {course.startDate ? new Date(course.startDate).toLocaleDateString() : "21st Jan 2017"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Years</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">{totalStudents}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">61</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Batches</div>
            </div>
            
          </div>
        </div>
        <div className='text-center pt-5 rounded-lg'>
  <Link 
    href={`/admin/courses/editcourses/${course._id}`}
    className="bg-green-600 cursor-pointer text-white text-1xl font-semibold px-20 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200"
  >
    EDIT COURSE
  </Link>
</div>
      </div>
      
        
      
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-t-4 border-[#72bcd4]">
          
          <div className="mb-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {course.description || "Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              Years living creepeth. Form them yielding behold greater divided void was fowl earth in. Spirit Bring grass they're ye have shall years so morning. Grass gathering won't heaven set greater darkness forth abundantly he.
            </p>
            <p className="text-gray-700 leading-relaxed">
              isn't hath, forth. Brought sea subdue, from divided replenish creature after creeping abundantly fly is cattle fill were years years may darkness blessed which land creepeth good moving good. Life living you're.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Years living creepeth. Form them yielding behold greater divided void was fowl earth in. Spirit Bring grass they're ye have shall years so morning. Grass gathering won't heaven set greater darkness forth abundantly he.
            </p>
            <p className="text-gray-700 leading-relaxed mb-15">
              isn't hath, forth. Brought sea subdue, from divided replenish creature after creeping abundantly fly is cattle fill were years years may darkness blessed which land creepeth good moving good. Life living you're.
            </p>
          </div>

      
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-10">Course Syllabus</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {course.syllabus && course.syllabus.length > 0 ? (
                course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <>
                  <li>Introduction to Computer and Internet.</li>
                  <li>Microsoft Application Tools such MS Word, MS Excel, MS PowerPoint.</li>
                  <li>Computer Organizations and Operating Systems.</li>
                  <li>Programming in C.</li>
                  <li>Object Oriented Programming Languages such as C++/Java.</li>
                  <li>RDBMS and Data Management</li>
                  <li className="mb-15">Web Technologies such as creation of dynamic website.</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-10">
              After the completion of course the students will be able to:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              {course.outcomes && course.outcomes.length > 0 ? (
                course.outcomes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <>
                  <li>Understand computers, its basic components and applications.</li>
                  <li>Understand and identify the Concepts of Computer Hardware and software.</li>
                  <li>Implement Word Processing Basics.</li>
                  <li>Create Spread sheets and use of formulas and functions.</li>
                  <li>Create and develop a presentation.</li>
                  <li>Understand basic concepts in Networking and Troubleshooting.</li>
                  <li>Develop the skills for effective compose of E-mails and its features.</li>
                  <li>Create and develop forms, queries and reports.</li>
                  <li>Understand the concepts of multimedia and its applications.</li>
                  <li>Develop the understanding of HTML.</li>
                  <li>Understand the concepts of Tally and its applications.</li>
                  <li>Maintenance of PC.</li>
                </>
              )}
            </ul>
          </div>
         
        </div>
      </div>
    </div>
    
  );
}

export default AboutCourse;