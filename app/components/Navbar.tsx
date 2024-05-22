import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg";

const Header = () => {
  return (
    <div className="relative">
      <div className="w-full  fixed top-0 z-1000 bg-white">
        <div className="flex items-center justify-between h-[10vh]  w-[90%] mx-auto  ">
          <div className="ml-2">
            <Image
              src={logo}
              width={100}
              height={100}
              className="h-[20vh] md:h-[8vh] w-[10vw] md:w-[8vw]"
              alt="logo"
            />
          </div>
          <div className="mr-5">
            <div className="flex items-center justify-center border border-2 border-black hover:border-blue-500 hover:text-blue-500 py-5 px-10 m-5 rounded-2xl h-8 w-fit font-bold  ">
              Contact Us
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
