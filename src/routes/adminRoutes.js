import express from "express";
import {
  adminLogin,
  getAllAdminPosts,
  getAllAdminUsers,
  deleteUser,
    fetchProfile,
} from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const router = express.Router();

router.get("/page/admin/auth/login", (req,res)=>{
    res.render("admin/login");
});
router.get("/page/admin/dashboard", (req,res)=>{
    res.render("admin/dashboard");
});
router.get("/page/admin/view/profile/:userID",(req,res)=>{
    res.render("admin/viewprofile", { userID: req.params.userID });
})
router.post("/api/admin/auth/login", adminLogin);

router.get("/api/admin/all/posts", adminMiddleware, getAllAdminPosts);
router.get("/api/admin/all/users", adminMiddleware, getAllAdminUsers);
router.get("/api/admin/fetch/profile/:userID", adminMiddleware, fetchProfile);

router.delete("/api/admin/delete/user/:id", adminMiddleware, deleteUser);


export default router;
