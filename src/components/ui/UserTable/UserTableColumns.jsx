import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

const columnHelper = createColumnHelper();

const createUserTableColumns = () => [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: () => "Avatar",
    cell: (info) => {
      const imageUrl = info.getValue();
      return (
        <div className="flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt="User avatar" 
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40?text=User";
            }}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("firstName", {
    header: () => "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("hairColor", {
    header: () => "Hair Color",
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
    cell: (info) => {
      const value = info.getValue();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  }),
];

export default createUserTableColumns; 