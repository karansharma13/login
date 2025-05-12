import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import logo from "./assets/workforce-logo.png"; // Replace with your logo path
import workerImage from "./assets/worker-image.png"; // Replace with your worker image path
import Sign from "./assets/sign.png"; // Replace with your logo path
import { Eye, EyeOff } from "lucide-react"; // Import the Eye and EyeOff components

const App = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  // Email and Password validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { email, password, rememberMe });
      // Add your login logic here (e.g., API call)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="flex w-auto h-auto rounded-lg shadow-lg bg-white">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center mb-6"></div>
          <img src={logo} alt="WorkForce Logo" className="mb-10 h-17" />
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-600 mb-6">
            Welcome back! Please enter your details to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email"></Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // className="mt-1"
                placeholder="Email Address"
                className="mt-1 border-gray-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="password"></Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label htmlFor="remember" className="ml-2 text-sm">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-green-600 hover:underline">
                Forgot Password
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative">
          <img
            src={workerImage}
            alt="Worker with AR glasses"
            className="h-medium w-medium object-cover rounded-r-lg"
          />
          <div className="mt-5 flex items-center justify-center">
            <img src={Sign} alt="Sign" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
