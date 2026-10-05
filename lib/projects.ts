export interface ProjectSection {
  id: "problem" | "solution" | "results";
  label: string;
}

export interface Project {
  id: string;
  name: string;
  /** Short label under the thumbnail */
  subtitle: string;
  thumbnail: string;
  /** Optional live demo / product URL */
  href?: string;
  problem: string[];
  solution: string[];
  /** Optional media shown after the solution paragraphs */
  solutionMedia?: {
    src: string;
    alt: string;
    /** Portrait phone captures stay narrow; landscape demos stay full-width */
    layout?: "wide" | "phone";
  };
  results: string[];
}

export const PROJECT_SECTIONS: ProjectSection[] = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "results", label: "Results" },
];

export const PROJECTS: Project[] = [
  {
    id: "loo-locator",
    name: "Loo Locator",
    subtitle: "Driver toilet map (PWA)",
    thumbnail: "/projects/loo-locator/thumbnail.jpg",
    problem: [
      "Going to the toilet when a delivery driver is on a tightly packed shift is challenging. This is doubly so in the summer. Delivery platforms promote heavily that drivers should hydrate. However, they make no accommodations so that drivers can also dehydrate (i.e. go to the toilet). And so, Loo Locator was born.",
    ],
    solution: [
      "I built a progressive web app (PWA) based on a Firebase backend and using Leaflet for map rendering. Delivery drivers can upload photos of portable toilets they find during their day-to-day work. The app extracts the location from the images and puts the toilets on a map. Drivers can quickly navigate to the nearest reported toilet using Google Maps.",
      "The plan was to sell this as an API product for delivery platforms (like Uber Eats, Picnic, Thuisbezorgd, AH Delivery, and others) so that they can integrate the data into their internal apps and thus provide an easy way for their drivers to find toilets while they work.",
    ],
    solutionMedia: {
      src: "/projects/loo-locator/demo.gif",
      alt: "Loo Locator app demo showing toilet locations on a map",
      layout: "phone",
    },
    results: [
      "A small pilot was conducted with delivery drivers in the Utrecht region. Initial enthusiasm was high from the user side, but delivery platforms were not interested in improving access to toilets for their employees, so I shelved the project.",
    ],
  },
  {
    id: "urban-noise-measurement",
    name: "Urban Noise Measurement",
    subtitle: "Reporting dashboard",
    thumbnail: "/projects/urban-noise-measurement/thumbnail.png",
    href: "https://noise.mattszaszko.com/",
    problem: [
      "This passion project came from my volunteering in the Meet Je Stad initiative in Utrecht. Gemeente Utrecht is looking to add noise measurement to their arsenal of indicators about city health.",
    ],
    solution: [
      "I built an edge computing solution, using Raspberry Pi as the platform to record and classify noise using on-device machine learning, so that no audio leaves the device. This privacy-first approach was crucial during development. The result is comprehensive acoustic and sound type data in real time and historically.",
    ],
    solutionMedia: {
      src: "/projects/urban-noise-measurement/dashboard.gif",
      alt: "Urban Noise Measurement reporting dashboard",
    },
    results: [
      "This project is still in the early stages. Prototypes have been built, testing and data collection is ongoing. The next step is to scale data collection and to unify analytics in a cloud solution that the edge computing devices communicate with.",
      "I am building a community of urban noise measurement early adopters. We have 15 members already and have established links with similar communities in Amsterdam.",
    ],
  },
  {
    id: "way-and-witness",
    name: "Way & Witness",
    subtitle: "Historical motorcycle tours",
    thumbnail: "/projects/way-and-witness/thumbnail.png",
    href: "https://www.wayandwitness.com/witness-tracks.html",
    problem: [
      "A business idea I had called Way & Witness for guided historical motorcycle tours needed an online presence. I wanted something scalable as well, so I created a self-guided version too.",
    ],
    solution: [
      "Building the website and tour itineraries was easy. Building the self-guided component was pretty hard though. I implemented an agentic AI workflow that generates podcast-style audio guides people can listen to while following an itinerary. I used NotebookLM for the curated historical research and podcast generation.",
    ],
    results: [
      "I carried out a few test rides from riders in The Netherlands. The maximum number of people I guided was 15, which was pushing the limit of a guided tour with only one tour guide. Ultimately, I abandoned the idea because it doesn't have enough total addressable market to turn it into a viable business.",
    ],
  },
];

export const PROJECT_DETAIL_SIZE = { width: 720, height: 560 } as const;

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
