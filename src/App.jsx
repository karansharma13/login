import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/Login";
import UserTable from "../src/components/ui/UserTable";
import { isAuthenticated } from "./services/authService";

const App = () => {
  // Handle redirects after page refresh
  useEffect(() => {
    // Check if we have a stored path from a refresh
    const redirectPath = localStorage.getItem('redirectPath');
    if (redirectPath) {
      // Clear it immediately to prevent future issues
      localStorage.removeItem('redirectPath');
      
      // Only redirect to protected routes if authenticated
      if (redirectPath.includes('users') && isAuthenticated()) {
        // Use history API to navigate without a full page refresh
        window.history.replaceState(null, '', redirectPath);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserTable />} />
        {/* Add a catch-all route that redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
