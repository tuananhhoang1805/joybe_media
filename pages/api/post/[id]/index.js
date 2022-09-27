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
      const post = await Post.findById({ _id: req.query.id });
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
      res.status(200).json({ message: "Updated Post!", post });
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
        for (let i = 0; i <post.images.lenght ; i++) {
          await cloudinary.v2.uploader.destroy(post.images[i].public_id);
        }
      }

      res.status(200).json({
        message: "Deleted Post!",
        post,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //   if (method === "POST") {
  //     const { status, images } = req.body;
  //     if (images.length > 4) {
  //       return res.status(400).json({
  //         message: "You can only upload up to 4 images",
  //       });
  //     }
  //     let image = [];
  //     if (typeof(images) === "string") {
  //       image.push(images);
  //     } else {
  //       image = images;
  //     }

  //     const postImage = [];
  //     if (images) {
  //       for (let i = 0; i < images.length; i++) {
  //         const result = await cloudinary.v2.uploader.upload(images[i], {
  //           folder: `Posts/${req.user._id}`,
  //           transformation: [
  //             {
  //               height: 380,
  //               width: 350,
  //               crop: "fill",
  //               gravity: "face",
  //             },
  //             {
  //               quality: "auto",
  //               fetch_format: "auto",
  //             },
  //           ],
  //         });
  //         postImage.push({
  //           public_id: result.public_id,
  //           url: result.secure_url,
  //         });
  //       }
  //     }

  //     const post = new Post({
  //       status,
  //       postImage: postImage,
  //       user: req.query.id,
  //       // user: req.user._id,
  //     });

  //     await post.save();
  //     res
  //       .status(201)
  //       .json({ message: "Post created successfully", ...post._doc });
  //     try {
  //     } catch (error) {
  //       res.status(500).json({ message: error });
  //     }
  //   }
}
