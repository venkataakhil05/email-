import User from "../models/user.model.js";
import OTP from "../models/otp.model.js";
import { sendEmail } from "../utils/email.util.js";
import { successResponse, errorResponse } from "../utils/response.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Helper for JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// Generate OTP
const generateOTPCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = generateOTPCode();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Ensure user exists (create Guest if not)
        let user = await User.findOne({ email });
        if (!user) {
            await User.create({ name: "Guest", email });
        }

        // Save OTP to secure collection
        await OTP.create({ email, otp, expiresAt });

        await sendEmail(email, "Your OTP", `Your OTP is ${otp}`);
        successResponse(res, null, "OTP sent");
    } catch (error) {
        errorResponse(res, error);
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the latest OTP for this email
        const otpDoc = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if (!otpDoc) {
            return errorResponse(res, { message: "Invalid or expired OTP" }, 400);
        }

        // Verify hash
        const isValid = await bcrypt.compare(otp, otpDoc.otp);
        if (!isValid) {
            return errorResponse(res, { message: "Invalid OTP" }, 400);
        }

        // Verify User
        const user = await User.findOne({ email });
        if (user) {
            user.isVerified = true;
            await user.save();
        }

        // Delete used OTP
        await OTP.deleteOne({ _id: otpDoc._id });

        successResponse(res, null, "Email verified");
    } catch (error) {
        errorResponse(res, error);
    }
};

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return errorResponse(res, { message: "User not found (Verify OTP first)" }, 404);
        }

        if (!user.isVerified) {
            return errorResponse(res, { message: "Email not verified" }, 400);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        successResponse(res, user, "User registered successfully");
    } catch (error) {
        errorResponse(res, error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return errorResponse(res, { message: "Invalid credentials" }, 401);
        }

        const token = createToken(user._id);
        successResponse(res, { token }, "Login successful");
    } catch (error) {
        errorResponse(res, error);
    }
};
