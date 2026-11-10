export const services = [
  {
    id: "live",
    number: "01",
    title: "Live events & broadcast",
    short: "Live events",
    description:
      "From the first cue to the final frame. Intentional production for the moments you only get once.",
    items: [
      "Live event production",
      "Livestreams & multi-camera broadcasts",
      "Audio, lighting & show control",
      "Technical direction & event support",
    ],
    image: "/images/broadcast.jpg",
    tag: "IN THE MOMENT",
  },
  {
    id: "post",
    number: "02",
    title: "Post-production",
    short: "Post-production",
    description:
      "Find the story. Refine every detail. Turn your footage into content that feels as good as it looks.",
    items: [
      "Video editing & storytelling",
      "Color correction & grading",
      "Audio editing & mixing",
      "Motion graphics & content finishing",
    ],
    image: "/images/console.jpg",
    tag: "EVERY FRAME, INTENTIONAL",
  },
  {
    id: "avl",
    number: "03",
    title: "AVL installations",
    short: "AVL installations",
    description:
      "Audio, video, and lighting built to work together. Purpose-designed systems for the people who use them.",
    items: [
      "Audio, video & lighting system design",
      "Equipment installation & integration",
      "Control systems & signal workflows",
      "Commissioning & operator training",
    ],
    image: "/images/lights.jpg",
    tag: "BUILT TO PERFORM",
  },
  {
    id: "it",
    number: "04",
    title: "IT & UniFi systems",
    short: "IT & UniFi systems",
    description:
      "The infrastructure behind a smooth operation. Thoughtful networking, clean installs, and practical support.",
    items: [
      "UniFi network planning & installation",
      "Wi-Fi, switching & structured cabling",
      "Network configuration & troubleshooting",
      "IT support & system handoff",
    ],
    image: "/images/console.jpg",
    tag: "CONNECTED BY DESIGN",
  },
];
// Add a project here to create its /work/:slug page automatically. Samples are not actual client work.
export const projects = [
  {
    slug: "live-in-full-color",
    title: "Live. In full color.",
    category: "Live events",
    type: "Live production / Broadcast",
    image: "/images/broadcast.jpg",
    client: "Sample live event",
    brief:
      "A concept for a multi-camera live experience with coordinated audio, lighting, and broadcast delivery.",
    approach:
      "Start with a clear run of show, map every signal path, and align the room experience with the livestream. Rehearsal and cue planning bring every department onto the same page.",
    deliverables: [
      "Multi-camera production plan",
      "Audio and lighting design",
      "Livestream signal workflow",
      "Show-day technical direction",
    ],
    outcome: "A proposed workflow for a cohesive experience, in the room and on screen.",
  },
  {
    slug: "a-space-transformed",
    title: "A space transformed.",
    category: "AVL installations",
    type: "System design / Installation",
    image: "/images/lights.jpg",
    client: "Sample venue installation",
    brief: "A concept for turning a flexible venue into an intuitive, production-ready space.",
    approach:
      "Design around the room, the operators, and the events it needs to support. Integrate audio, video, and lighting with straightforward controls and documented workflows.",
    deliverables: [
      "Integrated AVL system plan",
      "Installation and commissioning plan",
      "Operator control layout",
      "Training and handoff documentation",
    ],
    outcome: "A proposed system that balances creative flexibility with everyday usability.",
  },
  {
    slug: "from-footage-to-feeling",
    title: "From footage to feeling.",
    category: "Post-production",
    type: "Editorial / Content finishing",
    image: "/images/console.jpg",
    client: "Sample content project",
    brief: "A concept for shaping event footage into a polished, story-led campaign film.",
    approach:
      "Build a narrative around the strongest moments. Refine pacing, balance the sound, develop a consistent grade, and tailor the final exports to each destination.",
    deliverables: [
      "Hero film edit",
      "Social cutdown plan",
      "Color and audio finishing",
      "Platform-ready deliverables",
    ],
    outcome: "A proposed content package with a consistent story across formats.",
  },
];
