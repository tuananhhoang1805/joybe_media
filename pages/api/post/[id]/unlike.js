import dbconnect from "../../../../utils/mongose";
import Post from "../../../../models/postModel";

export default async function handler(req, res) {
  await dbconnect();
  const { method } = req;

  if (method === "PATCH") {
    try {
      const like = await Post.findOneAndUpdate(
        { _id: req.query.id },
        { $pull: { likes: req.body.user_id } },
        {
          new: true,
        }
      ).populate("status");

      if (!like)
        return res.status(400).json({ msg: "Post không tồn tại" });

      res.status(200).json({ message: "Hủy thích post", ...like._doc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
