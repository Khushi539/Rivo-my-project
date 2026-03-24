import React from "react";
import offer from "../assets/offer.png"
import dots from  "../assets/dotsOffer.png"
import {useNavigate} from "react-router-dom";

const times = [
  {
    id: 1,
    count: "06",
    title: "Days",
  },
  {
    id: 2,
    count: "18",
    title: "Hours",
  },
  {
    id: 3,
    count: "48",
    title: "min",
  },
];

const Offers = () => {

   const Navigate = useNavigate();
    return (
      <>
        <div className="max-w-7xl mx-auto  md:py-16 py-5 px-6">
          <div className="bg-[#c8f0d9]   grid md:grid-cols-2 items-center gap-8">
            <div className="relative">
              <img
                src={dots}
                className="absolute h-[85px] md:h-[108px] bottom-[35px] left-[15px] md:bottom-[65px] md:left-[25px]"
                alt=""
              />
              <img
                src={offer}
                className="rounded-xl relative md:h-[445px] ml-[40px] md:ml-[85px]"
              />
            </div>

            <div className="md:text-left text-center">
              <h3 className="text-3xl mb-5 font-medium md:text-5xl  font-roboto text-[#224F34] ">
                Exclusive offer
              </h3>
              <p className="mt-3 font-popping  mb-5 font-medium text-[#224F34] max-w-md">
                Unlock the ultimate style upgrade with our exclusive offer Enjoy
                savings of up to 40% off on our latest New Arrivals
              </p>

              <div className="px-[10px] py-[20px] md:p-0">
                <div className="flex md:justify-start  justify-center gap-4 mt-6">
                  {times.map((times) => (
                    <div
                      key={times.id}
                      className="bg-white text-center text-[#224F34] px-6 py-2 rounded"
                    >
                      <p className=" font-medium text-[25px]  ">
                        {times.count}
                      </p>
                      <p className="font-medium text-[16px]">{times.title}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => Navigate("explore")}
                  className="mt-6 hover:bg-[#6BC785] cursor-pointer shadow-2xl bg-green-800 text-white px-6 py-3 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Offers;