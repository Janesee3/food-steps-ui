import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import LocationFormContainer from "./LocationFormContainer";

test("should render the container correctly for LoggedInUser", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<LocationFormContainer isLoggedInUser={true} onUserSignedIn={jest.fn} />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});

test("should render the container correctly for non-LoggedInUser", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<LocationFormContainer isLoggedInUser={false} onUserSignedIn={jest.fn} />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});