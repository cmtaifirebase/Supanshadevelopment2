import React from 'react';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/authContext';

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isMobile: boolean;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onToggleSidebar, isMobile, isCollapsed }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header 
      className="fixed top-0 right-0 z-20 h-16 bg-white shadow-md transition-all duration-300 ease-in-out"
      style={{
        left: isMobile ? '0' : (isCollapsed ? '4rem' : '16rem'),
        width: isMobile ? '100%' : `calc(100% - ${isCollapsed ? '4rem' : '16rem'})`
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-600 hover:text-primary transition-colors"
          aria-label="Toggle sidebar"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <button
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="Profile"
          >
            <FaUser className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Logout"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 