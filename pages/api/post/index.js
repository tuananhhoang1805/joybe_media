import cloudinary from "cloudinary";
import Post from "../../../models/postModel";
import dbconnect from "../../../utils/mongose";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

export default async function handler(req, res) {
  const { method } = req;
  const { page, limit } = req.body;
  // const pageOptions = {
  //   page: parseInt(page * 1) || 10,
  //   limit: parseInt(limit * 1) || 100,
  //   skip: (page - 1) * limit,
  // };

  // console.log(page ,limit );
  await dbconnect();
  if (method === "GET") {
    try {
      const post = await Post.find()
        .limit(limit * 1 || 5)
        .skip((page - 1 ) * ( limit * 1 || 10))
        .sort({ createdAt: -1 })
        .populate("user likes", "image , name  ,email , followers")
        .populate({
          path: "comments",
          populate : {
            path: "user likes",
            model: "User",
          }
        })
      res.status(200).json({ message: "Success!", result: post.length, post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "POST") {
    const { status, images, user_id } = req.body;

    if (images.length > 4) {
      return res.status(400).json({
        message: "You can only upload up to 4 images",
      });
    }
    let image = [];
    if (typeof images === "string") {
      image.push(images);
    } else {
      image = images;
    }

    const postImage = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: `Posts/${user_id}`,
        transformation: [
          {
            height: images.height,
            width: images.width,
            crop: "fill",
            gravity: "face",
          },
          {
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      });
      postImage.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const post = new Post({
      status: status,
      images: postImage,
      user: user_id,
    });

    await post.save();
    res.status(201).json({ message: "Tạo Post Thành Công", ...post._doc });

    try {
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "24mb", // Set desired value here
    },
  },
};
