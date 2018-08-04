global.fetch = require("jest-fetch-mock");
import { createUserLocation } from "./userLocationService";

describe("createUserLocation", () => {
  it("should return object with result.ok when response", async () => {
    fetch.mockResponseOnce();

    const result = await createUserLocation({});
    expect(result.ok).toBe(true);
    expect(result.message).toBeUndefined();
  });

  it("should return object with result.ok and message when response.status is 400", async () => {
    const mockMessage = "some error occur";
    const mockResponseBody = JSON.stringify({ message: mockMessage });
    const mockResponseInit = { status: 400 };
    fetch.mockResponseOnce(mockResponseBody, mockResponseInit);

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toEqual(mockMessage);
  });

  it("should return object with result.ok FALSE but not message when response is not OK and response.status is not 400", async () => {
    const mockResponseBody = JSON.stringify({ message: "some error occur" });
    const mockResponseInit = { status: 500 };
    fetch.mockResponseOnce(mockResponseBody, mockResponseInit);

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toBeUndefined();
  });

  it("should return object with result.ok FALSE but not message when fetch throw an error", async () => {
    fetch.mockReject(new Error('simulating error thrown from API'));

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toBeUndefined();
  });
});
