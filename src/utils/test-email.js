import { sendEmail } from "./email.util.js";

console.log("Testing email configuration...");
console.log(`User: ${process.env.EMAIL_USER}`);
// Do not print password
try {
    await sendEmail(process.env.EMAIL_USER, "Test Email", "This is a test email execution.");
    console.log("Test execution completed.");
} catch (err) {
    console.error("Test execution failed:", err);
}
