import dotenv from 'dotenv';
import { app } from "./app.js"
import connectDB from './db/index.js';
import http from "http";
import { Server } from "socket.io";
import  {socketIoConnectioin}  from './socketio/socketio.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

dotenv.config({
  path:"./env"
})

connectDB()
.then(
  server.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port ${process.env.PORT}`)
  })
)



socketIoConnectioin()

export { io, server }