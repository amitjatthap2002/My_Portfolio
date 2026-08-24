/**
 * ============================================================
 * Aetheria Chatbot — Section-wise Q&A Knowledge Base
 * ============================================================
 *
 * STRUCTURE:
 *   - Each entry is a QAEntry with:
 *       • section   : which portfolio section this belongs to
 *       • intent    : a unique intent identifier (used for deduplication)
 *       • questions : list of natural-language question variants
 *       • keywords  : weighted keyword list for similarity scoring
 *                     Format: { word: string, weight: number }
 *                     weight 3 = high importance, 2 = medium, 1 = low
 *       • answer    : the definitive answer string
 *
 * HOW SIMILARITY SEARCH WORKS:
 *   1. Tokenize user query into words.
 *   2. For each QAEntry, compute a score:
 *        score += keyword.weight  if keyword.word appears in query tokens
 *        score += keyword.weight * 0.5 if partial match (for longer words)
 *   3. Pick the entry with the highest score (if score > threshold).
 *   4. If no match, return a fallback response.
 *
 * WHY THIS BEATS SIMPLE KEYWORD MATCHING:
 *   - Weights prevent "skills" accidentally matching "intro" entries.
 *   - Intent tags let you deduplicate future Q&A additions easily.
 *   - Question variants help score more intents per user phrasing.
 *   - Section grouping makes it easy to add/edit topic areas.
 * ============================================================
 */

export type PortfolioSection =
  | "intro"
  | "skills"
  | "projects"
  | "education"
  | "certifications"
  | "contact"
  | "goals"
  | "library"
  | "stats"
  | "general";

export interface WeightedKeyword {
  word: string;
  weight: number; // 3 = critical, 2 = important, 1 = supplementary
}

export interface QAEntry {
  section: PortfolioSection;
  intent: string; // unique e.g. "intro.who_is_amit"
  questions: string[]; // example phrasings for reference
  keywords: WeightedKeyword[];
  answer: string;
}

// ============================================================
// SECTION: intro
// ============================================================
const introQA: QAEntry[] = [
  {
    section: "intro",
    intent: "intro.who_is_amit",
    questions: [
      "Who is Amit?",
      "Tell me about Amit",
      "Introduce yourself",
      "What is your name?",
      "Give me your bio",
    ],
    keywords: [
      { word: "amit", weight: 3 },
      { word: "who", weight: 2 },
      { word: "yourself", weight: 3 },
      { word: "introduce", weight: 3 },
      { word: "introduction", weight: 3 },
      { word: "bio", weight: 3 },
      { word: "profile", weight: 2 },
      { word: "name", weight: 2 },
      { word: "about", weight: 1 },
    ],
    answer:
      "My name is **Amit Jatthap**. I am an AI/ML Developer & Software Engineer passionate about building practical AI systems, agentic workflows, and full-stack applications.\n\nI completed my B.Sc. in Computer Science at Devi Ahilya Vishwavidyalaya and am currently pursuing an MCA in AI/ML at K.R. Mangalam University. My work focuses on machine learning pipelines, explainable AI, LangGraph-based agents, and modern full-stack development.",
  },
  {
    section: "intro",
    intent: "intro.location",
    questions: [
      "Where are you from?",
      "Where do you live?",
      "What is your location?",
      "Which city are you based in?",
    ],
    keywords: [
      { word: "where", weight: 3 },
      { word: "location", weight: 3 },
      { word: "city", weight: 3 },
      { word: "based", weight: 3 },
      { word: "live", weight: 2 },
      { word: "living", weight: 2 },
      { word: "address", weight: 2 },
      { word: "residence", weight: 2 },
      { word: "from", weight: 1 },
    ],
    answer:
      "I am currently based in **Khandwa, Madhya Pradesh, India**. I am open to remote opportunities and relocation for the right AI/ML role.",
  },
  {
    section: "intro",
    intent: "intro.career_goal",
    questions: [
      "What are your career goals?",
      "What is your vision?",
      "What do you want to achieve?",
      "Future plans?",
    ],
    keywords: [
      { word: "goal", weight: 3 },
      { word: "goals", weight: 3 },
      { word: "vision", weight: 3 },
      { word: "future", weight: 2 },
      { word: "aim", weight: 3 },
      { word: "objective", weight: 3 },
      { word: "plan", weight: 2 },
      { word: "achieve", weight: 2 },
      { word: "ambition", weight: 2 },
    ],
    answer:
      "My short-term goal is to **secure an AI/ML internship** and contribute to real-world AI products.\n\nIn the long term, I aim to build AI platforms for India in areas like cybersecurity, education, governance, and cloud infrastructure — eventually creating startup-scale products that solve meaningful problems.",
  },
];

