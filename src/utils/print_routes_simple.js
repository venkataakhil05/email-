import express from "express";
import artifactRoutes from "../routes/artifact.routes.js";

const app = express();
app.use("/api/artifacts", artifactRoutes);

function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path + layer.route.path))
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path + (layer.regexp.source === '^\\/?(?=\\/|$)' ? '' : layer.regexp.source.replace('\\/?(?=\\/|$)', '').substring(2))))
    } else if (layer.method) {
        console.log('%s /%s', layer.method.toUpperCase(), path.replace(/\\/g, '').replace(/\/\//g, '/'))
    }
}

console.log("--- ROUTES ---");
app._router.stack.forEach(print.bind(null, ''))
console.log("--- END ---");
process.exit(0);
