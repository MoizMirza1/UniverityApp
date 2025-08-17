"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { EmojiIcon, ImageIcon, FileIcon, HeartIcon } from "@/components/Icons";

type Attachment = {
  type: 'file' | 'image';
  file: File;
  name: string;
  preview: string | null;
};

const AboutProfessor = () => {
  const [activeTab, setActiveTab] = useState("about");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [postContent, setPostContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const emojis = ["😊", "👍", "❤️", "🎉", "👏", "🙌", "🤔", "😍"];

  const handleFileUpload = (type: 'file' | 'image') => {
    if (type === 'file') {
      if (fileInputRef.current) {
        (fileInputRef.current as HTMLInputElement).click();
      }
    } else {
      if (imageInputRef.current) {
        (imageInputRef.current as HTMLInputElement).click();
      }
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'file' | 'image'
  ) => {
    const files = Array.from(e.target.files ?? []);
    const newAttachments: Attachment[] = files.map((file) => ({
      type,
      file,
      name: file.name,
      preview: type === 'image' ? URL.createObjectURL(file) : null
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const addEmoji = (emoji: string) => {
    setPostContent(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    if (newAttachments[index].preview) {
      URL.revokeObjectURL(newAttachments[index].preview);
    }
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="md:col-span-1 space-y-6">
          {/* Professor Profile Card */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden p-5 text-center">           
            <div className="flex justify-center">
              <Image
                src="/images/dp.jpg"
                alt="Professor Profile"
                className="rounded-full border-4 border-white shadow-md"
                width={100}
                height={150}
              />
            </div>

            <p className="text-lg font-semibold mt-4">Dr. Ayesha Khan</p>

            <div className="flex justify-center space-x-6 mt-3 text-sm">
              <div>
                <span className="font-bold text-blue-500 block">2,100</span>
                <span className="text-gray-500">Followers</span>
              </div>
              <div>
                <span className="font-bold text-blue-500 block">1,000</span>
                <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-bold text-blue-500 block">500+</span>
                <span className="text-gray-500">Students</span>
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

          {/* About Me Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">About Me</h3>
            <p className="text-sm text-gray-600 mb-3">
              I am Dr. Ayesha Khan, a Computer Science professor at Sanyavil College Surat. 
              My passion is teaching, research, and guiding students in software development and AI.
            </p>
            <div className="text-xs text-gray-700 space-y-1">
              <p><strong>Gender:</strong> Female</p>
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Department:</strong> Computer Science</p>
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Email:</strong> ayesha.khan@college.edu</p>
              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>
              <p><strong>Phone:</strong> 9876543210</p>
            </div>
            <div className="flex justify-between text-center mt-3">
              <div>
                <p className="font-bold text-blue-500">50</p>
                <span className="text-xs">PROJECTS</span>
              </div>
              <div>
                <p className="font-bold text-blue-500">35</p>
                <span className="text-xs">COURSES</span>
              </div>
              <div>
                <p className="font-bold text-blue-500">40</p>
                <span className="text-xs">PUBLICATIONS</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Address</h3>
            <p className="text-sm text-gray-600">
              123 Academic Block F13, karachi, Pakistan.
            </p>
          </div>

          {/* Interest In */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-3">Interests</h3>
            <div className="mb-2">
              <p className="text-sm">Teaching</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-sm">Research</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm">Mentoring</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "60%" }}></div>
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
              <h2 className="text-2xl font-bold mb-4">Professor Details</h2>
              <h3 className="text-xl font-semibold mb-2">Academic Information</h3>
              <p className="text-gray-700 mb-4">
                Dr. Ayesha Khan teaches courses in Data Structures, Machine Learning, 
                Web Development, and Database Management Systems.
              </p>
              <p className="text-gray-700">
                Publications: 40 papers in reputed journals and conferences.
              </p>
            </div>
          )}

          {activeTab === "activity" && (
            <div>
              <div className="relative mb-4">
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Share your update..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={4}
                />
                
                {/* Attachment previews */}
                {attachments.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {attachments.map((attachment, index) => (
                      <div key={index} className="relative border rounded p-2 max-w-xs">
                        {attachment.preview ? (
                          <>
                            <img 
                              src={attachment.preview} 
                              alt="Preview" 
                              className="h-20 object-contain"
                            />
                            <button 
                              onClick={() => removeAttachment(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                            <p className="text-xs truncate">{attachment.name}</p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <p className="text-xs truncate flex-1">{attachment.name}</p>
                              <button 
                                onClick={() => removeAttachment(index)}
                                className="text-red-500 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {/* Emoji picker button */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-gray-500 hover:text-yellow-500 p-1 rounded hover:bg-gray-100"
                        title="Add emoji"
                      >
                        <EmojiIcon className="h-5 w-5" />
                      </button>
                      
                      {showEmojiPicker && (
                        <div className="absolute bottom-8 left-0 bg-white border rounded shadow p-2 z-10 w-40">
                          <div className="grid grid-cols-4 gap-1">
                            {emojis.map((emoji, index) => (
                              <button 
                                key={index} 
                                onClick={() => addEmoji(emoji)}
                                className="text-xl hover:bg-gray-100 rounded p-1"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Image upload button */}
                    <button 
                      onClick={() => handleFileUpload('image')}
                      className="text-gray-500 hover:text-green-500 p-1 rounded hover:bg-gray-100"
                      title="Add image"
                    >
                      <ImageIcon className="h-5 w-5" />
                      <input 
                        type="file" 
                        ref={imageInputRef} 
                        onChange={(e) => handleFileChange(e, 'image')} 
                        className="hidden" 
                        accept="image/*"
                        multiple
                      />
                    </button>
                    
                    {/* File attachment button */}
                    <button 
                      onClick={() => handleFileUpload('file')}
                      className="text-gray-500 hover:text-blue-500 p-1 rounded hover:bg-gray-100"
                      title="Attach file"
                    >
                      <FileIcon className="h-5 w-5" />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={(e) => handleFileChange(e, 'file')} 
                        className="hidden" 
                        multiple 
                      />
                    </button>
                  </div>
                  
                  <button className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                    Post
                  </button>
                </div>
              </div>

              {/* Activity feed */}
              <div className="mt-6 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/images/Student2.jpg" alt="Student Update" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Student A</span> submitted assignment feedback
                      </p>
                      <span className="text-xs text-gray-500">7 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start mt-2">
                <button
                  className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                  title="Like"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span className="text-sm">Like</span>
                </button>
              </div>
              <hr className="my-1 border-t-1 border-gray-50 opacity-50"/>
              
              {/* div 2 */}
              <div className="mt-6 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/images/Student2.jpg" alt="Student Update" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Student B</span> submitted assignment feedback
                      </p>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start mt-2">
                <button
                  className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                  title="Like"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span className="text-sm">Like</span>
                </button>
              </div>

              <hr className="my-1 border-t-1 border-gray-400 opacity-50"/>

              <div className="mt-6 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/images/Student2.jpg" alt="Student Update" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-blue-600">Student C</span> submitted assignment feedback
                      </p>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-start mt-2">
                <img src="/images/report-5.png" alt="activity" className="w-250 h-100 rounded object-cover" />
                <button
                  className="flex items-center gap-1 text-gray-500 hover:text-pink-600 focus:outline-none mt-2"
                  title="Like"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span className="text-sm">Like</span>
                </button>
              </div>
              <br /><br />
               <div>
                  <h1>Lorem Ipsum is simply dummy text of the printing</h1>
                  <p className="text-xs text-gray-500">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <br /><br />
                 <div className="flex justify-center mb-6">
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-pink-300 transition duration-300">
                Load More
                </button>
                </div>
                
            </div>
            
          )}
        </div>
        
      </div>
    </div>
  );
};

export default AboutProfessor;