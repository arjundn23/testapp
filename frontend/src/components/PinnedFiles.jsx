import React from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/0.png";
import image2 from "../assets/1.png";
import image3 from "../assets/2.png";

const style =
  "px-4 py-3 bg-white rounded flex items-center gap-3 text-[14px] sm:text-[16px] transition shadow-md cursor-pointer w-full sm:w-auto text-[rgba(34, 34, 33, 1)]";

const imageStyle =
  "w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] object-cover rounded-md cursor-pointer";

const PinnedFiles = () => {
  return (
    <div className="mt-10 font-bitter">
      {/* Header */}
      <h3 className="text-[20px] sm:text-[24px] font-semibold">PINNED FILES</h3>

      {/* Files Container */}
      <div className="flex flex-col flex-wrap sm:flex-row gap-4 mt-4">
        {/* File 1 */}
        <Link to="/viewfile" className={style}>
          <img src={image1} alt="Menu templates" className={imageStyle} />
          <span className="truncate">Menu templates</span>
        </Link>

        {/* File 2 */}
        <Link to="/viewfile" className={style}>
          <img
            src={image2}
            alt="Editable theme day menus"
            className={imageStyle}
          />
          <span className="truncate">Editable theme day menus</span>
        </Link>

        {/* File 3 */}
        <Link to="/viewfile" className={style}>
          <img
            src={image3}
            alt="Portrait screen templates"
            className={imageStyle}
          />
          <span className="truncate">Portrait screen templates</span>
        </Link>
      </div>
    </div>
  );
};

export default PinnedFiles;
