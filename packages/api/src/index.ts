// Vercel Services entrypoint: re-exports the Hono/oRPC app that lives in
// packages/web/src/api so there is a single source of truth for the API.
// Vercel detects Hono backends from this default export.
export { default } from "../../web/src/api/index";
