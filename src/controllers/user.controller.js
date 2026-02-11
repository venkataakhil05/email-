import * as userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        successResponse(res, users);
    } catch (error) {
        errorResponse(res, error);
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        successResponse(res, user, "User created successfully. Check email for OTP.", 201);
    } catch (error) {
        errorResponse(res, error);
    }
};

export const verifyUserOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await userService.verifyOTP(email, otp);
        successResponse(res, user, "Account verified successfully");
    } catch (error) {
        errorResponse(res, error, 400);
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body);
        successResponse(res, user);
    } catch (error) {
        errorResponse(res, error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.remove(req.params.id);
        successResponse(res, null, "User deleted successfully", 204);
    } catch (error) {
        errorResponse(res, error);
    }
};