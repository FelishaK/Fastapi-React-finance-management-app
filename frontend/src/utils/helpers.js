export function formatDate(dateStr) {
  try {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch (err) {
    return false;
  }
}

export function formatDateForAPI(dateStr) {
  const currDate = new Date();
  let date = new Date(dateStr);
  if (date.getDay() !== currDate.getDay()) {
    return new Date(date.setDate(date.getDate() + 1))
      .toISOString()
      .split("T")[0];
  }
  return date.toISOString().split("T")[0];
}

export function currencyFormatter(curStr) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(curStr);
}

export function getTokenToSend() {
  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("auth_token_type");
  const tokenToSend = tokenType + " " + token;
  return tokenToSend;
}
