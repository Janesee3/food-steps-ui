global.fetch = require("jest-fetch-mock");
import {
  createUserLocation,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} from "./userLocationService";

describe("Test for createUserLocation", () => {
  it("when call to server is successful, 'ok' should be true and message should be SUCCESS_MESSAGE.", async () => {
    fetch.mockResponseOnce(); // default response will be status = 200

    const result = await createUserLocation({});
    expect(result.ok).toBe(true);
    expect(result.message).toBe(SUCCESS_MESSAGE);
  });

  it("when call to server returns with status 400, 'ok' should be false and message should be the returned error message.", async () => {
    const mockMessage = "some error occur";
    const mockResponseBody = JSON.stringify({ message: mockMessage });
    const mockResponseInit = { status: 400 };
    fetch.mockResponseOnce(mockResponseBody, mockResponseInit);

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toEqual(mockMessage);
  });

  it("when call to server fails with status != 400, 'ok' should be false and message should be ERROR_MESSAGE.", async () => {
    const mockResponseInit = { status: 500 };
    fetch.mockResponseOnce("", mockResponseInit);

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toBe(ERROR_MESSAGE);
  });

  it("when an error occurs during call to server, 'ok' should be false and message should be ERROR_MESSAGE.", async () => {
    fetch.mockReject(new Error(""));

    const result = await createUserLocation({});
    expect(result.ok).toBe(false);
    expect(result.message).toBe(ERROR_MESSAGE);
  });
});
