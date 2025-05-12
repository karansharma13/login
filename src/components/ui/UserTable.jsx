import React, { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "./Button";
import logo from "../../assets/workforce-logo.png"; // Replace with your logo path
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users); // The API returns a "users" array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Test the API response structure
  useEffect(() => {
    if (users.length > 0) {
      console.log("Sample user data:", users[0]);
    }
  }, [users]);

  // Define columns using createColumnHelper
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

  // Initialize TanStack Table
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
            onClick={() => navigate("/")}
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
      </div>
    </div>
  );
};

export default UserTable;
