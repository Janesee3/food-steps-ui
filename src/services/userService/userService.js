import { API_HOST, postToServer } from "../../utils/networkUtils";

const postWithCallbacks = async (url, body, successCb, failCb) => {
  try {
    const res = await postToServer(url, body, true);
    if (res.ok) {
      return successCb(body.username); // send username to callback for feedback purpose
    }
    failCb(); //response status is not 200
  } catch (err) {
    failCb(); //error in fetch
  }
};

export const signInFromServer = async (userInfo, successCb, failCb) => {
  await postWithCallbacks(
    `${API_HOST}/account/signin`,
    userInfo,
    successCb,
    failCb
  );
};

export const signUpFromServer = async (userInfo, successCb, failCb) => {
  await postWithCallbacks(
    `${API_HOST}/account/signup`,
    userInfo,
    successCb,
    failCb
  );
};
