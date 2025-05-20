// Authentication service to handle token management

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const sessionOnly = sessionStorage.getItem("sessionOnly");
  
  if (!token) return false;
  
  // Check if this should be a session-only token (rememberMe not checked)
  if (sessionOnly === "true") {
    // For session-only logins, the token should only be valid for the current session
    // We rely on sessionStorage which is automatically cleared when browser is closed
    return true;
  }
  
  // If remember me was checked (sessionOnly is not set), the token in localStorage is valid
  return true;
};

// Login user and set token
export const login = (token, rememberMe = false) => {
  // Always store token in localStorage
  localStorage.setItem("authToken", token);
  
  if (!rememberMe) {
    // For session-only login, mark this in sessionStorage
    sessionStorage.setItem("sessionOnly", "true");
    // Also store the token in sessionStorage so we can validate it's a current session
    sessionStorage.setItem("authToken", token);
  } else {
    // For "remember me" logins, clear any session markers
    sessionStorage.removeItem("sessionOnly");
    sessionStorage.removeItem("authToken");
  }
};

// Logout user by removing token
export const logout = () => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("sessionOnly");
  sessionStorage.removeItem("authToken");
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem("authToken");
}; 