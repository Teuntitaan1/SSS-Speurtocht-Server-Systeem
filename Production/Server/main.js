// fs is short for file system and it handles the opening and closing of the json file containing the questions
const fs = require('fs');
const QuestionFile = fs.readFileSync('Questions.json');



// the http module handles the server part of this file, it acan process http requests
const http = require("http");
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    
    // header stuff which i know next to nothing about, i do know that the setheader function works like a dictionary
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // writehead is the http response the client should recieve
    res.writeHead(200);
    // end is the actual response the client recieves
    res.end(QuestionFile);
};

// creates the server
const server = http.createServer(requestListener);

// keeps the server up and running
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});