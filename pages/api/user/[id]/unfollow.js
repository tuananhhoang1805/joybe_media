import User from "../../../../models/userModel";
import dbconnect from "../../../../utils/mongose";
export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "PATCH") {
    try {
      const newUsers = await User.findOneAndUpdate(
        {
          _id: req.query.id,
        },
        {
          $pull: {
            followers: req.body.user_id,
          },
        },
        { new: true }
      ).populate("followers following");

      await User.findOneAndUpdate(
        {
          _id: req.body.user_id,
        },
        {
          $pull: {
            following: req.query.id,
          },
        },
        { new: true }
      );
      res.status(200).json({ newUsers });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
