"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  CoursesIcon,
  StudentsIcon,
  FacultyIcon,
  SettingsIcon,
  LogoutIcon
} from "../Icons";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import SidebarHeader from "./SidebarHeader";


const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: DashboardIcon },
  {
    name: "Courses",
    icon: CoursesIcon,
    children: [
      { name: "All Courses", href: "/admin/courses/allcourses" },
      { name: "Add Courses", href: "/admin/courses/addcourses" },
      { name: "Add Course Bootstrap", href: "/admin/courses/add-bootstrap" },
      { name: "Edit Course", href: "/admin/courses/edit" },
      { name: "About Course", href: "/admin/courses/about" },
    ]
  },
  {
    name: "Students",
    icon: StudentsIcon,
    children: [
      { name: "All Students", href: "/admin/students/allStudents" },
      { name: "Add Student", href: "/admin/students/addStudents" },
      { name: "Add Student Bootstrap", href: "/admin/students/add-bootstrap" },
      { name: "Edit Student", href: "/admin/students/editStudents" },
      { name: "About Student", href: "/admin/students/aboutStudents"},
    ]
  },
  { name: "Faculty", href: "/admin/faculty", icon: FacultyIcon },
  { name: "Settings", href: "/admin/settings", icon: SettingsIcon }
];

const facultyNavigation = [
  { name: "Dashboard", href: "/faculty", icon: DashboardIcon },
  {
    name: "Courses",
    icon: CoursesIcon,
    children: [
      { name: "My Courses", href: "/faculty/courses" }
    ]
  },
  {
    name: "Students",
    icon: StudentsIcon,
    children: [
      { name: "My Students", href: "/faculty/students" },
      { name: "Student Progress", href: "/faculty/students/progress" }
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data: session } = useSession();

  const navigation = session?.user?.role === "admin"
    ? adminNavigation
    : facultyNavigation;

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Auto-expand dropdown if a child route is active
  useEffect(() => {
    const newOpenMenus: { [key: string]: boolean } = {};
    navigation.forEach(item => {
      if ("children" in item) {
        newOpenMenus[item.name] = item.children.some(child =>
          pathname === child.href || pathname.startsWith(`${child.href}/`)
        );
      }
    });
    setOpenMenus(newOpenMenus);
  }, [pathname, navigation]);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    setShowLogoutModal(false);
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 lg:flex-col bg-white border-r">
        <SidebarHeader />
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 ">
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {"children" in item ? (
                      <div>
                        <div
                          onClick={() => toggleMenu(item.name)}
                          className={`group flex w-full items-center justify-between gap-x-3 rounded-md p-2 text-sm font-medium ${
                            openMenus[item.name]
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          } cursor-pointer`}
                        >
                          <div className="flex items-center gap-x-3">
                            <item.icon
                              className={`h-5 w-5 ${
                                openMenus[item.name]
                                  ? "text-blue-600"
                                  : "text-gray-400"
                              }`}
                            />
                            {item.name}
                          </div>
                          <span className="text-xs">
                            {openMenus[item.name] ? "▲" : "▼"}
                          </span>
                        </div>

                        {/* Dropdown with animation */}
                        <div
                          className={`ml-8 overflow-hidden transition-all duration-300 ease-in-out ${
                            openMenus[item.name] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="mt-1 space-y-1">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  className={`${
                                    isActive(subItem.href)
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                  } block rounded-md px-2 py-1 text-sm`}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
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
                            isActive(item.href)
                              ? "text-blue-600"
                              : "text-gray-400"
                          } h-5 w-5`}
                        />
                        {item.name}
                      </Link>
                    )}
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
