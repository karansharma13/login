import React from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Search, User, Users, Filter } from "lucide-react";

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  activeGenderFilter,
  handleGenderFilter,
  activeAgeFilter,
  handleAgeFilter,
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-gray-300 rounded-md p-2 pl-10 text-base 
          
          focus:border-gray-400 w-full"
        />
        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Filter section container */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Gender Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-gray-600 mr-2">Gender:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleGenderFilter("all")}
              className={`py-1 px-3 rounded-md flex items-center gap-1 text-sm ${
                activeGenderFilter === "all"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Users className="h-4 w-4" />
              All
            </Button>
            <Button
              onClick={() => handleGenderFilter("male")}
              className={`py-1 px-3 rounded-md flex items-center gap-1 text-sm ${
                activeGenderFilter === "male"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <User className="h-4 w-4" />
              Male
            </Button>
            <Button
              onClick={() => handleGenderFilter("female")}
              className={`py-1 px-3 rounded-md flex items-center gap-1 text-sm ${
                activeGenderFilter === "female"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <User className="h-4 w-4" />
              Female
            </Button>
          </div>
        </div>
        
        {/* Age Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-600 mr-2">Age:</span>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleAgeFilter("all")}
              className={`py-1 px-3 rounded-md text-sm ${
                activeAgeFilter === "all"
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Ages
            </Button>
            <Button
              onClick={() => handleAgeFilter("<25")}
              className={`py-1 px-3 rounded-md text-sm ${
                activeAgeFilter === "<25"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Under 25
            </Button>
            <Button
              onClick={() => handleAgeFilter("25-40")}
              className={`py-1 px-3 rounded-md text-sm ${
                activeAgeFilter === "25-40"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              25-40
            </Button>
            <Button
              onClick={() => handleAgeFilter(">40")}
              className={`py-1 px-3 rounded-md text-sm ${
                activeAgeFilter === ">40"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Over 40
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls; 