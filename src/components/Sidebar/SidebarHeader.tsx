"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { School } from "lucide-react";

export default function SidebarHeader() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="bg-indigo-500 p-4 flex justify-center">
        <Link href="/" className="flex items-center space-x-2 text-white">
    <School size={40} />
    <span className="text-xl font-semibold">Smart</span>
  </Link>
      </div>

      <div className="flex flex-col items-center p-6 bg-white">
        
        <Image
          src={session?.user?.image || "/images/profile.jpg"}
          alt="User Profile"
          width={70}
          height={70}
          className=" object-cover rounded-2xl"
        />
        <span className="mt-3 font-semibold text-sm text-gray-800 text-center">
          {session?.user?.name || "User Name"}
        </span>
        <span className="text-sm text-gray-500">
          {session?.user?.role || "Role"}
        </span>
      </div>
    </div>
  );
}
