// Authentication service to handle token management

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const sessionOnly = sessionStorage.getItem("sessionOnly");
  
  if (!token) return false;
  
  // Check if this should be a session-only token (rememberMe not checked)
  if (sessionOnly === "true") {
    // When browser is reopened, we should check if the token was meant to be session-only
    // If it was session-only and we're in a new session, the sessionStorage will be empty
    // so we need to clear the token from localStorage
    if (window.performance) {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
        // This is just a page reload, not a new browser session
        return true;
      }
    }
  }
  
  return true;
};

// Login user and set token
export const login = (token, rememberMe = false) => {
  localStorage.setItem("authToken", token);
  
  if (!rememberMe) {
    // Mark this token as session-only
    sessionStorage.setItem("sessionOnly", "true");
  } else {
    sessionStorage.removeItem("sessionOnly");
  }
};

// Logout user by removing token
export const logout = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("sessionOnly");
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem("authToken");
}; 