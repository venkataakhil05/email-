import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000";
const EMAIL = "test_cms_user@example.com";
const PASSWORD = "password123";
let OTP_CODE = "";
let TOKEN = "";

const log = (step, msg) => console.log(`[${step}] ${msg}`);

const runTest = async () => {
    try {
        // Step 1: Root API
        const rootRes = await fetch(`${BASE_URL}/`);
        const rootText = await rootRes.text();
        log("Step 1", `Root API Response: ${rootText}`);

        // Step 2: Send OTP
        const sendOtpRes = await fetch(`${BASE_URL}/api/auth/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: EMAIL }),
        });
        const sendOtpJson = await sendOtpRes.json();
        log("Step 2", `Send OTP: ${JSON.stringify(sendOtpJson)}`);

        // Simulate OTP retrieval (In a real test we'd need to mock email or access DB)
        // For this script, we can't easily get the OTP without DB access.
        // So I will just print instructions to check DB/Console.
        console.log("!!! PLEASE CHECK CONSOLE/DB FOR OTP FOR EMAIL: " + EMAIL + " !!!");

    } catch (error) {
        console.error("Test Failed:", error);
    }
};

runTest();
