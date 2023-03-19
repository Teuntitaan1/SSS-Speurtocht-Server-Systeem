const MongoDB = require('mongodb');

// database deletion
const uri = "mongodb+srv://PCUSER:ARCHEONTHEGOAT@archeon-leaderboard.pkxjk0s.mongodb.net/?retryWrites=true&w=majority";
const Client = new MongoDB.MongoClient(uri);
async function DeleteAll() {
    Client.connect().then(() => {console.log("Database connected"); Client.db("Archeon-Leaderboard").collection("Leaderboard").deleteMany({}).then(() => {console.log("Deletion complete!")})});
    return "Done";
}
var result = DeleteAll();

