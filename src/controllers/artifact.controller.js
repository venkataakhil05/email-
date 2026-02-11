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
