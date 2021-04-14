var request = require ( 'request' );

var REQUEST_COUNT = 5;
 var apiUrl = "http://127.0.0.1:1338/" ;
 var taskArray = [] ;

// 작업 작성 
for ( var i = 0; i <REQUEST_COUNT; i ++) { 
    var task = new Promise ( function (resolve, reject) { 
        // 요청 데이터 생성 
        var param = { 
            'data' : i,
         } ;

        var options = {
            uri : apiUrl,
            method : 'GET' ,
            headers : { 
                'Content-Type' : 'application / x-www-form-urlencoded' ,
             } ,
            form : param
        } ;

        // 요청 데이터 
        request.post (options, function (error, response, body) { 
            if (! error && response.statusCode == 200) {
                resolve ();
            }else{
                (reject);
            } 
        } );
     } );
    taskArray.push (task);
}

// 작업 수행 
Promise.all (taskArray) .then ( function () { 
    console.log ( "Success" );
 } ). catch ( function () { 
    console.log ( 'Failure' );
 } );