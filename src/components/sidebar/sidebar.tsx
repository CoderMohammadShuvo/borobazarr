'use client';
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname from Next.js

interface SidebarItem {
  label: string;
  icon: IconType;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Analytics Dashboard', icon: FaHome, path: '/dashboard' },
  { label: 'User', icon: FaUser, path: '/dashboard/users' },
  { label: 'Product', icon: FaCog, path: '/dashboard/products' },
  { label: 'Discount', icon: FaCog, path: '/dashboard/discount' },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const currentPath = usePathname(); // Get the current pathname using usePathname

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    router.push(path); // Programmatically navigate to the path
  };

  return (
    <div
      className={`flex ${isOpen ? 'w-64' : 'w-20'} h-screen bg-gray-800 p-4 duration-300 bg-white shadow`}
    >
      <div className="flex flex-col h-full w-full">
        <button
          onClick={toggleSidebar}
          className="text-white mb-4 focus:outline-none text-lg"
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
        <ul className="space-y-4">
          {sidebarItems.map((item, index) => {
            const isActive = currentPath === item.path; // Check if the current path matches the item path
            return (
              <li
                key={index}
                onClick={() => handleNavigation(item.path)} // Navigate on click
                className={`flex items-center p-2  rounded-md cursor-pointer hover:bg-[#02B290] ${isActive ? 'bg-[#02B290] text-white' : 'text-black'}`} // Add active class
              >
                <item.icon
                  className={`text-xl mr-4 hover:text-white ${isActive ? 'text-white' : 'text-black'}`}
                />
                {isOpen && <span>{item.label}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
