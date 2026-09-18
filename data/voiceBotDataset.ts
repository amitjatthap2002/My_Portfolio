/**
 * ============================================================================
 * voiceBotDataset.ts — Comprehensive Training & Knowledge Base for Voice Bot
 * ============================================================================
 * 
 * Master maintainable Q&A Dataset containing detailed information about:
 * - Personal Bio & Background
 * - Education (MCA, B.Sc, DAVV, K.R. Mangalam)
 * - Tech Stack & Skills (AI/ML, Python, Web Dev, DSA, Tools)
 * - Projects (EcoMatch, ASIE, Malware Detection, MusicSynth, Portfolio)
 * - Certifications & Achievements
 * - LeetCode & GitHub Stats
 * - Career Goals & Job Availability
 * - Contact Info (Email, Phone, LinkedIn, GitHub)
 * - Personal Interests, Hobbies & Library Books
 * - Hindi & Hinglish Query Variations
 * - Greetings & General Assistant Interactions
 * 
 * HOW TO ADD / MAINTAIN QUESTIONS:
 * Simply add or modify entries in `voiceBotQADataset` array below.
 * Each entry has:
 *   - id: unique string key
 *   - category: domain group
 *   - questions: natural language question variants (English, Hinglish, Hindi)
 *   - keywords: weighted tokens for query matching (weight 3=critical, 2=important, 1=minor)
 *   - answer: concise, informative answer spoken & displayed by voice bot
 * ============================================================================
 */

export interface VoiceBotQAPair {
  id: string;
  category:
    | "bio"
    | "education"
    | "skills"
    | "projects"
    | "certifications"
    | "stats"
    | "goals"
    | "contact"
    | "hobbies"
    | "hinglish"
    | "general";
  questions: string[];
  keywords: { word: string; weight: number }[];
  answer: string;
}

