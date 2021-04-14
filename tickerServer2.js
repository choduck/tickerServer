var express = require('express');
var cors = require('cors')();
var app = express();
var http = require('http');
var config = require('./config/config.js');

var ws = require('./test/webSocketClientIdcm2.js');

app.use(cors);
app.use(express.static('public'));

var httpServer = http.createServer(app).listen(config.LISTEN_PORT,function () {
    console.log('Http Server listening on port ',config.LISTEN_PORT);
});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.post('/sendProdInfo', function(req, res){
  
  console.log('req.body ====>',req.body);
  res.end('OK!!!');
})
  
ws.wsClient(tickerData);


function tickerData(message){
  

  console.log('====>',JSON.parse(message).data); 
}


var Mock = require('mockjs')
var prodList = []
var city = ['서울', '인천', '광주', '대전','부산']


var io = require('socket.io').listen(httpServer);
io.sockets.on('connection',function(socket){
   
  socket.interval = setInterval(() => {
    
    socket.emit('tickerPrice', {
        stockData : new Date()
    });

    prodList.push(['Location', 'Sales', 'Expenses', 'Profit'])
    
    for (let i = 0; i < 5; i++) {
        prodList.push(Mock.mock([
             city[i],
            '@float(0, 100, 2, 2)',
            '@float(0, 100, 2, 2)',
            '@float(0, 100, 2, 2)'
        ]))
    }

    socket.emit('prodList', {
      prodList : prodList
    });

    console.log(prodList);
    prodList = [];

  }, 500);

  socket.on('socketData',(num1,num2)=>{
    console.log(`${num1},${num2}`)
  }); 

});


// var WebSocketServer = require('websocket').server; 
// var wsServer = new WebSocketServer({
//     httpServer: httpServer,
//     autoAcceptConnections: true
// });
 
 
// wsServer.on('request', function(request) {
    
//     var connection = request.accept(null, request.origin);
//     console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log('Received Message: ' + message.utf8Data);
            
//             var rcvData = {"symbol":"BTC/USD",
//                             "asks":[{"price":"6681.39","quantity":"25.1470","stepValue":null},
//                                    {"price":"6688.06","quantity":"50.7548","stepValue":null},
//                                    {"price":"6347.65","quantity":"181.3822","stepValue":null}
//                                 ],
//                            "depthPercent":"0.01",
//                            "asksMinPrice":"6674.89",
//                            "bidsMaxPrice":"6674.56"
//                           };

//             connection.sendUTF(JSON.stringify(rcvData));
            
//             setInterval(() => {
//                 connection.sendUTF(JSON.stringify(rcvData));
//             }, 500);
    
//         }
//         else if (message.type === 'binary') {
//             console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
//             connection.sendBytes(message.binaryData);
//         }
//     });
//     connection.on('close', function(reasonCode, description) {
//         console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//     });
// });