import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EditLocationModal from "./EditLocationModal";

it("Snapshot Test", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <EditLocationModal
      location={{locationName: 'Location Name To Be Updated'}}
      visible={true}
      closeModal={() => {}}
      onUpdate={(newLocationName) => {}}
    />
  );

  const output = renderer.getRenderOutput();
  expect(output).toMatchSnapshot();
});
