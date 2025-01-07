import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { PiFoldersFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { RiUserShared2Fill, RiDeleteBin5Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import useUserInfo from "../hooks/useUserInfo";
import useUserData from "../hooks/useUserData";

import logo from "../assets/Vectors/logo.png";

const Sidebar = ({ activeLink }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userInfo = useUserInfo();
  const { data, error } = useUserData();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (data) {
      setIsAdmin(data.isAdmin);
    } else if (error) {
      toast.error("Error fetching user data");
    }
  }, [data, error]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getLinkClass = (linkName) =>
    linkName === activeLink
      ? "flex items-center gap-4 px-3 py-2 rounded-lg bg-white text-[#D9534F] font-medium text-[15px] font-bitter"
      : "flex items-center gap-4 px-3 py-2 rounded-lg text-[15px] hover:bg-white hover:text-[#D9534F] transition font-light hover:font-medium font-bitter";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-6 left-1 z-30 bg-[#C95C34] text-white text-sm p-2 rounded shadow-lg md:hidden"
      >
        {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-screen min-w-64 bg-[#C95C34] text-white z-20 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 flex flex-col md:min-w-72 md:h-screen px-6 py-6 md:py-3 justify-between overflow-y-auto`}
      >
        {/* Header */}
        <div>
          <img
            src={logo}
            alt="Independents by Sodexo Logo"
            className="mx-auto mb-[30px] mt-[15px]"
          />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <Link
            to={userInfo ? "/filebrowse" : "#"}
            className={getLinkClass("Home")}
          >
            <IoMdHome className="text-xl" />
            Home
          </Link>

          {isAdmin && (
            <Link
              to={userInfo ? "/addfile" : "#"}
              className={getLinkClass("Add")}
            >
              <div className="relative inline-block">
                <PiFoldersFill className="text-xl hover:text-[#D9534F]" />
                <CiCirclePlus className="absolute bottom-0 right-0 text-[12px] bg-white text-[#D9534F] rounded-full" />
              </div>
              Add File
            </Link>
          )}

          <Link
            to={userInfo ? "/allfiles" : "#"}
            className={getLinkClass("All Files")}
          >
            <PiFoldersFill className="text-xl" />
            All Files
          </Link>

          <Link
            to={userInfo ? "/shared" : "#"}
            className={getLinkClass("Shared")}
          >
            <HiUsers className="text-xl" />
            Shared with Me
          </Link>

          <Link
            to={userInfo ? "/favourites" : "#"}
            className={getLinkClass("Favourites")}
          >
            <FaHeart className="text-xl" />
            Favourites
          </Link>

          {isAdmin && (
            <Link
              to={userInfo ? "/register" : "#"}
              className={getLinkClass("User")}
            >
              <RiUserShared2Fill className="text-xl" />
              Add User
            </Link>
          )}

          {isAdmin && (
            <Link
              to={userInfo ? "/delete" : "#"}
              className={getLinkClass("Delete")}
            >
              <RiDeleteBin5Line className="text-xl" />
              Delete User
            </Link>
          )}
        </nav>

        {/* Categories Section */}
        <div>
          <h3 className="text-lg font-semibold mb-[5px] font-bitter px-4">CATEGORIES</h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/category/Introduction"
                className="flex items-center gap-2 text-sm hover:font-medium font-light cursor-pointer font-bitter px-4 py-1"
              >
                Introduction
              </Link>
            </li>
            <li>
              <Link
                to="/category/Pre-Launch"
                className="flex items-center gap-2 text-sm hover:font-medium font-light cursor-pointer font-bitter px-4 py-1"
              >
                Pre-Launch
              </Link>
            </li>
            <li>
              <Link
                to="/category/Senior Collateral"
                className="flex items-center gap-2 text-sm hover:font-medium font-light cursor-pointer font-bitter px-4 py-1"
              >
                Senior Collateral
              </Link>
            </li>
            <li>
              <Link
                to="/category/Prep Collateral"
                className="flex items-center gap-2 text-sm hover:font-medium font-light cursor-pointer font-bitter px-4 py-1"
              >
                Prep Collateral
              </Link>
            </li>
            <li>
              <Link
                to="/category/Additional Collateral"
                className="flex items-center gap-2 text-sm hover:font-medium font-light cursor-pointer font-bitter px-4 py-1"
              >
                Additional Collateral
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="text-xs text-white opacity-70">
          {new Date().getFullYear()} Independents by Sodexo
        </footer>
      </aside>

      {/* Background Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
