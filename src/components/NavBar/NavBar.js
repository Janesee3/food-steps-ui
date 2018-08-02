import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const NavBar = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "64px" }}
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
