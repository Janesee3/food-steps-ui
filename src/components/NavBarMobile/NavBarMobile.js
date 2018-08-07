import React from "react";
import { Button, Icon, Dropdown } from "antd";
import { menu } from "../NavBar/NavBar";

const NavBarMobile = () => {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="primary">
        Menu <Icon type="down" />
      </Button>
    </Dropdown>
  );
};

export default NavBarMobile;
