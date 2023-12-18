export const api = (path, method = "GET", body = null, credentials = null) => {
  // Testing on local machine
  // const url = `http://localhost:5000/api` + path;

  // For hosting the full stack app on railway
  const url = `https://reactfullstackapp-production.up.railway.app/api` + path;

  const options = {
    method,
    headers: {},
  };

  if (body) {
    options.body = JSON.stringify(body);
    // bracket notation needed because Content-Type is a string
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  // encoding user credentials following the basic authentication scheme requirement
  // the btoa method creates a base64 encoded ascii string from a string of data; separate them by a :
  // basic authentication requires the username and password to be separated by a colon :
  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    );

    options.headers["Authorization"] = `Basic ${encodedCredentials}`;
  }
  return fetch(url, options);
};
