import express from "express"
import {searchController} from "../controllers/searchController.js"
const router = express.Router();



router.get("/api/search", searchController);

export default router;