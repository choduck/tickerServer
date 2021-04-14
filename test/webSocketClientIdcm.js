var WebSocketClient = require('websocket').client;


var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });+
    connection.on('message', function(message) {
        //console.log('message===>',message);
        
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");                                              
            
        
        }


    });
    
function sendData() {
    
    var reqData_ticker = {
        'event':'addChannel',
         'channel' : "idcm_sub_spot_BTC-VHKD_depth_5"
    };
    
   
    if (connection.connected) {
        connection.send(JSON.stringify(reqData_ticker));
    }


}

sendData();

});


//client.connect('ws://127.0.0.1:8888/websocket');
client.connect('wss://real.IDCM.io:10030/websocket');

