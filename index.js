import express from "express";
import apiRoute from "./routes/apiBlog.js";
import blogRoute from "./routes/blogPages.js";

const app = express();
const PORT = 3030;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/api/v1/blogs", apiRoute);
app.use("/blogs", blogRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}. http://localhost:${PORT}`);
});
