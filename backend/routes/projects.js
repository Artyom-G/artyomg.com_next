import express from "express";
import { getAllProjectCards, getProjectCard, getProjectMarkdown } from "../controllers/projectsController.js";

const router = express.Router();

router.get("/get_all_project_cards", getAllProjectCards);
router.get("/get_project_card/:title", getProjectCard);
router.get("/get_project_markdown/:title", getProjectMarkdown);

export default router;
