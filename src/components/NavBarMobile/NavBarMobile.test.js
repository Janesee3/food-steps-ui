import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import NavBarMobile from "./NavBarMobile";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBarMobile />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});