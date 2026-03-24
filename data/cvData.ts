export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ProfileHighlight = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  headline: string;
  summary: string;
  about: string[];
  location: string;
  phone: string;
  email: string;
  avatar: string;
  navLogo: string;
  heroVisual: string;
  contactVisual: string;
  cvDownloadUrl: string;
  socials: SocialLink[];
  highlights: ProfileHighlight[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  skills: string[];
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
};

export type Education = {
  institution: string;
  credential: string;
  details: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const portfolioData = {
  profile: {
    name: "Md. Muyeen - Ul - Islam",
    headline: "Full Stack Developer and Software Engineer",
    summary:
      "Frontend-focused full stack engineer building responsive, high-performance products with modern React ecosystems and scalable backend integrations.",
    about: [
      "I build product experiences that feel fast, polished, and intuitive while keeping code quality and scalability in focus.",
      "My work spans frontend architecture, backend integrations, API design, and production debugging with strong ownership from planning to delivery.",
      "I enjoy collaborating closely with design and product teams to transform requirements into reliable, user-centered solutions.",
    ],
    location:
      "House C-2 & C-4, Road 18, Block C, Banasree, Rampura, Dhaka 1219, Bangladesh",
    phone: "+8801871082759",
    email: "mailto:muyeenulislamsakif@gmail.com",
    avatar: "/images/heroImg.png",
    navLogo: "/images/navIcon.png",
    heroVisual: "/images/about.png",
    contactVisual: "/images/navIcon.png",
    cvDownloadUrl: "/cv/Md_Muyeen_Ul_Islam.pdf",
    socials: [
      { label: "GitHub", href: "https://github.com/muyeenulislam" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/md-muyeen-ul-islam/",
      },
    ] as ReadonlyArray<SocialLink>,
    highlights: [
      { label: "Years of Experience", value: "4+" },
      { label: "Products Delivered", value: "12+" },
      { label: "Core Focus", value: "UI/UX + Scale" },
    ],
  } as Profile,
  navItems: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ] as ReadonlyArray<NavItem>,
  experiences: [
    {
      role: "Full Stack Engineer",
      company: "Paynest",
      period: "May 2025 - Present",
      responsibilities: [
        "Contribute to Mastercard Gamer Exchange (MGE), Escrow, and VMS portal initiatives.",
        "Revamp and modernize UI/UX to improve engagement and platform usability.",
        "Implement client-driven features and ship iterative product enhancements.",
        "Debug production issues and harden frontend reliability and performance.",
        "Develop and maintain APIs for MGE and VMS while keeping frontend/backend parity.",
      ],
      skills: [
        "React.js",
        "Next.js",
        "Vite",
        "Redux",
        "Zustand",
        "React Query",
        "Node.js",
        "Prisma",
        "Firestore",
        "Firebase",
        "Azure",
        "Tailwind CSS",
      ],
    },
    {
      role: "Full Stack Developer (Contractual, Frontend Focused)",
      company: "MRZ International",
      period: "January 2024 - March 2026",
      responsibilities: [
        "Built Noble Marriage web application and landing experiences from scratch.",
        "Delivered real-time messaging capabilities using GraphQL.",
        "Integrated in-app payment flows with Stripe, bKash, and SSLCommerz.",
        "Handled API synchronization and product behavior across frontend/backend.",
      ],
      skills: [
        "React.js",
        "Redux",
        "Next.js",
        "Zustand",
        "GraphQL",
        "Node.js",
        "DynamoDB",
        "AWS",
        "Ant Design",
        "Tailwind CSS",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "UniVision",
      period: "March 2023 - May 2025",
      responsibilities: [
        "Built and maintained Student, School, and Admin portals with React.js.",
        "Designed backend APIs with Node.js, PostgreSQL, and Prisma ORM.",
        "Revamped both frontend and backend for significantly faster page loads.",
        "Integrated third-party APIs and OpenAI-powered student features.",
        "Collaborated on scalability, maintainability, and long-term platform stability.",
      ],
      skills: [
        "React.js",
        "Redux",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "MongoDB",
        "Mongoose",
        "OpenAI",
        "Stripe",
        "Tailwind CSS",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "EZ Wage Bangladesh",
      period: "September 2022 - April 2023",
      responsibilities: [
        "Developed and maintained full stack modules for apps with 1,500+ users.",
        "Improved transaction performance and optimized data-fetching by 20%.",
        "Integrated bKash disbursement gateway into transaction workflows.",
        "Split transaction APIs/databases and started partial microservice migration.",
      ],
      skills: [
        "Next.js",
        "React.js",
        "Node.js",
        "MySQL",
        "MongoDB",
        "bKash",
        "Linux",
        "Tailwind CSS",
      ],
    },
  ] as Experience[],
  projects: [
    {
      name: "GamerExchange",
      href: "https://gamerexchange.com",
      image: "/images/projects/mge.png",
      description:
        "Digital gaming store for voucher redemption and game top-ups with a clean, modern commerce flow and third-party API integrations.",
      stack: [
        "Next.js",
        "Node.js",
        "TypeScript",
        "Express",
        "Mongoose",
        "Firebase",
      ],
    },
    {
      name: "NobleMarriage",
      href: "https://noblemarriage.com",
      image: "/images/projects/noblemarriage.png",
      description:
        "Global Muslim matrimony platform focused on meaningful matchmaking and inclusive UX.",
      stack: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      name: "eSora Studio",
      href: "https://main.d1g037kldojyzk.amplifyapp.com/",
      image: "/images/projects/esora.png",
      description:
        "SEO-focused studio website using reusable architecture, dynamic routes, centralized content, and smooth interactions.",
      stack: ["Next.js 16", "React 19", "Tailwind CSS 4"],
    },
    {
      name: "Barnabus",
      href: "https://barnabus.ai/",
      image: "/images/projects/barnabus.png",
      description:
        "Multi-page product site with animated storytelling, SEO assets, lead capture, and API integrations.",
      stack: ["Next.js 16", "TypeScript", "AWS Lambda", "API Gateway"],
    },
    {
      name: "UniVision",
      href: "https://univision.hk/",
      image: "/images/projects/univision.png",
      description:
        "EdTech platform streamlining university applications with AI-powered tools and a large university dataset.",
      stack: [
        "React",
        "Redux",
        "Ant Design",
        "Tailwind CSS",
        "Node.js",
        "PostgreSQL",
      ],
    },
    {
      name: "Z3 Engineering",
      href: "https://z3engineering.com.tr/",
      image: "/images/projects/z3.png",
      description:
        "Interior design and architecture website showcasing end-to-end residential and commercial solutions.",
      stack: ["Next.js", "Tailwind CSS"],
    },
  ] as Project[],
  education: [
    {
      institution: "East West University, Dhaka",
      credential: "B.Sc. in Computer Science and Engineering",
      details: "2018 - 2022 | CGPA 3.42 / 4.00",
    },
    {
      institution: "Birshreshtha Munshi Abdur Rouf Public College, Dhaka",
      credential: "H.S.C, Science",
      details: "2017 | GPA 4.92 / 5.00",
    },
    {
      institution: "Motijheel Govt. Boys High School, Dhaka",
      credential: "S.S.C, Science",
      details: "2015 | GPA 5.00 / 5.00",
    },
  ] as Education[],
  skillGroups: [
    {
      title: "Core Frontend",
      items: [
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Ant Design",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Redux",
        "Zustand",
        "React Query",
        "GraphQL",
      ],
    },
    {
      title: "Core Backend",
      items: ["Node.js", "Express", "Elysia.js", "TypeScript", "Prisma ORM"],
    },
    {
      title: "Database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
    },
    {
      title: "Integration & Cloud",
      items: [
        "REST/GraphQL Clients",
        "Stripe",
        "bKash",
        "AWS (S3, Amplify, EC2, Lambda)",
        "Netlify",
        "Vercel",
        "Azure",
        "Heroku",
        "Nginx Basics",
      ],
    },
    {
      title: "Version Control",
      items: ["Git", "GitHub", "Bitbucket"],
    },
  ] as SkillGroup[],
} as const;
