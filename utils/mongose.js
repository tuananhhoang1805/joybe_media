// import { MongoClient } from "mongodb";

// let uri = process.env.MONGODB_URI;
// let dbName = process.env.MONGODB_NAME
// ;
// let cachedClient = null;
// let cachedDb = null;

// if (!uri) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// if (!dbName) {
//   throw new Error(
//     "Please define the MONGODB_NAME environment variable inside .env.local"
//   );
// }

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb };
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = await client.db(dbName);

//   cachedClient = client;
//   cachedDb = db;

//   return { client, db };
// }

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbconnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default dbconnect;