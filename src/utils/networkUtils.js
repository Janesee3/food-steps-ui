export const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:3000";
console.log('Say Hi to check API endpoint');
console.log('The API_HOST is', API_HOST);

export const postToServer = async (url, body, includeCredentials) => {
  const credentials = includeCredentials ? "include" : "omit";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(body),
    credentials: credentials
  });

  return res;
};
