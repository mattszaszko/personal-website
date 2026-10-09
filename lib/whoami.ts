import { withBasePath } from "@/lib/basePath";

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  school: string;
  location: string;
  period: string;
  degree: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  /** 0–100 for proficiency bar */
  proficiency: number;
}

export const WHOAMI_PROFILE = {
  name: "Matt Szaszko",
  title: "Product / Design",
  location: "Utrecht, Netherlands",
  summary:
    "After a sabbatical I’m continuing my career at the verge of Product and Design. My experience spans three continents, and as a former founder I’m driven by solving problems with technology while delivering value to customers and the business. Combining a background in psychology with experience managing complex technical products—and thoughtful use of AI—I thrive in highly collaborative environments: talking to customers on Monday, design sessions on Tuesday, a board meeting on Wednesday, a development deep dive on Thursday, a launch party on Friday, and shipping to prod on Saturday.",
};

export const EXPERIENCE: ExperienceRole[] = [
  {
    title: "Product Owner IAM",
    company: "TOPdesk",
    period: "Jun 2024 - Jun 2025",
    location: "Delft, NL",
    highlights: [
      "Uncovered €1M+ in customer licensing opportunities across enterprise accounts by analyzing system architectures and account usage data",
      "Led a major IAM system rewrite to deprecate legacy architecture, engineering a modern microservices backend for enterprise SSO and security",
      "Aligned commercial strategies with engineering delivery, reducing deployment friction for enterprise SaaS clients",
    ],
  },
  {
    title: "Technical Co-founder",
    company: "Inframent",
    period: "Sep 2022 - Nov 2023",
    location: "Noordwijk, NL",
    highlights: [
      "Designed and developed a ConTech mobile app for underground infrastructure compliance reporting; raised €100k from PLNT Leiden and ESA Incubator",
      "Led end-to-end technical discovery with B2B infrastructure executives to turn manual cable reporting into high-margin software",
      "Aligned with ESA engineers to validate GNSS positioning accuracy in complex urban environments",
    ],
  },
  {
    title: "Senior Product Manager - Consumer Experience",
    company: "Zivver",
    period: "May 2021 - Apr 2022",
    location: "Amsterdam, NL",
    highlights: [
      "Complete redesign of the patient authentication and inbox flow while delivering the brand redesign under tight deadlines (1M+ MAUs)",
      "Led critical frontend upgrades while maintaining legacy browser compatibility for enterprise compliance and 100% platform availability",
      "Ran technical discovery and accessibility workshops with Koninklijke Visio to overhaul core mobile and web accessibility",
    ],
  },
  {
    title: "Product & Design Person",
    company: "WeTravel",
    period: "Sep 2019 - Sep 2020",
    location: "Amsterdam, NL",
    highlights: [
      "As first Product hire, designed and shipped US tax reporting compliance connecting TurboTax and self-serve workflows with Zapier",
      "Implemented automated risk safeguards that mitigated $5.7M in chargeback exposure and reduced operational overhead by $1.5M during COVID",
    ],
  },
  {
    title: "Product & Design Person",
    company: "Ex Machina",
    period: "2018 - 2019",
    location: "Amsterdam, NL",
    highlights: [
      "Platform management and implementation for ultra-low latency, ultra-high-scale interactive video for top-tier media clients globally",
      "Drove the platform to 100% uptime and 1M+ concurrent users via stress tests, and ran pen testing end-to-end including vendor selection",
    ],
  },
  {
    title: "AI Product Designer",
    company: "Bicycle AI (Y Combinator W17)",
    period: "2017 - 2018",
    location: "San Francisco, CA / Bangalore, IN",
    highlights: [
      "Designed and implemented human-in-the-loop conversational AI for chat-based customer service; operationalized internal ML training workflows",
      "Post-pivot, designed a live interactive quiz game app for India: 500k+ downloads, 60k+ concurrent players, 4.6 Play Store rating",
    ],
  },
  {
    title: "Early career",
    company: "Pharma research & Nestlé",
    period: "2013 - 2017",
    location: "Budapest, HU / Warwick, UK / Bangalore, IN",
    highlights: [
      "Interned at pharmaceutical market research and market access companies in Hungary, the UK, and India",
      "Nestlé leadership development program (~3 years) in Hungary: Field Sales, Controlling, and Trade Marketing",
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    school: "Abertay University",
    location: "Dundee, United Kingdom",
    period: "2010 - 2013",
    degree: "Bachelor of Psychology with Honours",
  },
];

export const LANGUAGES: LanguageItem[] = [
  { name: "English", level: "Fluent / native-level", proficiency: 100 },
  { name: "Dutch", level: "Professional working", proficiency: 72 },
  { name: "German", level: "Basic", proficiency: 28 },
];

export const FUN_INTERESTS = [
  {
    title: "Motorcycle travel",
    detail: "Long rides, new routes, and the freedom of the open road.",
  },
  {
    title: "Camping",
    detail: "Unplugging outdoors, simple setups, and nights under the stars.",
  },
  {
    title: "History",
    detail: "Stories that shaped places, people, and how we build today.",
  },
  {
    title: "Food",
    detail: "Trying local spots, cooking at home, and sharing a good table.",
  },
  {
    title: "Modern art",
    detail: "Galleries, bold ideas, and work that makes you look twice.",
  },
  {
    title: "Architecture",
    detail: "Space, structure, and cities designed with intention.",
  },
] as const;

export const WHOAMI_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "languages", label: "Languages" },
  { id: "fun", label: "Fun" },
] as const;

export const CV_DOWNLOAD_HREF = withBasePath(
  "/cv/Matt-Szaszko-CV-Product-Designer.pdf",
);
export const CV_DOWNLOAD_FILENAME = "Matt-Szaszko-CV-Product-Designer.pdf";
