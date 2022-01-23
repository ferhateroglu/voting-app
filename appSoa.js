/*jslint node: true */
"use strict";
var soap = require('soap');
var express = require('express');
var fs = require('fs');
const request = require('request')
const rp = require('request-promise');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// the splitter function, used by the service
async function splitter_function(args) {
  let result = "";
  // const options = {
  //   hostname: 'http://10.138.136.161',//'192.168.43.172',
  //   port: 5000,
  //   path: '/sifrele/sha256/'+args.plainText,
  //   method: 'GET'
  // }
  let url = 'http://10.138.136.161:5000//sifrele/sha256/'+args.plainText;
  // const req = https.request(options, res => {
  //   console.log(`statusCode: ${res.statusCode}`)
  
  //   res.on('data', d => {
  //     console.log(d)
  //     result = d
  //   })
  // })
  var options = {
    uri: url,
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
    
  let emir = await rp(options);
  result=emir.cipher_text;

  console.log(emir);

    return {
      result
    }
}
// the service
var serviceObject = {
  PasswordHasherService: {
    PasswordHasherServiceSoapPort: {
          PasswordHasher: splitter_function
        },
        PasswordHasherServiceSoap12Port: {
          PasswordHasher: splitter_function
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
