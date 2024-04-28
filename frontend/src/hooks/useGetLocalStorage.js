function useGetLocalStorage() {
  const token = localStorage.get("auth_token");
  const tokenType = localStorage.get("auth_token_type");
  return { token: token, tokenType: tokenType };
}

export default useGetLocalStorage;
