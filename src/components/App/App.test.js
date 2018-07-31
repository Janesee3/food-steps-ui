import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import App from "./App";

it("renders snapshot correctly", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<App />);
	const output = renderer.getRenderOutput();

	expect(output).toMatchSnapshot();
});
