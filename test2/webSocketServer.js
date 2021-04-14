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

            // console.log('request ==>',request);
            
             console.log('message.utf8Data ==>',message.utf8Data);
            
            
            var rcvData = {"symbol":"BTC/USD",
                            "asks":[{"price":"6681.39","quantity":"25.1470","stepValue":null},
                                   {"price":"6688.06","quantity":"50.7548","stepValue":null},
                                   {"price":"6347.65","quantity":"181.3822","stepValue":null}
                                ],
                           "depthPercent":"0.01",
                           "asksMinPrice":"6674.89",
                           "bidsMaxPrice":"6674.56"
                          };

            // connection.sendUTF(JSON.stringify(request));
            
             //wsServer.broadcast(JSON.stringify(rcvData));

            connection.sendUTF(JSON.stringify(rcvData));
            
        }
        else if (message.type === 'binary') {
            connection.sendBytes(message.binaryData);
        }
    });
    
    connection.on('close', function() {
        console.log('close');
    });
});