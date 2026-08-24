export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  features: string[];
  techStack: string[];
  status: "active" | "live" | "completed" | "archived";
  githubUrl: string;
  liveUrl: string;
  imageUrl: string; // fallback image
  screenshots: string[]; // placeholder description or custom generated styles
  challenges: string;
  learnings: string;
  architecture: string[]; // steps or nodes in architecture
}

export interface Certification {
  title: string;
  organization: string;
  date: string;
  verifyUrl: string;
  imageUrl: string;
}

export interface EducationItem {
  company: string;
  position: string;
  duration: string;
  workDone: string[];
  skillsUsed: string[];
}

export interface ResourceItem {
  title: string;
  category: "Book" | "Course" | "Documentation" | "Research Paper" | "Blog" | "Video" | "Tool";
  rating: number; // 1 to 5
  review: string;
  link: string;
  coverColor: string; // Gradient color description for cover art placeholder
  coverImageUrl?: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  contestRating: number;
  globalRank: string;
}

export interface GitHubStats {
  stars: number;
  followers: number;
  following: number;
  repositories: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  recentActivity: { repo: string; type: string; date: string; description: string }[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    journey: string;
    careerGoal: string;
    location: string;
    phone: string;
    email: string;
    github: string;
    linkedin: string;
    leetcode: string;
    resumeUrl: string;
    profileImageUrl: string;
    sectionImageUrls?: {
      home?: string;
      about?: string;
      skills?: string;
      projects?: string;
      education?: string;
      library?: string;
      contact?: string;
    };
    stats: {
      educationYears: number;
      projectsCompleted: number;
      technologiesCount: number;
      certificationsCount: number;
    };
  };
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  education: EducationItem[];
  knowledgeLibrary: ResourceItem[];
  leetcodeStats: LeetCodeStats;
  githubStats: GitHubStats;
  chatbotKnowledge: {
    keywords: string[];
    response: string;
  }[];
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Amit Jatthap",
    title: "AI/ML Developer & Software Engineer",
    tagline: "Building practical AI systems, agentic workflows, and full-stack applications with real-world impact.",
    bio: "I am a Computer Science graduate focused on AI/ML, generative AI, agentic systems, and web development. I enjoy building end-to-end solutions that combine machine learning, scalable backend services, and clean user interfaces.",
    journey: "I completed my B.Sc. in Computer Science at Devi Ahilya Vishwavidyalaya and am currently pursuing an MCA in AI/ML at K.R. Mangalam University. My work focuses on machine learning pipelines, explainable AI, LangGraph-based agents, and modern full-stack development.",
    careerGoal: "To build intelligent, explainable, and scalable AI products that solve real-world problems and create meaningful business impact.",
    location: "Khandwa, Madhya Pradesh, India",
    phone: "+91-9685193991",
    email: "amitsumitjatthap@gmail.com",
    github: "https://github.com/amitjatthap2002",
    linkedin: "https://linkedin.com/in/amit-jatthap-3666962a8n",
    leetcode: "https://leetcode.com/u/Amit_Jatthap/",
    resumeUrl: "#",
    profileImageUrl: "https://www.analyticssteps.com/backend/media/thumbnail/4530462/5951113_1605265443_AI%20(7).jpg",
    sectionImageUrls: {
      home: "https://www.analyticssteps.com/backend/media/thumbnail/4530462/5951113_1605265443_AI%20(7).jpg",
      about: "/assets/about-photo.png",
      skills: "/assets/profile-placeholder.svg",
      projects: "/assets/profile-placeholder.svg",
      education: "/assets/education-banner.png",
      library: "/assets/profile-placeholder.svg",
      contact: "/assets/profile-placeholder.svg"
    },
    stats: {
      educationYears: 2,
      projectsCompleted: 4,
      technologiesCount: 16,
      certificationsCount: 3,
    }
  },
  skills: [
    {
      category: "Core Skills",
      items: [
        { name: "Data Structures & Algorithms", level: 88, iconName: "Dsa" },
        { name: "Operating Systems", level: 82, iconName: "Os" },
        { name: "DBMS", level: 84, iconName: "Dbms" },
        { name: "Web Development", level: 86, iconName: "Web" }
      ]
    },
    {
      category: "AI / ML",
      items: [
        { name: "Machine Learning", level: 90, iconName: "Ml" },
        { name: "Deep Learning", level: 86, iconName: "Dl" },
        { name: "Gen AI", level: 88, iconName: "Genai" },
        { name: "Agentic AI", level: 85, iconName: "Agentic" },
        { name: "Python", level: 90, iconName: "Python" },
        { name: "Scikit-learn", level: 84, iconName: "Scikit" },
        { name: "TensorFlow", level: 80, iconName: "Tensorflow" },
        { name: "PyTorch", level: 78, iconName: "Pytorch" }
      ]
    },
    {
      category: "Data & Analytics",
      items: [
        { name: "Pandas", level: 86, iconName: "Pandas" },
        { name: "NumPy", level: 84, iconName: "Numpy" },
        { name: "Matplotlib", level: 80, iconName: "Matplotlib" },
        { name: "Seaborn", level: 78, iconName: "Seaborn" },
        { name: "Power BI", level: 80, iconName: "Powerbi" },
        { name: "Tableau", level: 78, iconName: "Tableau" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Git", level: 84, iconName: "Git" },
        { name: "GitHub", level: 88, iconName: "Github" },
        { name: "VS Code", level: 92, iconName: "Vscode" },
        { name: "IntelliJ IDEA", level: 80, iconName: "Intellij" },
        { name: "Docker", level: 74, iconName: "Docker" }
      ]
    }
  ],
  projects: [
    {
      id: "ecomatch",
      name: "EcoMatch",
      tagline: "AI-Powered Waste Exchange Platform",
      description: "An agentic AI platform where multiple AI agents collaborate to classify waste, discover compatible businesses, generate proposals, and estimate environmental impact.",
      detailedDescription: "EcoMatch uses LangGraph and FastAPI to orchestrate autonomous AI agents for waste classification and sustainable recommendations. The platform combines explainable AI workflows, confidence-based decision-making, and scalable microservices for business matching.",
      features: [
        "LangGraph-based multi-agent collaboration",
        "Confidence scoring and autonomous decision pipelines",
        "FastAPI and Express.js microservices",
        "Explainable AI workflows for waste classification"
      ],
      techStack: ["LangGraph", "FastAPI", "PostgreSQL", "Python", "Express.js", "AI Agents"],
      status: "active",
      githubUrl: "https://github.com/amitjatthap2002/EcoMatch",
      liveUrl: "https://ecomatch.store",
      imageUrl: "https://rekart.co.in/uploads/blog/choosing-the-right-commercial-waste-management-service.jpg",
      screenshots: [
        "Multi-agent waste classification workflow.",
        "Business compatibility and proposal generation view.",
        "Environment impact estimation dashboard."
      ],
      challenges: "Designing reliable autonomous agent collaboration while keeping the workflow explainable and scalable.",
      learnings: "Built modular agent pipelines with confidence-driven decision logic and microservice-based architecture.",
      architecture: ["LangGraph Agents", "FastAPI Services", "Express.js Gateway", "PostgreSQL Database"]
    },
    {
      id: "asie",
      name: "ASIE",
      tagline: "Adaptive Skill Intelligence Engine",
      description: "An AI-powered skill forecasting system for predicting future high-demand skills over the next 3–5 years.",
      detailedDescription: "ASIE is a full-stack application that uses machine learning and NLP to extract skill trends, predict future demand, and generate a knowledge graph of relationships between skills.",
      features: [
        "Skill forecasting using XGBoost, Prophet, and Holt-Winters",
        "NLP-based skill extraction using spaCy",
        "SHAP-based explainability",
        "Knowledge graph generation using NetworkX"
      ],
      techStack: ["Python", "FastAPI", "React", "XGBoost", "spaCy", "NetworkX"],
      status: "completed",
      githubUrl: "https://github.com/amitjatthap2002/ASIE_Project_2026/tree/main/ASIE",
      liveUrl: "#",
      imageUrl: "/assets/projects/skill-forecasting.png",
      screenshots: [
        "Skill forecasting dashboard.",
        "NLP skill extraction results.",
        "Knowledge graph visualization."
      ],
      challenges: "Translating raw skill data into explainable forecasts in a short hackathon timeline.",
      learnings: "Integrated forecasting and NLP models into a cloud-ready, Dockerized prototype quickly and effectively.",
      architecture: ["React Frontend", "FastAPI Backend", "ML Forecasting Engine", "Docker Container"]
    },
    {
      id: "malware-detection",
      name: "AI Malware Detection System",
      tagline: "ML Pipeline for Malware Classification",
      description: "An end-to-end malware detection pipeline using Python and Scikit-learn for classification and interpretability.",
      detailedDescription: "This project focused on preprocessing, feature engineering, and model comparison to improve malware detection accuracy and explainability.",
      features: [
        "Feature engineering and selection",
        "Model comparison and hyperparameter tuning",
        "Precision, recall, F1-score, and AUC-ROC evaluation",
        "SHAP explainability for model insight"
      ],
      techStack: ["Python", "Scikit-learn", "SHAP", "Machine Learning"],
      status: "completed",
      githubUrl: "https://github.com/amitjatthap2002",
      liveUrl: "#",
      imageUrl: "/assets/projects/malware-detection.png",
      screenshots: [
        "Feature engineering workflow.",
        "Model performance comparison.",
        "Explainability summary for predictions."
      ],
      challenges: "Improving classification performance while keeping the model interpretable for real-world use.",
      learnings: "Used GridSearchCV and SHAP to optimize and explain the final Random Forest model.",
      architecture: ["Python Pipeline", "Scikit-learn Model", "SHAP Explainability", "Evaluation Metrics"]
    }
  ],
  certifications: [
    {
      title: "Power BI for Beginners",
      organization: "Simplilearn",
      date: "2025",
      verifyUrl: "/assets/certs/power_bi_simplilearn.pdf",
      imageUrl: "/assets/certs/power_bi_simplilearn.png"
    },
    {
      title: "Machine Learning with Python",
      organization: "IBM",
      date: "2025",
      verifyUrl: "/assets/certs/machine_learning_ibm.pdf",
      imageUrl: "/assets/certs/machine_learning_ibm.png"
    },
    {
      title: "Generative AI",
      organization: "Outskill",
      date: "2025",
      verifyUrl: "/assets/certs/generative_ai_outskill.pdf",
      imageUrl: "/assets/certs/generative_ai_outskill.png"
    }
  ],
  education: [
    {
      company: "Devi Ahilya Vishwavidyalaya",
      position: "B.Sc. Computer Science",
      duration: "Aug 2021 - Mar 2024",
      workDone: [
        "Completed B.Sc. in Computer Science with a CGPA of 6.9.",
        "Built a strong foundation in programming, data structures, operating systems, and database systems."
      ],
      skillsUsed: ["Computer Science", "DBMS", "Algorithms", "Operating Systems"]
    },
    {
      company: "K.R. Mangalam University",
      position: "MCA (AI/ML)",
      duration: "Sep 2025 - Jun 2027",
      workDone: [
        "Pursuing MCA with a focus on AI/ML and advanced computing concepts with a current CGPA of 8.3.",
        "Developing practical expertise in machine learning, deep learning, and generative AI."
      ],
      skillsUsed: ["AI/ML", "Deep Learning", "Gen AI", "Agentic AI"]
    }
  ],
  knowledgeLibrary: [
    {
      title: "Bhagavad Gita",
      category: "Book",
      rating: 5,
      review: "A timeless spiritual guide offering deep psychological insights into duty, mind control, and inner peace.",
      link: "Teaches duty & mind control",
      coverColor: "from-orange-600 to-amber-900",
      coverImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCtmMeSRHbIPfeEi5QWIm6QyZbo4XIQlpPiL2S2FrD2aVzaKIrvria_w&s=10"
    },
    {
      title: "The Psychology of Money",
      category: "Book",
      rating: 5,
      review: "A fascinating look into how our minds and emotions drive financial decisions. It teaches that doing well with money has little to do with how smart you are and a lot to do with how you behave.",
      link: "Shows how behavior drives wealth",
      coverColor: "from-green-700 to-emerald-950",
      coverImageUrl: "https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      title: "The Power of Habit",
      category: "Book",
      rating: 5,
      review: "Explores the science behind why habits exist and how they can be changed. Understanding habits is the first step to rewiring your brain and optimizing your daily life and productivity.",
      link: "The science of building habits",
      coverColor: "from-yellow-500 to-orange-700",
      coverImageUrl: "https://m.media-amazon.com/images/I/71i-gZ-lEPL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      title: "Build an Agentic AI Workflow with LangGraph",
      category: "Course",
      rating: 5,
      review: "A masterpiece course mapping state transitions, cyclical workflows, and human-in-the-loop validation patterns.",
      link: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/",
      coverColor: "from-violet-800 to-fuchsia-950",
      coverImageUrl: "/assets/books/book-ai.svg"
    },
    {
      title: "Next.js Core Routing Architecture Guide",
      category: "Documentation",
      rating: 5,
      review: "Excellent official Next.js guidelines outlining server vs client component network boundaries, layouts, and pre-fetching.",
      link: "https://nextjs.org/docs",
      coverColor: "from-zinc-800 to-black",
      coverImageUrl: "/assets/books/book-next.svg"
    },
    {
      title: "Attention Is All You Need",
      category: "Research Paper",
      rating: 5,
      review: "The original paper introducing the Transformer architecture, multi-head self-attention mechanisms, and sequence modelling.",
      link: "https://arxiv.org/abs/1706.03762",
      coverColor: "from-teal-700 to-emerald-950"
    },
    {
      title: "Stripe Developer Technical Blog",
      category: "Blog",
      rating: 4,
      review: "An amazing resource for learning API design principles, clean architecture patterns, and elegant documentation methods.",
      link: "https://stripe.com/blog",
      coverColor: "from-purple-600 to-indigo-800"
    },
    {
      title: "NextJS 16 Deep Dive & Server Actions",
      category: "Video",
      rating: 5,
      review: "An incredible video explaining the changes in NextJS 16 development, Turbopack structures, and compilation speeds.",
      link: "https://youtube.com",
      coverColor: "from-red-800 to-stone-900"
    }
  ],
  leetcodeStats: {
    totalSolved: 486,
    totalQuestions: 3100,
    easySolved: 182,
    easyTotal: 800,
    mediumSolved: 245,
    mediumTotal: 1600,
    hardSolved: 59,
    hardTotal: 700,
    contestRating: 1842,
    globalRank: "Top 4.2%"
  },
  githubStats: {
    stars: 124,
    followers: 86,
    following: 34,
    repositories: 42,
    topLanguages: [
      { name: "TypeScript", percentage: 48, color: "#3178c6" },
      { name: "Python", percentage: 32, color: "#3572A5" },
      { name: "JavaScript", percentage: 12, color: "#f1e05a" },
      { name: "GLSL", percentage: 8, color: "#563d7c" }
    ],
    recentActivity: [
      { repo: "aetheria-ai-studio", type: "Push", date: "Today", description: "Streamlined agent transition animations & refactored FastAPI SSE listeners." },
      { repo: "omnistore-nextjs", type: "Release", date: "2 days ago", description: "Tagged version v1.2.0 - completed Stripe webhook integration & cache invalidation triggers." },
      { repo: "synapse-mesh", type: "Star", date: "4 days ago", description: "Received a star from an open-source contributor on the GLSL shader preset menu." },
      { repo: "deepsight-fastapi", type: "Commit", date: "1 week ago", description: "Updated Dockerfile base image to debian-slim to decrease image storage costs by 40%." }
    ]
  },
  chatbotKnowledge: [
    {
      keywords: ["amit", "who", "yourself", "intro", "introduction", "bio", "profile", "name"],
      response: "My name is Amit Jatthap. I am an AI Engineer and Full-Stack AI Developer passionate about building scalable, production-ready AI products."
    },
    {
      keywords: ["where", "living", "location", "address", "city", "residence", "based"],
      response: "I am currently based in Sohna, Gurugram, Haryana."
    },
    {
      keywords: ["project", "portfolio", "ecomatch", "asie", "malware", "work", "apps", "projects", "build", "built", "made"],
      response: "I have built several major AI projects: 1. **EcoMatch** (An AI-powered waste exchange platform using LangGraph agents and FastAPI), 2. **ASIE** (An Adaptive Skill Intelligence Engine for future skill prediction using XGBoost, Prophet and NLP), and 3. **AI Malware Detection System** (Using feature engineering and Random Forest optimization with explainable AI)."
    },
    {
      keywords: ["skills", "technology", "tech", "python", "machine learning", "ai", "backend", "databases", "fastapi", "know", "stack", "frameworks", "deep learning", "agentic", "genai", "abilities", "expertise", "what can"],
      response: "Here's a breakdown of my skills by category:\n\n🧠 **Core CS Fundamentals**\n- Data Structures & Algorithms\n- Operating Systems\n- Database Management System (DBMS)\n\n🤖 **AI / ML**\n- Machine Learning\n- Deep Learning\n- Generative AI (Gen AI)\n- Agentic AI (LangGraph, LangChain)\n- Python, Scikit-learn, TensorFlow, PyTorch, SHAP\n\n📊 **Data & Analytics**\n- Pandas, NumPy, Matplotlib, Seaborn\n- Power BI, Tableau\n\n🌐 **Web Development**\n- HTML, CSS, JavaScript\n- React, Next.js\n- FastAPI, Express.js, REST APIs\n\n🛠️ **Tools**\n- Git, GitHub, VS Code, Docker"
    },
    {
      keywords: ["contact", "email", "phone", "linkedin", "github", "hire", "talk", "reach", "message", "call"],
      response: "You can reach me at:\n- **Email**: amitsumitjatthap@gmail.com\n- **Phone**: +91-9685193991\n- **GitHub**: https://github.com/amitjatthap2002\n- **LinkedIn**: https://linkedin.com/in/amit-jatthap-3666962a8n"
    },
    {
      keywords: ["education", "jobs", "career", "work", "university", "college", "degree", "internship", "study", "studying"],
      response: "I am currently pursuing a Master of Computer Applications (AI/ML) at K.R. Mangalam University (2025–2027) with a current SGPA of 8.31. Previously, I completed my B.Sc. in Computer Science at Devi Ahilya Vishwavidyalaya. I am actively seeking an AI/ML or GenAI internship to contribute to real-world products."
    },
    {
      keywords: ["goals", "future", "objective", "aim", "plan", "vision"],
      response: "My short-term goal is to secure an AI/ML internship. In the long term, I aim to build AI platforms for India in areas like cybersecurity, education, governance, and cloud infrastructure, eventually creating startup-scale products."
    },
    {
      keywords: ["certification", "certifications", "certificate", "certificates", "courses", "certified"],
      response: "I hold several certifications in the tech and AI field, including:\n- **Power BI for Beginners** from Simplilearn (2025)\n- **Machine Learning with Python** from IBM (2025)\n- **Generative AI** from OutSkills (2025)\nCheck the Certifications section on my portfolio for more details!"
    },
    {
      keywords: ["library", "resource", "resources", "books", "reading", "knowledge", "research", "paper", "blog", "articles"],
      response: "My Knowledge Library section contains a curated list of resources I highly recommend. It includes essential books like 'Designing Data-Intensive Applications', research papers like 'Attention Is All You Need', and various courses and documentation on LangGraph and Next.js."
    }
  ]
};
