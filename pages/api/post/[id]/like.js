import dbconnect from "../../../../utils/mongose";
import Post from "../../../../models/postModel";

export default async function handler(req, res) {
  await dbconnect();
  const { method } = req;

  if (method === "PATCH") {
    const { user_id, _id } = req.body;
    try {
      //   const post = await Post.find({ _id: req.query.id, likes: user_id });

      //   if (post.length > 0)
      //     return res.status(400).json({ message: "Bạn đã thích post này" });

      const like = await Post.findOneAndUpdate(
        {
          id: _id,
        },
        {
          $push: { likes: user_id },
        },
        {
          new: true,
        }
      );

      if (!like)
        return res.status(400).json({ message: "Post này không tồn tại" });

      res.status(200).json({ message: "Đã thích", ...like._doc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
