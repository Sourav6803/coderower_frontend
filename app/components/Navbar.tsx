import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg";

const Header = () => {
  return (
    <div className="relative">
      <div className="w-full  fixed top-0 z-1000 bg-white">
        <div className="flex items-center justify-between h-[7vh] md:h-[10vh]  w-[90%] mx-auto  ">
          <div className=" ">
            <Image
              src={logo}
              width={200}
              height={200}
              objectFit="cover"
              
              className="  md:h-[6vh] w-[15vw]"
              alt="logo"
            />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-center border border-2 border-black hover:border-blue-500 hover:text-blue-500 py-3 md:py-5 md:px-10 px-5  m-2 md:m-5 rounded-2xl h-6 md:h-8 w-fit font-bold  ">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
