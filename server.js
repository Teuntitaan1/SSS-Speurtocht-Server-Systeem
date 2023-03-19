const express = require("express");
const MongoDB = require('mongodb');
// server
const port = process.env.port || 8000;
const app = express();
app.use(express.text());

// database
const uri = "mongodb+srv://PCUSER:ARCHEONTHEGOAT@archeon-leaderboard.pkxjk0s.mongodb.net/?retryWrites=true&w=majority";
const Client = new MongoDB.MongoClient(uri);
Client.connect().then(() => {console.log("Database connected");});

// get request
app.get('/', async (request, response) => {
    
    // Set CORS headers
    response.set('Access-Control-Allow-Origin', '*');
    console.log(`Got GET request from ${request.ip}`);
    response.status = 200;
    response.send(JSON.stringify(await Client.connect().then(() => {return Client.db("Archeon-Leaderboard").collection("Leaderboard").find({}).sort({TotalPoints : -1}).toArray();})));
  });

// post request
app.post('/', async (request, response) => {
    // Set CORS headers
    response.set('Access-Control-Allow-Origin', '*');
    
    console.log(`Got POST request from ${request.ip}`);
    var Data = JSON.parse(request.body);
    //append data to database
    response.status = 200;
    response.send("Received data!");
    Client.connect().then(() => {Client.db("Archeon-Leaderboard").collection("Leaderboard").insertOne(Data);});
    
});
app.listen(port, () => {console.log(`Server Running on ${port}!`)});