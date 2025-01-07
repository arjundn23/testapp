import React from "react";
import Leftside from "../../components/Leftside";
import Logo from "../../assets/Layer_1.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserData from "../../hooks/useUserData";
import { toast } from "react-toastify";
import { useTokenUserProfileMutation, useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const inputfieldstyle =
  "w-full px-3 py-2 border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-500";

const Link = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, error } = useUserData();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [updateTokenUser, { isLoading: isUpdatingUser }] =
    useTokenUserProfileMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect (() => {
    console.log(window.location.href)
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    if (data) {
      setName(data.username);
      setPassword(data.password);
      setEmail(data.email);
    } else if (error) {
      toast.error("Error fetching user data", { autoClose: 2000 });
    }
  }, [data, error]);

  const handleSave = async () => {
    try {
      await updateTokenUser({
        name,
        email,
        password: password !== "******" ? password : undefined,
      }).unwrap();
      navigate("/");
    } catch (err) {
      toast.error("An error occurred while saving changes for token user.", {
        autoClose: 2000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-poppins relative">
      {/* Left Side */}
      <Leftside />

      {/* Form */}
      <div className="flex flex-col justify-center w-full p-8 md:p-12 lg:w-1/2 lg:p-16 bg-[#C95C34]">
        <div className="rounded-[26px] px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-16 shadow-md bg-[#F7F2EC]">
          <h2 className="text-xl md:text-2xl font-semibold text-center mb-0 tracking-widest">
            INDEPENDENTS
          </h2>
          <h4 className="text-sm md:text-base text-center -mt-1 tracking-widest font-light mb-6">
            BY SODEXO
          </h4>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                className={inputfieldstyle}
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                className={inputfieldstyle}
                placeholder="Email"
                value={email}
                disabled
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={inputfieldstyle}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex gap-1">
              <button
                className="w-full bg-black text-white py-2 px-6 rounded-[6px] hover:bg-gray-800 transition"
                onClick={handleSave}
                disabled={isUpdatingUser}
              >
                Save
              </button>

              <button
                className="w-full bg-red-700 text-white py-2 px-6 rounded-[6px] hover:bg-red-500 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute inset-0 flex justify-center mt-3 pointer-events-none z-10">
        <img
          src={Logo}
          alt="Logo"
          className="w-[130px] h-[130px] md:w-30 md:h-30 object-contain"
        />
      </div>
    </div>
  );
};

export default Link;
