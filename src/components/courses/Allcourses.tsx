import React from "react";
import { Heart, GraduationCap } from "lucide-react";
import Image from "next/image";


interface CourseCardProps {
  id: number;
  title: string;
  image: string;
  date: string;
  duration: string;
  professor: string;
  students: string;
  likes: string;
}

const COURSES_DATA: CourseCardProps[] = [
  {
    id: 1,
    title: "PHP Development Course",
    image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "April 23",
    duration: "6 Months",
    professor: "Jane Doe",
    students: "200+",
    likes: "654",
  },
  {
    id: 2,
    title: "PHP Development Course",
    image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "April 23",
    duration: "6 Months",
    professor: "Jane Doe",
    students: "200+",
    likes: "654",
  },

  {
      id: 3,
      title: "PHP Development Course",
      image:
        "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "654",
    },
    {
      id: 4,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "854"
    },
    {
      id: 5,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "854"
    },
    {
      id: 6,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "854"
    },
    {
      id: 7,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "854"
    },
    {
      id: 8,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "854"
    },
    {
      id: 9,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "654"
    },
    {
      id: 10,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "654"
    },
    {
      id: 11,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "654"
    },
    {
      id: 12,
      title: "PHP Development Course",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "April 23",
      duration: "6 Months",
      professor: "Jane Doe",
      students: "200+",
      likes: "654"
    }
];

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  image,
  date,
  duration,
  professor,
  students,
  likes,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-60">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-sm font-normal text-gray-900 mb-3">{title}</h3>
        <p className="text-xs text-gray-500 mb-1">{date}</p>
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
          <button className="bg-[#0aa6ff] cursor-pointer text-white text-xs font-semibold px-3 py-1 rounded-sm hover:bg-[#008ddd] transition-colors duration-200">
            READ MORE
          </button>
          <div className="flex items-center text-[#0aa6ff] text-xs font-medium select-none">
            <Heart className="w-4 h-4 mr-1" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
};

const AllCourses: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-8 py-8">
        <div className="mb-3 text-sm font-semibold text-gray-700 border-b border-gray-300 pb-1">
          All Courses
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {COURSES_DATA.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;