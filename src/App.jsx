import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/Login";
import UserTable from "../src/components/ui/UserTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserTable />} />
      </Routes>
    </Router>
  );
};

export default App;
