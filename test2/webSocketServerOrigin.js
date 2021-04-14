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
    httpServer: httpServer,
    autoAcceptConnections: false
});
 
 
wsServer.on('request', function(request) {
    
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            
            var rcvData = {"symbol":"BTC/USD",
                            "asks":[{"price":"6681.39","quantity":"25.1470","stepValue":null},
                                   {"price":"6688.06","quantity":"50.7548","stepValue":null},
                                   {"price":"6347.65","quantity":"181.3822","stepValue":null}
                                ],
                           "depthPercent":"0.01",
                           "asksMinPrice":"6674.89",
                           "bidsMaxPrice":"6674.56"
                          };

            connection.sendUTF(JSON.stringify(rcvData));
            
            setInterval(() => {
                connection.sendUTF(JSON.stringify(rcvData));
            }, 500);
    
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});