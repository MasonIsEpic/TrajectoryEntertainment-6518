import { Link, useParams } from "wouter";
import { useProjectPreview } from "../queries/cms";
import { ProjectStory } from "../components/project-story";
export default function AdminPreview() {
  const { id } = useParams<{ id: string }>();
  const study = useProjectPreview(Number(id));
  return (
    <>
      <div className="preview-banner">
        <span>
          PRIVATE PREVIEW ·{" "}
          {study.data?.status === "published" ? "PUBLISHED STORY" : "DRAFT — NOT PUBLIC"}
        </span>
        <Link href={"/admin/case-studies/" + id}>Back to editor</Link>
      </div>
      {study.isLoading ? (
        <div className="admin-empty">Loading preview…</div>
      ) : study.isError ? (
        <div className="admin-empty" role="alert">
          Unable to load preview. <button onClick={() => study.refetch()}>Try again</button>
        </div>
      ) : study.data ? (
        <ProjectStory project={study.data} preview />
      ) : (
        <div className="admin-empty">Story not found.</div>
      )}
    </>
  );
}
