import express from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    verifyUserOTP,
} from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { createUserDTO, updateUserDTO } from "../dto/user.dto.js";

const router = express.Router();

router.get("/", getUsers);

router.post(
    "/",
    validate(createUserDTO), // middleware chaining.
    createUser,
);

router.post("/verify-otp", verifyUserOTP);

router.patch("/:id", validate(updateUserDTO), updateUser);

router.delete("/:id", deleteUser);

export default router;


// the file defines all the API routes related to the user.
//its main purpose is to connect the controller with proper HTTP routes.