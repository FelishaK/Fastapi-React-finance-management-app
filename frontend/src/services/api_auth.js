import axios from "axios";
import setLocalStorage from "../utils/setLocalStorage";

async function userRegister({ username, email, password, confirm_password }) {
  try {
    return await axios.post("http://127.0.0.1:8000/auth/register/", {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
  } catch (err) {
    return err.response.data;
  }
}

async function userLogin({ email, password }) {
  try {
    return await axios
      .post("http://127.0.0.1:8000/auth/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLocalStorage(response);
        return response;
      });
  } catch (err) {
    return err.response;
  }
}

async function getAuthedUserInfo() {
  const accessToken = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("auth_token_type");

  const accessTokenToSend = tokenType + " " + accessToken;

  try {
    return await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/auth/me",
      headers: { Authorization: accessTokenToSend },
    }).then((response) => response.data);
  } catch (err) {
    return err;
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  const tokenType = localStorage.getItem("auth_token_type");
  const tokenToSend = tokenType + " " + refreshToken;

  try {
    return await axios
      .post(
        "http://127.0.0.1:8000/auth/refresh",
        {},
        {
          headers: {
            Authorization: tokenToSend,
          },
        },
      )
      .then((response) => {
        const accessToken = response?.data?.access_token;
        if (!accessToken) return false;
        localStorage.setItem("access_token", accessToken);
        return true;
      });
  } catch (err) {
    return false;
  }
}

export { userRegister, userLogin, getAuthedUserInfo, refreshAccessToken };
