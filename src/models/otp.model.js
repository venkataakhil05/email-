import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            expires: 0, // MongoDB TTL: deletes doc when expiresAt is reached
        },
    },
    { timestamps: true },
);

otpSchema.pre("save", async function (next) {
    if (!this.isModified("otp")) return next();
    this.otp = await bcrypt.hash(this.otp, 10);
    next();
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
