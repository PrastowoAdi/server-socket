const express = require("express");

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://trynext-eight.vercel.app", //specific origin you want to give access to,
  },
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle custom events from the client
  socket.on("action", (data) => {
    socket.broadcast.emit("receive_action", data);
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 3001;
httpServer.listen(port, () => {
  console.log(`Socket.IO server started on http://localhost:${port}`);
});
