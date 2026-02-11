import User from "../models/user.model.js";
import { sendEmail } from "../utils/email.util.js";

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getAll = async () => {
    return await User.find();
};

export const create = async (data) => {
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
        ...data,
        otp,
        otpExpires,
    });

    await sendEmail(user.email, "Verify your account", `Your OTP is: ${otp}`);
    return user;
};

export const verifyOTP = async (email, otp) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (user.otp !== otp) throw new Error("Invalid OTP");
    if (user.otpExpires < Date.now()) throw new Error("OTP expired");

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return user;
};

export const update = async (id, data) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error("User not found");
    return user;
};

export const remove = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return user;
};
