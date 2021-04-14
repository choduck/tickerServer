var http, crypto, signature,utf8;

http = require("https");
crypto = require("crypto");

utf8 = require('utf8');

var post_data = {
    'Symbol': 'BCH-BTC'
    //'Symbol': 'TMTG-BTC'
};


var objJsonB64 = utf8.encode(JSON.stringify(post_data));

var config = {
    AccessKeyId : utf8.encode('d9g8Qut80Eu7VYWn50h_LA'),
    SecretKey   : utf8.encode('DcfUdasSjCkEIK7dU9s27rhAcfJ6jSfjTpbEvwhWTQwrir9xyOKn2sjbVEHXrmzrm1KizsIoRv8gVPhL6cxv7Sgr6ZIQPkvwh44hHQX56mvwj2g5mVRfP4jtKjcAKRyx0CZQKZ4fesoLmK73JCtTtgHcLBxnEnleNYwH3pkmRB0nFy6Zc8R7nF4JUM59sGBQ7aXoep0jh61RfkxcvxbvwdR8UMMgjbUb09fuBILM8xQgEcuAfTEVv5kTjOusCJ06')
  }
 

var signature =  generateHmac(objJsonB64, config.SecretKey);

console.log(signature);

function generateHmac (data, SecretKey, algorithm, encoding) {
    encoding = encoding || "base64";
    algorithm = algorithm || "sha256";
    return crypto.createHmac(algorithm, SecretKey).update(data).digest(encoding);
}


// An object of options to indicate where to post to

var post_options = {
    host: 'api.idcm.io',
    port: '8323',
    path: '/api/v1/getticker',
    method: 'POST',
    headers: {
        'X-IDCM-APIKEY': config.AccessKeyId,
        'X-IDCM-SIGNATURE': signature,
        'X-IDCM-INPUT': objJsonB64
        //'Content-Type': 'application/json'
    }
};


// Set up the request
var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});

// post the data
post_req.write(objJsonB64);
post_req.end();
