// the http module handles the server part of this file, it can process http requests
const filesystem = require("fs");
const http = require("http");
const host = 'localhost';
const port = 8000;
//
//
//
var DebugOn = true;

function GetRequest(request, response) {
    // header stuff which i know next to nothing about, i do know that the setheader function works like a dictionary
    response.setHeader("Content-Type", "text/plain");
    // writehead is the http response the client should recieve
    response.writeHead(200);
    // end is the actual response the client recieves
    console.log("SEND DATA: ");
    console.table(JSON.parse(filesystem.readFileSync("./Leaderboard.json")));
    response.end(filesystem.readFileSync("./Leaderboard.json"));
}

function PostRequest(request, response) {
    
    // keeps on reading data until no more is coming
    var Data = null;
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      Data = JSON.parse(Buffer.concat(chunks));
      
      if (DebugOn) {
        console.log(`RECEIVED DATA:`);
        console.table(Data);
      }
      //append data to json file
      const LeaderBoardData = JSON.parse(filesystem.readFileSync("./Leaderboard.json"));
      LeaderBoardData.push(Data);
      filesystem.writeFileSync("LeaderBoard.json", JSON.stringify(LeaderBoardData));
    });

    response.setHeader("Content-Type", "text/plain");

    // http code OK
    response.writeHead(200);

    // write the actual response.
    response.end("");
}

// function that listens for request and handles them accordingly
const requestListener = function (request, response) {

    if (DebugOn) {
        console.log(`[${new Date().toLocaleString()}] || ${request.method} FROM ${request.socket.remoteAddress}`); // type of request + ip adress
    }

    response.setHeader("Access-Control-Allow-Origin", "*");


    switch (request.method) {
        
        case "GET":
            GetRequest(request, response);
            break;
        case "POST":
            PostRequest(request, response);
            break;

        default:
            response.setHeader("Content-Type", "text/plain");
            response.writeHead(500);
            response.end("This function is not implemented");
            break;
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
    console.log(`Server started on ${new Date().toLocaleString()}`);
});