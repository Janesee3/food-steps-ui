const API_HOST = process.env.REACT_API_HOST || "http://localhost:3000";

export const signUpFromServer = async (userInfo, successCb, failCb) => {
  const res = await fetch(`${API_HOST}/account/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(userInfo),
    credentials: "include"
  });

  if (res.ok) {
    successCb(userInfo.username);
  } else {
    failCb();
  }
};
