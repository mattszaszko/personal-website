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
  title: "Sales Engineer / Solutions Engineer",
  location: "Utrecht, Netherlands",
  summary:
    "I help businesses solve problems with technology. After a career in product management across three continents, I now partner with teams as a Sales / Solutions Engineer: discovering opportunities, bridging commercial and engineering, and prototyping solutions so you can validate before committing to a full build.",
};

export const EXPERIENCE: ExperienceRole[] = [
  {
    title: "Technical Product Owner & Solutions Specialist",
    company: "TOPdesk",
    period: "Jun 2024 - Jun 2025",
    location: "Delft, NL",
    highlights: [
      "Uncovered €1M+ in customer licensing opportunities",
      "Led a major IAM rewrite for microservices and SSO",
      "Aligned commercial strategy with engineering delivery",
    ],
  },
  {
    title: "Technical Co-founder",
    company: "Inframent",
    period: "Sep 2022 - Nov 2023",
    location: "Noordwijk, NL",
    highlights: [
      "Integrated SaaS mapping into GIS workflows",
      "Led technical discovery for B2B infrastructure",
      "Aligned stakeholders with the European Space Agency (ESA)",
    ],
  },
  {
    title: "Senior Technical Product Manager",
    company: "Zivver",
    period: "May 2021 - Apr 2022",
    location: "Amsterdam, NL",
    highlights: [
      "Partnered with Sales and Legal on technical pre-sales and $1M+ deals",
      "Led critical frontend upgrades for legacy browser compatibility",
      "Ran technical discovery and accessibility workshops",
    ],
  },
  {
    title: "Product Manager & Solutions Lead",
    company: "WeTravel",
    period: "Sep 2019 - Sep 2020",
    location: "Amsterdam, NL",
    highlights: [
      "Architected US tax reporting compliance (TurboTax / Zapier)",
      "Designed automated risk safeguards mitigating $5.7M in exposure",
    ],
  },
  {
    title: "Solutions Consultant",
    company: "Ex Machina",
    period: "2018 - 2019",
    location: "Amsterdam, NL",
    highlights: [
      "Pre-sales for ultra-low latency, high-scale video platforms",
      "Owned uptime/scaling concerns and carried out pen testing",
    ],
  },
  {
    title: "AI Product Manager",
    company: "Bicycle AI (Y Combinator W17)",
    period: "2017 - 2018",
    location: "San Francisco, CA / Bangalore, IN",
    highlights: [
      "Fine-tuned conversational ML models",
      "Technical discovery for customer service teams in the US and India",
    ],
  },
  {
    title: "Early career",
    company: "Pharma research & Nestlé",
    period: "2013 - 2017",
    location: "Budapest, HU / Warwick, UK / Bangalore, IN",
    highlights: [
      "Internships in pharmaceutical market research",
      "Nestlé leadership development program (~3 years): Field Sales, Controlling, Trade Marketing",
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

export const CV_DOWNLOAD_HREF = withBasePath("/cv/Matt-Szaszko-CV.pdf");
export const CV_DOWNLOAD_FILENAME = "Matt-Szaszko-CV.pdf";
