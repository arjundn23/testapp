import React from "react";
import Image from "../assets/image1.png";

const Leftside = () => {
  return (
    <div className="w-full md:w-1/2 h-full bg-cover bg-center">
      <img
        src={Image}
        alt="Login Side Image"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Leftside;
