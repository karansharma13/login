import { isAuthenticated, logout } from "./authService";

export const fetchUsers = async (page, limit, navigate) => {
  if (!isAuthenticated()) {
    console.log("User not authenticated");
    return {
      error: "Please log in to view users",
      users: [],
      total: 0,
    };
  }

  try {
    const skip = (page - 1) * limit;
    const token = localStorage.getItem('token');
    console.log("Fetching users with params:", { page, limit, skip });
    
    const response = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      {
        method: 'GET', // explicitly specify the method
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      }
    );

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      if (response.status === 401) {
        logout();
        navigate && navigate("/");
        throw new Error("Session expired. Please log in again.");
      }
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Received data:", data);
    
    if (!data.users || !Array.isArray(data.users)) {
      console.error("Invalid data structure:", data);
      throw new Error("Unexpected API response: 'users' array not found");
    }
    
    return {
      users: data.users,
      total: data.total,
      error: null,
    };
  } catch (err) {
    console.error("Fetch Error:", err);
    return {
      error: err.message || "Failed to fetch users. Please try again later.",
      users: [],
      total: 0,
    };
  }
};

export const filterUsers = (users, searchTerm, genderFilter, ageFilter) => {
  let result = users;
  
  if (genderFilter !== "all") {
    result = users.filter(user => user.gender === genderFilter);
  }
  
  if (ageFilter !== "all") {
    switch(ageFilter) {
      case "<25":
        result = result.filter(user => user.age < 25);
        break;
      case "25-40": 
        result = result.filter(user => user.age >= 25 && user.age <= 40);
        break;
      case ">40":
        result = result.filter(user => user.age > 40);
        break;
      default:
        break;
    }
  }
  
  if (searchTerm && searchTerm.trim() !== "") {
    const term = searchTerm.toLowerCase();
    result = result.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.phone && user.phone.includes(term)) ||
      (user.hairColor && user.hairColor.toLowerCase().includes(term))
    );
  }
  
  return result;
}; 