export const voiceBotQADataset: VoiceBotQAPair[] = [
  // =========================================================================
  // 1. BIO & INTRODUCTION
  // =========================================================================
  {
    id: "bio.who_is_amit",
    category: "bio",
    questions: [
      "Who is Amit?",
      "Tell me about Amit",
      "Who are you?",
      "Introduce yourself",
      "What is your name?",
      "Give me your bio",
      "Amit kaun hai",
      "Aapke bare me batao",
      "Amit ke bare me bataiye",
      "Introduce yourself in short",
      "What kind of developer is Amit?",
    ],
    keywords: [
      { word: "amit", weight: 3 },
      { word: "who", weight: 2 },
      { word: "yourself", weight: 3 },
      { word: "introduce", weight: 3 },
      { word: "bio", weight: 3 },
      { word: "name", weight: 2 },
      { word: "kaun", weight: 3 },
      { word: "kon", weight: 3 },
      { word: "batao", weight: 2 },
      { word: "profile", weight: 2 },
    ],
    answer:
      "My name is **Amit Jatthap**. I am an AI/ML Developer & Software Engineer pursuing MCA in AI/ML. I specialize in building practical AI systems, agentic workflows, machine learning models, and modern full-stack web applications.",
  },
  {
    id: "bio.location",
    category: "bio",
    questions: [
      "Where do you live?",
      "Where are you from?",
      "What is your location?",
      "Which city are you from?",
      "Kahan rehte ho?",
      "Amit kahan se hai?",
      "Aapki location kya hai?",
    ],
    keywords: [
      { word: "where", weight: 3 },
      { word: "location", weight: 3 },
      { word: "city", weight: 3 },
      { word: "live", weight: 2 },
      { word: "kahan", weight: 3 },
      { word: "rehte", weight: 2 },
      { word: "khandwa", weight: 3 },
      { word: "mp", weight: 2 },
    ],
    answer:
      "I am based in **Khandwa, Madhya Pradesh, India**. I am open to remote opportunities as well as relocating for full-time software and AI developer roles.",
  },

  // =========================================================================
  // 2. EDUCATION & ACADEMICS
  // =========================================================================
  {
    id: "education.degree_overview",
    category: "education",
    questions: [
      "What is your education?",
      "Tell me about your degrees",
      "Where did you study?",
      "What college did you go to?",
      "Qualification kya hai?",
      "Padhai kahan se ki?",
      "MCA kahan se kar rahe ho?",
      "BSc degree details",
    ],
    keywords: [
      { word: "education", weight: 3 },
      { word: "study", weight: 3 },
      { word: "degree", weight: 3 },
      { word: "college", weight: 3 },
      { word: "university", weight: 3 },
      { word: "qualification", weight: 3 },
      { word: "mca", weight: 3 },
      { word: "bsc", weight: 3 },
      { word: "padhai", weight: 3 },
    ],
    answer:
      "I completed my **B.Sc. in Computer Science** from Devi Ahilya Vishwavidlavya (DAVV), Indore. Currently, I am pursuing my **MCA in AI & ML** from K.R. Mangalam University, Gurugram, expanding my expertise in deep learning, neural networks, and agentic AI systems.",
  },
  {
    id: "education.mca",
    category: "education",
    questions: [
      "Tell me about your MCA",
      "Where are you doing your MCA?",
      "What specialization in MCA?",
      "K.R. Mangalam University details",
      "MCA stream kya hai?",
    ],
    keywords: [
      { word: "mca", weight: 3 },
      { word: "mangalam", weight: 3 },
      { word: "specialization", weight: 2 },
      { word: "postgraduate", weight: 2 },
      { word: "master", weight: 2 },
    ],
    answer:
      "I am pursuing **Master of Computer Applications (MCA)** with a specialization in **AI & Machine Learning** at **K.R. Mangalam University**. The coursework covers Neural Networks, Agentic Workflows, NLP, Computer Vision, and Advanced Software Engineering.",
  },

  // =========================================================================
  // 3. SKILLS & TECH STACK
  // =========================================================================
  {
    id: "skills.all_skills",
    category: "skills",
    questions: [
      "What are your skills?",
      "What technologies do you know?",
      "What is your tech stack?",
      "Skills kya hai?",
      "Kya kya aata hai?",
      "Technical skills batao",
      "Show me your tech stack",
    ],
    keywords: [
      { word: "skills", weight: 3 },
      { word: "technologies", weight: 3 },
      { word: "tech", weight: 2 },
      { word: "stack", weight: 2 },
      { word: "languages", weight: 3 },
      { word: "tools", weight: 2 },
      { word: "aata", weight: 2 },
      { word: "kya", weight: 1 },
    ],
    answer:
      "My core skills span:\n• **AI/ML & GenAI**: Python, Scikit-Learn, PyTorch, TensorFlow, LangChain, LangGraph, Agentic AI\n• **Core CS**: Data Structures & Algorithms, Operating Systems, DBMS, Object-Oriented Programming\n• **Data Analytics**: Pandas, NumPy, Matplotlib, Seaborn, Power BI, Tableau\n• **Full Stack & Web**: React, Next.js, TypeScript, Tailwind CSS, REST APIs\n• **Tools**: Git, GitHub, Docker, VS Code, Linux",
  },
  {
    id: "skills.python_aiml",
    category: "skills",
    questions: [
      "Do you know Python?",
      "Are you good at Python?",
      "What AI ML frameworks do you use?",
      "Do you know PyTorch or TensorFlow?",
      "Python aati hai kya?",
      "Machine learning skills kya hai?",
    ],
    keywords: [
      { word: "python", weight: 3 },
      { word: "pytorch", weight: 3 },
      { word: "tensorflow", weight: 3 },
      { word: "machine", weight: 2 },
      { word: "learning", weight: 2 },
      { word: "ai", weight: 2 },
      { word: "ml", weight: 2 },
    ],
    answer:
      "Yes! Python is my primary programming language. I build ML models using **Scikit-learn, PyTorch, and TensorFlow**, and create generative AI agents with **LangGraph & LangChain**.",
  },
  {
    id: "skills.webdev",
    category: "skills",
    questions: [
      "Do you know Web Development?",
      "What frontend frameworks do you use?",
      "Do you know React or Next.js?",
      "Web dev skills kya hai?",
      "Frontend comes under your skills?",
    ],
    keywords: [
      { word: "react", weight: 3 },
      { word: "nextjs", weight: 3 },
      { word: "web", weight: 3 },
      { word: "frontend", weight: 3 },
      { word: "typescript", weight: 3 },
      { word: "javascript", weight: 2 },
      { word: "css", weight: 2 },
    ],
    answer:
      "Yes, I build modern web applications using **React, Next.js, TypeScript, Tailwind CSS, and Framer Motion**. I focus on sleek UI, responsive design, and smooth user experiences.",
  },

  // =========================================================================
  // 4. PROJECTS
  // =========================================================================
  {
    id: "projects.all_projects",
    category: "projects",
    questions: [
      "What projects have you built?",
      "Tell me about your projects",
      "Show me your work",
      "Projects kya hain?",
      "Konsa project banaya h?",
      "Give me an overview of your projects",
      "Best project konsa hai?",
    ],
    keywords: [
      { word: "projects", weight: 3 },
      { word: "built", weight: 2 },
      { word: "work", weight: 2 },
      { word: "portfolio", weight: 2 },
      { word: "banaya", weight: 3 },
      { word: "dikhao", weight: 2 },
    ],
    answer:
      "I have built several AI & Web projects:\n1. 🌿 **EcoMatch**: AI-powered plant recommendation engine combining XGBoost, Scikit-learn, and React.\n2. 🔍 **ASIE (Agentic Search Engine)**: Multi-agent web search engine powered by LangGraph, Python & FastApi.\n3. 🛡️ **Malware Detection System**: Random Forest & Neural Network classifier for real-time binary threat analysis.\n4. 🎵 **MusicSynth**: Interactive audio visualizer & Web Audio API synthesizer built in Next.js.",
  },
  {
    id: "projects.ecomatch",
    category: "projects",
    questions: [
      "Tell me about EcoMatch",
      "What is EcoMatch project?",
      "EcoMatch kya hai?",
      "How does EcoMatch work?",
      "Plant recommendation project details",
    ],
    keywords: [
      { word: "ecomatch", weight: 3 },
      { word: "plant", weight: 3 },
      { word: "recommendation", weight: 2 },
      { word: "xgboost", weight: 2 },
    ],
    answer:
      "**EcoMatch** is an AI-powered ecological recommendation engine. It takes environmental factors like soil pH, rainfall, temperature, and sunlight to recommend optimal plant species using trained XGBoost and Decision Tree ML models.",
  },
  {
    id: "projects.asie",
    category: "projects",
    questions: [
      "What is ASIE?",
      "Tell me about Agentic Search Engine",
      "ASIE project details",
      "LangGraph search engine project",
    ],
    keywords: [
      { word: "asie", weight: 3 },
      { word: "search", weight: 3 },
      { word: "agentic", weight: 3 },
      { word: "langgraph", weight: 3 },
    ],
    answer:
      "**ASIE (Agentic Search & Intelligence Engine)** is an autonomous multi-agent search platform. Built with Python and LangGraph, it breaks complex search queries into sub-goals, scrapes search results, synthesizes information, and outputs verified executive reports.",
  },
  {
    id: "projects.malware",
    category: "projects",
    questions: [
      "Tell me about Malware Detection project",
      "What is your cybersecurity project?",
      "Malware detector details",
      "Malware detection project kya hai?",
    ],
    keywords: [
      { word: "malware", weight: 3 },
      { word: "security", weight: 3 },
      { word: "detection", weight: 3 },
      { word: "cybersecurity", weight: 2 },
    ],
    answer:
      "The **Malware Detection System** is a machine learning security application that analyzes PE header files and static binary attributes to classify files as benign or malicious with high accuracy using Random Forest classifiers.",
  },

  // =========================================================================
  // 5. STATS & LEETCODE & GITHUB
  // =========================================================================
  {
    id: "stats.leetcode",
    category: "stats",
    questions: [
      "What are your LeetCode stats?",
      "How many LeetCode questions solved?",
      "LeetCode rank kya hai?",
      "LeetCode profile details",
      "LeetCode stats batao",
    ],
    keywords: [
      { word: "leetcode", weight: 3 },
      { word: "solved", weight: 3 },
      { word: "problems", weight: 2 },
      { word: "contest", weight: 2 },
      { word: "rank", weight: 2 },
      { word: "dsa", weight: 2 },
    ],
    answer:
      "I have solved **350+ Data Structures & Algorithms problems** on LeetCode with a contest rating of ~1,842. I regularly practice problem solving in C++ and Python.",
  },
  {
    id: "stats.github",
    category: "stats",
    questions: [
      "Tell me about your GitHub",
      "What is your GitHub username?",
      "GitHub stats kya hai?",
      "GitHub profile details",
      "How many repositories on GitHub?",
    ],
    keywords: [
      { word: "github", weight: 3 },
      { word: "repositories", weight: 3 },
      { word: "repos", weight: 2 },
      { word: "code", weight: 2 },
      { word: "git", weight: 2 },
    ],
    answer:
      "My GitHub username is **@amitjatthap2002**. I have over 18 repositories featuring AI agents, web applications, ML research code, and open-source contributions. Python and TypeScript are my top languages.",
  },

  // =========================================================================
  // 6. CERTIFICATIONS
  // =========================================================================
  {
    id: "certifications.all",
    category: "certifications",
    questions: [
      "What certifications do you have?",
      "Tell me about your certificates",
      "Certifications kya hai?",
      "Which courses have you certified in?",
      "Certificate details",
    ],
    keywords: [
      { word: "certifications", weight: 3 },
      { word: "certificates", weight: 3 },
      { word: "certified", weight: 3 },
      { word: "coursera", weight: 2 },
      { word: "courses", weight: 2 },
    ],
    answer:
      "My key certifications include:\n• **Machine Learning Specialization** (Coursera / DeepLearning.AI)\n• **Deep Learning & Neural Networks**\n• **Python for Data Science & AI** (IBM / Coursera)\n• **Full-Stack Web Development**\n• **Data Structures & Algorithms in C++**",
  },

  // =========================================================================
  // 7. CAREER GOALS & HIRING
  // =========================================================================
  {
    id: "goals.hiring",
    category: "goals",
    questions: [
      "Are you available for work?",
      "Are you looking for a job or internship?",
      "Can I hire you?",
      "Job chahiye kya?",
      "Are you open to remote work?",
      "What roles are you looking for?",
      "Salary expectation kya hai?",
    ],
    keywords: [
      { word: "hire", weight: 3 },
      { word: "available", weight: 3 },
      { word: "job", weight: 3 },
      { word: "internship", weight: 3 },
      { word: "work", weight: 2 },
      { word: "remote", weight: 2 },
      { word: "opportunity", weight: 2 },
      { word: "roles", weight: 2 },
    ],
    answer:
      "Yes! I am **actively open for full-time job roles and high-impact internships** in AI/ML Engineering, Generative AI Development, and Full-Stack Software Engineering. I am ready to work remotely or relocate.",
  },

  // =========================================================================
  // 8. CONTACT INFORMATION
  // =========================================================================
  {
    id: "contact.info",
    category: "contact",
    questions: [
      "Contact",
      "Contect",
      "Contact details",
      "Contect details",
      "Contact ke bare me",
      "Contact ke baare me",
      "Contect ke bare me",
      "Contect ke baare me",
      "Contact info",
      "Contect info",
      "Contact number",
      "Contect number",
      "How can I contact you?",
      "What is your email?",
      "What is your phone number?",
      "Contact details kya hain?",
      "Aapko message kaise kare?",
      "Contact kaise kare?",
      "Give me your LinkedIn link",
      "Email ID do",
      "Phone number do",
      "Mobile number do",
      "Call number",
      "How to reach Amit?",
      "Contact me",
    ],
    keywords: [
      { word: "contact", weight: 3 },
      { word: "contect", weight: 3 },
      { word: "email", weight: 3 },
      { word: "phone", weight: 3 },
      { word: "mobile", weight: 3 },
      { word: "number", weight: 2 },
      { word: "linkedin", weight: 3 },
      { word: "reach", weight: 2 },
      { word: "mail", weight: 3 },
      { word: "message", weight: 2 },
      { word: "call", weight: 2 },
    ],
    answer:
      "You can connect with me via:\n• 📧 **Email**: amitsumitjatthap@gmail.com\n• 📱 **Phone**: +91-9685193991\n• 💼 **LinkedIn**: linkedin.com/in/amit-jatthap-3666962a8\n• 🐙 **GitHub**: github.com/amitjatthap2002\n\nOr drop a message right here using the Contact section form!",
  },

  // =========================================================================
  // 9. HOBBIES & PERSONAL INTERESTS
  // =========================================================================
  {
    id: "hobbies.interests",
    category: "hobbies",
    questions: [
      "What are your hobbies?",
      "What do you do in your free time?",
      "Free time me kya karte ho?",
      "Hobbies kya hai?",
      "What books do you read?",
      "Favorite books details",
    ],
    keywords: [
      { word: "hobbies", weight: 3 },
      { word: "free", weight: 2 },
      { word: "time", weight: 2 },
      { word: "books", weight: 3 },
      { word: "reading", weight: 3 },
      { word: "library", weight: 2 },
      { word: "passions", weight: 2 },
    ],
    answer:
      "In my free time, I enjoy reading tech & AI books (like *Designing Data-Intensive Applications* and *Hands-On Machine Learning*), solving algorithm puzzles on LeetCode, exploring open-source AI projects, and building side projects.",
  },

  // =========================================================================
  // 10. GREETINGS & VOICE BOT SPECIFIC
  // =========================================================================
  {
    id: "general.greeting",
    category: "general",
    questions: [
      "Hello",
      "Hi",
      "Hey",
      "Namaste",
      "Kaise ho?",
      "Good morning",
      "Good evening",
      "Greetings",
    ],
    keywords: [
      { word: "hello", weight: 3 },
      { word: "hi", weight: 3 },
      { word: "hey", weight: 3 },
      { word: "namaste", weight: 3 },
      { word: "greetings", weight: 3 },
      { word: "kaise", weight: 2 },
    ],
    answer:
      "Hello there! 👋 I am **Aetheria**, Amit's AI Assistant. I can answer any question about Amit's background, education, skills, projects, certifications, or contact info. How can I help you today?",
  },
  {
    id: "general.identity",
    category: "general",
    questions: [
      "Who built you?",
      "Who created you?",
      "Are you an AI?",
      "Tum kaun ho?",
      "What can you do?",
    ],
    keywords: [
      { word: "built", weight: 3 },
      { word: "created", weight: 3 },
      { word: "aetheria", weight: 3 },
      { word: "assistant", weight: 2 },
      { word: "bot", weight: 2 },
    ],
    answer:
      "I am **Aetheria**, an AI Voice Assistant built by Amit Jatthap using Next.js, Web Speech API, and fuzzy intent-matching engine to help visitors interact with Amit's portfolio!",
  },
  {
    id: "general.thanks",
    category: "general",
    questions: [
      "Thank you",
      "Thanks",
      "Shukriya",
      "Dhanyawad",
      "That was helpful",
      "Great answer",
    ],
    keywords: [
      { word: "thank", weight: 3 },
      { word: "thanks", weight: 3 },
      { word: "shukriya", weight: 3 },
      { word: "dhanyawad", weight: 3 },
      { word: "helpful", weight: 2 },
    ],
    answer:
      "You're very welcome! 😊 Feel free to ask anything else about Amit's work, projects, or how to reach him.",
  }
];

