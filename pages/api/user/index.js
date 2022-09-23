import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../utils/mongose";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const users = await db
        .collection("users")
        .find()
        .toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

//   if (method === "POST") {
//     try {
//       const post = await db
//         .collection("users")
//         .insertOne({ ...body, timestamp: new Timestamp() });
//       res.status(201).json(post);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
}