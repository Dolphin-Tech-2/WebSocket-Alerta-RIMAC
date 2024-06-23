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
  event.gemini_output = await postChatbot(`Soy un usuario de la aplicación Rimac Seguros y deseo que la app me brinde de una forma breve pero conscisa la información de algun evento que ocurra.Eres un experto en resumenes de eventos con más de 20 años de experiencia, para aplicaciones de alertas. Tu deber será en base a un evento dado brindar un resumen del evento para que el usuario de la app sepa del evento que ha ocurrido el resumen no debe pasar de las 3 lineas. Utilize un tono amigable sin dejar de lado la formalidad, todo esto es confin de cuidar el bienestar del usuario. Como punto extra podria brindar algunas recomendaciones para que el usuario se encuentre seguro. No exceda de los 65 caracteres. El evento es : ${event.latitud} ${event.longitud} ${event.tipo}`);
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
