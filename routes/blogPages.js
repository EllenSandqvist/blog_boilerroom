import { Router } from "express";
import BlogModel from "../models/blogModel.js";

const router = Router();

//get all ("/api/v1/blogs")
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const blogPosts = await BlogModel.find();

    if (!category) return res.status(200).render("home", { blogs: blogPosts });

    const findBlogsCategory = await BlogModel.find({
      category: new RegExp(category, "i"),
    });

    return res.status(200).render("home", { blogs: findBlogsCategory });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let findBlog = await BlogModel.findById(id);
    if (!findBlog) throw new Error("Wrong ID");
    return res.status(200).render("postDetails", { placeholder: findBlog });
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;

    let findBlog = await BlogModel.findById(id);
    if (!findBlog) throw new Error("Wrong ID");
    return res.status(200).render("updatePost", { blog: findBlog });
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const addNewBlog = await BlogModel.create(req.body);

    res.status(201).redirect(`/blogs/${addNewBlog._id}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(id, req.body);

    if (!blog) throw new Error("Wrong ID");
    // res.status(200).redirect(`/blogs/${blog._id}`);
    res.status(200).send({
      success: true,
      redirectUrl: `/blogs/${req.params.id}`,
    });
  } catch (err) {
    res.status(500).send(`Something went wrong: ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) throw new Error("Wrong ID");
    res.status(200).send({
      success: true,
      redirectUrl: "/blogs",
    });
  } catch (err) {
    res.status(500).send(`Something went Wrong: ${err.message}`);
  }
});

export default router;
