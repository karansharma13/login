import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import logo from "../../../assets/workforce-logo.png";
import { Button } from "../button";
import { isAuthenticated, logout } from "../../../services/authService";
import { fetchUsers, filterUsers } from "../../../services/userService";
import { Menu } from "lucide-react";

// Import sub-components
import FilterControls from "./FilterControls";
import Pagination from "./Pagination";
import UserTableView from "./UserTableView";
import createUserTableColumns from "./UserTableColumns";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenderFilter, setActiveGenderFilter] = useState("all");
  const [activeAgeFilter, setActiveAgeFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("UserTable: Not authenticated, redirecting to /");
      navigate("/");
    }
  }, [navigate]);

  // Fetch users from the API
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const result = await fetchUsers(page, limit, navigate);
      
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.users);
        setFilteredUsers(result.users);
        setTotalUsers(result.total);
        setError(null);
      }
      
      setLoading(false);
    };

    loadUsers();
  }, [page, limit]);

  // Apply filters when filtering conditions change
  useEffect(() => {
    const filtered = filterUsers(users, searchTerm, activeGenderFilter, activeAgeFilter);
    setFilteredUsers(filtered);
  }, [users, searchTerm, activeGenderFilter, activeAgeFilter]);

  // Table columns
  const columns = useMemo(() => createUserTableColumns(), []);
  
  // Create table instance
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Event handlers
  const handleGenderFilter = (gender) => {
    setActiveGenderFilter(gender);
  };
  
  const handleAgeFilter = (ageRange) => {
    setActiveAgeFilter(ageRange);
  };
  
  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(totalUsers / limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setPage(1); // Reset to page 1 when limit changes
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 py-6 px-4 sm:py-10 sm:px-6">
      <div className="w-full max-w-[1440px]">
        {/* Header with logo and responsive menu */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <img
              src={logo}
              alt="WorkForce Logo"
              className="w-[180px] sm:w-[220px] md:w-[288.42px]"
            />
            <button 
              className="sm:hidden bg-gray-200 p-2 rounded-md"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          
          <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row justify-between items-center w-full sm:w-auto gap-4 mt-4 sm:mt-0`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">User List</h2>
            <Button
              onClick={handleLogout}
              className="bg-green-800 text-white rounded-md py-2 px-4 text-base font-medium w-full sm:w-auto"
            >
              Log Out
            </Button>
          </div>
        </div>
        
        {/* Filter Controls */}
        <FilterControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeGenderFilter={activeGenderFilter}
          handleGenderFilter={handleGenderFilter}
          activeAgeFilter={activeAgeFilter}
          handleAgeFilter={handleAgeFilter}
        />
        
        {/* User Table View */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <UserTableView table={table} columns={columns} />
        </div>
        
        {/* Pagination Controls */}
        <Pagination 
          page={page}
          totalPages={totalPages}
          limit={limit}
          totalUsers={totalUsers}
          filteredUsers={filteredUsers}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default UserTable; 