import dbconnect from "../../../utils/mongose";
import Post from "../../../models/postModel";
import Comment from "../../../models/commentModel";

export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "POST") {
    try {
      const { postId, content, tag, reply, postUserId , user_id } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(400).json({ message: "Bài viết không tìm thấy" });
      }
      if (reply) {
        const comment = await Comment.findById(reply);

        if (!comment) {
          return res.status(400).json({ message: "Comment không tìm thấy" });
        }
      }

      const newComments = await new Comment({
        user: user_id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });

      await Post.findByIdAndUpdate(
        {
          _id: postId,
        },
        { $push: { comments: newComments._id } },
        { new: true }
      );

      await newComments.save();

      res.status(200).json({ newComments, message: "Comment thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
