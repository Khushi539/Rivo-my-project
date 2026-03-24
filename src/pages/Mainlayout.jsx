import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
import React from "react";

const Mainlayout = () => {
    return (
      <>
        <div className="">
          <Header/>
          <Outlet />
        </div>
      </>
    );
}

export default Mainlayout;