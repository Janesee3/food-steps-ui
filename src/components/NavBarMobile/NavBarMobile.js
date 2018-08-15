import React from "react";
import { Button, Icon, Dropdown } from "antd";
import { menu } from "../NavBar/NavBar";

const NavBarMobile = () => {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
    <div>
      <Button type="primary">
        Menu <Icon type="down" />
      </Button>
    </div>
    </Dropdown>
  );
};

export default NavBarMobile;
