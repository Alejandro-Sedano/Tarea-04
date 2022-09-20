var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(process.env.PORT || 4000, function(){
    console.log('Servidor corriendo en el puerto ',process.env.PORT || server.address().port);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    
    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});