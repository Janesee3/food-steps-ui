import React from "react";
import SimpleUserLocation from "./SimpleUserLocation";
import ShallowRenderer from "react-test-renderer/shallow";

const testLocation = {
    "isPublic": false,
    "_id": "5b62afc2a15c09429fa2e576",
    "userId": "5b626e76ddf17c1923ec680c",
    "globalLocation": {
        "_id": "5b62afc1a15c09429fa2e575",
        "lat": 1.145,
        "lng": 103.1,
        "geocodedLocationName": "original soy chicken rice",
        "__v": 0
    },
    "locationName": "soy chicken rice",
    "createdAt": "2018-08-02T07:16:18.021Z",
    "updatedAt": "2018-08-02T07:16:18.021Z",
    "__v": 0
};

it('snapshot test', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SimpleUserLocation location={testLocation} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});