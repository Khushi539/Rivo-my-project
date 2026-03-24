import React from "react";
import headerImage from "../assets/Mask.png";
import dots from "../assets/dots.png";
import {Navigate, useNavigate} from "react-router-dom"


const Main = ()=> {
    const Navigate = useNavigate();
    return (
      <>
        <div className="bg-[#dff5e6]">
          <div className=" max-w-7xl md:flex md:justify-between mx-auto   px-6 py-14 items-center">
            <div>
              <h2 className="text-4xl md:text-7xl    text- text-green-900 font-bold leading-tight font-rufina">
                Discover and <br /> Find Your Own <br /> Fashion!
              </h2>
              <p className="mt-4 text-green-800 max-w-md">
                Explore our curated collection of stylish clothing and
                accessories tailored to your unique taste.
              </p>
              <button
                onClick={() => Navigate("explore")}
                className="mt-6 mb-10 cursor-pointer shadow shadow-2xl md:mb-0 hover:text-black hover:bg-[#6BC785] bg-green-800 text-white px-6 py-3 rounded"
              >
                Explore Now
              </button>
            </div>

            <div className="relative">
              <img
                className=" absolute h-[70px] md:h-[85px] top-[125px]  right-2 z-40"
                src={dots}
                alt=""
              />
              <img
                src={headerImage}
                alt="model"
                className="rounded-2xl z-10 relative  md:w-110"
              />
              <img
                className="absolute bottom-[55px] left-[14px] h-[70px] md:h-[85px]  z-40"
                src={dots}
                alt=""
              />
            </div>
          </div>
        </div>
      </>
    );
}
export default Main;