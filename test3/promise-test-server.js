var http = require ( 'http' );

http.createServer ( function (req, res) { 
    console.log ( "-----------" );
     // 요청 데이터의 확인 
    var data = '' ;
    req.on ( 'readable' , function (chunk) {
        data += req.read ();
    });
    req.on ( 'end' , function () {
        console.log (data);
    });

    var statusCode;
     // 무작위로 실패 할 
    var x = Math.random ();
     if (x <0.9) {
        statusCode = 200;
    } else {
        statusCode = 400;
    } 
    console.log ( "statusCode :" + statusCode);

    // Response 
    res.writeHead (statusCode, { 
        'Content-Type' : 'application / json' ,
     } );
    res.end ();

} ).listen (1338, '127.0.0.1' );