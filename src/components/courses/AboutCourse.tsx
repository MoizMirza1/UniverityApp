import React from 'react';
import Image from 'next/image';

const AboutCourse = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* First column - narrower (1 fraction) */}
        <div className="md:col-span-1 space-y-6">
          {/* Course image section */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={"/images/CourseImg.webp"}
              alt="Course Image" 
              className="w-full h-auto object-cover"
              width={120}
              height={120}
            />
            <div className="p-3 text-center">
              <p className="text-sm text-gray-600">Introduction to React</p>
            </div>
          </div>

          {/* About course details section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">About This Course</h2>
            <p className="text-gray-700 text-sm">
              This comprehensive course covers fundamental React concepts including components, 
              state management, hooks, and routing. Perfect for beginners looking to start with React.
            </p>
            <div className="mt-4">
              <p className="font-semibold text-sm">Duration: 8 weeks</p>
              <p className="font-semibold text-sm">Level: Beginner</p>
              <p className="font-semibold text-sm">Instructor: John Doe</p>
            </div>
          </div>
        </div>

        {/* Second column - wider (3 fractions) */}
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Course Details</h2>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Instructions</h3>
            <p className="text-gray-700 mb-4">
              This course is designed to be hands-on. Each module includes video lectures, 
              reading materials, and practical exercises. You'll need to have Node.js installed 
              on your computer and a basic understanding of JavaScript. We recommend dedicating 
              at least 5 hours per week to complete the coursework.
            </p>
            <p className="text-gray-700">
              All assignments must be submitted through our learning platform by their respective 
              due dates. Late submissions will be penalized. The final project will be peer-reviewed.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Syllabus</h3>
            <p className="text-gray-700 mb-4">
              <strong>Week 1:</strong> Introduction to React, JSX, and creating your first components. 
              Setting up the development environment with Create React App.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Week 2-3:</strong> State and props, handling events, conditional rendering, 
              and lists/keys. Introduction to React Hooks (useState, useEffect).
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Week 4-5:</strong> Advanced hooks (useReducer, useContext), React Router for 
              navigation, and API integration with useEffect.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Week 6-7:</strong> State management with Context API, introduction to Redux, 
              performance optimization techniques.
            </p>
            <p className="text-gray-700">
              <strong>Week 8:</strong> Final project implementation and deployment of React applications.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;