// ============================================================
// SECTION: skills
// ============================================================
const skillsQA: QAEntry[] = [
  {
    section: "skills",
    intent: "skills.overview",
    questions: [
      "What skills do you have?",
      "What technologies do you know?",
      "What is your tech stack?",
      "What are your expertise areas?",
      "What can you do?",
    ],
    keywords: [
      { word: "skills", weight: 3 },
      { word: "skill", weight: 3 },
      { word: "technology", weight: 3 },
      { word: "technologies", weight: 3 },
      { word: "tech", weight: 2 },
      { word: "stack", weight: 3 },
      { word: "know", weight: 2 },
      { word: "expertise", weight: 3 },
      { word: "abilities", weight: 3 },
      { word: "capable", weight: 2 },
      { word: "frameworks", weight: 2 },
    ],
    answer:
      "Here's a breakdown of my skills by category:\n\n🧠 **Core CS Fundamentals**\n- Data Structures & Algorithms (88%)\n- Operating Systems (82%)\n- Database Management System — DBMS (84%)\n- Web Development (86%)\n\n🤖 **AI / ML**\n- Machine Learning (90%), Deep Learning (86%)\n- Generative AI (88%), Agentic AI / LangGraph (85%)\n- Python (90%), Scikit-learn (84%), TensorFlow (80%), PyTorch (78%)\n\n📊 **Data & Analytics**\n- Pandas, NumPy, Matplotlib, Seaborn\n- Power BI (80%), Tableau (78%)\n\n🌐 **Web Development**\n- HTML, CSS, JavaScript, React, Next.js\n- FastAPI, Express.js, REST APIs\n\n🛠️ **Tools**\n- Git, GitHub, VS Code, Docker",
  },
  {
    section: "skills",
    intent: "skills.aiml",
    questions: [
      "What AI/ML skills do you have?",
      "Do you know machine learning?",
      "What about deep learning?",
      "Tell me about your AI expertise",
    ],
    keywords: [
      { word: "machine learning", weight: 3 },
      { word: "deep learning", weight: 3 },
      { word: "artificial intelligence", weight: 3 },
      { word: "python", weight: 2 },
      { word: "tensorflow", weight: 3 },
      { word: "pytorch", weight: 3 },
      { word: "scikit", weight: 3 },
      { word: "ml", weight: 2 },
      { word: "ai", weight: 2 },
      { word: "agentic", weight: 3 },
      { word: "langgraph", weight: 3 },
      { word: "genai", weight: 3 },
    ],
    answer:
      "My core AI/ML skills include:\n\n🤖 **Machine Learning** — Scikit-learn, XGBoost, Random Forest, feature engineering, SHAP explainability (level: 90%)\n🧠 **Deep Learning** — TensorFlow, PyTorch (level: 86%)\n⚡ **Generative AI** — Prompt engineering, LLM workflows (level: 88%)\n🔗 **Agentic AI** — LangGraph, LangChain, multi-agent pipelines (level: 85%)\n🐍 **Python** — Primary language for all AI/ML work (level: 90%)",
  },
  {
    section: "skills",
    intent: "skills.webdev",
    questions: [
      "What web development skills do you have?",
      "Do you know React or Next.js?",
      "Frontend or backend development?",
    ],
    keywords: [
      { word: "web", weight: 3 },
      { word: "frontend", weight: 3 },
      { word: "backend", weight: 3 },
      { word: "react", weight: 3 },
      { word: "nextjs", weight: 3 },
      { word: "next", weight: 2 },
      { word: "fastapi", weight: 3 },
      { word: "express", weight: 3 },
      { word: "html", weight: 2 },
      { word: "css", weight: 2 },
      { word: "javascript", weight: 3 },
      { word: "typescript", weight: 3 },
      { word: "api", weight: 2 },
    ],
    answer:
      "My web development skills include:\n\n**Frontend:** HTML, CSS, JavaScript, TypeScript, React, Next.js\n**Backend:** FastAPI (Python), Express.js (Node.js), REST APIs\n**Database:** PostgreSQL\n**Tools:** Git, GitHub, Docker\n\nI build full-stack AI-integrated applications combining Python backends with modern React/Next.js frontends.",
  },
];

