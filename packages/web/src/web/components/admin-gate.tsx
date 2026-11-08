import { Redirect } from "wouter";
import { authClient } from "../lib/auth";
export function AdminGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, error } = authClient.useSession();
  if (isPending) return <div className="admin-loading">Checking your session…</div>;
  if (error)
    return (
      <div className="admin-loading" role="alert">
        Unable to check your session. <a href="/admin/sign-in">Return to sign-in</a>
      </div>
    );
  if (!session) return <Redirect to="/admin/sign-in" />;
  if (session.user.email.toLowerCase() !== "mason@trajectoryentertainment.com")
    return (
      <div className="admin-loading" role="alert">
        This account does not have CMS access.
      </div>
    );
  return <>{children}</>;
}
