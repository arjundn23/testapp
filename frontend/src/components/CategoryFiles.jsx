import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaList, FaTh } from "react-icons/fa";
import { files } from "../constant/data";

const colHeader =
  "p-3 text-left text-[14px] sm:text-[16px] font-semibold font-bitter";

const CategoryFiles = ({ category, check }) => {
  const [view, setView] = useState("list");

  const toggleView = (viewType) => {
    setView(viewType);
  };

  const filteredFiles = useMemo(() => {
    return files.filter(file => file.category === category);
  }, [category]);

  return (
    <div className="mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] sm:text-[24px] font-semibold font-bitter">
          {category.toUpperCase()}
        </h3>

        {check && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleView("list")}
              className={`p-2 rounded-full`}
            >
              <FaList
                className={`text-xl ${
                  view === "list" ? "text-gray-800" : "text-gray-400"
                }`}
              />
            </button>
            <button
              onClick={() => toggleView("grid")}
              className={`p-2 rounded-full`}
            >
              <FaTh
                className={`text-xl ${
                  view === "grid" ? "text-gray-800" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* File Display: List or Grid */}
      {view === "list" ? (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto border-spacing-0">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-300 font-bitter">
                {check && (
                  <>
                    <th className={colHeader}>Name</th>
                    <th className={colHeader}>Type</th>
                    <th className={colHeader}>Size</th>
                  </>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredFiles.map((file, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td
                    className="p-3 text-[14px] sm:text-[16px]"
                    style={{ color: "rgba(34, 34, 33, 1)" }}
                  >
                    <Link to="/viewfile" className="flex items-center gap-4">
                      {/* Image */}
                      <img
                        src={file.image}
                        alt={file.name}
                        className="w-[50px] h-[50px] sm:w-[61px] sm:h-[61px] object-cover rounded-md"
                      />
                      {file.name}
                    </Link>
                  </td>
                  {check && (
                    <>
                      <td
                        className="p-3 text-[14px] sm:text-[16px]"
                        style={{ color: "rgba(34, 34, 33, 1)" }}
                      >
                        {file.type}
                      </td>
                      <td
                        className="p-3 text-[14px] sm:text-[16px]"
                        style={{ color: "rgba(34, 34, 33, 1)" }}
                      >
                        {file.size}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file, index) => (
            <Link to="/viewfile" key={index}>
              <div
                className="border p-2 rounded-xl flex gap-4"
                style={{ background: "rgba(232, 232, 232, 1)" }}
              >
                {/* Image */}
                <img
                  src={file.image}
                  alt={file.name}
                  className="w-[70px] h-[70px] sm:w-[83px] sm:h-[83px] object-cover rounded-md"
                />

                {/* File Details */}
                <div>
                  <div className="text-[14px] sm:text-[16px] font-light tracking-wider">
                    {file.name}
                  </div>
                  <div
                    className="text-[14px] sm:text-[16px]"
                    style={{ color: "rgba(134, 133, 133, 1)" }}
                  >
                    {file.type}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {filteredFiles.length === 0 && (
        <div className="mt-4 text-center text-gray-500 py-8 bg-white rounded-md">
          No files in {category}
        </div>
      )}
    </div>
  );
};

export default CategoryFiles;
