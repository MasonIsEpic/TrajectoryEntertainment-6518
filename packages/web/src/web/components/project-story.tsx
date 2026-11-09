import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, ContactBand } from "./layout";
import type { Project } from "../queries/cms";
export function ProjectStory({
  project,
  next,
  preview = false,
}: {
  project: Project;
  next?: Project;
  preview?: boolean;
}) {
  return (
    <>
      <section className="section case-intro">
        <Link href={preview ? "/admin/case-studies" : "/work"} className="text-link">
          <ArrowLeft size={16} />
          {preview ? "BACK TO CMS" : "BACK TO WORK"}
        </Link>
        <Eyebrow>
          {project.type} / {project.sample ? "SAMPLE PROJECT" : project.kind.toUpperCase()}
        </Eyebrow>
        <h1>{project.title}</h1>
        <div className="case-facts">
          <div>
            <span>{project.kind === "Client partnership" ? "CLIENT" : "PROJECT / CLIENT"}</span>
            <p>{project.client}</p>
          </div>
          <div>
            <span>CAPABILITY</span>
            <p>{project.category}</p>
          </div>
          <div>
            <span>FORMAT</span>
            <p>{project.sample ? "Illustrative concept" : project.kind}</p>
          </div>
        </div>
      </section>
      <div className="case-cover">
        <img src={project.image} alt={project.imageAlt || project.title} />
        {project.sample && <span>CONCEPT STUDY · NOT ACTUAL CLIENT WORK</span>}
      </div>
      <section className="section case-body">
        <aside>
          <Eyebrow>THE PROJECT PATH</Eyebrow>
          <p>
            {project.sample
              ? "This sample demonstrates the structure of a dedicated project page. It does not represent a completed engagement or verified results."
              : `The story behind ${project.client}. ${project.kind === "Client partnership" ? "An ongoing creative and technical partnership." : "From the first plan to the final delivery."}`}
          </p>
        </aside>
        <div>
          <article>
            <span className="eyebrow">01 / THE BRIEF</span>
            <h2>A CLEAR STARTING POINT.</h2>
            <p className="preserve-lines">{project.brief}</p>
          </article>
          <article>
            <span className="eyebrow">02 / THE APPROACH</span>
            <h2>PLAN. ALIGN. EXECUTE.</h2>
            <p className="preserve-lines">{project.approach}</p>
          </article>
          <article>
            <span className="eyebrow">03 / {project.sample ? "PROPOSED " : ""}DELIVERABLES</span>
            <ul>
              {project.deliverables.map((x, i) => (
                <li key={i}>
                  <Check size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <span className="eyebrow">
              04 / {project.sample ? "THE INTENDED OUTCOME" : "THE OUTCOME"}
            </span>
            <p className="large-copy preserve-lines">{project.outcome}</p>
          </article>
        </div>
      </section>
      {project.gallery.length > 0 && (
        <section className="section project-gallery">
          <Eyebrow>IN THE DETAILS</Eyebrow>
          <div>
            {project.gallery.map((image, i) => (
              <img
                key={image}
                src={image}
                alt={`${project.title} — project detail ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}
      {next && (
        <section className="section next-project">
          <Eyebrow>CONTINUE EXPLORING</Eyebrow>
          <Link href={"/work/" + next.slug}>
            <h2>{next.title}</h2>
            <ArrowUpRight size={40} />
          </Link>
        </section>
      )}
      <ContactBand />
    </>
  );
}