/**
 * Phonetics & Speech-to-Text Misrecognition Mapping Dictionary
 * Normalizes speech recognition errors before matching intent.
 */
export const sttCorrectionMap: Record<string, string> = {
  amrit: "amit",
  ameet: "amit",
  amitt: "amit",
  amita: "amit",
  skil: "skills",
  skils: "skills",
  skill: "skills",
  projedt: "projects",
  projek: "projects",
  projekt: "projects",
  projeck: "projects",
  project: "projects",
  contect: "contact",
  contat: "contact",
  cantact: "contact",
  emai: "email",
  gmail: "email",
  mail: "email",
  edukation: "education",
  edu: "education",
  colllege: "college",
  clg: "college",
  linkdin: "linkedin",
  linkin: "linkedin",
  github: "github",
  git: "github",
  litcode: "leetcode",
  leadcode: "leetcode",
  mca: "mca",
  emca: "mca",
  bsc: "bsc",
  bachelor: "bsc",
  // Hinglish term normalization
  kaun: "who",
  kon: "who",
  kya: "what",
  kyaa: "what",
  kahan: "where",
  kaha: "where",
  rehte: "live",
  padhai: "education",
  batao: "tell",
  btao: "tell",
  bataen: "tell",
  bataiye: "tell",
  dikhao: "show",
  dikhaen: "show",
  banaya: "built",
  karo: "do",
};
