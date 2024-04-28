function userLogout(navigate) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
  localStorage.removeItem("auth_token_type");
  navigate("/signup");
}

export default userLogout;
