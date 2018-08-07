import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const NavBar = (props) => {
  
  const menuStylingForDesktop = {
    mode: "horizontal",
    style: {lineHeight: "64px"}
  };
  const menuStylingForMobile = {
    mode: "inline",
    style: {display: props.collapsed ? "none" : ""},
    inlineCollapsed: props.collapsed,
    onSelect: props.onSelect
  };

  const menuStyle = props.mobile ? menuStylingForMobile : menuStylingForDesktop;

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[]}
      {...menuStyle}
    >
      <Menu.Item key="1">
        <Link to="/user-locations-page">User Locations Page</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/new-location">New Location</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/location">Main Location Page</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
