const http = require("http");

const express = require("express");

const app = express();
const server = http.createServer(app);

// Static folder
app.use(express.static("public"));

// Listenig port
const PORT = process.env.PORT | 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
