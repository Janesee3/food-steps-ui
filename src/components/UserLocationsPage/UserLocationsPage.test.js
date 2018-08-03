import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import UserLocationsPage from "./UserLocationsPage";

test("smoke test ", () => {
  expect(1).toBe(1);
});

beforeEach(() => {
  fetch.resetMocks();
});

test.skip("userlocation component calls for a fetch", async () => {
  fetch.mockResponseOnce();-
  const renderer = new ShallowRenderer();
  renderer.render(<UserLocationsPage />);
  const instance = renderer.getMountedInstance();
  const afterMounting = await instance.componentDidMount();
  console.log("HELLO!", afterMounting);
  expect(fetch).toHaveBeenCalled();
});
