import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Upload, 
  TrendingUp, 
  Eye,
  Calendar,
  Award,
  BookOpen,
  Code,
  Globe
} from 'lucide-react';
import { getCurrentUser } from '../utils/userData';

const Dashboard = ({ onSectionChange }) => {
  const [userData, setUserData] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserData(currentUser);
      // Calculate profile completion based on filled fields
      const profile = currentUser.profile || {};
      let completedFields = 0;
      let totalFields = 0;

      // Personal info (5 fields)
      if (profile.personal) {
        const personalFields = ['firstName', 'lastName', 'email', 'phone', 'location'];
        personalFields.forEach(field => {
          totalFields++;
          if (profile.personal[field]) completedFields++;
        });
      } else {
        totalFields += 5;
      }

      // Education, Experience, Projects, Internships (4 sections)
      ['education', 'experience', 'projects', 'internships'].forEach(section => {
        totalFields++;
        if (profile[section] && profile[section].length > 0) completedFields++;
      });

      // Skills (multiple categories)
      totalFields++;
      if (profile.skills && (
        profile.skills.technical?.length > 0 || 
        profile.skills.languages?.length > 0 ||
        profile.skills.programming?.length > 0 ||
        profile.skills.frameworks?.length > 0 ||
        profile.skills.databases?.length > 0 ||
        profile.skills.tools?.length > 0
      )) {
        completedFields++;
      }

      setProfileCompletion(Math.round((completedFields / totalFields) * 100));
    }
  }, []);

  const studentData = {
    name: userData?.profile?.personal?.firstName && userData?.profile?.personal?.lastName 
      ? `${userData.profile.personal.firstName} ${userData.profile.personal.lastName}`
      : "Student",
    email: userData?.profile?.personal?.email || userData?.email || "email@example.com",
    major: "Computer Science",
    graduationYear: "2024",
    gpa: "3.8",
    internships: userData?.profile?.experience?.length || 0,
    projects: userData?.profile?.projects?.length || 0,
    skills: userData?.profile?.skills?.technical || ["React", "Python", "Machine Learning"],
    recentActivity: [
      { type: "resume", action: "Updated resume", time: "2 hours ago" },
      { type: "project", action: "Added new project", time: "1 day ago" },
      { type: "internship", action: "Completed internship", time: "1 week ago" }
    ]
  };

  const quickActions = [
    {
      title: "Complete Profile",
      description: "Add missing information to your profile",
      icon: User,
      action: () => onSectionChange('profile'),
      color: "bg-blue-500"
    },
    {
      title: "AI Resume Builder",
      description: "Create a professional resume with AI",
      icon: FileText,
      action: () => onSectionChange('resume-ai'),
      color: "bg-[#2C5F34]"
    },
    {
      title: "AI CV Builder",
      description: "Generate a comprehensive CV",
      icon: FileText,
      action: () => onSectionChange('cv-ai'),
      color: "bg-purple-500"
    },
    {
      title: "Upload Documents",
      description: "Upload resume, CV, and certificates",
      icon: Upload,
      action: () => onSectionChange('upload'),
      color: "bg-orange-500"
    }
  ];

  const stats = [
    { label: "Profile Views", value: "24", icon: Eye, change: "+12%" },
    { label: "Applications", value: "8", icon: Briefcase, change: "+3" },
    { label: "Interviews", value: "3", icon: Calendar, change: "+1" },
    { label: "Skills", value: "12", icon: Award, change: "+2" }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Welcome back, {studentData.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your profile today.</p>
        </motion.div>

        {/* Profile Completion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#1E293B]">Profile Completion</h2>
            <span className="text-2xl font-bold text-[#2C5F34]">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-[#2C5F34] h-3 rounded-full transition-all duration-500"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm">
            Complete your profile to increase your chances of getting hired!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1E293B]">{stat.value}</p>
                </div>
                <div className="p-3 bg-[#F3F4F6] rounded-lg">
                  <stat.icon className="w-6 h-6 text-[#2C5F34]" />
                </div>
              </div>
              <p className="text-green-600 text-sm mt-2">{stat.change}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-all duration-200 group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[#1E293B] mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {studentData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#2C5F34] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-[#1E293B] font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Profile Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-[#2C5F34]" />
                <div>
                  <p className="text-[#1E293B] font-medium">{studentData.major}</p>
                  <p className="text-gray-500 text-sm">Graduating {studentData.graduationYear}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-[#2C5F34]" />
                <div>
                  <p className="text-[#1E293B] font-medium">{studentData.internships} Internships</p>
                  <p className="text-gray-500 text-sm">Professional experience</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5 text-[#2C5F34]" />
                <div>
                  <p className="text-[#1E293B] font-medium">{studentData.projects} Projects</p>
                  <p className="text-gray-500 text-sm">Portfolio items</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-[#2C5F34]" />
                <div>
                  <p className="text-[#1E293B] font-medium">GPA: {studentData.gpa}</p>
                  <p className="text-gray-500 text-sm">Academic performance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 