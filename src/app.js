import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import artifactRoutes from "./routes/artifact.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/artifacts", artifactRoutes);

export default app;