import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import FoodStepsHeader from "./FoodStepsHeader";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});
