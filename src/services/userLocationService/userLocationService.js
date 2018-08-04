import { API_HOST, postToServer } from "../../utils/networkUtils";

const isDevelopment = process.env.NODE_ENV === "development";

export const createUserLocation = async userLocationData => {
  try {
    const response = await postToServer(
      `${API_HOST}/locations/user`,
      userLocationData,
      true
    );
    // const response = await fetch(`${API_HOST}/locations/user`, {
    //   method: "POST",
    //   body: JSON.stringify(values),
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include"
    // });

    let dataErrorMessage;
    if (response.status === 400) {
      const responseBody = await response.json();
      dataErrorMessage = responseBody.message;
    }
    return {
      ok: response.ok,
      message: dataErrorMessage
    };
  } catch (e) {
    isDevelopment && console.error(e);
    return { ok: false };
  }
};