import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectToMongo from "./Database/db.js";
import authRoute from "./routes/authRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import newsLetter from "./routes/newsletter.js";
import searchRoutes from "./routes/searchRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
const app = express();
connectToMongo();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "src/public")));

app.use("/auth", authRoute);
app.use("/", contactRoutes);
app.use("/", profileRoutes);
app.use("/", postRoutes);
app.use("/", dashboardRoutes);
app.use("/", newsLetter);
app.use("/", searchRoutes);
app.use("/", adminRoutes);
app.use("/", commentRoutes);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/page/view/post/:title/:id",(req,res)=>{
  const { title, id } = req.params;
  
  res.render("viewpost.ejs", { title, id });
});
app.get("/page/about",(_, res) => {
  res.render("about");
})
app.get("/page/faq",(req,res)=>{
  res.render("faq.ejs");
})
app.get("/page/dashboard",(req,res)=>{
  res.render("dashboard.ejs");
})

app.get("/page/allblogs",(req,res)=>{
  res.render("./Blog/allBlog.ejs");
})
app.use((req, res, next) => {
  res.status(404).render("404");
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 127.0.0.1:${process.env.PORT}`);
  });
  