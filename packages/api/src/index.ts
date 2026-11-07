// Vercel Services entrypoint: re-exports the Hono/oRPC app that lives in
// packages/web/src/api so there is a single source of truth for the API.
// Vercel detects Hono backends from a direct `hono` import in the entrypoint
// file, so Hono is imported here even though the app is defined elsewhere.
import { Hono } from "hono";
import app from "../../web/src/api/index";

const honoApp: Hono = app as unknown as Hono;
export default honoApp;
