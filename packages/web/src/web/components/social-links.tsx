import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { Globe } from "lucide-react";
export function SocialLinks({ personal = false }: { personal?: boolean }) {
  const links = personal
    ? [
        { label: "Mason on X", href: "https://x.com/TopMasonscity", icon: FaXTwitter },
        {
          label: "Mason on Instagram",
          href: "https://www.instagram.com/TopMasonscity/",
          icon: FaInstagram,
        },
        {
          label: "Mason on YouTube",
          href: "https://www.youtube.com/@TopMasonscity",
          icon: FaYoutube,
        },
        {
          label: "Mason on LinkedIn",
          href: "https://www.linkedin.com/in/mason-power/",
          icon: FaLinkedinIn,
        },
        { label: "Mason’s Personal Website", href: "https://masonmpower.com", icon: Globe },
      ]
    : [
        {
          label: "Trajectory on Instagram",
          href: "https://www.instagram.com/TrajectoryEntertainment/",
          icon: FaInstagram,
        },
        { label: "Trajectory on X", href: "https://x.com/TrajectoryEnt", icon: FaXTwitter },
        {
          label: "Trajectory on Facebook",
          href: "https://www.facebook.com/TrajectoryEntertainment",
          icon: FaFacebookF,
        },
        {
          label: "Trajectory on YouTube",
          href: "https://www.youtube.com/@TrajectoryEntertainment",
          icon: FaYoutube,
        },
        {
          label: "Trajectory on LinkedIn",
          href: "https://www.linkedin.com/company/trajectoryproductions/",
          icon: FaLinkedinIn,
        },
      ];
  return (
    <div
      className={"social-links" + (personal ? " personal-socials" : "")}
      aria-label={personal ? "Mason’s social links" : "Company social links"}
    >
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}
