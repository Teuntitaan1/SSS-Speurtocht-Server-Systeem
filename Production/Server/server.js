// the http module handles the server part of this file, it can process http requests
const filesystem = require("fs");
const http = require("http");
const host = 'localhost';
const port = 8000;
//
//
//
// Extra variables

function GetRequest(request, response) {
    // header stuff which i know next to nothing about, i do know that the setheader function works like a dictionary
    response.setHeader("Content-Type", "text/plain");
    // writehead is the http response the client should recieve
    response.writeHead(200);
    // end is the actual response the client recieves
    response.end(JSON.stringify(require("./Leaderboard.json")));
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
      console.log(`Received data: `, Data);
      //append data to json file
      const LeaderBoardData = require("./Leaderboard.json");
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

    console.log(`Received a ${request.method} request`);

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
    console.log(`\n`);
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