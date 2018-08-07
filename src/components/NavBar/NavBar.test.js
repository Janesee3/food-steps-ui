import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import NavBar from "./NavBar";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBar />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});

it("renders snapshot for mobile (collapsed) correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<NavBar 
    mobile={true}
    collapsed={true}
    onSelect={jest.fn()}
  />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});