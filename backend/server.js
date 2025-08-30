import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import projectRoutes from "./routes/projects.js";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
    cors({
        origin: "https://api.artyomg.com/projects/",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());

app.use(
  "/projects/thumbnails",
  express.static(path.join(__dirname, "data", "thumbnails"))
);

// Routes
app.use("/projects", projectRoutes);

// Root test
app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
