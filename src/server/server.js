var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var totalCookies = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('click', totalCookies);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('click', () => {
    socket.broadcast.emit('click', totalCookies);
    totalCookies++;
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});