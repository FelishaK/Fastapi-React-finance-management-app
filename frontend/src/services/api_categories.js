import axios from "axios";
import { getTokenToSend } from "../utils/helpers";
axios.defaults.baseURL = "";

export async function getAllCategories() {
  const tokenToSend = getTokenToSend();
  try {
    return await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/categories/all",
      headers: { Authorization: tokenToSend },
    }).then((response) => {
      return response.data;
    });
  } catch (err) {
    throw new Error(err.response.status);
  }
}

export async function createCategory({ sticker, name }) {
  const tokenToSend = getTokenToSend();
  const data = {
    name: name,
    sticker: sticker,
  };
  try {
    return await axios.post("http://127.0.0.1:8000/categories", data, {
      headers: { Authorization: tokenToSend },
    });
  } catch (err) {
    if (err.response.status === 409) {
      throw new Response("Category Already exists", { status: 409 });
    }
  }
}
