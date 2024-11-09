const {MongoClient} = require("mongodb");
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);

async function connectMongo(dbname){
    await client.connect();
    console.log("connected database successfully");
}

module.exports = {connectMongo,client};