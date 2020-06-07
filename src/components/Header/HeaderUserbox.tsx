import React, { useContext } from "react";
import { NavLink as NavLinkStrap } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { UserContext } from "../../App";

const HeaderUserbox = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <UncontrolledDropdown className="position-relative ml-2">
        <DropdownToggle
          color="link"
          className="p-0 text-left d-flex btn-transition-none align-items-center"
        >
          <div className="d-block p-0 avatar-icon-wrapper">
            <Badge color="success" className="badge-circle p-top-a">
              Online
            </Badge>
            <div className="avatar-icon rounded">
              <img src={userData.avatar} alt="..." />
            </div>
          </div>
          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold">{userData.name}</div>
            <span className="text-black-50">{userData.role}</span>
          </div>
          <span className="pl-1 pl-xl-3">
            <FontAwesomeIcon
              icon={["fas", "angle-down"]}
              className="opacity-5"
            />
          </span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav pills className="nav-neutral-primary flex-column">
                <NavItem>
                  <NavLinkStrap href="/profile">Profile</NavLinkStrap>
                </NavItem>
              </Nav>
            </ListGroupItem>
            <ListGroupItem className="rounded-bottom p-3">
              <Button color="link">Logout</Button>
            </ListGroupItem>
          </ListGroup>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default HeaderUserbox;
