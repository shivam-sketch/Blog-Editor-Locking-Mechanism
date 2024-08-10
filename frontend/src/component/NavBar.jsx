import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-md bg-white sticky-top">
        <div className="container-fluid">
          Welcome &nbsp; <b> {user?.name}</b>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            onClick={() => {
              logout();
            }}
          >
            <ul className="navbar-nav ms-auto btn btn-primary p-2">Logout</ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
