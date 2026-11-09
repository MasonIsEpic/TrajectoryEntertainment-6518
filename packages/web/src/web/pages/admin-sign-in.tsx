import { useState, useEffect } from "react";
import { Link, Redirect } from "wouter";
import { ArrowLeft, ArrowUpRight, LockKeyhole } from "lucide-react";
import { Brand } from "../components/layout";
import { authClient, captureToken } from "../lib/auth";
export default function AdminSignIn() {
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    document.title = "CMS Sign In | Trajectory Entertainment";
  }, []);
  if (!isPending && session?.user.email.toLowerCase() === "mason@trajectoryentertainment.com")
    return <Redirect to="/admin" />;
  return (
    <main className="admin-login">
      <Link href="/" className="login-brand">
        <Brand />
      </Link>
      <div className="login-panel">
        <LockKeyhole size={26} />
        <h1>
          YOUR CONTENT.
          <br />
          <span>IN CONTROL.</span>
        </h1>
        <p>Private access to the Trajectory inbox and case-study studio.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setBusy(true);
            setError("");
            try {
              const result = await authClient.signIn.email(
                { email: String(f.get("email")), password: String(f.get("password")) },
                { onSuccess: captureToken },
              );
              if (result.error) throw new Error(result.error.message || "Sign-in failed");
              await authClient.getSession();
            } catch (err) {
              setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label>
            Email address
            <input
              aria-label="Email address"
              name="email"
              type="email"
              autoComplete="username"
              defaultValue="mason@trajectoryentertainment.com"
              required
            />
          </label>
          <label>
            Password
            <input
              aria-label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="button" disabled={busy || isPending}>
            {busy ? "SIGNING IN…" : "SIGN IN"}
            <ArrowUpRight size={18} />
          </button>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </form>
        <p className="login-help">
          Owner account only. Use the password you set securely in this chat. Password recovery can
          be handled here through a secure reset request.
        </p>
        <Link className="text-link" href="/">
          <ArrowLeft size={15} />
          BACK TO WEBSITE
        </Link>
      </div>
    </main>
  );
}
