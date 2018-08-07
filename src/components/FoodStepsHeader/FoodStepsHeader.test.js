import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import FoodStepsHeader from "./FoodStepsHeader";

it("renders snapshot correctly when user is not logged in", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<FoodStepsHeader isUserLoggedIn={false} />);
	const output = renderer.getRenderOutput();

	expect(output).toMatchSnapshot();
});

it("renders snapshot correctly when user is logged in", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<FoodStepsHeader isUserLoggedIn={true} />);
	const output = renderer.getRenderOutput();

	expect(output).toMatchSnapshot();
});
