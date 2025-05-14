import React, { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "./button";
import logo from "../../assets/workforce-logo.png"; // Replace with your logo path
import { useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/authService";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(5); // Users per page
  const [totalUsers, setTotalUsers] = useState(0); // Total users from API
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log("UserTable: Not authenticated, redirecting to /");
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Fetch users from the API with pagination and auth token
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      if (!isAuthenticated()) {
        setError("Please log in to view users");
        setLoading(false);
        navigate("/");
        return;
      }

      try {
        const skip = (page - 1) * limit; // Calculate skip for pagination
        const response = await fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
          //{
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            navigate("/");
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("UserTable: Fetch response data:", data);
        if (!data.users || !Array.isArray(data.users)) {
          throw new Error("Unexpected API response: 'users' array not found");
        }
        setUsers(data.users);
        setTotalUsers(data.total); // Total users from API response
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, navigate]); // Re-fetch when page or limit changes

  // Test the API response structure
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users Data Sample:", users[0]);
    } else if (!loading && !error) {
      console.log("No users data received");
    }
  }, [users, loading, error]);

  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("firstName", {
        header: () => "First Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("lastName", {
        header: () => "Last Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("phone", {
        header: () => "Phone",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("age", {
        header: () => "Age",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("gender", {
        header: () => "Gender",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / limit);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle limit change
  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setPage(1); // Reset to page 1 when limit changes
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 py-10">
      <div className="w-full max-w-[1440px] px-10">
        <img
          src={logo}
          alt="WorkForce Logo"
          className="mb-8 h-[79.5px] w-[288.42px] mx-auto"
        />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900">User List</h2>
          <Button
            onClick={handleLogout}
            className="bg-green-800 text-white rounded-md py-2 px-4 text-base font-medium"
          >
            Log Out
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4 text-left text-gray-700 font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-4 text-gray-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Showing {users.length} of {totalUsers} users
            </span>
            <div className="flex items-center space-x-2">
              <label htmlFor="limit" className="text-gray-600">
                Users per page:
              </label>
              <select
                id="limit"
                value={limit}
                onChange={handleLimitChange}
                className="border rounded-md p-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-gray-300 text-gray-700 rounded-md py-1 px-3 disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-gray-300 text-gray-700 rounded-md py-1 px-3 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
