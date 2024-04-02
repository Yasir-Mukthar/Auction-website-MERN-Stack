import dotenv from 'dotenv';
import { app } from "./app.js"
import connectDB from './db/index.js';
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server);

dotenv.config({
  path:"./env"
})

connectDB()
.then(
  server.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port ${process.env.PORT}`)
  })
)


io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});



export { io, server }