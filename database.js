const { MongoClient } = require('mongodb');
const connectionString = 'mongodb+srv://gabrielv:f60y4cLpFy5e6svc@cluster0.lzigpxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ;

let db;

const connectDB = async () => {
  if (db) return db;
  const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db('vacation_wishlist');
  return db;
};

module.exports = connectDB;