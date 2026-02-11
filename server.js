import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.get("/", (req, res) => {
        res.send("CMS API Running");
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
