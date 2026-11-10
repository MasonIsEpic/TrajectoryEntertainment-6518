import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "./social-links";
export function Founder() {
  return (
    <section className="section founder-section">
      <div className="founder-portrait">
        <img
          src="/images/mason-power.jpg"
          alt="Mason Power, Founder and Lead Producer of Trajectory Entertainment"
          loading="lazy"
        />
        <span></span>
      </div>
      <div className="founder-story">
        <h2>
          MASON <span>POWER.</span>
        </h2>
        <p className="founder-title">Founder & Lead Producer</p>
        <p className="founder-greeting">Hi, I’m Mason.</p>
        <p>
          I’m a senior at Classical Academy High School and an aspiring aerospace engineer. I’m
          looking into getting my pilot’s license, and I love anything involving technology.
        </p>
        <p>
          I’m also a public speaker working toward more hands-on learning for students, and the
          founder of Trajectory Entertainment, a media production company creating events and
          experiences.
        </p>
        <a className="founder-email" href="mailto:mason@trajectoryentertainment.com">
          mason@trajectoryentertainment.com <ArrowUpRight size={16} />
        </a>
        <SocialLinks personal />
      </div>
    </section>
  );
}
