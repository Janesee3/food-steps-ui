import React from "react";
import { Layout } from "antd";
import NavBar from "../NavBar/NavBar";
import "./FoodStepsHeader.css";

import { Button } from "antd";

const { Header } = Layout;

const FoodStepsHeader = () => {
  return (
    <div>
      <Header>
        <div className="logo" />
        <Button className="sign-up-button" type="primary">Sign Up</Button>
        <NavBar />
      </Header>
    </div>
  );
};

export default FoodStepsHeader;
