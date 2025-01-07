import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useUserData from "../../hooks/useUserData";
import { logout } from "../../slices/authSlice";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import CategoryFiles from "../../components/CategoryFiles";

const categories = [
  "Introduction",
  "Pre-Launch",
  "Senior Collateral",
  "Prep Collateral",
  "Additional Collateral"
];

const CategoryPage = () => {
  const { category } = useParams();
  const { data, error } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate, error, data, dispatch]);

  useEffect(() => {
    if (!categories.includes(category)) {
      navigate("/");
    }
  }, [category, navigate]);

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={"Category"} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-6 px-12 overflow-y-auto">
        <SearchBar plus={true} filter={false} />
        <CategoryFiles category={category} check={true} />
      </main>
    </div>
  );
};

export default CategoryPage;
