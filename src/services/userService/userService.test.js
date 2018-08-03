global.fetch = require("jest-fetch-mock");
import { signUpFromServer } from "./userService";

it("test signUpFromServer should call success callback for valid input", async () => {
  const mockUserInfo = {
    username: "mayuri",
    password: "blablabla",
    email: "123@123.com"
  };

  fetch.mockResponseOnce();
  const signUpSuccessCb = jest.fn(() => "blabla");
  const signUpFaillCb = jest.fn(() => "blabla");

  await signUpFromServer(mockUserInfo, signUpSuccessCb, signUpFaillCb);
  expect(signUpSuccessCb).toBeCalled();
  expect(signUpFaillCb).not.toBeCalled();
});
