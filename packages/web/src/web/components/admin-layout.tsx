import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Inbox, Layers, ArrowUpRight, LogOut } from "lucide-react";
import { Brand } from "./layout";
import { authClient, clearToken } from "../lib/auth";
export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <Brand />
        </Link>
        <div className="admin-workspace-label">CONTENT STUDIO</div>
        <nav aria-label="CMS navigation">
          <Link href="/admin" className={location === "/admin" ? "selected" : ""}>
            <Inbox size={18} />
            Inquiries
          </Link>
          <Link
            href="/admin/case-studies"
            className={location.startsWith("/admin/case-studies") ? "selected" : ""}
          >
            <Layers size={18} />
            Case studies
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank" rel="noopener noreferrer">
            View website <ArrowUpRight size={16} />
          </a>
          <span>
            Mason Power
            <br />
            <small>Owner access</small>
          </span>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError("");
              try {
                const result = await authClient.signOut();
                if (result.error) throw new Error(result.error.message);
                clearToken();
                qc.clear();
                navigate("/admin/sign-in");
              } catch {
                setError("Unable to sign out. Try again.");
              } finally {
                setBusy(false);
              }
            }}
          >
            <LogOut size={16} />
            {busy ? "Signing out…" : "Sign out"}
          </button>
          {error && <p role="alert">{error}</p>}
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
