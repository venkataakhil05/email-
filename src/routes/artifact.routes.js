import express from "express";
import { getArtifacts, createArtifact, likeArtifact, commentArtifact } from "../controllers/artifact.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
console.log("Loading Artifact Routes...");

// The user specified /api/artifacts as base.

// Create & Get
router.post("/create", authenticate, createArtifact);
router.get("/get", authenticate, getArtifacts);

// Like (POST & GET as requested)
router.post("/like/:id", authenticate, likeArtifact);
router.get("/like/:id", authenticate, likeArtifact);

// Comment (POST & GET as requested)
router.post("/comment/:id", authenticate, commentArtifact);
router.get("/comment/:id", authenticate, commentArtifact);

export default router;
