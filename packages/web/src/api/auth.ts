import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { db } from "./database";
export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL: process.env.WEBSITE_URL,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true, disableSignUp: true, minPasswordLength: 12 },
  trustedOrigins: (request) => {
    const configured = [process.env.WEBSITE_URL, "http://localhost:4200"].filter(
      Boolean,
    ) as string[];
    // Vite serves the app through its platform-provisioned preview hostname as well.
    const origin = request?.headers.get("origin");
    const requestOrigin = request ? new URL(request.url).origin : null;
    if (origin && origin === requestOrigin) configured.push(origin);
    return configured;
  },
  session: { expiresIn: 60 * 60 * 24 * 7 },
  rateLimit: { enabled: true, window: 60, max: 20, storage: "database" },
  plugins: [bearer()],
});