// ============================================================
// SECTION: projects
// ============================================================
const projectsQA: QAEntry[] = [
  {
    section: "projects",
    intent: "projects.overview",
    questions: [
      "What projects have you built?",
      "Show me your work",
      "What have you made?",
      "Portfolio projects",
    ],
    keywords: [
      { word: "project", weight: 3 },
      { word: "projects", weight: 3 },
      { word: "portfolio", weight: 2 },
      { word: "built", weight: 2 },
      { word: "build", weight: 2 },
      { word: "work", weight: 2 },
      { word: "made", weight: 2 },
      { word: "apps", weight: 2 },
      { word: "applications", weight: 2 },
    ],
    answer:
      "I have built **3 major AI projects**:\n\n1. 🌿 **EcoMatch** — AI-Powered Waste Exchange Platform\n   LangGraph multi-agent system with FastAPI & PostgreSQL for sustainable waste matching.\n\n2. 🧠 **ASIE** — Adaptive Skill Intelligence Engine\n   ML system using XGBoost + Prophet for future skill demand forecasting with SHAP explainability.\n\n3. 🛡️ **AI Malware Detection System**\n   End-to-end ML pipeline using Scikit-learn, feature engineering & SHAP for malware classification.\n\nCheck out the Projects section for detailed architecture, features, and GitHub links!",
  },
  {
    section: "projects",
    intent: "projects.ecomatch",
    questions: [
      "Tell me about EcoMatch",
      "What is EcoMatch?",
      "Explain the waste exchange project",
    ],
    keywords: [
      { word: "ecomatch", weight: 3 },
      { word: "eco", weight: 2 },
      { word: "waste", weight: 3 },
      { word: "exchange", weight: 2 },
      { word: "langgraph", weight: 2 },
      { word: "agents", weight: 2 },
    ],
    answer:
      "**EcoMatch** is an AI-Powered Waste Exchange Platform.\n\n🌿 **What it does:** Multiple AI agents collaborate to classify waste, discover compatible businesses, generate proposals, and estimate environmental impact.\n\n**Tech Stack:** LangGraph, FastAPI, PostgreSQL, Python, Express.js\n\n**Key Features:**\n- LangGraph-based multi-agent collaboration\n- Confidence scoring and autonomous decision pipelines\n- Explainable AI workflows for waste classification\n- FastAPI + Express.js microservices",
  },
  {
    section: "projects",
    intent: "projects.asie",
    questions: [
      "Tell me about ASIE",
      "What is the skill forecasting project?",
      "Adaptive Skill Intelligence Engine",
    ],
    keywords: [
      { word: "asie", weight: 3 },
      { word: "skill forecasting", weight: 3 },
      { word: "adaptive", weight: 2 },
      { word: "intelligence engine", weight: 3 },
      { word: "forecasting", weight: 2 },
      { word: "xgboost", weight: 3 },
      { word: "prophet", weight: 2 },
    ],
    answer:
      "**ASIE** — Adaptive Skill Intelligence Engine\n\n🧠 **What it does:** Predicts future high-demand skills over the next 3–5 years using machine learning and NLP.\n\n**Tech Stack:** Python, FastAPI, React, XGBoost, spaCy, NetworkX\n\n**Key Features:**\n- Skill forecasting using XGBoost, Prophet, and Holt-Winters\n- NLP-based skill extraction using spaCy\n- SHAP-based explainability\n- Knowledge graph generation using NetworkX",
  },
  {
    section: "projects",
    intent: "projects.malware",
    questions: [
      "Tell me about the malware detection project",
      "AI malware detection system",
      "What is the cybersecurity project?",
    ],
    keywords: [
      { word: "malware", weight: 3 },
      { word: "detection", weight: 2 },
      { word: "cybersecurity", weight: 3 },
      { word: "security", weight: 2 },
      { word: "shap", weight: 2 },
      { word: "random forest", weight: 3 },
      { word: "classification", weight: 2 },
    ],
    answer:
      "**AI Malware Detection System**\n\n🛡️ **What it does:** An end-to-end malware detection pipeline using ML for classification and interpretability.\n\n**Tech Stack:** Python, Scikit-learn, SHAP, Machine Learning\n\n**Key Features:**\n- Feature engineering and selection\n- Model comparison and hyperparameter tuning with GridSearchCV\n- Precision, Recall, F1-score, and AUC-ROC evaluation\n- SHAP explainability for model insight",
  },
];

