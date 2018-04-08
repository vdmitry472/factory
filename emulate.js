var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
     
    res.sendFile(__dirname + '/emulate.html');
});
// начинаем прослушивать подключения на 3000 порту
// app.listen(3001);
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('value', function(msg){
        console.log('value: ' + msg);
        socket.broadcast.emit('value',msg);
        
      });


  });

http.listen(3001, function()
{
    console.log("Listeninng");
})
