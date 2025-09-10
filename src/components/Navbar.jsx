import React, { useState } from 'react';
import { Settings, Bell, User, LogIn, Home, UserPlus, FileText, Upload, Briefcase, LogOut, UserCheck } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLogin, onSectionChange, onLogout, currentUser }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Company Name */}
          <button 
            onClick={() => isLoggedIn ? onSectionChange('dashboard') : onSectionChange('hero')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=40&h=40&fit=crop&crop=center"
              alt="EduHire Logo"
              className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow duration-200"
            />
            <span className="text-xl font-bold text-[#2C5F34] group-hover:text-[#FFD700] transition-colors duration-200">EduHire</span>
          </button>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => onSectionChange('dashboard')}
                  className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
                  title="Dashboard"
                >
                  <Home size={20} />
                </button>
                <button 
                  onClick={() => onSectionChange('profile')}
                  className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
                  title="Profile Builder"
                >
                  <UserPlus size={20} />
                </button>
                <button 
                  onClick={() => onSectionChange('resume-ai')}
                  className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
                  title="AI Resume Builder"
                >
                  <FileText size={20} />
                </button>
                <button 
                  onClick={() => onSectionChange('upload')}
                  className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200"
                  title="Upload Documents"
                >
                  <Upload size={20} />
                </button>
                <button className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700] rounded-full"></span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    onBlur={() => setTimeout(() => setShowProfileDropdown(false), 200)}
                    className="p-1 text-[#2C5F34] hover:text-[#FFD700] hover:bg-[#F3F4F6] rounded-full transition-all duration-200"
                  >
                    <img
                      src={currentUser?.profile?.personal?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#2C5F34] hover:border-[#FFD700] transition-colors"
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          onSectionChange('student-profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-gray-700 hover:bg-[#F3F4F6] transition-colors"
                      >
                        <UserCheck size={16} />
                        <span>Complete Profile</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={() => {
                          onLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={() => onSectionChange('login')}
                className="flex items-center space-x-2 bg-[#2C5F34] hover:bg-[#FFD700] hover:text-[#1E293B] text-white px-4 py-2 rounded-lg transition-all duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 