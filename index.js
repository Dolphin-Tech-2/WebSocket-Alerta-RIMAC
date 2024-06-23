// server.mjs
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { DOMAIN_ACEPTED } from "./config.js";
import { postChatbot } from "./peticiones.js";

const arrayPrompts = [
  "You are doing great!",
  "Keep up the good work!",
  "You can do it!",
  "You are awesome!",
  "You are amazing!",
  "You are a gem!",
  "You are a star!",
  "You are a rockstar!",
  "You are a super star!",
  "You are a superstar!",
  "You are a hero!",
  "You are a legend!",
  "You are a champion!",
  "You are a winner!",
  "You are a warrior!",
  "You are a survivor!",
  "You are a fighter!",
  "You are a conqueror!",
  "You are a victor!",
  "You are a master!",
  "You are a wizard!",
  "You are a genius!",
  "You are a prodigy!",
  "You are a virtuoso!",
  "You are a maestro",
];

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

io.on("connection", (socket) => {
  console.log("New user connected");

  // Envía un mensaje al cliente cada 5 segundos
  setInterval(async () => {
    try {
      const message = await postChatbot(arrayPrompts[Math.floor(Math.random() * arrayPrompts.length)]);
      socket.emit("notification", {
        message,
        date: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  }, 15000);

  socket.on("disconnect", () => {
    console.log("New user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
