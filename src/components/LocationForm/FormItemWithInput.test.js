import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import FormItemWithInput from "./FormItemWithInput";

const getFieldDecorator = jest.fn(() => () => {});

it("Snapshot Test", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <FormItemWithInput
      id="locationName"
      label="Location Name"
      required={true}
      getFieldDecorator={getFieldDecorator}
    />
  );

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});
