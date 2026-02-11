import express from "express";
import artifactRoutes from "../routes/artifact.routes.js";
import authRoutes from "../routes/auth.routes.js";

const app = express();

// Manually mount to replicate app.js without DB or server start logic
app.use("/api/auth", authRoutes);
app.use("/api/artifacts", artifactRoutes);

function printRoutes(stack, basePath = "") {
    stack.forEach((layer) => {
        if (layer.route) {
            Object.keys(layer.route.methods).forEach(method => {
                console.log(`${method.toUpperCase()} ${basePath}${layer.route.path}`);
            });
        } else if (layer.name === "router" && layer.handle.stack) {
            let routerPath = basePath;
            // Regex parsing for express route prefixes
            const match = layer.regexp.toString().match(/^\/\^\\(\/.*)\\\/\?\(\?\=\\\/\|\$\)\/i$/);
            if (match) {
                routerPath += match[1].replace(/\\/g, "");
            }
            // For older express versions or standard Router use
            if (!match && layer.regexp.toString() === "/^\\/?(?=\\/|$)/i") {
                // Root router path, do nothing
            }

            printRoutes(layer.handle.stack, routerPath);
        }
    });
}

console.log("--- ACTUAL REGISTERED ROUTES ---");
if (app._router && app._router.stack) {
    printRoutes(app._router.stack);
}
console.log("--------------------------------");
