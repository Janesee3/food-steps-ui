import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SignInSignUpModal from "./SignInSignUpModal";

it("renders snapshot correctly", () => {
	const renderer = new ShallowRenderer();
	renderer.render(<SignInSignUpModal />);
	const output = renderer.getRenderOutput();

	expect(output).toMatchSnapshot();
});
