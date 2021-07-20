const http = require("http");

const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static folder
app.use(express.static("public"));

// Listenig port
const PORT = process.env.PORT | 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Setup websocket
io.on("connection", (socket) => {
    console.log(`User connected.`);

    // Listen
    socket.on("disconnect", () => console.log(`User disconnected.`));

    socket.on("chat message", (data) => {
        io.sockets.emit("chat message", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});
