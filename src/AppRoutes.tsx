import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppSwitch from "./AppSwitch";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div>
          <Sidebar />
        </div>
        <div className="app-main">
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
