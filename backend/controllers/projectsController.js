import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and parse the JSON
const projects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/projects.json"), "utf-8")
);

// Utility: convert title to filename
const formatTitle = (title) => title.toLowerCase().replace(/\s+/g, "_");

// GET /projects/get_all_project_cards
export const getAllProjectCards = (req, res) => {
  const host = `${req.protocol}://${req.get("host")}`;

  const projectsWithThumbnails = projects.map((proj) => ({
    ...proj,
    thumbnail: `${host}/projects/thumbnails/${formatTitle(proj.title)}.jpg`,
  }));

  res.json(projectsWithThumbnails);
};
