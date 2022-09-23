import { connectToDatabase } from "../../../utils/mongose";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  const {
    method,
    body: { status },
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res
        .status(200)
        .json({
          data: db.collection("posts").findOne({ _id: ObjectId(id) }),
          message: "delete successfully",
        });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  if (method === "PUT") {
    try {
      await db.collection("posts").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            status,
          },
        }
      );
      res.status(200).json({
        data: db.collection("posts").findOne({ _id: ObjectId(id) }),
        message: "update successfully",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}