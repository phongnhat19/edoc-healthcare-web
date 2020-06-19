import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import AppSwitch from "./AppSwitch";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SidebarContext } from "./App";
import clsx from "clsx";

function AppRoutes() {
  const { open: sidebarOpen } = useContext(SidebarContext);

  return (
    <BrowserRouter>
      <div
        className={clsx("app-wrapper", {
          "app-sidebar-mobile-open": sidebarOpen,
        })}
      >
        <div>
          <Sidebar />
        </div>
        <div
          className="app-main"
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          <Header />
          <div className="app-content">
            <div className="app-content--inner">
              <div className="app-content--inner__wrapper">
                <AppSwitch />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
