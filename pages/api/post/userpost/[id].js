import Post from "../../../../models/postModel";
import dbconnect from "../../../../utils/mongose";

export default async function handler(req, res) {
  const { method } = req;

  let page, limit, skip;
  const pageOptions = {
    page: parseInt(req.query.page * 1) || 1,
    limit: parseInt(req.query.limit * 1) || 100,
    skip: (page - 1) * limit,
  };
  await dbconnect();
  if (method === "GET") {
    try {
      const post = await Post.find({ user: req.query.id })
        .skip(pageOptions.skip)
        .limit(pageOptions.limit)
        .sort({ createAt: -1 })
        .populate("user likes", "name image email followers");
      // .populate({
      //     path: "comments",
      //     populate: {
      //       path: "user likes",
      //       model: "User",
      //     },
      //   });;

      res.status(200).json({ post, result: post.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
