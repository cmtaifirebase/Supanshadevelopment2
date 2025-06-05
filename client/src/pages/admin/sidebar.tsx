// src/pages/admin/sidebar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/authContext";
import { getUserPermissions } from "@/lib/api";
import {
  FaBars,
  FaTachometerAlt,
  FaUser,
  FaFileAlt,
  FaFile,
  FaCalendar,
  FaBriefcase,
  FaBlog,
  FaHeart,
  FaComments,
  FaShoppingCart,
  FaChevronDown,
  FaHome,
  FaUserCircle,
  FaMoneyBill,
} from "react-icons/fa";

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  href: string;
  module: string;
  children?: MenuItem[];
}

const adminMenu: MenuItem[] = [
  { label: "Dashboard", icon: <FaTachometerAlt />, href: "/admin/dashboard", module: "dashboard" },
  { label: "Profile", icon: <FaUserCircle />, href: "/admin/profile", module: "profile" },
  { label: "Certificates", icon: <FaFile />, href: "/admin/certificates", module: "certificates" },
  {
    label: "User Management",
    icon: <FaUser />,
    href: "/admin/users",
    module: "users",
    children: [
      { label: "Users", href: "/admin/users", module: "users", icon: <FaUser /> },
      { label: "Volunteers", href: "/admin/volunteers", module: "volunteers", icon: <FaUser /> },
    ],
  },
  { label: "Reports", icon: <FaFileAlt />, href: "/admin/reports", module: "reports" },
  { label: "Formats", icon: <FaFile />, href: "/admin/formats", module: "formats" },
  { label: "Events", icon: <FaCalendar />, href: "/admin/events", module: "events" },
  { label: "Jobs", icon: <FaBriefcase />, href: "/admin/jobs", module: "jobs" },
  { label: "Blogs", icon: <FaBlog />, href: "/admin/blogs", module: "blogs" },
  { label: "Causes", icon: <FaHeart />, href: "/admin/causes", module: "causes" },
  { label: "Crowd-Funding", icon: <FaHeart />, href: "/admin/crowd-funding", module: "crowdFunding" },
  { label: "Forum", icon: <FaComments />, href: "/admin/forum", module: "forum" },
  { label: "Shop", icon: <FaShoppingCart />, href: "/admin/shop", module: "shop" },
  { label: "Donations", icon: <FaMoneyBill />, href: "/admin/donations", module: "donations" },
  { label: "Contacts", icon: <FaComments />, href: "/admin/contacts", module: "contacts" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  isMobile: boolean;
  isCollapsed: boolean;
  onCollapse: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  isMobile, 
  isCollapsed, 
  onCollapse 
}) => {
  const [location] = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { user } = useAuth();

  const { data: permissions } = useQuery({
    queryKey: ["userPermissions", user?._id],
    queryFn: () => user?._id ? getUserPermissions(user._id) : Promise.resolve({ success: true, permissions: {} as Record<string, { read: boolean }> }),
    enabled: !!user?._id,
  });

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => location === href;

  const shouldShowFull = !isCollapsed;
  const sidebarWidth = isCollapsed ? "w-16" : "w-64";

  const hasModuleAccess = (module: string) => {
    // Always allow access to profile module
    if (module === "profile") return true;
    
    if (user?.role === "admin") return true;
    
    // Check if the module exists in permissions and has read access
    const modulePermissions = permissions?.permissions?.[module];
    if (!modulePermissions) return false;
    
    // Check if read permission is explicitly set to true
    return modulePermissions.read === true;
  };

  const filteredMenu = adminMenu.filter((item) => {
    if (item.module === "users") return user?.role === "admin";
    const hasAccess = hasModuleAccess(item.module);
    return hasAccess;
  });

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out bg-white shadow-lg ${sidebarWidth} ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center p-4 border-b border-gray-200 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}>
          {shouldShowFull && (
            <div className="flex items-center space-x-2">
              <img src="/logo/logo1.png" alt="Logo" className="w-8 h-8" />
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </div>
          )}
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
          {/* Home Link */}
          <Link
            href="/"
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-primary/5 mb-4 transition-all duration-200 ${
              isCollapsed ? "justify-center" : "space-x-3"
            } group`}
          >
            <FaHome className="text-primary group-hover:scale-110 transition-transform" />
            {shouldShowFull && <span className="font-medium text-gray-700 group-hover:text-primary">Public Site</span>}
          </Link>

          <ul className="space-y-2">
            {filteredMenu.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-primary/5 transition-all duration-200 ${
                        shouldShowFull ? "justify-between" : "justify-center"
                      } ${
                        expandedMenus.includes(item.label) || 
                        item.children.some(child => isActive(child.href))
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700"
                      } group`}
                    >
                      <span className={`flex items-center ${
                        shouldShowFull ? "space-x-3" : ""
                      }`}>
                        <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                        {shouldShowFull && <span>{item.label}</span>}
                      </span>
                      {shouldShowFull && (
                        <FaChevronDown
                          className={`transition-transform text-gray-400 ${
                            expandedMenus.includes(item.label) ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {shouldShowFull && expandedMenus.includes(item.label) && (
                      <ul className="pl-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 text-sm rounded-lg hover:bg-primary/5 transition-all duration-200 ${
                                isActive(child.href) 
                                  ? "bg-primary/10 text-primary font-medium" 
                                  : "text-gray-600 hover:text-primary"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg hover:bg-primary/5 transition-all duration-200 ${
                      shouldShowFull ? "space-x-3" : "justify-center"
                    } ${
                      isActive(item.href) 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-gray-700 hover:text-primary"
                    } group`}
                  >
                    <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                    {shouldShowFull && <span>{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => onCollapse(!isCollapsed)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <FaChevronDown className={`transform transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => onToggle(false)}
        />
      )}
    </>
  );
};

export default Sidebar;