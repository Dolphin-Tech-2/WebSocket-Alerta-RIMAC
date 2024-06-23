import { config } from "dotenv";

config();

export const API_CHATBOT = process.env.API_CHATBOT || "http://localhost:8000/ia/chatbot/";

export const API_EVENTOS = process.env.API_EVENTOS || "http://localhost:8000/eventos/";

export const DOMAIN_ACEPTED = process.env.DOMAIN_ACEPTED || "http://localhost:5173";