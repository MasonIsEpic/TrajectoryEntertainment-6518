import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { auth } from "../auth";
export const admin = base.use(async ({ context, next }) => {
  const session = await auth.api.getSession({ headers: context.headers });
  if (!session) throw new ORPCError("UNAUTHORIZED");
  if (session.user.email.toLowerCase() !== "mason@trajectoryentertainment.com")
    throw new ORPCError("FORBIDDEN");
  return next({ context: { user: session.user } });
});
