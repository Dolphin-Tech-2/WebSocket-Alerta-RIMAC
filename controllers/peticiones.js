import axios from "axios";
import { API_CHATBOT, API_EVENTOS } from "../config.js";

export const postChatbot = async (text_input) => {
  try {
    const response = await axios.post(API_CHATBOT, {
      text_input,
    });
    return response.data.gemini_output;
  } catch (error) {
    console.error(error);
  }
};

export const getRandomEvent = async () => {
  try {
    const response = await axios.get(API_EVENTOS+"get_evento_random/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const postEvent = async (event) => {
  try {
    const response = await axios.post(API_EVENTOS+"post_eventos/", event);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}