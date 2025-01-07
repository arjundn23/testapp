import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import PinnedFiles from "../../components/PinnedFiles";
import RecentlyViewed from "../../components/RecentlyViewed";
import FilteredFiles from "../../components/FilteredFiles";
import useUserData from "../../hooks/useUserData";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const FileBrowser = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const { data, error } = useUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate,error,data,dispatch]);

  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter(null); // Toggle off if clicking the same filter
    } else {
      setActiveFilter(filterType);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={"Home"} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-6 px-12 overflow-y-auto">
        <SearchBar 
          plus={false} 
          filter={true} 
          onFilterClick={handleFilterClick}
          activeFilter={activeFilter}
        />
        
        {activeFilter ? (
          <FilteredFiles filterType={activeFilter} check={true} />
        ) : (
          <>
            <PinnedFiles />
            <RecentlyViewed check={true} />
          </>
        )}
      </main>
    </div>
  );
};

export default FileBrowser;
