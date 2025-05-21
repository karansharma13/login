// Authentication service to handle token management
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const sessionOnly = sessionStorage.getItem("sessionOnly");
  
  if (!token) return false;

  if (sessionOnly === "true") {
    return true;
  }
  return true;
};

// Login user and set token
export const login = (token, rememberMe = false) => {
  localStorage.setItem("authToken", token);
  
  if (!rememberMe) {
   
    sessionStorage.setItem("sessionOnly", "true");
    sessionStorage.setItem("authToken", token);
  } else {
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