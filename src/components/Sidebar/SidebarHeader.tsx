import React, { useContext } from "react";
import clsx from "clsx";
import { SidebarContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

import projectLogo from "../../assets/images/react.svg";

const SidebarHeader = () => {
  const { open: sidebarOpen, setOpen: toggleSidebar } = useContext(
    SidebarContext
  );

  return (
    <>
      <div className="app-sidebar--header">
        <div className="app-sidebar-logo">
          <NavLink
            to="/"
            title="Bamburgh React Admin Dashboard with Reactstrap PRO"
            className="app-sidebar-logo"
          >
            <div className="app-sidebar-logo--icon">
              <img alt="VBC" src={projectLogo} />
            </div>
            <div className="app-sidebar-logo--text">
              <span>EDoc</span>

              <b>Health care</b>
            </div>
          </NavLink>
        </div>
        <button
          className={clsx(
            "navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn",
            { "is-active": sidebarOpen }
          )}
          onClick={toggleSidebar}
        >
          <span className="hamburger-box" onClick={toggleSidebar}>
            <span className="hamburger-inner" onClick={toggleSidebar} />
          </span>
        </button>
        <button
          onClick={toggleSidebar}
          className="expand-sidebar-btn btn btn-sm"
          id="ExpandSidebarTooltip"
        >
          <FontAwesomeIcon icon={faArrowsAltH} />
        </button>
      </div>
    </>
  );
};

export default SidebarHeader;
