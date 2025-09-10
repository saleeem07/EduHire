import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Wand2, 
  Download, 
  ArrowLeft, 
  Eye, 
  Edit3,
  Save,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { getCurrentUser } from '../utils/userData';

const AIResumeBuilder = ({ onSectionChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'Sidharth Kumar',
      email: 'sidharth.kumar@chandigarhuniversity.edu',
      phone: '+91 98765 43210',
      location: 'Chandigarh, India',
      linkedin: 'linkedin.com/in/sidharthkumar'
    },
    summary: 'Results-driven Computer Science student with strong technical skills and 3+ years of experience in software development. Passionate about creating innovative solutions and eager to contribute to dynamic engineering teams.',
    experience: [
      {
        title: 'Software Engineering Intern',
        company: 'Google',
        duration: 'Jun 2023 - Sep 2023',
        description: 'Developed and maintained internal tools for data analysis using Python and React. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        achievements: [
          'Reduced data processing time by 40% through optimization',
          'Mentored 2 junior interns and conducted code reviews',
          'Implemented automated testing reducing bugs by 60%'
        ]
      }
    ],
    education: {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Chandigarh University',
      graduation: 'Expected June 2024',
      gpa: '3.8/4.0'
    },
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'AWS', 'Git', 'Docker'],
    projects: [
      {
        title: 'AI-Powered Resume Parser',
        description: 'Built a machine learning model that automatically extracts and categorizes information from resumes with 95% accuracy.',
        technologies: ['Python', 'TensorFlow', 'React', 'Node.js']
      }
    ]
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewMode, setPreviewMode] = useState(false);

  // Load profile data and update resume data
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.profile) {
      const profile = currentUser.profile;
      
      // Update personal info from profile
      if (profile.personal) {
        setResumeData(prev => ({
          ...prev,
          personalInfo: {
            name: profile.personal.firstName && profile.personal.lastName 
              ? `${profile.personal.firstName} ${profile.personal.lastName}`
              : 'Sidharth Kumar',
            email: profile.personal.email || 'sidharth.kumar@chandigarhuniversity.edu',
            phone: profile.personal.phone || '+91 98765 43210',
            location: profile.personal.location || 'Chandigarh, India',
            linkedin: profile.personal.linkedin || 'linkedin.com/in/sidharthkumar'
          }
        }));
      }

      // Update education from profile
      if (profile.education && profile.education.length > 0) {
        const latestEducation = profile.education[0];
        setResumeData(prev => ({
          ...prev,
          education: {
            degree: latestEducation.degree || 'Bachelor of Science in Computer Science',
            institution: latestEducation.institution || 'Chandigarh University',
            graduation: latestEducation.endDate || 'Expected June 2024',
            gpa: latestEducation.gpa || '3.8/4.0'
          }
        }));
      }

      // Update experience from profile
      if (profile.internships && profile.internships.length > 0) {
        const experiences = profile.internships.map(internship => ({
          title: internship.title || 'Software Engineering Intern',
          company: internship.company || 'Google',
          duration: `${internship.startDate || 'Jun 2023'} - ${internship.endDate || 'Sep 2023'}`,
          description: internship.description || 'Developed and maintained internal tools for data analysis using Python and React.',
          achievements: [
            'Reduced data processing time by 40% through optimization',
            'Mentored 2 junior interns and conducted code reviews',
            'Implemented automated testing reducing bugs by 60%'
          ]
        }));
        setResumeData(prev => ({ ...prev, experience: experiences }));
      }

      // Update projects from profile
      if (profile.projects && profile.projects.length > 0) {
        const projects = profile.projects.map(project => ({
          title: project.title || 'AI-Powered Resume Parser',
          description: project.description || 'Built a machine learning model that automatically extracts and categorizes information from resumes.',
          technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : ['Python', 'React', 'Node.js']
        }));
        setResumeData(prev => ({ ...prev, projects }));
      }

      // Update skills from profile
      if (profile.skills) {
        const allSkills = [
          ...(profile.skills.programming || []),
          ...(profile.skills.frameworks || []),
          ...(profile.skills.databases || []),
          ...(profile.skills.tools || [])
        ];
        if (allSkills.length > 0) {
          setResumeData(prev => ({ ...prev, skills: allSkills }));
        }
      }
    }
  }, []);

  const templates = [
    { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
    { id: 'professional', name: 'Professional', color: 'bg-[#2C5F34]' },
    { id: 'creative', name: 'Creative', color: 'bg-purple-500' },
    { id: 'minimal', name: 'Minimal', color: 'bg-gray-500' }
  ];

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const generateResume = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const downloadResume = () => {
    // Simulate download
    console.log('Downloading resume...');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-6">
      <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl font-bold text-[#1E293B]">AI Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  previewMode 
                    ? 'bg-[#2C5F34] text-white' 
                    : 'bg-white text-[#2C5F34] hover:bg-[#F3F4F6]'
                }`}
              >
                <Eye size={18} />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                onClick={downloadResume}
                className="flex items-center space-x-2 bg-[#FFD700] text-[#1E293B] px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all duration-200"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
          </div>
          <p className="text-gray-600">Create a professional resume with AI assistance. Our AI will help you highlight your best qualities and achievements.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          {!previewMode && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Template Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Choose Template</h2>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedTemplate === template.id
                          ? 'border-[#2C5F34] bg-[#F3F4F6]'
                          : 'border-gray-200 hover:border-[#2C5F34]'
                      }`}
                    >
                      <div className={`w-full h-8 ${template.color} rounded mb-2`}></div>
                      <span className="text-sm font-medium text-[#1E293B]">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center space-x-2">
                  <User size={20} />
                  <span>Personal Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1E293B] mb-4">Professional Summary</h2>
                <textarea
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  placeholder="Write a compelling summary of your professional background..."
                />
                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="mt-4 flex items-center space-x-2 bg-[#2C5F34] text-white px-6 py-3 rounded-lg hover:bg-[#FFD700] hover:text-[#1E293B] transition-all duration-200 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>AI Enhance Summary</span>
                    </>
                  )}
                </button>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-[#1E293B] mb-4 flex items-center space-x-2">
                  <Award size={20} />
                  <span>Skills</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#F3F4F6] text-[#2C5F34] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a new skill..."
                  className="mt-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F34] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      setResumeData(prev => ({
                        ...prev,
                        skills: [...prev.skills, e.target.value.trim()]
                      }));
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#1E293B] mb-2">Resume Preview</h2>
              <p className="text-gray-600 text-sm">This is how your resume will look to employers</p>
            </div>

            {/* Resume Content */}
            <div className="border border-gray-200 rounded-lg p-6 min-h-[800px]">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#2C5F34] mb-2">{resumeData.personalInfo.name}</h1>
                <p className="text-gray-600">{resumeData.personalInfo.email} • {resumeData.personalInfo.phone}</p>
                <p className="text-gray-600">{resumeData.personalInfo.location}</p>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-2 border-b border-gray-300 pb-1">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-3 border-b border-gray-300 pb-1">Professional Experience</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-[#2C5F34]">{exp.title}</h3>
                      <span className="text-gray-600 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{exp.company}</p>
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-3 border-b border-gray-300 pb-1">Education</h2>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[#2C5F34]">{resumeData.education.degree}</h3>
                    <p className="text-gray-600">{resumeData.education.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">{resumeData.education.graduation}</p>
                    <p className="text-gray-600">GPA: {resumeData.education.gpa}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-3 border-b border-gray-300 pb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#F3F4F6] text-[#2C5F34] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-lg font-semibold text-[#1E293B] mb-3 border-b border-gray-300 pb-1">Projects</h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-[#2C5F34] mb-1">{project.title}</h3>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeBuilder; 