import dbconnect from "../../../../utils/mongose";
import Comment from "../../../../models/commentModel";

export default async function handler(req, res) {
  await dbconnect();
  const { method } = req;

  if (method === "PATCH") {
    try {
      const comment = await Comment.find({
        _id: req.query.id,
        likes: req.body.user_id,
      });

      if (comment.length > 0)
        return res.status(400).json({ message: "Bạn đã thích comment này" });

      await Comment.findOneAndUpdate(
        { _id: req.query.id },
        {
          $push: { likes: req.body.user_id },
        },
        { new: true }
      );

      res.status(200).json({ message: "Đã thích comment"});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
