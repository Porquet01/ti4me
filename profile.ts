/**
 * Everything written about Felix lives here.
 * Change the text in this file and the site updates itself.
 */
export interface Profile {
  name: string;
  fullName: string;
  title: string;
  location: string;
  summary: string;
  about: string[];
  focus: string[];
  studying: string;
  stack: string[];
  lookingFor: string;
  /** Path to your photo. If the file is missing, your initials show instead. */
  photo: string;
  photoAlt: string;
  /** Path to your CV, e.g. "assets/Felix_CV.pdf". null hides the CV button. */
  cvUrl: string | null;
}

export interface SkillGroup {
  heading: string;
  blurb: string;
  items: string[];
}

export interface EducationEntry {
  school: string;
  programme: string;
  status: string;
  points: string[];
}

export const profile: Profile = {
  name: "Felix",
  fullName: "Felix Akatia Edoukou Porquet",
  title: "Aspiring Full-Stack Developer",
  location: "Ghana",
  summary:
    "BTech IT student from Ghana. I build websites with HTML, CSS, JavaScript and " +
    "TypeScript, and I care about code that is tested and easy to read.",
  about: [
    "I'm Felix, a BTech Information Technology student at Takoradi Technical University " +
      "in Ghana. My coursework is done and I'm getting ready to start my career in software development.",
    "I love the moment a page I've been building finally works in the browser. Right now I'm " +
      "sharpening my JavaScript and TypeScript, and learning to test my code properly instead " +
      "of just hoping it works.",
  ],
  focus: [
    "Web development with JavaScript and TypeScript",
    "Software testing and code quality",
    "Building tools that solve real problems",
  ],
  studying: "BTech Information Technology",
  stack: ["HTML", "CSS", "JavaScript", "TypeScript"],
  lookingFor: "Internships and junior developer roles",
  photo: "assets/images/profile.jpg",
  photoAlt: "Portrait of Felix Akatia Edoukou Porquet",
  cvUrl: null,
};

export const skills: SkillGroup[] = [
  {
    heading: "Languages",
    blurb: "What I write my code in.",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
  },
  {
    heading: "Tools",
    blurb: "What I use every day.",
    items: ["Git and GitHub", "VS Code", "Postman", "Git Bash"],
  },
  {
    heading: "Practices",
    blurb: "How I try to work.",
    items: [
      "Software testing",
      "Black-box and white-box testing",
      "Mutation testing",
      "Responsive design",
    ],
  },
  {
    heading: "Growing into",
    blurb: "Where I'm headed next.",
    items: ["Full-stack development", "TypeScript"],
  },
];

export const education: EducationEntry[] = [
  {
    school: "Takoradi Technical University",
    programme: "BTech Information Technology",
    status: "Level 400, coursework completed, graduation pending",
    points: [
      "Software testing: black-box and white-box techniques, random testing and mutation testing",
      "Compilers: input buffering, and how compilers differ from interpreters",
      "Web development: building and styling multi-page websites",
    ],
  },
];
