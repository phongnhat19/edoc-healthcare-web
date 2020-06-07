import React, { useContext } from "react";
import { SidebarContext } from "../../App";
import clsx from "clsx";
import HeaderUserbox from "./HeaderUserbox";

const Header = (props: any) => {
  const { headerShadow, headerBgTransparent } = props;

  const { open, setOpen: toggleSidebar } = useContext(SidebarContext);

  return (
    <>
      <div
        className={clsx("app-header", {
          "app-header--shadow": headerShadow,
          "app-header--opacity-bg": headerBgTransparent,
        })}
      >
        <div className="app-header--pane">
          <button
            className={clsx(
              "navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn",
              { "is-active": open }
            )}
            onClick={toggleSidebar}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
          {/* <HeaderSearch />
          <HeaderMenu /> */}
        </div>
        <div className="app-header--pane">
          {/* <HeaderDots /> */}
          <HeaderUserbox />
          {/* <HeaderDrawer /> */}
        </div>
      </div>
    </>
  );
};

export default Header;
