// server.mjs
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { DOMAIN_ACEPTED } from "./config.js";
import { postChatbot, getRandomEvent, postEvent } from "./controllers/peticiones.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: DOMAIN_ACEPTED, // Permitir el origen del frontend
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: DOMAIN_ACEPTED, // Permitir el origen del frontend
  })
);

async function generateEvent() {
  let event = await getRandomEvent();
  event.fecha = new Date().toString();
  event.gemini_output = await postChatbot("Hola");
  console.log(event);
  await postEvent(event);
  return event;
}

io.on("connection", (socket) => {
  console.log("New user connected");

  // Envía un mensaje al cliente cada 5 segundos
  setInterval(async () => {
    try {
      const evento = await generateEvent();

      socket.emit("notification", {
        evento,
      });
    } catch (error) {
      console.error(error);
    }
  }, 80000);

  socket.on("disconnect", () => {
    console.log("New user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
