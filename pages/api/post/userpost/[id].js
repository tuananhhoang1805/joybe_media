import Post from "../../../../models/postModel";
import dbconnect from "../../../../utils/mongose";

export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "GET") {
    try {
      const post = await Post.find({ user: req.query.id })
        .sort({ createdAt: -1 })
        .populate("user likes", "name image email followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            model: "User",
          },
        });

      res.status(200).json({ post, result: post.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
