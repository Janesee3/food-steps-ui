import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import NavBar from "./NavBar";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBar />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});