import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.util.js";

export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return errorResponse(res, { message: "Access denied. No token provided." }, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        errorResponse(res, { message: "Invalid token." }, 400);
    }
};
