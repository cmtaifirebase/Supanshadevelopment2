// src/layouts/AdminLayout.tsx
import React, { useState, useEffect } from "react";
import Sidebar from "@/pages/admin/sidebar";
import Header from "@/components/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Auto handle sidebar state based on screen size
      if (isMobileView) {
        setIsSidebarOpen(false);
        setIsCollapsed(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={setIsSidebarOpen} 
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        onCollapse={setIsCollapsed}
      />
      <div className="flex-1">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
        />
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? (isCollapsed ? 'md:ml-16' : 'md:ml-64') : 'ml-0'
          }`}
          style={{ marginTop: '4rem' }}
        >
          {/* Main content area */}
          <main className="min-h-screen p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;