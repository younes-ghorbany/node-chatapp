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

const users = {};

// Setup websocket
io.on("connection", (socket) => {
    // Listen

    socket.on("login", (data) => {
        console.log(`${data.nickname} connected.`);
        users[socket.id] = data.nickname;
        io.sockets.emit("online", users);
    });

    socket.on("disconnect", () => {
        console.log(`${users[socket.id]} disconnected.`);
        delete users[socket.id];
    });

    socket.on("chat message", (data) => {
        io.sockets.emit("chat message", data);
    });

    socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
    });
});
