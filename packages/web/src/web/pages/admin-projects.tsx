import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Plus, ArrowUpRight, Search, Star } from "lucide-react";
import { useAdminProjects } from "../queries/cms";
export default function AdminProjects() {
  const work = useAdminProjects();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => {
    document.title = "Case Studies | Trajectory CMS";
  }, []);
  const items = (work.data || [])
    .filter((p) => filter === "All" || p.status === filter.toLowerCase())
    .filter((p) =>
      `${p.title} ${p.client} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
    );
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">YOUR PROJECT STORIES</p>
          <h1>
            CASE STUDIES<span>.</span>
          </h1>
          <p>Build the portfolio. Control what goes live.</p>
        </div>
        <Link href="/admin/case-studies/new" className="button">
          <Plus size={17} />
          NEW CASE STUDY
        </Link>
      </div>
      <div className="admin-toolbar">
        <div className="admin-filters">
          {["All", "Published", "Draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={filter === f ? "selected" : ""}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="admin-search">
          <Search size={16} />
          <input
            aria-label="Search case studies"
            placeholder="Search titles or clients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      {work.isLoading ? (
        <div className="admin-empty">Loading case studies…</div>
      ) : work.isError ? (
        <div className="admin-empty" role="alert">
          Unable to load case studies. <button onClick={() => work.refetch()}>Try again</button>
        </div>
      ) : items.length ? (
        <div className="admin-project-list">
          {items.map((p) => (
            <article className="admin-project-row" key={p.id}>
              <img src={p.image} alt={p.imageAlt || p.title} />
              <div>
                <h2>{p.title}</h2>
                <p>
                  {p.client} · {p.category}
                </p>
                <div className="project-status">
                  <span className={"status-pill " + p.status}>{p.status}</span>
                  {p.sample && <span className="status-pill">Sample</span>}
                  {p.featured && (
                    <span className="featured-tag">
                      <Star size={12} />
                      Homepage
                    </span>
                  )}
                </div>
              </div>
              <div className="admin-project-controls">
                <Link href={"/admin/case-studies/" + p.id} className="admin-button">
                  Edit story <ArrowUpRight size={15} />
                </Link>
                <Link
                  href={"/admin/case-studies/" + p.id + "/preview"}
                  className="admin-preview-link"
                >
                  Preview
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="admin-empty">
          <h2>{search ? "NO MATCHES." : "A NEW CHAPTER."}</h2>
          <p>
            {search
              ? "Try a different search."
              : "Create your first story, then publish when you’re ready."}
          </p>
        </div>
      )}
      <p className="admin-note">
        Published studies appear on Work. Featured published studies appear on Home (first two by
        display order). Drafts are visible only in the CMS.
      </p>
    </>
  );
}
