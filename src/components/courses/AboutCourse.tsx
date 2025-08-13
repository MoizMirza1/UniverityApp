"use client";
import React, { useEffect, useState } from 'react';
import { getTotalStudents } from "../services/courseService";

// Service functions
const AboutCourse = () => {
  const [totalStudents, setTotalStudents] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getTotalStudents();
      setTotalStudents(total);
    };
    fetchTotal();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0 p-4">
          <div className="space-y-0">
            {/* Course Image Card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-video bg-gray-100">
                <img
                  src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                  alt="Web Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">Web Development</h2>
              </div>
            </div>

            {/* About Course Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 -mt-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About Course</h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without.
              </p>

              {/* Course Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Duration</span>
                  <span className="text-gray-900 text-sm font-medium">1 Year</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Price</span>
                  <span className="text-gray-900 text-sm font-medium">$230.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Professor Name</span>
                  <span className="text-gray-900 text-sm font-medium">Abdul Saleh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Date</span>
                  <span className="text-gray-900 text-sm font-medium">21st Jan 2017</span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 pt-6">
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
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {/* Top Paragraphs */}
            <div className="mb-8 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Open after rule place He earth earth good called days unto which wherein day doesn't said day image signs fish days forth for evening whose his make his bearing years gathering good brought without.
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

              <p className="text-gray-700 leading-relaxed">
                isn't hath, forth. Brought sea subdue, from divided replenish creature after creeping abundantly fly is cattle fill were years years may darkness blessed which land creepeth good moving good. Life living you're.
              </p>
            </div>

            {/* Course Syllabus Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Syllabus</h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Introduction to Computer and Internet.</li>
                <li>Microsoft Application Tools such MS Word, MS Excel, MS PowerPoint.</li>
                <li>Computer Organizations and Operating Systems.</li>
                <li>Programming in C.</li>
                <li>Object Oriented Programming Languages such as C++/Java.</li>
                <li>RDBMS and Data Management</li>
                <li>Web Technologies such as creation of dynamic website.</li>
              </ul>
            </div>

            {/* Learning Outcomes Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">After the completion of course the students will be able to:</h3>

              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCourse;
