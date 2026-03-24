import React from "react";
import PageHeading from "../Style/PageHeading";
import SizeIMage from "../assets/size.webp"
import { ImCross } from "react-icons/im";const point = [
    "Size",	"Bust",	"Brand Size",	"Waist"	,"Shoulder",	"Length",	"Sleeve Length",
]
const size= [
    "XS",	"34",	"XS",	"31",	"13.5",	"47",	"10",
]
const two = [
    "S",	"36",	"S",	"33",	"14",	"47", "10",
]
const three= [
    "M",	"38",	"M",	"35",	"14.5",	"47",	"10",
]
const four=[
    "L",	"40",	"L",	"37",	"15",	"47",	"10",
]
const five=[
    "XL",	"42",	"XL",	"39",	"15.5",	"47",	"10",
]
const six=[
    "XXL",	"44",	"XXL",	"41",	"16",	"47",	"10",

]



const Sizepopup=({closePopup})=>{
    return (
      <>
        <div className="md:top-[117px] text-[10px] md:text-[16px]  top-[1px] md:w-[70%] md:rounded-2xl md:left-[160px] left-[1px] fixed shadow bg-white bg-opacity-50 z-50 gap-2   mx-auto md:flex">
          <div className="md:w-[60%] px-2  relative">
            <PageHeading h2="Size Chart" />

            <div className="grid  grid-cols-7 underline-text-[] py-5 px-2  mt-5   mx-auto bg-[#F0F0F0]">
              {point.map((point, index) => (
                <div key={index} className=" text-black ">
                  {point}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 shadow py-2 px-2 justify-center mx-auto bg-">
              {size.map((size, index) => (
                <div key={index} className=" text-black text-left ">
                  {size}
                </div>
              ))}
            </div>
            <div className=" shadow py-2 px-2 grid grid-cols-7 justify-center mx-auto bg-">
              {two.map((two, index) => (
                <div key={index} className=" text-black text-left ">
                  {two}
                </div>
              ))}
            </div>
            <div className=" shadow py-2 px-2 grid grid-cols-7 justify-center mx-auto bg-">
              {three.map((three, index) => (
                <div key={index} className=" text-black text-left ">
                  {three}
                </div>
              ))}
            </div>
            <div className=" shadow py-2 px-2 grid grid-cols-7 justify-center mx-auto bg-">
              {four.map((four, index) => (
                <div key={index} className=" text-black text-left">
                  {four}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 justify-center shadow py-2 px-2  mx-auto bg-">
              {five.map((five, index) => (
                <div key={index} className=" text-black text-left ">
                  {five}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 justify-center shadow py-2 px-2  mx-auto bg-">
              {six.map((six, index) => (
                <div key={index} className=" text-left text-black ">
                  {six}
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-[40%] mt-5 md:mt-[70px]">
            <p className="md:font-medium font-bold text-black text-center">Measuring Dress Size</p>
            <p className="mt-5 px-2 md:px-0 text-left">
              Not sure about your dress size? Follow these simple steps to
              figure it out: <span className="font-bold">Waist</span> - Measure
              at the slimmest part of natural waist above the naval.
              <span className="font-bold"> Shoulder</span> - Measure one
              shoulder tip to the other at the back.
              <span className="font-bold"> Bust </span> - Measure around fullest
              part of the bust. Hip - Measure at the widest part below the
              waist.
            </p>
            <img
              src={SizeIMage}
              className="mx-auto md:h-[245px] h-[131px]"
              alt=""
            />
          </div>
          <div
            onClick={closePopup}
            className="relative text-[18px] md:text-[25px] md:-left-5 right-[-15px]  top-[-561px] md:top-5 hover:text-red-700"
          >
            <ImCross />
          </div>
        </div>
      </>
    );
}
export default Sizepopup;