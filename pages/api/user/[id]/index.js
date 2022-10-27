import User from "../../../../models/userModel";
import dbconnect from "../../../../utils/mongose";
export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "GET") {
    try {
      const users = await User.findById(req.query.id).populate(
        "followers following"
      );
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  if (method === "PUT") {
    try {
      const users = await User.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
      });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
