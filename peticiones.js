import axios from "axios";
import { API_CHATBOT } from "./config.js";

export const postChatbot = async (text_input) => {
  try {
    const response = await axios.post(API_CHATBOT, {
      text_input,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const result = await postChatbot("Hola");

console.log(result);
