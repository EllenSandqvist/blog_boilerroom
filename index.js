import express from "express";
import dotenv from "dotenv";
import apiRoute from "./routes/apiBlog.js";
import blogRoute from "./routes/blogPages.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/api/v1/blogs", apiRoute);
app.use("/blogs", blogRoute);

dotenv.config();
const PORT = process.env.PORT || 3031;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}. http://localhost:${PORT}`);
});
