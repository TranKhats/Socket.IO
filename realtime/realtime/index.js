var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        var save_erro = false;
        http.get('../index.php?msg=' + msg, (res) => {
            const { statusCode } = res;
            const contentType = res.header('content-type');
            let error;
            if (!statusCode == 200) {
                save_erro = true;
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                if (rawData != 'ok') {
                    save_erro = true;
                    return;
                }
            });
            if (!save_erro) {
                io.emit('chat message', msg);
            }
        });
        io.emit('chat message',msg);
    });
});

http.listen(3000,()=>{
    console.log('Iam  listening 3000 port');
});