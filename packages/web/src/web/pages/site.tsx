import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Radio,
  Film,
  SlidersHorizontal,
  Network,
} from "lucide-react";
import { Button, ContactBand, Eyebrow } from "../components/layout";
import { services, projects } from "../lib/content";
import { useSubmitInquiry } from "../queries/inquiries";
function Meta({ title }: { title: string }) {
  useEffect(() => {
    document.title =
      title === "Home"
        ? "Trajectory Entertainment | Production with intention."
        : `${title} | Trajectory Entertainment`;
  }, [title]);
  return null;
}
const icons = [Radio, Film, SlidersHorizontal, Network];
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link href={"/work/" + project.slug} className="project-card">
      <div className="project-image">
        <img
          src={project.image}
          alt={project.category + " illustrative production photography"}
          loading="lazy"
        />
        <span className="project-arrow">
          <ArrowUpRight />
        </span>
      </div>
      <div className="project-meta">
        <span>{project.type}</span>
        <span>CONCEPT STUDY</span>
      </div>
      <h3>{project.title}</h3>
    </Link>
  );
}
export function Home() {
  return (
    <>
      <Meta title="Home" />
      <section className="hero">
        <div className="hero-image" />
        <div className="orbit orbit-one" />
        <div className="hero-topline">
          <Eyebrow>PRODUCTION WITH INTENTION</Eyebrow>
          <span>32.7157° N &nbsp; 117.1611° W</span>
        </div>
        <div className="hero-content">
          <h1>
            NOTHING
            <br />
            LEFT TO
            <br />
            <span>CHANCE.</span>
          </h1>
          <p>
            Live experiences. Powerful content. Seamless systems.
            <br className="desktop-break" /> We plan the route. Control the variables. Execute.
          </p>
          <div className="hero-actions">
            <Button>LET’S BUILD SOMETHING</Button>
            <Link href="/work" className="text-link">
              EXPLORE OUR WORK <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            <span className="signal" /> SAN DIEGO, CA &nbsp; / &nbsp; AVAILABLE BEYOND
          </span>
          <a href="#capabilities">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
        <div className="hero-annotation">
          <span>LIVE / PRODUCED / CONNECTED</span>
          <span className="crosshair">+</span>
          <span>EXECUTION IS EVERYTHING.</span>
        </div>
      </section>
      <div className="capability-strip">
        <span>LIVE PRODUCTION</span>
        <i>✦</i>
        <span>POST-PRODUCTION</span>
        <i>✦</i>
        <span>AVL INSTALLATIONS</span>
        <i>✦</i>
        <span>IT & UNIFI SYSTEMS</span>
        <i>✦</i>
      </div>
      <section className="section services-home" id="capabilities">
        <div className="section-heading">
          <div>
            <h2>
              BIG IDEAS.
              <br />
              <span>PRECISE EXECUTION.</span>
            </h2>
          </div>
          <div>
            <p>
              One production partner. Every part of the picture.
              <br />
              From the signal path to the final cut, we connect
              <br className="desktop-break" /> the creative and the technical.
            </p>
            <Link href="/services" className="text-link">
              EXPLORE OUR SERVICES <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="service-grid">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Link href={"/services#" + s.id} className="service-card" key={s.id}>
                <div className="service-card-top">
                  <span>{s.number} /</span>
                  <Icon size={25} strokeWidth={1.3} />
                </div>
                <h3>{s.short}</h3>
                <p>{s.description}</p>
                <div className="service-card-bottom">
                  <span>{s.tag}</span>
                  <ArrowUpRight size={19} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="story-home section">
        <div className="story-mark">
          <div className="orbit" />
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path
              d="M38 147L164 30 121 174 104 109Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M38 174L84 126" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span>THE CALCULATED PATH.</span>
        </div>
        <div>
          <h2>
            CREATIVE AMBITION.
            <br />
            <span>TECHNICAL DISCIPLINE.</span>
          </h2>
          <p>
            Trajectory is the calculated path. We plan the route, control the variables, and execute
            — whether the work is live, produced, or entertainment-driven.
          </p>
          <p>
            Based in San Diego, we bring the same intentionality to every live production, polished
            edit, and integrated system. Nothing left to chance.
          </p>
          <Link href="/about" className="text-link">
            MORE ABOUT TRAJECTORY <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section work-home">
        <div className="section-heading">
          <div>
            <h2>
              INTENTION.
              <br />
              <span>IN ACTION.</span>
            </h2>
          </div>
          <div>
            <p>
              A look at what’s possible.
              <br />
              Illustrative concepts. Real-world possibilities.
            </p>
            <Link href="/work" className="text-link">
              EXPLORE THE WORK <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="project-grid">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard project={p} key={p.slug} />
          ))}
        </div>
        <p className="sample-note">
          Sample projects shown for illustration. Not actual client work.
        </p>
      </section>
      <ContactBand />
    </>
  );
}
export function About() {
  return (
    <>
      <Meta title="About" />
      <section className="page-intro section">
        <Eyebrow>ABOUT / TRAJECTORY ENTERTAINMENT</Eyebrow>
        <h1>
          THE CALCULATED
          <br />
          <span>PATH.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Creative thinking. Technical precision.
            <br />A production partner with a plan.
          </p>
          <span>SAN DIEGO, CALIFORNIA</span>
        </div>
      </section>
      <section className="about-image">
        <img src="/images/console.jpg" alt="Production technician working at an audio console" />
        <span>THE PEOPLE BEHIND THE SIGNAL.</span>
      </section>
      <section className="section story-full">
        <Eyebrow>01 / OUR STORY</Eyebrow>
        <div>
          <h2>
            NOTHING LEFT
            <br />
            <span>TO CHANCE.</span>
          </h2>
          <p className="large-copy">
            Trajectory is the calculated path. We plan the route, control the variables, and execute
            — whether the work is live, produced, or entertainment-driven.
          </p>
          <p>
            Trajectory Entertainment delivers live production, livestreams, broadcasts,
            post-production, media systems, and polished content with the same intentionality.
            Nothing left to chance.
          </p>
          <p>
            Based in San Diego, CA, we connect the creative vision with the technical systems that
            make it possible. Whether you’re bringing people together, telling a story, or building
            a better-connected space, we start with the outcome and work backward to a clear plan.
          </p>
        </div>
      </section>
      <section className="section process">
        <Eyebrow>02 / HOW WE THINK</Eyebrow>
        <h2>
          AMBITION MEETS <span>A PLAN.</span>
        </h2>
        <div className="process-grid">
          {[
            [
              "01",
              "PLAN THE ROUTE.",
              "Define the goal, understand the space, and build the path from idea to execution.",
            ],
            [
              "02",
              "CONTROL THE VARIABLES.",
              "Align the people, the tools, and the details. Test the workflow before it matters.",
            ],
            [
              "03",
              "EXECUTE WITH INTENTION.",
              "Stay focused on the experience. Make every cue, frame, and connection count.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="process-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
export function Services() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(
        () =>
          document
            .getElementById(window.location.hash.slice(1))
            ?.scrollIntoView({ behavior: "smooth" }),
        100,
      );
    }
  }, []);
  return (
    <>
      <Meta title="Services" />
      <section className="page-intro section">
        <Eyebrow>SERVICES / END-TO-END CAPABILITY</Eyebrow>
        <h1>
          THE VISION.
          <br />
          THE VARIABLES.
          <br />
          <span>THE EXECUTION.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Live, produced, and connected.
            <br />
            One partner for every part of the picture.
          </p>
          <span>CREATIVE + TECHNICAL</span>
        </div>
      </section>
      <div className="service-tabs">
        {services.map((s) => (
          <a href={"#" + s.id} key={s.id}>
            <span>{s.number}</span>
            {s.short}
            <ArrowDown size={14} />
          </a>
        ))}
      </div>
      {services.map((s) => (
        <section id={s.id} className="section service-detail" key={s.id}>
          <div>
            <Eyebrow>
              {s.number} / {s.tag}
            </Eyebrow>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
            <ul>
              {s.items.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <Button href={"/contact?service=" + encodeURIComponent(s.title)}>
              LET’S TALK{" "}
              {s.id === "it"
                ? "SYSTEMS"
                : s.id === "live"
                  ? "PRODUCTION"
                  : s.id === "post"
                    ? "CONTENT"
                    : "INSTALLATIONS"}
            </Button>
          </div>
          <div className="service-detail-image">
            <img src={s.image} alt={"Illustrative imagery for " + s.title} loading="lazy" />
            <span>{s.number} / TRAJECTORY ENTERTAINMENT</span>
          </div>
        </section>
      ))}
      <ContactBand />
    </>
  );
}
export function Work() {
  const [filter, setFilter] = useState("All work");
  const categories = [
    "All work",
    "Live events",
    "Post-production",
    "AVL installations",
    "IT & UniFi systems",
  ];
  const visible = projects.filter((p) => filter === "All work" || p.category === filter);
  return (
    <>
      <Meta title="Work" />
      <section className="page-intro section">
        <Eyebrow>WORK / PROJECTS & POSSIBILITIES</Eyebrow>
        <h1>
          INTENTION.
          <br />
          <span>IN ACTION.</span>
        </h1>
        <div className="intro-bottom">
          <p>
            Every project has a path.
            <br />
            Here’s a look at what yours could be.
          </p>
          <span>CONCEPT STUDIES / 01–03</span>
        </div>
      </section>
      <section className="section work-list">
        <div className="filters" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              className={filter === c ? "selected" : ""}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="sample-banner">
          <span className="signal" />
          <p>
            These are sample case studies, not completed client projects. Real project stories will
            live here as the portfolio grows.
          </p>
        </div>
        {visible.length ? (
          <div className="project-grid">
            {visible.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="empty-work">
            <Network size={36} />
            <h3>THE NEXT CONNECTION.</h3>
            <p>No case studies in this category yet. Have a network or IT project in mind?</p>
            <Button>LET’S MAKE A PLAN</Button>
          </div>
        )}
      </section>
      <ContactBand />
    </>
  );
}
export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <>
      <Meta title={project.title} />
      <section className="section case-intro">
        <Link href="/work" className="text-link">
          <ArrowLeft size={16} /> BACK TO WORK
        </Link>
        <Eyebrow>{project.type} / SAMPLE PROJECT</Eyebrow>
        <h1>{project.title}</h1>
        <div className="case-facts">
          <div>
            <span>PROJECT</span>
            <p>{project.client}</p>
          </div>
          <div>
            <span>CAPABILITY</span>
            <p>{project.category}</p>
          </div>
          <div>
            <span>STATUS</span>
            <p>Illustrative concept</p>
          </div>
        </div>
      </section>
      <div className="case-cover">
        <img src={project.image} alt={"Illustrative " + project.category + " photography"} />
        <span>CONCEPT STUDY · NOT ACTUAL CLIENT WORK</span>
      </div>
      <section className="section case-body">
        <aside>
          <Eyebrow>THE PROJECT PATH</Eyebrow>
          <p>
            This sample demonstrates the structure of a dedicated project page. It does not
            represent a completed engagement or verified results.
          </p>
        </aside>
        <div>
          <article>
            <span className="eyebrow">01 / THE BRIEF</span>
            <h2>A CLEAR STARTING POINT.</h2>
            <p>{project.brief}</p>
          </article>
          <article>
            <span className="eyebrow">02 / THE APPROACH</span>
            <h2>PLAN. ALIGN. EXECUTE.</h2>
            <p>{project.approach}</p>
          </article>
          <article>
            <span className="eyebrow">03 / PROPOSED DELIVERABLES</span>
            <ul>
              {project.deliverables.map((x) => (
                <li key={x}>
                  <Check size={16} />
                  {x}
                </li>
              ))}
            </ul>
          </article>
          <article>
            <span className="eyebrow">04 / THE INTENDED OUTCOME</span>
            <p className="large-copy">{project.outcome}</p>
          </article>
        </div>
      </section>
      <section className="section next-project">
        <Eyebrow>CONTINUE EXPLORING</Eyebrow>
        {projects
          .filter((p) => p.slug !== slug)
          .slice(0, 1)
          .map((p) => (
            <Link key={p.slug} href={"/work/" + p.slug}>
              <h2>{p.title}</h2>
              <ArrowUpRight size={40} />
            </Link>
          ))}
      </section>
      <ContactBand />
    </>
  );
}
export function Contact() {
  const submission = useSubmitInquiry();
  const [success, setSuccess] = useState(false);
  const allowed = services.map((s) => s.title);
  const selected = new URLSearchParams(window.location.search).get("service") || "";
  return (
    <>
      <Meta title="Contact" />
      <section className="section contact-intro">
        <Eyebrow>CONTACT / YOUR NEXT MOVE</Eyebrow>
        <h1>
          GREAT WORK
          <br />
          STARTS WITH
          <br />
          <span>A CONVERSATION.</span>
        </h1>
      </section>
      <section className="section contact-layout">
        <aside>
          <Eyebrow>OPEN A LINE</Eyebrow>
          <h2>
            LET’S MAKE
            <br />
            <span>A PLAN.</span>
          </h2>
          <p>
            Tell us what you’re thinking. A live event, a new story, a better system — or something
            that brings them all together.
          </p>
          <div className="contact-info">
            <span>EMAIL</span>
            <a href="mailto:mason@trajectoryentertainment.com">
              mason@trajectoryentertainment.com <ArrowUpRight size={16} />
            </a>
            <span>PHONE</span>
            <a href="tel:+18583042781">
              (858) 304-2781 <ArrowUpRight size={16} />
            </a>
            <span>BASED IN</span>
            <p>
              San Diego, California
              <br />
              <small>Available for projects beyond.</small>
            </p>
          </div>
          <div className="contact-coordinate">
            32.7157° N<br />
            117.1611° W <span>+</span>
          </div>
        </aside>
        <div className="form-panel">
          {success ? (
            <output className="form-success">
              <span className="success-icon">
                <Check size={32} />
              </span>
              <Eyebrow>MESSAGE RECEIVED</Eyebrow>
              <h2>
                YOUR NEXT MOVE
                <br />
                <span>IS IN MOTION.</span>
              </h2>
              <p>
                Thanks for reaching out. Your inquiry has been securely saved for Trajectory
                Entertainment.
              </p>
              <button
                className="button secondary"
                onClick={() => {
                  setSuccess(false);
                  submission.reset();
                }}
              >
                SEND ANOTHER INQUIRY <ArrowUpRight size={17} />
              </button>
            </output>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                submission.mutate(
                  {
                    name: String(f.get("name")),
                    email: String(f.get("email")),
                    company: String(f.get("company")),
                    phone: String(f.get("phone")),
                    service: String(f.get("service")) as
                      | "Live events & broadcast"
                      | "Post-production"
                      | "AVL installations"
                      | "IT & UniFi systems"
                      | "Multiple services / not sure",
                    message: String(f.get("message")),
                    website: String(f.get("website")),
                  },
                  { onSuccess: () => setSuccess(true) },
                );
              }}
            >
              <div className="form-heading">
                <span>PROJECT INQUIRY</span>
                <span>01 / START HERE</span>
              </div>
              <div className="form-row">
                <label>
                  Your name <span>*</span>
                  <input
                    name="name"
                    aria-label="Your name"
                    placeholder="First and last name"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                  />
                </label>
                <label>
                  Email address <span>*</span>
                  <input
                    name="email"
                    aria-label="Email address"
                    type="email"
                    placeholder="you@company.com"
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Company
                  <input
                    name="company"
                    aria-label="Company"
                    placeholder="Company or organization"
                    maxLength={200}
                    autoComplete="organization"
                  />
                </label>
                <label>
                  Phone number
                  <input
                    name="phone"
                    aria-label="Phone number"
                    type="tel"
                    placeholder="(555) 000-0000"
                    maxLength={50}
                    autoComplete="tel"
                  />
                </label>
              </div>
              <label>
                What can we help with? <span>*</span>
                <select
                  name="service"
                  aria-label="What can we help with?"
                  required
                  defaultValue={allowed.includes(selected) ? selected : ""}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {allowed.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                  <option>Multiple services / not sure</option>
                </select>
              </label>
              <label>
                Tell us about your project <span>*</span>
                <textarea
                  name="message"
                  aria-label="Tell us about your project"
                  placeholder="The vision, the timeline, the details. Where do you want to go?"
                  rows={5}
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </label>
              <label className="honeypot" aria-hidden="true">
                Website
                <input name="website" aria-label="Website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="form-footer">
                <p>
                  We’ll use these details only to respond to your inquiry.
                  <br />
                  <span>* Required fields</span>
                </p>
                <button className="button" disabled={submission.isPending} type="submit">
                  {submission.isPending ? "SENDING…" : "SEND YOUR INQUIRY"}
                  <ArrowUpRight size={18} />
                </button>
              </div>
              {submission.isError && (
                <p className="form-error" role="alert">
                  Your inquiry couldn’t be saved. Please try again or email{" "}
                  <a href="mailto:mason@trajectoryentertainment.com">
                    mason@trajectoryentertainment.com
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="section not-found">
      <Meta title="Page not found" />
      <Eyebrow>404 / OFF THE FLIGHT PATH</Eyebrow>
      <h1>
        LET’S GET YOU
        <br />
        <span>BACK ON COURSE.</span>
      </h1>
      <Button href="/">RETURN HOME</Button>
    </section>
  );
}
