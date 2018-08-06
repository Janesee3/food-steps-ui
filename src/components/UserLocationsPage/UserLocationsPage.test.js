import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import UserLocationsPage from "./UserLocationsPage";
import { API_HOST } from "../../utils/networkUtils"

test("smoke test ", () => {
  expect(1).toBe(1);
});

beforeEach(() => {
  fetch.resetMocks();
});

test("userlocation component calls for a fetch", async () => {
  fetch.mockResponseOnce(JSON.stringify(["data1", "data2"]));

  const renderer = new ShallowRenderer();
  renderer.render(<UserLocationsPage />);
  const instance = renderer.getMountedInstance();
  await instance.componentDidMount();

  console.log("HELLO!", fetch);

  expect(fetch).toHaveBeenCalledWith(`${API_HOST}/locations/user/`, {credentials: 'include'});
});
