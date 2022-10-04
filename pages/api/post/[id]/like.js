import dbconnect from "../../../../utils/mongose";
import Post from "../../../../models/postModel";

export default async function handler(req, res) {
  await dbconnect();
  const { method } = req;

  if (method === "PATCH") {
    try {
      const post = await Post.find({
        _id: req.query.id,
        likes: req.body.user_id,
      });

      if (post.length > 0)
        return res.status(400).json({ message: "Bạn đã thích post này" });

      const like = await Post.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: { likes: req.body.user_id },
          $inc: { likeCount: 1, score: 1 },
        },
        {
          new: true,
        }
      );

      res.status(200).json({ message: "Đã thích post", ...like._doc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
