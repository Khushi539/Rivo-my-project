import React from "react";
import facebook from "../assets/Facebook.png"
import twitter from "../assets/Twitter.png"
import instagram from "../assets/Instagram.png"



const Footer = () => {

   const footer = ["Products", "Overview", "Pricing", "Releases"];

   const foot = ["About us", "Contact", "News", "Support"];

   const condition = ["Terms", "Privacy", "Cookies"];
    return (
      <>
        <div className="bg-[#224F34] text-white max-7-xl mx-auto px-6  py-5 md:py-16">
          <div className="md:flex  justify-between max-w-7xl mx-auto ">
            <div className="mb-10 md:mb-0">
              <b className="text-[50px]  font-rufina ">Rivo</b>
              <p className="mt-1 font-roboto mt-[15px] mb-[14px] cursor-pointer">
                Social Media
              </p>
              <div className="flex gap-2 md:gap-5 mt-1">
                <img
                  src={facebook}
                  className="h-[30px] cursor-pointer"
                  alt="facebook"
                />
                <img
                  src={twitter}
                  className="h-[30px] cursor-pointer"
                  alt="twitter"
                />
                <img
                  src={instagram}
                  className="h-[30px] cursor-pointer"
                  alt="instagram"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:hidden justify-between">
              <div className="  ">
                <div className="">
                  <p className="font-roboto font-medium text-l cursor-pointer">
                    SHOP
                  </p>
                </div>

                {footer.map((footer, item) => (
                  <ul className="font-popping">
                    <li
                      className="hover:underline mt-1 cursor-pointer text-[#C8F0D9]"
                      key={item}
                    >
                      {footer}
                    </li>
                  </ul>
                ))}
              </div>

              <div className="">
                <div className="">
                  <p className="font-roboto font-medium cursor-pointer text-l">
                    COMPANY
                  </p>
                </div>
                {foot.map((foot, index) => (
                  <ul className="poppins">
                    <li
                      className="hover:underline m-1 cursor-pointer text-[#C8F0D9]"
                      key={index}
                    >
                      {" "}
                      {foot}
                    </li>
                  </ul>
                ))}
              </div>
            </div>

            <div className="mb-10  md:mb-10 hidden sm:block">
              <div className="mb-5">
                <p className="font-roboto font-medium cursor-pointer text-l">
                  SHOP
                </p>
              </div>

              {footer.map((footer, index) => (
                <ul className="font-popping">
                  <li
                    className="hover:underline cursor-pointer mt-4 text-[#C8F0D9]"
                    key={index}
                  >
                    {" "}
                    {footer}
                  </li>
                </ul>
              ))}
            </div>

            <div className="mb-10 md:mb-10 hidden sm:block">
              <div className="mb-5">
                <p className="font-roboto cursor-pointer font-medium text-l">
                  COMPANY
                </p>
              </div>
              {foot.map((foot, index) => (
                <ul className="poppins">
                  <li
                    className="hover:underline mt-4 cursor-pointer text-[#C8F0D9]"
                    key={index}
                  >
                    {" "}
                    {foot}
                  </li>
                </ul>
              ))}
            </div>

            <div>
              <div className="md:mb-5 md:mt-0 mt-10 mb-2">
                <p className="font-roboto cursor-pointer font-medium text-l">
                  STAY UP TO DATE
                </p>
              </div>
              <div className="flex mt-2 ">
                <input
                  placeholder="Enter your Email"
                  className="border  rounded-l p-[10px] w-[300px] border-[2px] border-[#A3F3BE]  "
                />
                <button className="p-2 cursor-pointer  bg-[#A3F3BE] text-[#224F34] font-medium">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>

          <div className=" max-w-7xl mx-auto pt-16 ">
            <div className=" md:flex gap-5">
              <div className="md:w-[80%] mt-10 mb-10 md:mb-0 md:mt-0 mb-2 md:mb-0  border- border-t-2 border-[#A3F3BE]"></div>

              <div className=" justify-center md:mt-[-12px] flex text-center gap-5">
                {condition.map((condition, index) => (
                  <ul className="poppins ">
                    <div
                      className="hover:underline cursor-pointer text-white hover:text-[#C8F0D9]"
                      key={index}
                    >
                      {" "}
                      {condition}
                    </div>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Footer;