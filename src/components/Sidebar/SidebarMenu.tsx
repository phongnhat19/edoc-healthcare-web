import React, { useContext, useState } from "react";
import { SidebarContext } from "../../App";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Collapse } from "reactstrap";
import "./style.css";

import { ChevronRight, BookOpen, File, Users, List, Grid } from "react-feather";

const SidebarMenu = () => {
  const { setOpen: toggleSidebarMobile } = useContext(SidebarContext);

  const [dashboardActive, setDashboardActive] = useState(false);
  const [docTypeOpen, setDocTypeOpen] = useState(false);
  const [docListOpen, setDocListOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <div className="sidebar-header">
            <span>Menu quản lý</span>
          </div>
          <ul>
            <li>
              <a
                href="/"
                onClick={() => setDashboardActive(!dashboardActive)}
                className={clsx({ active: dashboardActive })}
              >
                <span className="sidebar-icon">
                  <Grid />
                </span>
                <span className="sidebar-item-label">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => setDocTypeOpen(!docTypeOpen)}
                className={clsx({ active: docTypeOpen }, "menu-item")}
              >
                <span className="sidebar-icon">
                  <File />
                </span>
                <span className="sidebar-item-label">Biểu mẫu hồ sơ</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={docTypeOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/forms/list">
                      Danh sách mẫu
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/forms/create">
                      Tạo mẫu mới
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => setDocListOpen(!docListOpen)}
                className={clsx({ active: docListOpen }, "menu-item")}
              >
                <span className="sidebar-icon">
                  <BookOpen />
                </span>
                <span className="sidebar-item-label">Hồ sơ</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={docListOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/documents/list">
                      Danh sách hồ sơ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/documents/create"
                    >
                      Tạo hồ sơ mới
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                onClick={() => setUserOpen(!userOpen)}
                className={clsx({ active: userOpen }, "menu-item")}
              >
                <span className="sidebar-icon">
                  <Users />
                </span>
                <span className="sidebar-item-label">Nhân viên</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={userOpen}>
                <ul>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/users/list">
                      Danh sách nhân viên
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/users/create">
                      Thêm nhân viên
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/users/roles">
                      Roles
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setHistoryOpen(!historyOpen)}
                className={clsx({ active: historyOpen }, "menu-item")}
              >
                <span className="sidebar-icon">
                  <List />
                </span>
                <span className="sidebar-item-label">Lịch sử hoạt động</span>
                <span className="sidebar-icon-indicator">
                  <ChevronRight />
                </span>
              </a>
              <Collapse isOpen={historyOpen}>
                <ul>
                  <li>
                    <NavLink
                      onClick={toggleSidebarMobile}
                      to="/history/documents"
                    >
                      Hồ sơ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={toggleSidebarMobile} to="/history/users">
                      Nhân viên
                    </NavLink>
                  </li>
                </ul>
              </Collapse>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
};

export default SidebarMenu;
