var WebSocketServer = require('websocket').server;
var http = require('http');
var cors = require('cors')(); 
var express = require('express');

var app = express();
app.use(cors);

var httpServer =http.createServer(app).listen(8888, function(req,res){
    console.log('Socket IO server has been started');
});
 
wsServer = new WebSocketServer({
    httpServer: httpServer
});
 
wsServer.on('request', function(request) {
    
    var connection = request.accept(null, request.origin);
   
    connection.on('message', function(message) {
        
        if (message.type === 'utf8') {

            
             console.log('message.utf8Data ==>',message.utf8Data);
            

            connection.sendUTF(JSON.stringify(message.utf8Data));
            //wsServer.broadcast(JSON.stringify(message.utf8Data));
        }
        else if (message.type === 'binary') {
            connection.sendBytes(message.binaryData);
        }
    });
    
    connection.on('close', function() {
        console.log('close');
    });
});