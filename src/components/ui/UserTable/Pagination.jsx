import React from "react";
import { Button } from "../button";

const Pagination = ({
  page,
  totalPages,
  limit,
  totalUsers,
  filteredUsers,
  handlePageChange,
  handleLimitChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <span className="text-gray-600 text-sm text-center sm:text-left">
          Showing {filteredUsers.length} of {totalUsers} users
        </span>
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-600 text-sm whitespace-nowrap">
            Per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="border rounded-md p-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 text-gray-700 rounded-md py-1 px-3 disabled:opacity-50 text-sm"
        >
          Previous
        </Button>
        <span className="text-gray-600 text-sm whitespace-nowrap">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 text-gray-700 rounded-md py-1 px-3 disabled:opacity-50 text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination; 