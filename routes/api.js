import express from "express";
const router = express.Router();
import { apiController } from "../controllers/index.js";

//Welcom api
router.get("/", apiController.api);
router.get("/api", apiController.api);

export default router;
