// the http module handles the server part of this file, it can process http requests
const fs = require("fs");
const http = require("http");
const host = 'localhost';
const port = 8000;
//
//
//
// Extra variables


function GetRequest(request, response) {
    // header stuff which i know next to nothing about, i do know that the setheader function works like a dictionary
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    // writehead is the http response the client should recieve
    response.writeHead(200);
    // end is the actual response the client recieves
    response.end(fs.readFileSync("Questions.json"));
}

function PostRequest(request, response) {
    
    // Loads the data in in chunks and stops when there's no more data to receive
    var body = '';
    request.on('data', function (data) {
        body += data; //body data
        console.log(`Data received: ${body}`);
    });

    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    // http code OK
    response.writeHead(200);

    // write the actual response.
    response.end("Data ontvangen");
}

// function that listens for request and handles them accordingly
const requestListener = function (request, response) {
    
    if (request.method == "GET") {
        console.log("GET request was received");

        GetRequest(request, response);
    }
    
    else if (request.method == "POST") {
       
        console.log("POST request was received");

        PostRequest(request, response);
    }
    // if the client sends a not implemented http request
    else {
        
        console.log("Bad request was received");

        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.writeHead(500);
        response.end("This function is not implemented");
    }

};
//
//
//
//
// creates the server
const server = http.createServer(requestListener);
// keeps the server up and running
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});