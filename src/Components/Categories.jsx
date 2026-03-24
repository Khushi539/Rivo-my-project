import React from "react";

import one from "../assets/cloth1.png"
import two from "../assets/cloth2.png";
import three from "../assets/cloth3.png";
import Heading from "../Style/Heading";



const cloths = [
    {
        id:1,
        image:one,
        title: "Accessories",
        peragraph:"Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats",
    },
    {
        id:2,
        image:two,
        title: "Dresses", 
        peragraph:" Explore a stunning range of designer dresses, including evening gowns and chic day dresses.",
    },
    {
        id:3,
        image:three,
        title: "Outerwear",
        peragraph:"Browse luxurious designer coats, jackets, and blazers to stay stylishly warm during colder seasons.",
    },
]

const Categories = () => {

    return (
      <>
        <div className="text-center mx-auto max-w-7xl px-6  py-5 md:py-16 ">
          <Heading text="Designer Clothes For You"></Heading>
          <p className=" text-center text-[#016630] font-medium mt-4 md:mt-[35px]">
            Immerse yourself in the world of luxury fashion with our
            meticulously crafted designer clothes.
          </p>

          <div className="grid md:grid-cols-3  md:gap-10 mt-2 md:mt-10">
            {cloths.map((cloths) => (
              <div key={cloths.id}>
                <img
                  src={cloths.image}
                  className="rounded-xl mx-auto bg-[#D3E2D7]"
                />
                <h4 className="md:mt-4  font-semibold text-xl md:text-[25px]">
                  {cloths.title}
                </h4>
                <p className="  mt-1">{cloths.peragraph}</p>
              </div>
            ))}
          </div>

         
        </div>
      </>
    );
}

export default Categories;