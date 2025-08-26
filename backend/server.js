import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projects.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/projects", projectRoutes);

// Root test
app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
