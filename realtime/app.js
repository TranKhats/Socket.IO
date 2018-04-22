
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nsp=io.of('/namespaces1');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');//port sẽ tra ve file
});


nsp.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    console.log('Socket:'+socket.id)
  });
});

nsp.emit('some event', { for: 'everyone' });
nsp.on('connection', function (socket) {//on và emit giống nhau về một cặp key
  socket.on('chat message', function (msg) {
    nsp.emit('chat message', msg);
  });
});
// http.listen(3000, function () {
//   console.log('listening on *:3000');
// });
http.listen(3000);
