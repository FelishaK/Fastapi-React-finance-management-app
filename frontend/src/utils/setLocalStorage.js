function setLocalStorage(response) {
  const accessToken = localStorage.setItem(
    "access_token",
    response.data.access_token,
  );
  const refreshToken = localStorage.setItem(
    "refresh_token",
    response.data.refresh_token,
  );

  const tokenType = localStorage.setItem("auth_token_type", response.data.type);
  return { accessToken, refreshToken, tokenType };
}

export default setLocalStorage;
