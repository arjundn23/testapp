import { FaCog, FaImage, FaUser, FaPlus } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

import video_vector from "../assets/Vectors/Vector-1.png";
import image_vector from "../assets/Vectors/Vector-2.png";
import doc_vector from "../assets/Vectors/Vector-3.png";

import setting_vector from "../assets/Vectors/setting.png";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

import useUserData from "../hooks/useUserData";
import useUserInfo from "../hooks/useUserInfo";

import { toast } from "react-toastify";
import { files } from "../constant/data";

const filterBoundry =
  "flex items-center gap-3 pl-2 pr-4 py-1 bg-white rounded shadow-sm hover:shadow-md transition text-sm sm:text-base md:text-lg";

const SearchBar = ({ plus, filter, onFilterClick, activeFilter }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useUserData();
  const userInfo = useUserInfo();

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle user data
  useEffect(() => {
    if (data) {
      setIsAdmin(data.isAdmin);
    } else if (error) {
      toast.error("Error fetching user data");
    }
  }, [data, error]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown1Ref.current &&
        !dropdown1Ref.current.contains(event.target) &&
        dropdown2Ref.current &&
        !dropdown2Ref.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown1 = () => {
    setOpenDropdown(openDropdown === 1 ? null : 1);
  };

  const toggleDropdown2 = () => {
    setOpenDropdown(openDropdown === 2 ? null : 2);
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
    <div className="flex flex-col gap-4 w-full relative">
      {/* Top Row: Search Bar and Icons */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-[80%] flex flex-row gap-6 items-center" ref={searchRef}>
          <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#222221]" />
          <input
            type="text"
            placeholder="Search anything here"
            className="pl-16 pr-4 h-[44px] text-[14px] rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          {/* Suggestions Dropdown */}
          {showSuggestions && searchTerm && (
            <div className="absolute left-0 right-0 top-[44px] bg-white rounded-b-md shadow-lg max-h-[400px] overflow-y-auto z-50 border-t">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                  <Link
                    to="/viewfile"
                    key={index}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <img
                      src={file.image}
                      alt={file.name}
                      className="w-[40px] h-[40px] object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] text-gray-800">{file.name}</span>
                      <span className="text-[12px] text-gray-500">{file.category}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-center">No files found</div>
              )}
            </div>
          )}
        </div>

        {/* Icons Group */}
        <div className="flex items-center gap-2">
          {/* Add Icon */}
          {plus && (
            <div className="p-3 cursor-pointer bg-[#D9534F] rounded-[7px]">
              <FaPlus className="text-md md:text-xl text-white" />
            </div>
          )}
          {/* Settings Icon with Dropdown */}
          <div className="relative" ref={dropdown1Ref}>
            <div
              onClick={toggleDropdown1}
              className="p-3 cursor-pointer bg-white rounded-[7px]"
            >
              <FaCog className="text-md md:text-xl text-gray-600" />
            </div>
            {openDropdown === 1 && isAdmin && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg">
                <Link
                  to={userInfo ? "/delete" : "#"}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 transition"
                >
                  User List
                </Link>
                <Link
                  to={userInfo ? "/register" : "#"}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 transition"
                >
                  Add User
                </Link>
              </div>
            )}
          </div>
          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdown2Ref}>
            <div
              onClick={toggleDropdown2}
              className="p-3 cursor-pointer bg-white rounded-[7px]"
            >
              <FaUser className="text-md md:text-xl text-gray-600" />
            </div>
            {openDropdown === 2 && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg">
                <Link
                  to="/info"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Row: Filter Buttons */}
      {filter && (
        <div className="flex flex-wrap gap-2 sm:gap-4 font-bitter justify-start">
          {/* Documents */}
          <button
            onClick={() => onFilterClick('documents')}
            className={`${filterBoundry} w-full sm:w-auto md:w-[150px] lg:w-[180px] ${
              activeFilter === 'documents' ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
              <img src={doc_vector} alt="" />
            </div>
            <span className="text-[12px] sm:text-[14px] md:text-[16px] text-center">
              Documents
            </span>
          </button>

          {/* Images */}
          <button
            onClick={() => onFilterClick('images')}
            className={`${filterBoundry} w-full sm:w-auto md:w-[150px] lg:w-[180px] ${
              activeFilter === 'images' ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
              <img src={image_vector} alt="" />
            </div>
            <span className="text-[12px] sm:text-[14px] md:text-[16px] text-center">
              Images
            </span>
          </button>

          {/* Videos */}
          <button
            onClick={() => onFilterClick('videos')}
            className={`${filterBoundry} w-full sm:w-auto md:w-[150px] lg:w-[180px] ${
              activeFilter === 'videos' ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
              <img src={video_vector} alt="" />
            </div>
            <span className="text-[12px] sm:text-[14px] md:text-[16px] text-center">
              Videos
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
