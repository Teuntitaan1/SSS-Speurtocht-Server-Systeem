// the http module handles the server part of this file, it can process http requests
const http = require("http");
const MongoDB = require('mongodb');
const host = 'localhost';
const port = process.env.port || 8000;
//
//
//
const uri = "mongodb+srv://PCUSER:ARCHEONTHEGOAT@archeon-leaderboard.pkxjk0s.mongodb.net/?retryWrites=true&w=majority";
const Client = new MongoDB.MongoClient(uri);
Client.connect().then(() => {console.log("Database connected");});
var DebugOn = false;


async function GetRequest(request, response) {
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type' : "text/plain"
    }

    // writehead is the http response the client should recieve
    response.writeHead(200, headers);
    const Leaderboard = await Client.connect().then(() => {return Client.db("Archeon-Leaderboard").collection("Leaderboard").find({}).sort({TotalPoints : -1}).toArray();});

    if (DebugOn) {
        console.log("SEND DATA: ");
        console.table(Leaderboard);
    }
    response.end(JSON.stringify(Leaderboard));
    
}

async function PostRequest(request, response) {
    
    const headers = {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type' : "text/plain"
    }
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
      //append data to database
      Client.connect().then(() => {Client.db("Archeon-Leaderboard").collection("Leaderboard").insertOne(Data)});
    });

    // http code OK
    response.writeHead(200, headers);

    // write the actual response.
    response.end("Got data!");
}

// function that listens for request and handles them accordingly
const requestListener = function (request, response) {

    if (DebugOn) {
        console.log(`[${new Date().toLocaleString()}] || ${request.method} FROM ${request.socket.remoteAddress}`); // type of request + ip adress
    }

    switch (request.method) {
        
        case "GET":
            GetRequest(request, response);
            break;
        case "POST":
            PostRequest(request, response);
            break;
        case "OPTIONS":
            const headers = {
                'Access-Control-Allow-Origin': '*', 
                'Content-Type' : "text/plain",
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                'Access-Control-Max-Age': 2592000,
            }
            response.writeHead(204, headers);
            response.end();

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
// creates the server and
// keeps the server up and running
http.createServer(requestListener).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`Server started on ${new Date().toLocaleString()}`);
});