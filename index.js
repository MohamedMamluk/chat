const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.get('/', (req, res) => {
  res.render('home.ejs');
});
io.on('connection', (socket) => {
  console.log('connected');
  socket.on('send', (message) => {
    io.emit('sending', { message, id: socket.id });
  });
});
const port = process.env.PORT || 7000;

server.listen(port, () => console.log(`app is listening on port ${port}`));
