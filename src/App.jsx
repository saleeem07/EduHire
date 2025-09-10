import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ProfileBuilder from './components/ProfileBuilder';
import AIResumeBuilder from './components/AIResumeBuilder';
import AICVBuilder from './components/AICVBuilder';
import UploadSection from './components/UploadSection';
import StudentProfile from './components/StudentProfile';
import Login from './components/Login';
import Register from './components/Register';
import { getCurrentUser, clearCurrentUser } from './utils/userData';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check for existing user session on app load
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setCurrentSection('dashboard');
    }
  }, []);

  const handleLogin = () => {
    const user = getCurrentUser();
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentSection('dashboard');
  };

  const handleLogout = () => {
    clearCurrentUser();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentSection('login');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'login':
        return <Login onSectionChange={setCurrentSection} onLogin={handleLogin} />;
      case 'register':
        return <Register onSectionChange={setCurrentSection} onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onSectionChange={setCurrentSection} />;
      case 'profile':
        return <ProfileBuilder onSectionChange={setCurrentSection} />;
      case 'resume-ai':
        return <AIResumeBuilder onSectionChange={setCurrentSection} />;
      case 'cv-ai':
        return <AICVBuilder onSectionChange={setCurrentSection} />;
      case 'upload':
        return <UploadSection onSectionChange={setCurrentSection} />;
      case 'student-profile':
        return <StudentProfile onSectionChange={setCurrentSection} />;
      default:
        return <Hero onGetStarted={() => setCurrentSection('register')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3F4F6] to-white">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin}
        onSectionChange={setCurrentSection}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      {renderSection()}
    </div>
  );
}

export default App;