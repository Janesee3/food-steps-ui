import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import FoodStepsHeader from "./FoodStepsHeader";

it("renders snapshot correctly", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);
  const output = renderer.getRenderOutput();

  expect(output).toMatchSnapshot();
});

it("renders snapshot correctly showModal is called", async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);

  const instance = renderer.getMountedInstance();
  await instance.showModal();

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});

it("renders snapshot correctly when signup is successfull", async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);

  const instance = renderer.getMountedInstance();
  await instance.onSignUpSuccess();

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});

it("renders snapshot correctly when signup failed", async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);

  const instance = renderer.getMountedInstance();
  await instance.onSignUpFail();

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});

it("renders snapshot correctly when cancelModal is called ", async () => {
  const renderer = new ShallowRenderer();
  renderer.render(<FoodStepsHeader />);

  const instance = renderer.getMountedInstance();
  await instance.closeModal();

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});
