import React, { useState } from "react";
import { useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  // console.log(user)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <div className="layout has-sidebar fixed-sidebar fixed-header">


        <SideBar />
        <div id="overlay" className="overlay"></div>

        <div className="layout">

          <NavBar />
          {outlet}

          <div className="overlay"></div>
        </div>


      </div>
    </>
  );
};

export default HomeLayout;
