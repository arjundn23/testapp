import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";

import { useGenerateLinkMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useDispatch } from "react-redux";
import useUserData from "../../hooks/useUserData.js";

const inputfieldstyle =
  "w-full px-4 py-3 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-800 shadow-sm transition duration-200";

const Register = () => {
  const { data, error: dataError } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataError) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate, dataError, data, dispatch]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [generateLink, { isLoading, isError, error }] =
    useGenerateLinkMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsAdmin(true);
      const response = await generateLink({ name, email, isAdmin }).unwrap();
      toast.success("User registered successfully!", { autoClose: 2000 });
    } catch (err) {
      toast.error("Failed to register user!", { autoClose: 2000 });
    }
  };

  return (
    <div className="flex font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={"User"} />

      {/* Main Content */}
      <main className="h-screen flex-grow bg-gray-50 py-8 px-6">
        <div className="flex items-center justify-center h-full">
          {/* Form Container */}
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-white">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                Register
              </h2>
              <p className="text-sm md:text-base text-center font-light tracking-wide">
                Create a New User Account
              </p>
            </div>

            <div className="p-8">
              {/* Form */}
              <form className="space-y-6" onSubmit={submitHandler}>
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className={inputfieldstyle}
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className={inputfieldstyle}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Role
                  </label>
                  <select
                    className={inputfieldstyle}
                    value={isAdmin ? "admin" : "user"}
                    onChange={(e) =>
                      setIsAdmin(e.target.value === "admin" ? true : false)
                    }
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-[8px] hover:bg-orange-600 shadow-lg transition duration-200 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
