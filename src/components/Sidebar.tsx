// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, CoursesIcon, StudentsIcon, FacultyIcon, SettingsIcon, LogoutIcon } from "./Icons";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: DashboardIcon },
  { name: "Courses", href: "/admin/courses", icon: CoursesIcon },
  { name: "Students", href: "/admin/students", icon: StudentsIcon },
  { name: "Faculty", href: "/admin/faculty", icon: FacultyIcon },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon }
];

const facultyNavigation = [
  { name: "Dashboard", href: "/faculty", icon: DashboardIcon },
  { name: "My Courses", href: "/faculty/courses", icon: CoursesIcon },
  { name: "Students", href: "/faculty/students", icon: StudentsIcon }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: session } = useSession();
  
  // Determine navigation based on user role
  const navigation = session?.user?.role === 'admin' 
    ? adminNavigation 
    : facultyNavigation;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    setShowLogoutModal(false);
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col bg-white border-r">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 pt-20">
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      } group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium`}
                    >
                      <item.icon
                        className={`${
                          isActive(item.href) ? "text-blue-600" : "text-gray-400"
                        } h-5 w-5`}
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full"
              >
                <LogoutIcon className="h-5 w-5 text-gray-400" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}