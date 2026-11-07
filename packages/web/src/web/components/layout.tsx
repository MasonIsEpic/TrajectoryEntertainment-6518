import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
export function Brand() {
  return (
    <span className="brand">
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <path d="M5 32L32 5 22 34 18 23 5 32Z" fill="currentColor" />
        <path d="M5 38L14 29M31 18L38 11" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>
        TRAJECTORY<small>ENTERTAINMENT</small>
      </span>
    </span>
  );
}
export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <Link href="/" aria-label="Trajectory Entertainment home">
          <Brand />
        </Link>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {["Home", "About", "Services", "Work", "Contact"].map((name) => (
            <Link
              key={name}
              href={name === "Home" ? "/" : "/" + name.toLowerCase()}
              className={
                location === (name === "Home" ? "/" : "/" + name.toLowerCase()) ||
                (name === "Work" && location.startsWith("/work/"))
                  ? "active"
                  : ""
              }
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact">
          LET’S TALK <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="footer-top">
          <Link href="/">
            <Brand />
          </Link>
          <p>
            The calculated path.
            <br />
            Nothing left to chance.
          </p>
          <div>
            <a href="mailto:mason@trajectoryentertainment.com">
              mason@trajectoryentertainment.com <ArrowUpRight size={14} />
            </a>
            <a href="tel:+18583042781">(858) 304-2781</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Trajectory Entertainment</span>
          <span>SAN DIEGO, CA · BUILT WITH INTENTION</span>
          <Link href="/contact">
            START A CONVERSATION <ArrowUpRight size={12} />
          </Link>
        </div>
      </footer>
    </>
  );
}
export function Button({
  children,
  href = "/contact",
  secondary = false,
}: {
  children: React.ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={"button" + (secondary ? " secondary" : "")}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span className="signal" />
      {children}
    </div>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>
          LET’S SET YOUR
          <br />
          <span>TRAJECTORY.</span>
        </h2>
      </div>
      <div>
        <p>
          Have a show, a story, or a system in mind?
          <br />
          Let’s make a plan.
        </p>
        <Button>START A PROJECT</Button>
      </div>
      <span className="band-cross">+</span>
    </section>
  );
}
