import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { menus } from "../constants";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { useAuth } from "../hooks/useAuth";
const SideBar = () => {
  const [active, setActive] = useState(0);
  const [openMemberSubmenu, setOpenMemberSubmenu] = useState(false);
  const [openType, setOpenType] = useState("");
  const [subOpenType, setSubOpenType] = useState("");
  const { logout } = useAuth();

  console.log(openMemberSubmenu);

  useEffect(() => {
    console.log(typeof localStorage.getItem("openMemberSubmenu"));
    if (localStorage.getItem("openMemberSubmenu")) {
      setOpenMemberSubmenu(
        JSON.parse(localStorage.getItem("openMemberSubmenu"))
      );
    }
    if (localStorage.getItem("openType")) {
      setOpenType(localStorage.getItem("openType"));
    }
    if (localStorage.getItem("subOpenType")) {
      setSubOpenType(localStorage.getItem("subOpenType"));
    }
    if (localStorage.getItem("active")) {
      setActive(parseInt(localStorage.getItem("active")));
    }
  }, []);

  console.log("subOpenType", subOpenType);

  return (
    <>
      <aside id="sidebar" className="sidebar break-point-sm has-bg-image">
        <a id="btn-collapse" className="sidebar-collapser d-md-none">
          <i className="ri-arrow-left-s-line"></i>
        </a>
        <div className="image-wrapper"></div>
        <div className="sidebar-layout">
          <div className="sidebar-content">
            <nav className="menu open-current-submenu">
              <ul>
                {menus?.map((item, ind) => {
                  return (
                    <>
                      <li
                        className={
                          active === ind
                            ? "mb-2 menu-item-wo-hover"
                            : "mb-2 menu-item"
                        }
                        key={ind?.toString()}
                        onClick={() => {
                          if (!item?.dropdown) {
                            setActive(ind);

                            setOpenType("");
                            setOpenMemberSubmenu(false);
                            localStorage.setItem("active", ind);

                            localStorage.setItem("openMemberSubmenu", false);
                            localStorage.setItem("openType", "");
                            localStorage.setItem("subOpenType", "");
                          }
                          if (item.name == "Logout") {
                            logout();
                            localStorage.clear();
                          }

                          if (item?.dropdown) {
                            setActive(ind);

                            setOpenType(item.name);
                            // setOpenMemberSubmenu(!openMemberSubmenu)
                            localStorage.setItem("active", ind);

                            // localStorage.setItem('openMemberSubmenu', !openMemberSubmenu)
                            localStorage.setItem("openType", item.name);
                          }
                        }}
                      >
                        {item?.dropdown ? (
                          <a>
                            <span
                              className="menu-icon"
                              onClick={() => {
                                if (item?.dropdown) {
                                  setOpenMemberSubmenu(!openMemberSubmenu);
                                  localStorage.setItem(
                                    "openMemberSubmenu",
                                    !openMemberSubmenu
                                  );
                                }

                                // setOpenMemberSubmenu(!openMemberSubmenu)
                                // localStorage.setItem('openMemberSubmenu', !openMemberSubmenu)
                              }}
                            >
                              <i>
                                {" "}
                                <img
                                  src={
                                    active === ind
                                      ? `/images/${item.image}-active.svg`
                                      : `/images/${item.image}.svg`
                                  }
                                  alt="image"
                                  className="img-fluid"
                                />
                              </i>
                            </span>
                            <span
                              className="menu-title"
                              onClick={() => {
                                if (item?.dropdown) {
                                  setOpenMemberSubmenu(!openMemberSubmenu);
                                  localStorage.setItem(
                                    "openMemberSubmenu",
                                    !openMemberSubmenu
                                  );
                                }

                                // setOpenMemberSubmenu(!openMemberSubmenu)
                                // localStorage.setItem('openMemberSubmenu', !openMemberSubmenu)
                              }}
                            >
                              {item?.name}{" "}
                              {item?.dropdown ? (
                                <>
                                  {openMemberSubmenu &&
                                  openType == item?.name ? (
                                    <BsChevronDown />
                                  ) : (
                                    <BsChevronRight />
                                  )}
                                </>
                              ) : (
                                <></>
                              )}{" "}
                            </span>
                          </a>
                        ) : (
                          <Link to={`${item.path}`}>
                            <span className="menu-icon">
                              <i>
                                {" "}
                                <img
                                  src={
                                    active == ind
                                      ? `/images/${item.image}-active.svg`
                                      : `/images/${item.image}.svg`
                                  }
                                  alt="image"
                                  className="img-fluid"
                                />
                              </i>
                            </span>
                            <span className="menu-title" onClick={() => {}}>
                              {item?.name}{" "}
                              {item?.dropdown ? (
                                <>
                                  {openMemberSubmenu &&
                                  openType == item?.name ? (
                                    <BsChevronDown />
                                  ) : (
                                    <BsChevronRight />
                                  )}
                                </>
                              ) : (
                                <></>
                              )}{" "}
                            </span>
                          </Link>
                        )}

                        {openMemberSubmenu &&
                        openType == item?.name &&
                        item?.dropdown ? (
                          item?.subMenu?.map((subItem) => {
                            return (
                              <div className="drop-down-style">
                                <li
                                  className={
                                    subOpenType == subItem?.name
                                      ? "submenu-item-wo-hover"
                                      : "submenu-item mb-2"
                                  }
                                  key={ind?.toString()}
                                  onClick={() => {
                                    setSubOpenType(subItem?.name);
                                    localStorage.setItem(
                                      "subOpenType",
                                      subItem?.name
                                    );
                                    localStorage.setItem("active", "");

                                    setActive("");
                                  }}
                                >
                                  <Link to={`${subItem.path}`}>
                                    <span className="menu-icon">
                                      {/* <i> <img src={subOpenType == subItem?.name ? `/images/${subItem.image}-active.svg` : `/images/${subItem.image}.svg`} alt="image" className="img-fluid" /></i> */}
                                    </span>
                                    <span className="menu-title">
                                      {subItem?.name} {}{" "}
                                    </span>
                                  </Link>
                                </li>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </li>
                    </>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
