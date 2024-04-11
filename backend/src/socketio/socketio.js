import {io} from "../index.js";

export const socketIoConnectioin = () => {
  let users = [];

  io.on("connection", (socket) => {
    console.log("a user connected");
   

    socket.on("joinAuction", (userId) => {
        socket.join(userId); // Joins the room of the userId
          //check user before exist
          const user = users.find((user) => user.userId === userId);
          if (!user) {
            users.push({ userId, socketId: socket.id });
          } else {
            user.socketId = socket.id;
          }
          console.log(users);
      });
  
      socket.on("newBid", (data) => {
        //send message to all users who are in users

        //send them
        users.forEach((user) => {
          io.to(user.socketId).emit("newBidData", data);
        });
  
      });

 

    socket.on("disconnect", () => {
      console.log("user disconnected");

    });
  });
};
