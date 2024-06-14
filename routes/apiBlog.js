import { Router } from "express";
import BlogModel from "../models/blogModel.js";

const router = Router();

//* API part

//get all ("/api/v1/blogs")
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const blogs = await BlogModel.find();

    if (!category) return res.status(200).json(blogs);

    const blogCategory = await BlogModel.find({ category: category });

    return res.status(200).json(blogCategory);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let blog = await BlogModel.findById(id);
    if (!blog) throw new Error("Wrong ID");
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const addNewBlog = await BlogModel.create(req.body);

    res.status(201).json(addNewBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);

    blog.profile_image = req.body.profile_image;
    blog.name = req.body.name;
    blog.post_text = req.body.post_text;
    blog.post_image = req.body.post_image;
    blog.comments = req.body.comments;
    blog.likes = req.body.likes;
    blog.category = req.body.category;
    blog.title = req.body.title;

    const updateBlog = await blog.save();
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(id, req.body);

    if (!blog) throw new Error("Wrong ID");
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) throw new Error("Wrong ID");
    res.status(204).send();
  } catch (err) {
    res.status(500).send(`Something went Wrong: ${err.message}`);
  }
});

export default router;
