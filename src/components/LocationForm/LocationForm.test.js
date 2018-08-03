import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import LocationFrom from "./LocationForm";

test("should render the empty form", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<LocationFrom />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});
