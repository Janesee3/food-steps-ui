import React from "react";
import LocationsList from "./LocationsList";
import ShallowRenderer from "react-test-renderer/shallow";
import { testExports } from "./LocationsList";
import DetailedUserLocation from "../DetailedUserLocation/DetailedUserLocation";
import SimpleUserLocation from "../SimpleUserLocation/SimpleUserLocation";

describe("props.detailed is false", () => {
  it("snapshot test", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={false} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it("should render SimpleUserLocation", () => {
    const locationItem = testExports.renderDetailedOrSimple(false, {});
    expect(locationItem.type).toBe(SimpleUserLocation);
  });
});

describe("props.detailed is true", () => {
  it("props.detailed true snapshot test", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<LocationsList detailed={true} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it("should render DetailedUserLocation if props.detailed is true", () => {
    const locationItem = testExports.renderDetailedOrSimple(true, {}, ()=>{},1);
    expect(locationItem.type).toBe(DetailedUserLocation);
  });
});
