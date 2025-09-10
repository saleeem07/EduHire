import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  Globe, 
  Plus, 
  Save,
  ArrowLeft,
  BookOpen,
  Calendar,
  MapPin,
  Star,
  Trash2
} from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '../utils/userData';

const ProfileBuilder = ({ onSectionChange }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: ''
    },
    education: [],
    internships: [],
    projects: [],
    skills: {
      programming: [],
      frameworks: [],
      databases: [],
      tools: []
    }
  });

  // Load existing user data on component mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.profile) {
      // Ensure skills object is properly structured
      const profileData = {
        ...currentUser.profile,
        skills: {
          programming: currentUser.profile.skills?.programming || [],
          frameworks: currentUser.profile.skills?.frameworks || [],
          databases: currentUser.profile.skills?.databases || [],
          tools: currentUser.profile.skills?.tools || []
        }
      };
      setFormData(profileData);
    }
  }, []);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award }
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addItem = (section) => {
    let newItem;
    
    switch (section) {
      case 'education':
        newItem = {
          id: Date.now(),
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          description: ''
        };
        break;
      case 'internships':
        newItem = {
          id: Date.now(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          technologies: []
        };
        break;
      case 'projects':
        newItem = {
          id: Date.now(),
          title: '',
          description: '',
          technologies: '',
          github: '',
          liveUrl: ''
        };
        break;
      default:
        newItem = {
          id: Date.now(),
          title: '',
          description: '',
          startDate: '',
          endDate: ''
        };
    }

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, id) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const success = updateUserProfile(currentUser.email, formData);
        if (success) {
          alert('Profile saved successfully!');
        } else {
          alert('Failed to save profile. Please try again.');
        }
      }
    } catch (error) {
      alert('Error saving profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addSkill = (category, skill) => {
    if (skill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: {
          programming: prev.skills?.programming || [],
          frameworks: prev.skills?.frameworks || [],
          databases: prev.skills?.databases || [],
          tools: prev.skills?.tools || [],
          [category]: [...(prev.skills?.[category] || []), skill.trim()]
        }
      }));
    }
  };

  const removeSkill = (category, index) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        programming: prev.skills?.programming || [],
        frameworks: prev.skills?.frameworks || [],
        databases: prev.skills?.databases || [],
        tools: prev.skills?.tools || [],
        [category]: (prev.skills?.[category] || []).filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onSectionChange('dashboard')}
                className="p-2 text-[#2C5F34] hover:text-[#FFD700] hover:bg-white rounded-lg transition-all duration-200"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-bold text-[#1E293B]">Profile Builder</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-[#2C5F34] text-white px-6 py-3 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
          <p className="text-gray-600">Complete your profile to showcase your skills and experience to potential employers.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-2 mb-8"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#2C5F34] text-white'
                    : 'text-gray-600 hover:text-[#2C5F34] hover:bg-[#F3F4F6]'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#1E293B] mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.personal.firstName}
                    onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.personal.lastName}
                    onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.personal.phone}
                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.personal.location}
                    onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.personal.linkedin}
                    onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.personal.github}
                    onChange={(e) => handleInputChange('personal', 'github', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                  <input
                    type="url"
                    value={formData.personal.portfolio}
                    onChange={(e) => handleInputChange('personal', 'portfolio', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#1E293B]">Education</h2>
                <button
                  onClick={() => addItem('education')}
                  className="flex items-center space-x-2 bg-[#2C5F34] text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                >
                  <Plus size={18} />
                  <span>Add Education</span>
                </button>
              </div>
              {(formData.education || []).map((edu, index) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[#1E293B]">Education {index + 1}</h3>
                    <button
                      onClick={() => removeItem('education', edu.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree || ''}
                        onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      <input
                        type="text"
                        value={edu.institution || ''}
                        onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Stanford University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={edu.location || ''}
                        onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Stanford, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={edu.startDate || ''}
                        onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="month"
                        value={edu.endDate || ''}
                        onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={edu.description || ''}
                        onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="Additional details about your education..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'internships' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#1E293B]">Internships & Work Experience</h2>
                <button
                  onClick={() => addItem('internships')}
                  className="flex items-center space-x-2 bg-[#2C5F34] text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                >
                  <Plus size={18} />
                  <span>Add Internship</span>
                </button>
              </div>
              {(formData.internships || []).map((internship, index) => (
                <div key={internship.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[#1E293B]">Internship {index + 1}</h3>
                    <button
                      onClick={() => removeItem('internships', internship.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={internship.title || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Software Engineering Intern"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={internship.company || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'company', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Google"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={internship.location || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., Mountain View, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="month"
                        value={internship.startDate || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'startDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="month"
                        value={internship.endDate || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={internship.description || ''}
                        onChange={(e) => handleArrayChange('internships', index, 'description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="Describe your role, responsibilities, and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-[#1E293B]">Projects</h2>
                <button
                  onClick={() => addItem('projects')}
                  className="flex items-center space-x-2 bg-[#2C5F34] text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                >
                  <Plus size={18} />
                  <span>Add Project</span>
                </button>
              </div>
              {(formData.projects || []).map((project, index) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[#1E293B]">Project {index + 1}</h3>
                    <button
                      onClick={() => removeItem('projects', project.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                      <input
                        type="text"
                        value={project.title || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., AI-Powered Resume Parser"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="e.g., React, Node.js, Python, TensorFlow"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={project.description || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="Describe your project, its features, and your role..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={project.github || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'github', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                      <input
                        type="url"
                        value={project.liveUrl || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'liveUrl', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                        placeholder="https://project-demo.vercel.app"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#1E293B]">Skills & Technologies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-[#1E293B] mb-4">Programming Languages</h3>
                  <div className="space-y-2">
                    {(formData.skills?.programming || []).map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-gray-700 flex-1">{skill}</span>
                        <button
                          onClick={() => removeSkill('programming', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add programming language"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill('programming', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          addSkill('programming', input.value);
                          input.value = '';
                        }}
                        className="p-2 bg-[#2C5F34] text-white rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#1E293B] mb-4">Frameworks & Libraries</h3>
                  <div className="space-y-2">
                    {(formData.skills?.frameworks || []).map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-gray-700 flex-1">{skill}</span>
                        <button
                          onClick={() => removeSkill('frameworks', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add framework/library"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill('frameworks', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          addSkill('frameworks', input.value);
                          input.value = '';
                        }}
                        className="p-2 bg-[#2C5F34] text-white rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#1E293B] mb-4">Databases</h3>
                  <div className="space-y-2">
                    {(formData.skills?.databases || []).map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-gray-700 flex-1">{skill}</span>
                        <button
                          onClick={() => removeSkill('databases', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add database"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill('databases', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          addSkill('databases', input.value);
                          input.value = '';
                        }}
                        className="p-2 bg-[#2C5F34] text-white rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#1E293B] mb-4">Tools & Platforms</h3>
                  <div className="space-y-2">
                    {(formData.skills?.tools || []).map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-gray-700 flex-1">{skill}</span>
                        <button
                          onClick={() => removeSkill('tools', index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add tool/platform"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill('tools', e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          addSkill('tools', input.value);
                          input.value = '';
                        }}
                        className="p-2 bg-[#2C5F34] text-white rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileBuilder; 