// ============================================================
// SECTION: education
// ============================================================
const educationQA: QAEntry[] = [
  {
    section: "education",
    intent: "education.overview",
    questions: [
      "What is your experience?",
      "Tell me about your education",
      "Where did you study?",
      "What is your work history?",
      "Career background?",
    ],
    keywords: [
      { word: "experience", weight: 3 },
      { word: "education", weight: 3 },
      { word: "university", weight: 3 },
      { word: "college", weight: 3 },
      { word: "degree", weight: 3 },
      { word: "study", weight: 2 },
      { word: "studying", weight: 2 },
      { word: "career", weight: 2 },
      { word: "background", weight: 2 },
      { word: "internship", weight: 2 },
      { word: "jobs", weight: 2 },
    ],
    answer:
      "📚 **Education Timeline:**\n\n🎓 **B.Sc. Computer Science** — Devi Ahilya Vishwavidyalaya (Aug 2021 – Mar 2024)\n- CGPA: 6.9\n- Built strong foundation in programming, DSA, Operating Systems, and Database Systems\n\n🎓 **MCA (AI/ML)** — K.R. Mangalam University (Sep 2025 – Jun 2027)\n- Current SGPA: 8.31\n- Specializing in Machine Learning, Deep Learning, and Generative AI\n\nI am actively seeking an **AI/ML or GenAI internship** to contribute to real-world products.",
  },
  {
    section: "education",
    intent: "education.mca",
    questions: [
      "Tell me about your MCA",
      "K.R. Mangalam University",
      "Current studies?",
    ],
    keywords: [
      { word: "mca", weight: 3 },
      { word: "mangalam", weight: 3 },
      { word: "masters", weight: 2 },
      { word: "current", weight: 2 },
      { word: "pursuing", weight: 2 },
      { word: "sgpa", weight: 3 },
    ],
    answer:
      "I am currently pursuing **MCA in AI/ML** at **K.R. Mangalam University** (Sep 2025 – Jun 2027).\n\n- Current SGPA: **8.31**\n- Focus: Machine Learning, Deep Learning, Generative AI, Agentic AI\n- Building hands-on projects alongside coursework",
  },
];

// ============================================================
// SECTION: certifications
// ============================================================
const certificationsQA: QAEntry[] = [
  {
    section: "certifications",
    intent: "certifications.overview",
    questions: [
      "What certifications do you have?",
      "Are you certified?",
      "Show me your certificates",
      "What courses have you completed?",
    ],
    keywords: [
      { word: "certification", weight: 3 },
      { word: "certifications", weight: 3 },
      { word: "certificate", weight: 3 },
      { word: "certificates", weight: 3 },
      { word: "certified", weight: 3 },
      { word: "courses", weight: 2 },
      { word: "course", weight: 2 },
      { word: "credential", weight: 2 },
    ],
    answer:
      "I hold **3 certifications** in the tech and AI field:\n\n🏆 **Power BI for Beginners** — Simplilearn (2025)\n🏆 **Machine Learning with Python** — IBM (2025)\n🏆 **Generative AI** — OutSkills (2025)\n\nCheck the Certifications section on the portfolio for verification links!",
  },
];

