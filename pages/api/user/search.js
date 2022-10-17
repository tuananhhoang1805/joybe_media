import dbconnect from "../../../utils/mongose";
import User from "../../../models/userModel";

export default async function handler(req, res) {
  await dbconnect();

  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find({
        name: { $regex: req.query.name, $options: "i" },
      })
        .limit(10)
        .select("name email image");

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
