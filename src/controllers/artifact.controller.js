import Artifact from "../models/artifact.model.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const getArtifacts = async (req, res) => {
    try {
        const artifacts = await Artifact.find().populate("createdBy", "email");
        successResponse(res, artifacts);
    } catch (error) {
        errorResponse(res, error);
    }
};

export const createArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.create({
            ...req.body,
            createdBy: req.user.id,
        });
        successResponse(res, artifact, "Artifact created successfully", 201);
    } catch (error) {
        errorResponse(res, error);
    }
};

export const likeArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact) return errorResponse(res, "Artifact not found", 404);

        // Check if user already liked it
        if (artifact.likes.includes(req.user.id)) {
            // Unlike
            artifact.likes = artifact.likes.filter(id => id.toString() !== req.user.id);
        } else {
            // Like
            artifact.likes.push(req.user.id);
        }

        await artifact.save();
        successResponse(res, artifact, "Artifact like status updated");
    } catch (error) {
        errorResponse(res, error);
    }
};

export const commentArtifact = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return errorResponse(res, "Comment text is required", 400);

        const artifact = await Artifact.findById(req.params.id);
        if (!artifact) return errorResponse(res, "Artifact not found", 404);

        const newComment = {
            user: req.user.id,
            text,
        };

        artifact.comments.push(newComment);
        await artifact.save();

        successResponse(res, artifact, "Comment added successfully");
    } catch (error) {
        errorResponse(res, error);
    }
};
