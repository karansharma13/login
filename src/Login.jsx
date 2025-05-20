import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import logo from "./assets/workforce-logo.png"; // Replace with your logo path
import workerImage from "./assets/worker-image.png"; // Replace with your worker image path
import Sign from "./assets/sign.png"; // Replace with your logo path
import { Eye, EyeOff } from "lucide-react"; // Import the Eye and EyeOff components
import { isAuthenticated, login } from "./services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      // If authenticated, navigate to users page
      navigate("/users");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "", general: "" });
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (
            email === "karan_sharma@gmail.com" &&
            password === "password123"
          ) {
            resolve();
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 1000);
      });

      // Generate a mock auth token
      const authToken = "mock-auth-token-" + Date.now();
      
      // Use the auth service to login
      login(authToken, rememberMe);

      // Clear form state
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setShowPassword(false);

      // Navigate to the users table page
      console.log("Navigating to /users");
      navigate("/users");
    } catch (error) {
      setErrors({ email: "", password: "", general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] h-auto md:h-[700px] rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full md:w-[611.405px] p-10 md:mr-[177.19px]">
          <img
            src={logo}
            alt="WorkForce Logo"
            className="mb-[99.35px] h-[79.5px] w-[288.42px] t-[67.65px] l-[72.9px] md:mx-0"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-gray-900 text-center md:text-left">
            Login
          </h2>
          <p className="text-gray-600 mb-4 md:mb-[23.25px] text-sm sm:text-base text-center md:text-left">
            Welcome back! Please enter your details to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 md:mb-[12px]">
              <Label htmlFor="email" className="sr-only">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full border-gray-300 rounded-md p-3 text-base focus:ring-0 focus:border-gray-400"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4 md:mb-[20.5px]">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-gray-300 rounded-md p-3 text-base pr-10 focus:ring-0 focus:border-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
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

            {errors.general && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {errors.general}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-0">
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="h-4 w-4"
                  disabled={isLoading}
                />
                <Label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-green-600 hover:underline">
                Forgot Password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white rounded-md py-3 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2 lg:w-[611.405px] relative">
          <img
            src={workerImage}
            alt="Worker with AR glasses"
            className="absolute w-[576px] h-[564.25px] top-[40.88px] left-[-26.565px] rounded-[28.1px] object-cover"
          />
          <div className="absolute bottom-10 left-0 right-0 flex justify-center ">
            <img src={Sign} alt="Sign" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
