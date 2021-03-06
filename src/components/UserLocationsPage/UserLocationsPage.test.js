import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import UserLocationsPage from "./UserLocationsPage";
import { API_HOST } from "../../utils/networkUtils";

const fetchMockData = async () => {
  fetch.mockResponseOnce(JSON.stringify(["data1", "data2"]));
  const renderer = new ShallowRenderer();
  renderer.render(<UserLocationsPage />);
  const instance = renderer.getMountedInstance();
  await instance.componentDidMount();
  return renderer.getRenderOutput();
};

beforeEach(() => {
  fetch.resetMocks();
});

test.skip("userLocation component didMount calls for a fetch and passed fetched as props to LocationList", async () => {
  const result = await fetchMockData();
  expect(result.props.children.props.userLocations.length).toBe(2);
  expect(fetch).toHaveBeenCalledWith(`${API_HOST}/locations/user/`, {
    credentials: "include"
  });
});

test("Snapshot fetch should match mocked data", async () => {
  const result = await fetchMockData();
  expect(result).toMatchSnapshot();
});

test.only('Snapshot should contain the showEditModal', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UserLocationsPage />);
  const instance = renderer.getMountedInstance();
  instance.showEditModal() 
  const result = renderer.getRenderOutput()

  expect(result).toMatchSnapshot(); 
});

test.only('Snapshot should contain the closeModal', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UserLocationsPage />);
  const instance = renderer.getMountedInstance();
  instance.closeModal() 
  const result = renderer.getRenderOutput()

  expect(result).toMatchSnapshot(); 
});

