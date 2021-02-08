var express = require('express');
var app = express();
var socket = require('socket.io');
app.set('view engine', 'ejs');
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use('/', express.static('public'));
var server = app.listen(3000, () => {
  console.log('listening at 3000');
});
app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});
var io = socket(server);
io.on('connection', (socket) => {
  console.log('socket made connection', socket.id);
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })
});