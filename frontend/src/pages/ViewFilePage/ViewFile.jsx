import React from "react";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import { FaDownload, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Image from "../../assets/image2.png";
import avatar1 from "../../assets/Ellipse 193.png";
import avatar2 from "../../assets/Ellipse 194.png";
import avatar3 from "../../assets/Ellipse 195.png";
import avatar4 from "../../assets/Ellipse 196.png";

import { useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const ViewFile = () => {
  const { data, error } = useUserData();
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (error) {
  //     navigate("/");
  //     dispatch(logout());
  //   }
  // }, [navigate,error,data,dispatch]);

  useEffect(() => {
    if (data) {
      setIsAdmin(data.isAdmin);
    } else if (error) {
      toast.error("Error fetching user data");
    }
  }, [data, error]);

  return (
    <div className="flex h-screen font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={""} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-10 px-12 overflow-y-auto">
        <SearchBar plus={false} filter={false} />

        <h3 className="mt-6 text-sm text-gray-600">
          Home / Category / Allergen pull up banner
        </h3>

        {/* File Detail Section */}
        <div className="flex gap-6 mt-4">
          {/* Image Preview */}
          <div className="w-1/2 max-w-md pr-4">
            <img
              src={Image}
              alt="File Preview"
              className="w-full h-auto max-h-[30rem] object-center"
            />
          </div>

          {/* File Information */}
          <div className="w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bitter tracking-wider">
                ALLERGEN PULL UP BANNER
              </h1>
              {isAdmin && (
                <div className="flex gap-4">
                  <button className="hover:scale-110 transition-transform text-[#C95C34] hover:text-[#f85519]">
                    <FaEdit size={20} />
                  </button>
                  <button className="hover:scale-110 transition-transform text-[#C95C34] hover:text-[#f85519]">
                    <FaTrash size={20} />
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, id mauris eget adipiscing
              ultrices. Ut aliquet tristique non tellus auctor nibh. Risus quis
              dui tempor quis et at. Ut ad adipiscing lacus curabitur pharetra
              vitae mauris id. Purus praesent mollis...
            </p>

            <ul className="space-y-1 text-gray-700 text-sm">
              <li>
                <strong>File Type:</strong> jpg
              </li>
              <li>
                <strong>File Size:</strong> 5 Mb
              </li>
              <li>
                <strong>Colour Mode:</strong> CMYK
              </li>
              <li>
                <strong>No. Files:</strong> 2
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <button className="text-white py-2 px-5 rounded text-sm flex items-center gap-2 bg-[#C95C34] hover:bg-[#f85519] transition">
                <FaDownload />
                Download
              </button>
              <span className="text-gray-500 text-sm">Downloaded 27 times</span>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                placeholder="https://www.example.com"
                className="flex-grow p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {isAdmin && (
              <div className="flex items-center gap-3 mt-4">
                {/* User Avatars */}
                <div className="flex -space-x-2">
                  <img
                    src={avatar1}
                    alt="User 1"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src={avatar2}
                    alt="User 2"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src={avatar3}
                    alt="User 3"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <img
                    src={avatar4}
                    alt="User 4"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </div>
                <button className="text-gray-500 flex items-center gap-2 text-sm p-1">
                  <FaUserPlus
                    className="rounded-full p-1 text-white bg-[#C95C34] hover:bg-[#f85519] transition"
                    size={25}
                  />
                  Add a user
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewFile;
