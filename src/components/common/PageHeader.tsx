import React from "react";
import { HomeIcon } from "@/components/Icons";
import Link from "next/link";


interface PageHeaderProps {
  title: string;
  breadcrumbs: string[];
  icon?: React.ReactNode; 
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs, icon }) => {
  return (
    <div className="max-w-full mx-auto px-6 py-6 flex justify-between items-center">
     
      <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        {icon && icon}
        {title}
      </h1>
      
      <nav className="flex items-center text-xs text-gray-500 bg-gray-200 rounded-full px-3 py-1 gap-1 select-none">
        <Link href="/admin" className="flex items-center gap-1 cursor-pointer hover:text-[#0aa6ff]">
          <HomeIcon className="w-3 h-3 text-gray-700" />
          Home
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <span className="text-gray-400">&gt;</span>
            <span
              className={`cursor-pointer ${
                index === breadcrumbs.length - 1
                  ? "text-gray-800"
                  : "hover:text-[#0aa6ff]"
              }`}
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default PageHeader;
