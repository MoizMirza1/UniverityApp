'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Department {
  id: string;
  name: string;
  image: string;
  description: string;
  establishedYear: string;
  hod: string;
  facultyCount: number;
  studentCount: number;
  researchAreas: string[];
  programs: string[];
}

// Multiple departments
const departments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    image:
      'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'The Computer Science department focuses on programming, algorithms, AI, and software engineering research.',
    establishedYear: '1985',
    hod: 'Dr. John Doe',
    facultyCount: 20,
    studentCount: 250,
    researchAreas: ['AI & Machine Learning', 'Cybersecurity', 'Software Engineering', 'Data Science'],
    programs: ['BSc Computer Science', 'MSc Computer Science', 'PhD Computer Science'],
  },
  {
    id: '2',
    name: 'Mechanical Engineering',
    image:
      'https://images.pexels.com/photos/373947/pexels-photo-373947.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'Mechanical Engineering department focuses on design, manufacturing, and thermodynamics.',
    establishedYear: '1975',
    hod: 'Dr. Jane Smith',
    facultyCount: 15,
    studentCount: 180,
    researchAreas: ['Robotics', 'Automobile Engineering', 'Thermal Systems'],
    programs: ['BSc Mechanical Engineering', 'MSc Mechanical Engineering'],
  },
  {
    id: '3',
    name: 'Electrical Engineering',
    image:
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'The Electrical Engineering department covers power systems, electronics, and communications.',
    establishedYear: '1980',
    hod: 'Dr. Mark Wilson',
    facultyCount: 18,
    studentCount: 200,
    researchAreas: ['Power Systems', 'Microelectronics', 'Telecommunications'],
    programs: ['BSc Electrical Engineering', 'MSc Electrical Engineering', 'PhD Electrical Engineering'],
  },
  {
    id: '4',
    name: 'Civil Engineering',
    image:
      'https://images.pexels.com/photos/256245/pexels-photo-256245.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'Civil Engineering department is dedicated to structural design, construction, and urban planning.',
    establishedYear: '1970',
    hod: 'Dr. Emily Davis',
    facultyCount: 12,
    studentCount: 150,
    researchAreas: ['Structural Engineering', 'Environmental Engineering', 'Urban Development'],
    programs: ['BSc Civil Engineering', 'MSc Civil Engineering'],
  },
  {
    id: '5',
    name: 'Business Administration',
    image:
      'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'The Business Administration department focuses on management, finance, marketing, and entrepreneurship.',
    establishedYear: '1990',
    hod: 'Dr. Sarah Lee',
    facultyCount: 10,
    studentCount: 300,
    researchAreas: ['Finance', 'Marketing Strategies', 'Business Analytics'],
    programs: ['BBA', 'MBA', 'Executive MBA'],
  },
 
];

const AboutDepartments: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(departments[0]);

  return (
    <div className="flex flex-col lg:flex-row w-full p-6 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Left Column - List of departments */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Departments</h2>
          <ul className="space-y-2">
            {departments.map((dept) => (
              <li
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                className={`cursor-pointer p-2 rounded-lg transition ${selectedDept?.id === dept.id ? 'bg-green-100 text-green-800 font-semibold' : 'hover:bg-green-50 text-gray-700'}`}
              >
                {dept.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="flex-1">
        {selectedDept ? (
          <div className="space-y-8">
            {/* Image & Basic Info */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <Image
                src={selectedDept.image}
                alt={selectedDept.name}
                width={600}
                height={350}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedDept.name}</h2>
                <p className="text-gray-600 mt-2">{selectedDept.description}</p>
              </div>
            </div>

            {/* Department Details */}
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Details</h3>
              <p><strong>Established:</strong> {selectedDept.establishedYear}</p>
              <p><strong>HOD:</strong> {selectedDept.hod}</p>
              <p><strong>Faculty Members:</strong> {selectedDept.facultyCount}</p>
              <p><strong>Students:</strong> {selectedDept.studentCount}</p>
            </div>

            {/* Programs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Programs</h3>
              <ul className="list-disc list-inside">
                {selectedDept.programs.map((prog, idx) => (
                  <li key={idx}>{prog}</li>
                ))}
              </ul>
            </div>

            {/* Research Areas */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Research Areas</h3>
              <ul className="list-disc list-inside">
                {selectedDept.researchAreas.map((area, idx) => (
                  <li key={idx}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Click on a department to view details</div>
        )}
      </div>
    </div>
  );
};

export default AboutDepartments;
