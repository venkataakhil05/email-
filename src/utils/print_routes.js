import app from "../app.js";

function printRoutes(stack, basePath = "") {
    stack.forEach((layer) => {
        if (layer.route) {
            const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
            console.log(`${methods} ${basePath}${layer.route.path}`);
        } else if (layer.name === "router" && layer.handle.stack) {
            // It's a router middleware
            let routerPath = basePath;
            // Try to find the path prefix for this router
            // This is tricky in strict mode because regex is used for matching
            // We'll rely on our knowledge of app.js for high level, but try to extract from regex
            if (layer.regexp) {
                const match = layer.regexp.toString().match(/^\/\^\\(\/.*)\\\/\?\(\?\=\\\/\|\$\)\/i$/);
                if (match) {
                    // Cleanup the regex artifacts to get readable path
                    routerPath += match[1].replace(/\\/g, "");
                }
            }
            printRoutes(layer.handle.stack, routerPath);
        }
    });
}

console.log("Registered Routes:");
// Accessing the internal stack of the express app
// Note: This relies on app._router which is created after app.use/listen
// Since we import app but don't listen, we might not see everything if listen does setup
// But usually app.use happens at module level. Let's see.
if (app._router && app._router.stack) {
    printRoutes(app._router.stack);
} else {
    console.log("Router stack not initialized yet (maybe need to call listen or wait?)");
}
