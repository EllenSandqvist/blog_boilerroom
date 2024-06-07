import express from "express";
import { Router } from "express";
import fs from "fs";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const blogPosts = JSON.parse(fs.readFileSync("./data/blogPosts.json"));

//* API part

//get all ("/api/v1/blogs")
router.get("/", (req, res) => {
  const { id, category } = req.query;
  const parsedId = parseInt(id);

  //if no querys, return whole json-file
  if (!id && !category)
    return res.status(200).render("home", { blogs: blogPosts });
  if (id && category)
    return res
      .status(400)
      .send("You can not combine a search for category with ID");
  if (id) {
    if (isNaN(parsedId)) return res.status(400).send("invalid ID");
    if (id) {
      const findBlog = blogPosts.find((blog) => blog.id == parsedId);
      if (!findBlog) return res.status(400).send("Id not found");
      //*todo RENDER!!!
      return res.status(200).render("postDetails", { placeholder: findBlog });
    }
  }
  if (category) {
    const findBlogsCategory = blogPosts.filter(
      (blog) => blog.category.toLowerCase() == category.toLowerCase()
    );
    if (findBlogsCategory.length == 0)
      return res.status(400).send("Category not found");
    //*todo RENDER!!!
    return res.status(200).render("home", { blogs: findBlogsCategory });
  }
});

router.post("/", (req, res) => {
  const { body } = req;
  const newId = blogPosts[blogPosts.length - 1].id + 1 || 1;
  const dateCreated = new Date().toLocaleString;
  const commentsArray = [];
  const likesCount = 0;
  const newBlog = {
    id: newId,
    date_created: dateCreated,
    comments: commentsArray,
    likes: likesCount,
    ...body,
  };
  blogPosts.push(newBlog);

  fs.writeFile("./data/blogPosts.json", JSON.stringify(blogPosts), (err) => {
    if (err) return res.status(500).send("something went wrong", err.message);

    res.status(201).redirect(`/blogs?id=${newId}`);
  });
});

router.put("/", (req, res) => {
  const {
    body,
    query: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.status(400).send(`Invalid id:${id}`);

  const blogToUpdateIndex = blogPosts.findIndex((blog) => blog.id === parsedId);
  console.log(blogToUpdateIndex);

  if (blogToUpdateIndex === -1)
    return res.status(404).send(`No blog with id:${id} found`);

  blogPosts[blogToUpdateIndex] = { id: parsedId, ...body };

  fs.writeFile("./data/blogPosts.json", JSON.stringify(blogPosts), (err) => {
    if (err) return res.status(500).send("something went wrong", err.message);

    res.status(201).json(blogPosts[blogToUpdateIndex]);
  });
});

router.patch("/", (req, res) => {
  const {
    body,
    query: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.status(400).send(`Invalid id:${id}`);

  const blogToUpdateIndex = blogPosts.findIndex((blog) => blog.id === parsedId);
  console.log(blogToUpdateIndex);

  if (blogToUpdateIndex === -1)
    return res.status(404).send(`No blog with id:${id} found`);

  blogPosts[blogToUpdateIndex] = { ...blogPosts[blogToUpdateIndex], ...body };

  fs.writeFile("./data/blogPosts.json", JSON.stringify(blogPosts), (err) => {
    if (err) return res.status(500).send("something went wrong", err.message);

    res.status(201).json(blogPosts[blogToUpdateIndex]);
  });
});

router.delete("/", (req, res) => {
  const { id } = req.query;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send("invalid ID");
  const findDeletedIndex = blogPosts.findIndex((blog) => blog.id == parsedId);
  if (findDeletedIndex == -1)
    return res.status(404).send(`No blog with id:${id} found`);

  blogPosts.splice(findDeletedIndex, 1);

  fs.writeFile("./data/blogPosts.json", JSON.stringify(blogPosts), (err) => {
    if (err) return res.status(500).send("something went wrong", err.message);

    res.status(201).json(blogPosts);
  });
});

export default router;
