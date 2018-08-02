import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SignUpForm from "./SignUpForm";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<SignUpForm />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});