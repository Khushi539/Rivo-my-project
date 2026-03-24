import React from "react";

const PageHeading = ({h2}) => {
    return (
      <>
        <h2 className="text-3xl  font-medium md:text-4xl  font-roboto text-[#224F34]  text-center">
          {h2}
        </h2>
      </>
    );
}
export default PageHeading;