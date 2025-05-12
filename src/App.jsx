import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import logo from "./assets/workforce-logo.png"; // Replace with your logo path
import workerImage from "./assets/worker-image.png"; // Replace with your worker image path
import Sign from "./assets/sign.png"; // Replace with your logo path
import { Eye, EyeOff } from "lucide-react"; // Import the Eye and EyeOff components
import UserTable from "./components/ui/UserTable";
const App = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="flex flex-col md:flex-row w-full min-h-screen rounded-lg shadow-lg bg-white">
        {/* Left Section - Form */}
        <div className="w-full md:w-[611.405px] p-10 md:mr-[177.19px]">
          <img
            src={logo}
            alt="WorkForce Logo"
            className="mb-[99.35px] h-[79.5px] w-[288.42px] t-[67.65px] l-[80.9px] md:mx-0"
          />
          <h2 className="text-4xl font-bold mb-3 h-[54px] w-[98px] l-[80.9px] text-gray-900 text-left">
            Login
          </h2>
          <p className="text-gray-600 mb-[23.25px]  text-base text-left">
            Welcome back! Please enter your details to login.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-[12px] l-[80.9px]">
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
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-[20.5px]">
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
                  className="h-4 w-4"
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

            <Button
              type="submit"
              className="md-[221.88px] w-full bg-green-800 text-white rounded-md py-3 text-base font-medium"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={workerImage}
            alt="Worker with AR glasses"
            className="absolute w-[576px] h-[764.25px] top-[40.88px] left-[61.98px] rounded-[28.1px] object-cover"
          />
          <div className="absolute w-[132.5px] h-[41.25px] top-[83.62px] left-[140.54px] flex justify-center">
            <img src={Sign} alt="Sign" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