// ============================================================
// SECTION: contact
// ============================================================
const contactQA: QAEntry[] = [
  {
    section: "contact",
    intent: "contact.how_to_reach",
    questions: [
      "How can I contact you?",
      "What is your email?",
      "Can I hire you?",
      "How to reach you?",
    ],
    keywords: [
      { word: "contact", weight: 3 },
      { word: "email", weight: 3 },
      { word: "phone", weight: 3 },
      { word: "linkedin", weight: 3 },
      { word: "github", weight: 2 },
      { word: "hire", weight: 3 },
      { word: "reach", weight: 3 },
      { word: "message", weight: 2 },
      { word: "call", weight: 2 },
      { word: "talk", weight: 2 },
    ],
    answer:
      "You can reach me at:\n\n📧 **Email:** amitsumitjatthap@gmail.com\n📞 **Phone:** +91-9685193991\n💼 **GitHub:** https://github.com/amitjatthap2002\n🔗 **LinkedIn:** https://www.linkedin.com/in/amit-jatthap-3666962a8/\n\nFeel free to use the **Contact form** on the portfolio to send a message directly!",
  },
];

// ============================================================
// SECTION: library
// ============================================================
const libraryQA: QAEntry[] = [
  {
    section: "library",
    intent: "library.overview",
    questions: [
      "What resources do you recommend?",
      "What books do you read?",
      "Knowledge library?",
      "Research papers?",
    ],
    keywords: [
      { word: "library", weight: 3 },
      { word: "resource", weight: 3 },
      { word: "resources", weight: 3 },
      { word: "books", weight: 3 },
      { word: "book", weight: 3 },
      { word: "reading", weight: 2 },
      { word: "knowledge", weight: 2 },
      { word: "research", weight: 2 },
      { word: "paper", weight: 2 },
      { word: "blog", weight: 2 },
      { word: "articles", weight: 2 },
    ],
    answer:
      "Here are the books I love and highly recommend:\n\n📚 **Bhagavad Gita** (5★)\nA timeless spiritual guide offering deep psychological insights into duty, mind control, and inner peace.\n\n📚 **The Psychology of Money** (5★)\nShows how behavior — not intelligence — drives financial success.\n\n📚 **The Power of Habit** (5★)\nExplores the science behind why habits exist and how to rewire them for better productivity.\n\nCheck out the Library section on the portfolio for more!",
  },
];

// ============================================================
// SECTION: stats
// ============================================================
const statsQA: QAEntry[] = [
  {
    section: "stats",
    intent: "stats.leetcode",
    questions: [
      "What is your LeetCode rating?",
      "LeetCode stats?",
      "How many problems have you solved?",
      "Competitive programming?",
    ],
    keywords: [
      { word: "leetcode", weight: 3 },
      { word: "competitive", weight: 2 },
      { word: "problems", weight: 2 },
      { word: "solved", weight: 2 },
      { word: "rating", weight: 2 },
      { word: "rank", weight: 2 },
      { word: "dsa", weight: 2 },
      { word: "contest", weight: 2 },
    ],
    answer:
      "📊 **LeetCode Stats:**\n\n- **Total Solved:** 486 / 3100\n- **Easy:** 182/800 | **Medium:** 245/1600 | **Hard:** 59/700\n- **Contest Rating:** 1842\n- **Global Rank:** Top 4.2%",
  },
  {
    section: "stats",
    intent: "stats.github",
    questions: [
      "What is your GitHub profile like?",
      "GitHub stats?",
      "Open source contributions?",
    ],
    keywords: [
      { word: "github", weight: 3 },
      { word: "stars", weight: 2 },
      { word: "repositories", weight: 2 },
      { word: "repos", weight: 2 },
      { word: "followers", weight: 2 },
      { word: "open source", weight: 2 },
      { word: "commits", weight: 2 },
    ],
    answer:
      "💻 **GitHub Stats:**\n\n- ⭐ **Stars:** 124\n- 👥 **Followers:** 86\n- 📦 **Repositories:** 42\n\n**Top Languages:**\n- TypeScript (48%) | Python (32%) | JavaScript (12%) | GLSL (8%)\n\nVisit: https://github.com/amitjatthap2002",
  },
];

