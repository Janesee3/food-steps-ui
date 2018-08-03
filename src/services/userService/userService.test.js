global.fetch = require("jest-fetch-mock");
import { signUpFromServer } from "./userService";

it("test signUpFromServer should call success callback for valid input", async () => {
  const mockUserInfo = {
    username: "mayuri",
    password: "blablabla",
    email: "123@123.com"
  };

  fetch.mockResponseOnce();
  const signUpSuccessCb = jest.fn();
  const signUpFaillCb = jest.fn();

  await signUpFromServer(mockUserInfo, signUpSuccessCb, signUpFaillCb);
  expect(signUpSuccessCb).toBeCalled();
  expect(signUpFaillCb).not.toBeCalled();
});

it("test signUpFromServer should call fail callback if fetch fails", async () => {
  const mockUserInfo = {};
  const signUpSuccessCb = jest.fn();
  const signUpFaillCb = jest.fn();

  try {
    fetch.mockReject();
    await signUpFromServer(mockUserInfo, signUpSuccessCb, signUpFaillCb);
  } catch (err) {
    expect(signUpSuccessCb).not.toBeCalled();
    expect(signUpFaillCb).toBeCalled();
  }
});
