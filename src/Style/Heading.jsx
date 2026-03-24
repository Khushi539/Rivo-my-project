import React from "react";

const Heading = ({text}) => {
    return (
      <>
        <h1 className="text-3xl  font-medium md:text-5xl  font-roboto text-[#224F34]  text-center">
          {text}
        </h1>
      </>
    );
}
export default Heading;