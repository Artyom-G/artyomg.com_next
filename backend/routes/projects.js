import express from "express";
import { getAllProjectCards } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/get_all_project_cards", getAllProjectCards);

export default router;
