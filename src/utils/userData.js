// User data management utility
export const saveUserData = (email, userData) => {
  try {
    const users = JSON.parse(localStorage.getItem('eduhire_users') || '{}');
    users[email] = {
      ...users[email],
      ...userData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('eduhire_users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

export const loadUserData = (email) => {
  try {
    const users = JSON.parse(localStorage.getItem('eduhire_users') || '{}');
    return users[email] || null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const updateUserProfile = (email, profileData) => {
  try {
    const users = JSON.parse(localStorage.getItem('eduhire_users') || '{}');
    if (users[email]) {
      users[email] = {
        ...users[email],
        profile: {
          ...users[email].profile,
          ...profileData
        },
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('eduhire_users', JSON.stringify(users));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

export const saveUserCredentials = (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('eduhire_users') || '{}');
    users[email] = {
      ...users[email],
      email,
      password, // In a real app, this should be hashed
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('eduhire_users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving user credentials:', error);
    return false;
  }
};

export const validateUserCredentials = (email, password) => {
  try {
    const users = JSON.parse(localStorage.getItem('eduhire_users') || '{}');
    const user = users[email];
    return user && user.password === password ? user : null;
  } catch (error) {
    console.error('Error validating user credentials:', error);
    return null;
  }
};

export const getCurrentUser = () => {
  try {
    const currentUserEmail = localStorage.getItem('eduhire_current_user');
    if (currentUserEmail) {
      return loadUserData(currentUserEmail);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const setCurrentUser = (email) => {
  try {
    localStorage.setItem('eduhire_current_user', email);
    return true;
  } catch (error) {
    console.error('Error setting current user:', error);
    return false;
  }
};

export const clearCurrentUser = () => {
  try {
    localStorage.removeItem('eduhire_current_user');
    return true;
  } catch (error) {
    console.error('Error clearing current user:', error);
    return false;
  }
}; 