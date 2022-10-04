import dbconnect from "../../../../utils/mongose";
import Post from "../../../../models/postModel";
import Comment from "../../../../models/commentModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();

  if (method === "PATCH") {
    try {
      const { content } = req.body;

      const comment = Comment.findByIdAndUpdate(
        { _id: req.query.id, user: req.user._id },
        {
          content,
        }
      );
      res.status(200).json({ message: "Chỉnh sửa thành công", comment });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  }
}
