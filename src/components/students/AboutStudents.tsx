"use client"; // React hooks use karne ke liye Next.js directive

import React, { useState } from "react";
import Image from "next/image";

const AboutStudents = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="md:col-span-1 space-y-6">
          {/* Student Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden p-5 text-center">
            <div className="flex justify-center">
              <Image
                src="/images/Student3.png"
                alt="Student Profile"
                className="rounded-full border-4 border-white shadow-md"
                width={100}
                height={150}
              />
            </div>

            <p className="text-lg font-semibold mt-4">Sarah Smith</p>

            <div className="flex justify-center space-x-6 mt-3 text-sm">
              <div>
                <span className="font-bold text-blue-500 block">1,200</span>
                <span className="text-gray-500">Followers</span>
              </div>
              <div>
                <span className="font-bold text-blue-500 block">750</span>
                <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-bold text-blue-500 block">11,122</span>
                <span className="text-gray-500">Friends</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-5">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-600 transition">
                FOLLOW
              </button>
              <button className="bg-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-pink-600 transition">
                MESSAGE
              </button>
            </div>
          </div>

          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">About Me</h3>
            <p className="text-sm text-gray-600 mb-3">
              Hello I am Sarah Smith a student in Sanyavil College Surat. 
              I love to study with all my class friends and professors.
            </p>
            <div className="text-xs text-gray-700 space-y-1">
              <p><strong>Gender:</strong> Female</p>
              <br />
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Department:</strong> Mechanical</p>
              <br />
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Email:</strong> test@exmaple.com</p>
              <br />
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Phone:</strong> 1234567890</p>
            </div>
            <div className="flex justify-between text-center mt-3">
              <div>
                <p className="font-bold text-blue-500">37</p>
                <span className="text-xs">PROJECTS</span>
              </div>
              <div>
                <p className="font-bold text-blue-500">51</p>
                <span className="text-xs">TASKS</span>
              </div>
              <div>
                <p className="font-bold text-blue-500">61</p>
                <span className="text-xs">UPLOADS</span>
              </div>
            </div>
          </div>

          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Address</h3>
            <p className="text-sm text-gray-600">
              455, Hagi Flat, Vachcha Road, Surat, Gujarat, India.
            </p>
          </div>

         
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-3">Interest In</h3>
            <div className="mb-2">
              <p className="text-sm">Study</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-sm">Cricket</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Music</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT COLUMN (Tabs + Activity UI) ---------- */}
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeTab === "about"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              About Me
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeTab === "activity"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "about" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Student Details</h2>
              <h3 className="text-xl font-semibold mb-2">Academic Information</h3>
              <p className="text-gray-700 mb-4">
                Currently enrolled in the Bachelor of Computer Science program. 
                Sarah has completed coursework in Data Structures, Algorithms, 
                Web Development, and Database Management Systems.
              </p>
              <p className="text-gray-700">
                GPA: 3.85 / 4.0 — consistently ranking among the top 10% of the batch.
              </p>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              {/* Post box */}
              <textarea
                className="w-full border rounded p-2 mb-4"
                placeholder="What's in your mind today?"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                Post
              </button>

              {/* Activity feed */}
              <div className="mt-6 space-y-8">
                {/* First Activity */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/images/Student2.jpg" alt="Rajesh" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Rajesh</span> uploaded 3 new photos
                      </p>
                      <span className="text-xs text-gray-500">7 minutes ago near Alaska, USA</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <img src="/images/Student4.jpg" alt="activity" className="w-24 h-24 rounded object-cover" />
                    <img src="/images/Student4.jpg" alt="activity" className="w-24 h-24 rounded object-cover" />
                    <img src="/images/Student4.jpg" alt="activity" className="w-24 h-24 rounded object-cover" />
                  </div>
                   <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                </div>
                  <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
                {/* Second Activity */}
                <div>
                  <div className="flex items-center gap-3">
                    <img src="/images/Student4.jpg" alt="John Doe" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">John Doe</span> attended a meeting with{" "}
                        <span className="font-bold text-pink-500">Lina Smith</span>.
                      </p>
                      <span className="text-xs text-gray-500">2 days ago near Alaska, USA</span>
                    </div>
                  </div>
                   <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                </div>
                 <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
                 {/* <hr className="my-4 border-t-4 border-gray-400 opacity-50" /> */}
                {/* Third Activity */}
                <div>
                  <div className="flex items-center gap-3">
                    <img src="/images/Student4.jpg" alt="Kehn Anderson" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Kehn Anderson</span> completed the task{" "}
                        <b>Wireframe design</b> within the deadline.
                      </p>
                      <span className="text-xs text-gray-500">4 days ago near Alaska, USA</span>
                    </div>
                      </div>
                    <div className="flex flex-col items-start mt-2">
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                      
                    </div>
                  <div>
                  </div>
                </div>
                <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
                 {/* Fourth Activity */}
                <div>
                  <div className="flex items-center gap-3">
                    <img src="/images/Student4.jpg" alt="Kehn Anderson" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Kehn Anderson</span> completed the task{" "}
                        <b>Wireframe design</b> within the deadline.
                      </p>
                      <span className="text-xs text-gray-500">4 days ago near Alaska, USA</span>
                    </div>
                      </div>
                    <div className="flex flex-col items-start mt-2">     
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                    </div>
                  <div>
                  </div>
                </div>

                <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>

                {/* Fifth Activity */}
                <div>
                  <div className="flex items-center gap-3">
                    <img src="/images/Student4.jpg" alt="Jacob Ryan" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-purple-600">Jacob Ryan</span> was absent from office due to sickness.
                      </p>
                      <span className="text-xs text-gray-500">4 days ago near Alaska, USA</span>
                    </div>
                  </div>
                    <div className="flex flex-col items-start mt-2">
                      <img src="/images/Student4.jpg" alt="activity" className="w-250 h-100 rounded object-cover" />
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                    </div>
                  <div>  
                  </div>
                </div>
                
                 <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
                <div>
                  <div className="flex items-center gap-3">
                    <img src="/images/Student4.jpg" alt="Jacob Ryan" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-purple-600">Jacob Ryan</span> was absent from office due to sickness.
                      </p>
                      <span className="text-xs text-gray-500">4 days ago near Alaska, USA</span>
                    </div>
                  </div>
                    <div className="flex flex-col items-start mt-2">
                      <img src="/images/fullimage3.jpg" alt="activity" className="w-250 h-100 rounded object-cover" />
                      <button
                        className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                        title="Like"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                        <span className="text-sm">Like</span>
                      </button>
                    </div>
                  <div> 

                  </div>
                </div>
                <div>
                  <h1>Lorem Ipsum is simply dummy text of the printing</h1>
                  <p className="text-xs text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div className="flex justify-center mb-6">
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-300">
                Load More
                </button>
                </div>

              </div>
            </div>

            
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutStudents;