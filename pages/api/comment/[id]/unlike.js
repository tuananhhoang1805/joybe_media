import dbconnect from "../../../../utils/mongose";
import Comment from "../../../../models/commentModel";

export default async function handler(req, res) {
  await dbconnect();
  const { method } = req;

  if (method === "PATCH") {
    try {
      const like = await Comment.findOneAndUpdate(
        { _id: req.query.id },
        { $pull: { likes: req.body.user_id } },
        {
          new: true,
        }
      );

      if (!like)
        return res.status(400).json({ message: "Comment không tồn tại" });

      res.status(200).json({ message: "Hủy thích comment" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
