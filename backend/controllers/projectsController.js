import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and parse the JSON
const projects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/projects.json"), "utf-8")
);

export const getAllProjectCards = (req, res) => {
  res.json(projects);
};
