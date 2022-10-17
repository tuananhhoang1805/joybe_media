import cloudinary from "cloudinary";

import Post from "../../../../models/postModel";
import dbconnect from "../../../../utils/mongose";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
export default async function handler(req, res) {
  const { method } = req;

  await dbconnect();
  if (method === "GET") {
    try {
      const post = await Post.findById({ _id: req.query.id })
        .populate("user likes", "image , name  ,email , followers")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            model: "User",
          },
        });
      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "PATCH") {
    try {
      const { status } = req.body;

      const post = await Post.findOneAndUpdate(
        {
          _id: req.query.id,
        },
        {
          status,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Đã chỉnh sửa bài viết", post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "DELETE") {
    try {
      const post = await Post.findById({ _id: req.query.id });

      if (!post) {
        return res.status(400).json({ message: "Post không tồn tại" });
      }

      await Post.findOneAndDelete({ _id: req.query.id });

      if (post.images.lenght > 0) {
        for (let i = 0; i < post.images.lenght; i++) {
          await cloudinary.v2.uploader.destroy(post.images[i].public_id);
        }
      }

      res.status(200).json({
        message: "Đã xóa bài viết!",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
