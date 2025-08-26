import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and parse the JSON
const projects = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/projects.json"), "utf-8"));

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

// GET /projects/get_project_card/:title
export const getProjectCard = (req, res) => {
    try {
        const { title } = req.params;
        const formatted = formatTitle(title);

        // Find the project by formatted title
        const project = projects.find(
            (proj) => formatTitle(proj.title) === formatted
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Construct the full thumbnail URL
        const host = `${req.protocol}://${req.get("host")}`;
        const thumbnail = `${host}/projects/thumbnails/${formatted}.jpg`;

        res.json({
            ...project,
            thumbnail,
        });
    } catch (err) {
        console.error("Error fetching project card:", err);
        res.status(500).json({ error: "Failed to fetch project card" });
    }
};


// GET /projects/get_project_markdown/:title
export const getProjectMarkdown = (req, res) => {
    try {
        const { title } = req.params;
        const formatted = formatTitle(title);
        
        const filePath = path.join(__dirname, `../data/markdown/${formatted}.md`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Project markdown not found" });
        }

        const markdown = fs.readFileSync(filePath, "utf-8");

        res.setHeader("Content-Type", "text/markdown");
        res.send(markdown);
    } catch (err) {
        console.error("Error reading markdown:", err);
        res.status(500).json({ error: "Failed to load project markdown" });
    }
};

