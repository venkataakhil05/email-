import express from "express";
import { getArtifacts, createArtifact } from "../controllers/artifact.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// The user specified /api/artifacts as base.
// GET /api/artifacts and POST /api/artifacts
router.get("/", authenticate, getArtifacts);
router.post("/", authenticate, createArtifact);

export default router;
