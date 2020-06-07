import React, { useContext } from "react";
import clsx from "clsx";
import { SidebarContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UncontrolledTooltip } from "reactstrap";

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
              <img
                alt="Bamburgh React Admin Dashboard with Reactstrap PRO"
                src={projectLogo}
              />
            </div>
            <div className="app-sidebar-logo--text">
              <span>EDoc</span>

              <b>Health care</b>
            </div>
          </NavLink>
        </div>
        <button
          onClick={toggleSidebar}
          className="btn btn-sm collapse-sidebar-btn"
          id="CollapseSidebarTooltip"
        >
          <FontAwesomeIcon icon={["far", "dot-circle"]} size="lg" />
        </button>
        <UncontrolledTooltip
          target="CollapseSidebarTooltip"
          container=".app-sidebar"
          placement="right"
        >
          Collapse sidebar
        </UncontrolledTooltip>
        <button
          className={clsx(
            "navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn",
            { "is-active": sidebarOpen }
          )}
          onClick={toggleSidebar}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <button
          onClick={toggleSidebar}
          className="expand-sidebar-btn btn btn-sm"
          id="ExpandSidebarTooltip"
        >
          <FontAwesomeIcon icon={["fas", "arrows-alt-h"]} />
        </button>
        <UncontrolledTooltip
          target="ExpandSidebarTooltip"
          container=".app-sidebar"
          placement="right"
        >
          Expand sidebar
        </UncontrolledTooltip>
      </div>
    </>
  );
};

export default SidebarHeader;