// ============================================================
// SECTION: general (greetings, misc)
// ============================================================
const generalQA: QAEntry[] = [
  {
    section: "general",
    intent: "general.greeting",
    questions: ["Hi", "Hello", "Hey", "Namaste", "Good morning"],
    keywords: [
      { word: "hi", weight: 3 },
      { word: "hello", weight: 3 },
      { word: "hey", weight: 3 },
      { word: "greetings", weight: 3 },
      { word: "namaste", weight: 3 },
      { word: "howdy", weight: 2 },
    ],
    answer:
      "Hello there! 👋 I'm **Aetheria**, Amit's AI Assistant.\n\nAsk me anything about his skills, projects, education, certifications, or how to get in touch!",
  },
  {
    section: "general",
    intent: "general.thanks",
    questions: ["Thank you", "Thanks", "That was helpful"],
    keywords: [
      { word: "thank", weight: 3 },
      { word: "thanks", weight: 3 },
      { word: "helpful", weight: 2 },
    ],
    answer:
      "You're welcome! 😊 Feel free to ask anything else about Amit's work, skills, or how to reach him!",
  },
];

// ============================================================
// MASTER KNOWLEDGE BASE — Export
// ============================================================
export const chatbotKnowledgeBase: QAEntry[] = [
  ...introQA,
  ...skillsQA,
  ...projectsQA,
  ...educationQA,
  ...certificationsQA,
  ...contactQA,
  ...libraryQA,
  ...statsQA,
  ...generalQA,
];

// ============================================================
// SIMILARITY SEARCH ENGINE
// ============================================================

/**
 * findBestAnswer()
 * Runs similarity search over the knowledge base.
 *
 * Algorithm:
 *  1. Normalize + tokenize user query
 *  2. For each QAEntry:
 *       - Exact token match  → +weight
 *       - Partial match (word.len > 4) → +weight * 0.5
 *       - Multi-word phrase in full query → +weight * 1.5 (bonus)
 *  3. Return the answer of the highest-scoring entry if score > threshold.
 *
 * @param query - raw user input string
 * @param threshold - minimum score to accept a match (default: 2)
 * @returns best-matching answer string or null if no match found
 */
export function findBestAnswer(query: string, threshold = 2): string | null {
  const normalized = query.toLowerCase().replace(/[^a-z0-9\s]/gi, "").trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);

  let bestScore = 0;
  let bestAnswer: string | null = null;
  let bestIntent = "";

  for (const entry of chatbotKnowledgeBase) {
    let score = 0;

    for (const kw of entry.keywords) {
      const kwLower = kw.word.toLowerCase();

      if (kwLower.includes(" ")) {
        // Multi-word phrase: check in full normalized query
        if (normalized.includes(kwLower)) {
          score += kw.weight * 1.5; // bonus for phrase match
        }
      } else {
        // Single word: exact token match
        if (tokens.includes(kwLower)) {
          score += kw.weight;
        }
        // Partial match only for words longer than 4 chars
        else if (
          kwLower.length > 4 &&
          tokens.some((t) => t.includes(kwLower) || kwLower.includes(t))
        ) {
          score += kw.weight * 0.5;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
      bestIntent = entry.intent;
    }
  }

  // Debug log (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Aetheria] Best match: "${bestIntent}" | Score: ${bestScore.toFixed(2)}`
    );
  }

  return bestScore >= threshold ? bestAnswer : null;
}

/**
 * FALLBACK RESPONSE
 * Used when no entry scores above the threshold.
 */
export const FALLBACK_RESPONSE =
  "I couldn't find a precise match in Amit's profile database. Try asking about his:\n• **Skills** (AI/ML, web dev)\n• **Projects** (EcoMatch, ASIE, Malware Detection)\n• **Education** (MCA, B.Sc.)\n• **Certifications**\n• **Contact** (email, LinkedIn)\n• **LeetCode / GitHub stats**";
