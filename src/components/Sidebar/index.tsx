import React, { useContext } from "react";
import clsx from "clsx";
import { SidebarContext } from "../../App";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const { open: sidebarOpen, setOpen: toggleSidebar } = useContext(
    SidebarContext
  );

  return (
    <>
      <div className="app-sidebar app-sidebar--dark">
        <SidebarHeader />
        <div className="app-sidebar--content">
          <SidebarMenu />
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className={clsx("app-sidebar-overlay", {
          "is-active": sidebarOpen,
        })}
      />
    </>
  );
};

export default Sidebar;
