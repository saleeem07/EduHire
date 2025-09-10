import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Edit3,
  Download,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '../utils/userData';

const StudentProfile = ({ onSectionChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    education: [],
    experience: [],
    projects: [],
    skills: {
      technical: [],
      languages: [],
      soft: []
    },
    certifications: [],
    achievements: []
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.profile) {
      setUserData(currentUser.profile);
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setUserData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setUserData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setUserData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const success = updateUserProfile(currentUser.email, userData);
        if (success) {
          setIsEditing(false);
          // Show success message
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

  const handleCancel = () => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.profile) {
      setUserData(currentUser.profile);
    }
    setIsEditing(false);
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
              <h1 className="text-3xl font-bold text-[#1E293B]">Student Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-200"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 bg-[#2C5F34] text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-[#2C5F34] text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200"
                >
                  <Edit3 size={18} />
                  <span>Edit Profile</span>
                </button>
              )}
              <button className="flex items-center space-x-2 bg-[#FFD700] text-[#1E293B] px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all duration-200">
                <Download size={18} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600">View and manage your complete student profile.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info & Skills */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center space-x-2">
                <User size={20} />
                <span>Personal Information</span>
              </h2>
              
              <div className="text-center mb-6">
                <img
                  src={userData.personal.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#2C5F34]"
                />
                {isEditing && (
                  <button className="text-sm text-[#2C5F34] hover:text-[#FFD700] transition-colors">
                    Change Photo
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.personal.firstName}
                        onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.personal.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.personal.lastName}
                        onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.personal.lastName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <Mail size={14} />
                    <span>Email</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.personal.email}
                      onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.personal.email || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <Phone size={14} />
                    <span>Phone</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.personal.phone}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.personal.phone || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>Location</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.personal.location}
                      onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.personal.location || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <ExternalLink size={14} />
                    <span>LinkedIn</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={userData.personal.linkedin}
                      onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      placeholder="linkedin.com/in/username"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.personal.linkedin || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center space-x-1">
                    <Code size={14} />
                    <span>GitHub</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={userData.personal.github}
                      onChange={(e) => handleInputChange('personal', 'github', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                      placeholder="github.com/username"
                    />
                  ) : (
                    <p className="text-gray-900">{userData.personal.github || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center space-x-2">
                <Award size={20} />
                <span>Skills</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-[#1E293B] mb-2">Technical Skills</h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {userData.skills.technical.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => handleArrayChange('skills', 'technical', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('skills', 'technical', index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem('skills', 'technical', '')}
                        className="flex items-center space-x-2 text-[#2C5F34] hover:text-[#FFD700] text-sm"
                      >
                        <Plus size={16} />
                        <span>Add Skill</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.technical.length > 0 ? (
                        userData.skills.technical.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-[#F3F4F6] text-[#2C5F34] px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No skills added</p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-[#1E293B] mb-2">Languages</h3>
                  {isEditing ? (
                    <div className="space-y-2">
                      {userData.skills.languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={language}
                            onChange={(e) => handleArrayChange('skills', 'languages', index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('skills', 'languages', index)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem('skills', 'languages', '')}
                        className="flex items-center space-x-2 text-[#2C5F34] hover:text-[#FFD700] text-sm"
                      >
                        <Plus size={16} />
                        <span>Add Language</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.languages.length > 0 ? (
                        userData.skills.languages.map((language, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {language}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No languages added</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Education, Experience, Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#1E293B] flex items-center space-x-2">
                  <GraduationCap size={20} />
                  <span>Education</span>
                </h2>
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('education', {
                      degree: '',
                      institution: '',
                      location: '',
                      startDate: '',
                      endDate: '',
                      gpa: '',
                      description: ''
                    })}
                    className="flex items-center space-x-2 text-[#2C5F34] hover:text-[#FFD700] text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Education</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {userData.education.length > 0 ? (
                  userData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Location"
                              value={edu.location}
                              onChange={(e) => handleArrayChange('education', index, 'location', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={edu.startDate}
                              onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={edu.endDate}
                              onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="GPA"
                              value={edu.gpa}
                              onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <textarea
                              placeholder="Description"
                              value={edu.description}
                              onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                              rows={3}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => removeArrayItem('education', index)}
                            className="flex items-center space-x-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-[#2C5F34]">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                          <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                          {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                          {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No education history added</p>
                )}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#1E293B] flex items-center space-x-2">
                  <Briefcase size={20} />
                  <span>Experience</span>
                </h2>
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('experience', {
                      title: '',
                      company: '',
                      location: '',
                      startDate: '',
                      endDate: '',
                      description: ''
                    })}
                    className="flex items-center space-x-2 text-[#2C5F34] hover:text-[#FFD700] text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Experience</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {userData.experience.length > 0 ? (
                  userData.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Job Title"
                              value={exp.title}
                              onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              placeholder="Location"
                              value={exp.location}
                              onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={exp.startDate}
                              onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={exp.endDate}
                              onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <textarea
                            placeholder="Description"
                            value={exp.description}
                            onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('experience', index)}
                            className="flex items-center space-x-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-[#2C5F34]">{exp.title}</h3>
                          <p className="text-gray-600">{exp.company}, {exp.location}</p>
                          <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</p>
                          {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No experience history added</p>
                )}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#1E293B] flex items-center space-x-2">
                  <Code size={20} />
                  <span>Projects</span>
                </h2>
                {isEditing && (
                  <button
                    onClick={() => addArrayItem('projects', {
                      title: '',
                      description: '',
                      technologies: '',
                      github: '',
                      liveUrl: ''
                    })}
                    className="flex items-center space-x-2 text-[#2C5F34] hover:text-[#FFD700] text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {userData.projects.length > 0 ? (
                  userData.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <textarea
                            placeholder="Project Description"
                            value={project.description}
                            onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="Technologies Used"
                              value={project.technologies}
                              onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                            <input
                              type="url"
                              placeholder="GitHub URL"
                              value={project.github}
                              onChange={(e) => handleArrayChange('projects', index, 'github', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                            />
                          </div>
                          <input
                            type="url"
                            placeholder="Live Demo URL"
                            value={project.liveUrl}
                            onChange={(e) => handleArrayChange('projects', index, 'liveUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem('projects', index)}
                            className="flex items-center space-x-2 text-red-500 hover:text-red-700 text-sm"
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-[#2C5F34]">{project.title}</h3>
                          <p className="text-gray-700 mt-2">{project.description}</p>
                          {project.technologies && (
                            <p className="text-gray-600 text-sm mt-2">
                              <strong>Technologies:</strong> {project.technologies}
                            </p>
                          )}
                          <div className="flex space-x-4 mt-3">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2C5F34] hover:text-[#FFD700] text-sm flex items-center space-x-1"
                              >
                                <Code size={14} />
                                <span>GitHub</span>
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2C5F34] hover:text-[#FFD700] text-sm flex items-center space-x-1"
                              >
                                <ExternalLink size={14} />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No projects added</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 