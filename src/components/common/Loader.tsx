import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = "medium", 
  className = "", 
  text 
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-t-[#0aa6ff] border-gray-200 rounded-full animate-spin`}
      ></div>
      {text && (
        <p className="mt-3 text-gray-600 text-sm">{text}</p>
      )}
    </div>
  );
};

export default Loader;