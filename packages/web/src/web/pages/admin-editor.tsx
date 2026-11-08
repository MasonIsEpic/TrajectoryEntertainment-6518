import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight, Upload, X, Check, Save } from "lucide-react";
import { useAdminProjects, useSaveProject, useImageUpload, type Project } from "../queries/cms";
const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
type Draft = {
  id?: number;
  slug: string;
  title: string;
  category: "Live events" | "Post-production" | "AVL installations" | "IT & UniFi systems";
  type: string;
  image: string;
  imageAlt: string;
  client: string;
  kind: "Project" | "Client partnership";
  brief: string;
  approach: string;
  deliverables: string[];
  gallery: string[];
  outcome: string;
  sample: boolean;
  status: "draft" | "published";
  featured: boolean;
  sortOrder: number;
};
const blank: Draft = {
  slug: "",
  title: "",
  category: "Live events",
  type: "",
  image: "",
  imageAlt: "",
  client: "",
  kind: "Project",
  brief: "",
  approach: "",
  deliverables: [],
  gallery: [],
  outcome: "",
  sample: false,
  status: "draft",
  featured: false,
  sortOrder: 10,
};
function asDraft(p: Project): Draft {
  return {
    ...p,
    category: p.category as Draft["category"],
    kind: p.kind as Draft["kind"],
    status: p.status as Draft["status"],
  };
}
export default function AdminEditor() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const list = useAdminProjects();
  const save = useSaveProject();
  const coverUpload = useImageUpload();
  const galleryUpload = useImageUpload();
  const [form, setForm] = useState<Draft>(blank);
  const [deliverables, setDeliverables] = useState("");
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState("");
  const [uploadError, setUploadError] = useState("");
  const project = (list.data || []).find((p) => p.id === Number(id));
  useEffect(() => {
    document.title = (id === "new" ? "New case study" : "Edit case study") + " | Trajectory CMS";
  }, [id]);
  useEffect(() => {
    if (id === "new") {
      setForm({ ...blank });
      setDeliverables("");
      setDirty(false);
    } else if (project) {
      setForm(asDraft(project));
      setDeliverables(project.deliverables.join("\n"));
      setDirty(false);
    }
  }, [id, project]);
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
  const change = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    setNotice("");
  };
  const busy = save.isPending || coverUpload.isPending || galleryUpload.isPending;
  if (list.isLoading) return <div className="admin-empty">Loading editor…</div>;
  if (list.isError)
    return (
      <div className="admin-empty" role="alert">
        Unable to open the editor. <button onClick={() => list.refetch()}>Try again</button>
      </div>
    );
  if (id !== "new" && !project)
    return (
      <div className="admin-empty">
        <h2>STORY NOT FOUND.</h2>
        <Link href="/admin/case-studies">Back to case studies</Link>
      </div>
    );
  return (
    <>
      <Link
        href="/admin/case-studies"
        className="text-link"
        onClick={(e) => {
          if (dirty && !window.confirm("Leave without saving your changes?")) e.preventDefault();
        }}
      >
        <ArrowLeft size={15} />
        ALL CASE STUDIES
      </Link>
      <div className="admin-page-heading editor-heading">
        <div>
          <p className="admin-kicker">{id === "new" ? "START A STORY" : "REFINE THE STORY"}</p>
          <h1>
            {id === "new" ? "NEW CASE STUDY" : "EDIT CASE STUDY"}
            <span>.</span>
          </h1>
          <p>{dirty ? "Unsaved changes." : "Your content, your publishing schedule."}</p>
        </div>
        {form.id && (
          <Link
            className="admin-button"
            href={"/admin/case-studies/" + form.id + "/preview"}
            target="_blank"
          >
            Preview saved story <ArrowUpRight size={15} />
          </Link>
        )}
      </div>
      <form
        className="case-editor"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice("");
          save.mutate(
            {
              ...form,
              deliverables: deliverables
                .split("\n")
                .map((v) => v.trim())
                .filter(Boolean),
            },
            {
              onSuccess: (p) => {
                setDirty(false);
                setNotice(
                  p.status === "published"
                    ? "Published. Your story is live on the website."
                    : "Draft saved. Only you can see this story.",
                );
                if (id === "new") navigate("/admin/case-studies/" + p.id);
              },
            },
          );
        }}
      >
        <div className="editor-content">
          <section className="editor-panel">
            <h2>THE BASICS</h2>
            <label>
              Story title <span>*</span>
              <input
                aria-label="Story title"
                value={form.title}
                required
                minLength={2}
                maxLength={180}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title,
                    slug:
                      !prev.id && (!prev.slug || prev.slug === slugify(prev.title))
                        ? slugify(title)
                        : prev.slug,
                  }));
                  setDirty(true);
                  setNotice("");
                }}
                placeholder="A story worth telling."
              />
            </label>
            <div className="form-row">
              <label>
                Client / organization <span>*</span>
                <input
                  aria-label="Client or organization"
                  value={form.client}
                  required
                  minLength={2}
                  maxLength={180}
                  onChange={(e) => change("client", e.target.value)}
                />
              </label>
              <label>
                Story type
                <select
                  aria-label="Story type"
                  value={form.kind}
                  onChange={(e) => change("kind", e.target.value as Draft["kind"])}
                >
                  <option>Project</option>
                  <option>Client partnership</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Service category
                <select
                  aria-label="Service category"
                  value={form.category}
                  onChange={(e) => change("category", e.target.value as Draft["category"])}
                >
                  {[
                    "Live events",
                    "Post-production",
                    "AVL installations",
                    "IT & UniFi systems",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Service details <span>*</span>
                <input
                  aria-label="Service details"
                  value={form.type}
                  required
                  minLength={2}
                  maxLength={180}
                  onChange={(e) => change("type", e.target.value)}
                  placeholder="Live production / Broadcast"
                />
              </label>
            </div>
            <label>
              Page URL slug <span>*</span>
              <input
                aria-label="Page URL slug"
                value={form.slug}
                required
                minLength={2}
                maxLength={120}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                onChange={(e) => change("slug", e.target.value)}
                placeholder="client-project-name"
              />
              <small>
                /work/{form.slug || "your-story"} · lowercase letters, numbers and hyphens
              </small>
            </label>
          </section>
          <section className="editor-panel">
            <h2>THE IMAGES</h2>
            <p>
              JPG, PNG, or WebP · up to 10 MB per image. Upload only images you have permission to
              publish.
            </p>
            <div className="cover-upload">
              {form.image ? (
                <img src={form.image} alt={form.imageAlt || "Case-study cover preview"} />
              ) : (
                <div className="upload-empty">
                  <Upload size={30} />
                  <span>Choose a cover image</span>
                </div>
              )}
              <label className="upload-label">
                {coverUpload.isPending ? "Uploading…" : "UPLOAD COVER"}
                <input
                  aria-label="Upload cover image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={busy}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadError("");
                    try {
                      const url = await coverUpload.mutateAsync(file);
                      change("image", url);
                    } catch (err) {
                      setUploadError(err instanceof Error ? err.message : "Upload failed.");
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <label>
              Cover image URL <span>*</span>
              <input
                aria-label="Cover image URL"
                required
                value={form.image}
                onChange={(e) => change("image", e.target.value)}
                placeholder="Upload above or paste an HTTPS image URL"
              />
            </label>
            <label>
              Image description
              <input
                aria-label="Image description"
                value={form.imageAlt}
                maxLength={300}
                onChange={(e) => change("imageAlt", e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </label>
            <div className="gallery-editor">
              <div className="gallery-heading">
                <h3>Project gallery</h3>
                <label className="admin-button upload-label">
                  <Upload size={14} />
                  {galleryUpload.isPending ? "Uploading…" : "Add images"}
                  <input
                    aria-label="Add gallery images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    disabled={busy || form.gallery.length >= 12}
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      setUploadError("");
                      if (files.length + form.gallery.length > 12) {
                        setUploadError("A gallery can contain up to 12 images.");
                        return;
                      }
                      try {
                        for (const file of files) {
                          const url = await galleryUpload.mutateAsync(file);
                          setForm((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
                          setDirty(true);
                          setNotice("");
                        }
                      } catch (err) {
                        setUploadError(err instanceof Error ? err.message : "Upload failed.");
                      }
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <p>Optional. Appears beneath the story. Maximum 12 images.</p>
              <div className="gallery-thumbs">
                {form.gallery.map((url, i) => (
                  <div key={url}>
                    <img src={url} alt={"Gallery preview " + (i + 1)} />
                    <button
                      type="button"
                      aria-label={"Remove gallery image " + (i + 1)}
                      onClick={() =>
                        change(
                          "gallery",
                          form.gallery.filter((_, n) => n !== i),
                        )
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {uploadError && (
              <p className="form-error" role="alert">
                {uploadError}
              </p>
            )}
          </section>
          <section className="editor-panel">
            <h2>THE STORY</h2>
            <label>
              The brief <span>*</span>
              <textarea
                aria-label="The brief"
                value={form.brief}
                required
                minLength={10}
                maxLength={12000}
                rows={5}
                onChange={(e) => change("brief", e.target.value)}
                placeholder="The goal, the challenge, the starting point."
              />
            </label>
            <label>
              The approach <span>*</span>
              <textarea
                aria-label="The approach"
                value={form.approach}
                required
                minLength={10}
                maxLength={12000}
                rows={6}
                onChange={(e) => change("approach", e.target.value)}
                placeholder="How you planned and executed the work."
              />
            </label>
            <label>
              Deliverables <span>*</span>
              <textarea
                aria-label="Deliverables"
                value={deliverables}
                required
                rows={5}
                onChange={(e) => {
                  setDeliverables(e.target.value);
                  setDirty(true);
                  setNotice("");
                }}
                placeholder="One deliverable per line"
              />
              <small>One item per line. Up to 30 deliverables.</small>
            </label>
            <label>
              The outcome <span>*</span>
              <textarea
                aria-label="The outcome"
                value={form.outcome}
                required
                minLength={10}
                maxLength={12000}
                rows={5}
                onChange={(e) => change("outcome", e.target.value)}
                placeholder="What you delivered and what changed. Use only verified results."
              />
            </label>
          </section>
        </div>
        <aside className="editor-publishing">
          <section className="editor-panel">
            <h2>PUBLISHING</h2>
            <label>
              Visibility
              <select
                aria-label="Visibility"
                value={form.status}
                onChange={(e) => change("status", e.target.value as Draft["status"])}
              >
                <option value="draft">Draft — private</option>
                <option value="published">Published — public</option>
              </select>
            </label>
            <p>
              {form.status === "published"
                ? "Saving publishes this story to Work immediately."
                : "Save privately, preview, and publish when ready."}
            </p>
            <label className="checkbox-label">
              <input
                aria-label="Feature on homepage"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => change("featured", e.target.checked)}
              />
              <span>Feature on homepage</span>
            </label>
            <label>
              Display order
              <input
                aria-label="Display order"
                type="number"
                min={0}
                max={9999}
                value={form.sortOrder}
                onChange={(e) => change("sortOrder", Number(e.target.value))}
              />
              <small>Lower numbers appear first.</small>
            </label>
            <label className="checkbox-label">
              <input
                aria-label="This is a sample concept"
                type="checkbox"
                checked={form.sample}
                onChange={(e) => change("sample", e.target.checked)}
              />
              <span>This is a sample / concept</span>
            </label>
            <p>
              Sample labels and disclaimers are shown only for concept projects. Uncheck for actual
              client work.
            </p>
            <button className="button save-project" type="submit" disabled={busy}>
              <Save size={16} />
              {save.isPending
                ? "SAVING…"
                : form.status === "published"
                  ? "SAVE & PUBLISH"
                  : "SAVE DRAFT"}
            </button>
            {notice && (
              <output className="save-notice">
                <Check size={16} />
                {notice}
              </output>
            )}
            {save.isError && (
              <p className="form-error" role="alert">
                {save.error.message || "Unable to save. Check your fields and try again."}
              </p>
            )}
            <p className="admin-note">
              To remove a story from the public site without losing content, switch it to Draft and
              save. Preview shows your last saved version.
            </p>
          </section>
        </aside>
      </form>
    </>
  );
}
