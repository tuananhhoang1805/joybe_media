import User from "../../../models/userModel";
import dbconnect from "../../../utils/mongose";
export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "GET") {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "PATCH") {
    try {
      const users = await User.findByIdAndUpdate(
        { _id: req.user._id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
