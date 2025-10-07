import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// CORS configuration
app.use("*", cors({
  origin: ["http://localhost:5173", "https://*.vercel.app", "https://*.mocha.dev"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// API routes
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// For SPA routing, we'll let Vercel handle static files and fallback
// This is just a basic API server structure
app.get("/", (c) => {
  return c.text("API Server Ready");
});

export default app;
