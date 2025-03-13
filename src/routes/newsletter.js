import express from "express";
import NewsLetter from "../Database/models/NewsLetter.js";

const router = express.Router();

router.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const findEmail = await NewsLetter.find({ email });
    if (findEmail.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists in the newsletter" });
    }
    const newEmail = new NewsLetter({ email });

    await newEmail.save();
    res.status(200).json({ success: true, message: "Email added to newsletter" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
export default router;
