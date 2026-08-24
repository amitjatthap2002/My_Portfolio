/**
 * =============================================================
 *  mySection.ts — Amit Jatthap's Portfolio: Master Section File
 * =============================================================
 *
 *  PURPOSE:
 *    This is the single source of truth for the AI assistant
 *    (Aetheria) to answer any question about any portfolio section.
 *
 *  STRUCTURE:
 *    Each SectionEntry has:
 *      • id          : unique section identifier
 *      • title       : human-readable section name
 *      • content     : the authoritative factual content block
 *      • questions   : diverse/creative question phrasings a user might ask
 *                      (more variety = better intent coverage)
 *      • keywords    : weighted keywords for similarity scoring
 *      • answer      : the formatted chatbot answer string
 *
 *  HOW TO UPDATE:
 *    - To edit an answer  → update the `answer` field in that section
 *    - To add a new question → append to `questions[]`
 *    - To add a new section → add a new SectionEntry at the bottom
 *    - To tune matching    → adjust keyword weights (3=critical,2=important,1=minor)
 *
 *  FUTURE USE:
 *    chatbotQA.ts → imports and uses findBestSectionAnswer() from this file
 * =============================================================
 */

export interface WeightedKW {
  word: string;
  weight: number;
}

export interface SectionEntry {
  id: string;
  title: string;
  /** Raw factual content visible in the portfolio section */
  content: string;
  /** Creative, diverse, random question phrasings to cover intent */
  questions: string[];
  /** Weighted keywords for similarity scoring */
  keywords: WeightedKW[];
  /** Formatted chatbot answer */
  answer: string;
}

// =============================================================
// 1. HERO / HOME SECTION
// =============================================================
export const heroSection: SectionEntry = {
  id: "hero",
  title: "Hero / Home",
  content: `
    Name: Amit Jatthap
    Title: AI/ML Developer & Software Engineer
    Tagline: Building practical AI systems, agentic workflows, and full-stack applications with real-world impact.
    Roles (typewriter): Full Stack Engineer | AI/ML Developer | System Architect
    Status: Available for full-time opportunities
    Socials: GitHub, LinkedIn, LeetCode, Email
    CTA Buttons: View Projects | Download Resume | Contact
  `,
  questions: [
    "Who are you?",
    "What do you do?",
    "Introduce yourself briefly",
    "Give me a quick intro",
    "What is your tagline?",
    "Are you available for work?",
    "Are you open to job opportunities?",
    "Tell me about yourself in one line",
    "What roles are you applying for?",
    "What is your main role or title?",
    "What kind of engineer are you?",
    "In a nutshell, who is Amit?",
    "Summarize your profile",
    "What does Amit build?",
    "Pitch yourself to me",
  ],
  keywords: [
    { word: "who", weight: 2 },
    { word: "amit", weight: 3 },
    { word: "yourself", weight: 3 },
    { word: "introduce", weight: 3 },
    { word: "introduction", weight: 3 },
    { word: "intro", weight: 3 },
    { word: "bio", weight: 3 },
    { word: "name", weight: 2 },
    { word: "tagline", weight: 3 },
    { word: "title", weight: 2 },
    { word: "available", weight: 2 },
    { word: "role", weight: 2 },
    { word: "profile", weight: 2 },
    { word: "pitch", weight: 2 },
    { word: "summary", weight: 2 },
    { word: "overview", weight: 2 },
  ],
  answer: `👋 Hi! I'm **Amit Jatthap** — an AI/ML Developer & Software Engineer.

I build practical AI systems, agentic workflows, and full-stack applications that create real-world impact.

**What I do:**
- 🤖 AI/ML pipelines, LangGraph agents, GenAI systems
- 🌐 Full-stack apps (React / Next.js + FastAPI)
- 📊 Data science & explainable AI

I'm currently pursuing **MCA in AI/ML** at K.R. Mangalam University and am **available for full-time opportunities**!`,
};

// =============================================================
// 2. ABOUT SECTION
// =============================================================
export const aboutSection: SectionEntry = {
  id: "about",
  title: "About Me",
  content: `
    Bio: Computer Science graduate focused on AI/ML, generative AI, agentic systems, and web development.
    Journey: B.Sc. Computer Science at DAVV → MCA AI/ML at K.R. Mangalam University.
    Career Goal: Build intelligent, explainable, scalable AI products.
    Stats: 2+ Years Coding | 4+ Projects | 16+ Tech Stack Skills | 3 Certifications
    Education Timeline:
      - 2020–2024: B.Sc. Computer Science — DAVV (Devi Ahilya Vishwavidyalaya)
      - 2025–2027: MCA AI/ML — K.R. Mangalam University (SGPA: 8.31)
  `,
  questions: [
    "Tell me about yourself",
    "What is your background?",
    "How did you start coding?",
    "What is your story?",
    "Give me your full bio",
    "What motivates you?",
    "What is your career vision?",
    "What are your stats?",
    "How many years of experience?",
    "How many projects have you done?",
    "What drives you as a developer?",
    "Why did you choose AI/ML?",
    "Describe your journey",
    "What is your educational background?",
    "What is Amit's story in life so far?",
  ],
  keywords: [
    { word: "about", weight: 3 },
    { word: "background", weight: 3 },
    { word: "story", weight: 3 },
    { word: "journey", weight: 3 },
    { word: "bio", weight: 3 },
    { word: "motivat", weight: 2 },
    { word: "vision", weight: 2 },
    { word: "stats", weight: 2 },
    { word: "years", weight: 2 },
    { word: "experience", weight: 2 },
    { word: "drive", weight: 2 },
    { word: "why", weight: 1 },
    { word: "chose", weight: 2 },
    { word: "career", weight: 2 },
    { word: "myself", weight: 3 },
  ],
  answer: `I'm **Amit Jatthap**, a Computer Science graduate focused on AI/ML, generative AI, agentic systems, and web development.

📖 **My Journey:**
I completed my **B.Sc. in Computer Science** at Devi Ahilya Vishwavidyalaya (DAVV) and am now pursuing an **MCA in AI/ML** at K.R. Mangalam University (SGPA: 8.31).

🎯 **Career Vision:**
To build intelligent, explainable, and scalable AI products that solve real-world problems and create meaningful business impact.

📊 **Quick Stats:**
- ⚡ 2+ Years Coding
- 📦 4+ Projects Completed
- 🛠️ 16+ Technologies
- 🏆 3 Certifications`,
};

// =============================================================
// 3. SKILLS SECTION
// =============================================================
export const skillsSection: SectionEntry = {
  id: "skills",
  title: "Skills & Tech Galaxy",
  content: `
    Section label: 02 / CORE CAPABILITIES
    Galaxy Orbit Skills: Gen AI (95%), RAG (90%), Agentic AI (85%), Deep Learning (88%), Machine Learning (92%)
    
    Categories:
    Core Skills: DSA (88%), OS (82%), DBMS (84%), Web Dev (86%)
    AI/ML: Machine Learning (90%), Deep Learning (86%), Gen AI (88%), Agentic AI (85%), Python (90%), Scikit-learn (84%), TensorFlow (80%), PyTorch (78%)
    Data & Analytics: Pandas (86%), NumPy (84%), Matplotlib (80%), Seaborn (78%), Power BI (80%), Tableau (78%)
    Tools: Git (84%), GitHub (88%), VS Code (92%), IntelliJ IDEA (80%), Docker (74%)
  `,
  questions: [
    "What skills do you have?",
    "What can you build?",
    "What technologies do you know?",
    "What is your tech stack?",
    "Show me your tech galaxy",
    "What are your strongest skills?",
    "What programming languages do you know?",
    "Do you know Python?",
    "Do you know machine learning?",
    "What AI tools are you proficient in?",
    "What frameworks do you use?",
    "Are you good at data science?",
    "What tools are in your arsenal?",
    "What are you capable of building?",
    "Rate your technical abilities",
    "What are your core competencies?",
    "What is your best skill?",
    "Do you know LangGraph?",
    "Can you work with Docker?",
    "Tell me about your frontend skills",
    "Tell me about your backend skills",
  ],
  keywords: [
    { word: "skills", weight: 3 },
    { word: "skill", weight: 3 },
    { word: "tech", weight: 2 },
    { word: "technology", weight: 3 },
    { word: "technologies", weight: 3 },
    { word: "stack", weight: 3 },
    { word: "know", weight: 2 },
    { word: "expertise", weight: 3 },
    { word: "abilities", weight: 3 },
    { word: "frameworks", weight: 2 },
    { word: "python", weight: 3 },
    { word: "machine learning", weight: 3 },
    { word: "deep learning", weight: 3 },
    { word: "pytorch", weight: 3 },
    { word: "tensorflow", weight: 3 },
    { word: "langgraph", weight: 3 },
    { word: "docker", weight: 3 },
    { word: "capable", weight: 2 },
    { word: "build", weight: 2 },
    { word: "frontend", weight: 3 },
    { word: "backend", weight: 3 },
    { word: "galaxy", weight: 3 },
    { word: "proficient", weight: 2 },
    { word: "competencies", weight: 2 },
    { word: "data science", weight: 3 },
  ],
  answer: `Here's my full skill set across every category:

🧠 **Core CS Fundamentals**
- Data Structures & Algorithms — 88%
- Operating Systems — 82%
- DBMS — 84%
- Web Development — 86%

🤖 **AI / ML (My Strongest Zone)**
- Machine Learning — 90% | Deep Learning — 86%
- Generative AI — 88% | Agentic AI (LangGraph) — 85%
- Python — 90% | Scikit-learn — 84%
- TensorFlow — 80% | PyTorch — 78%

📊 **Data & Analytics**
- Pandas — 86% | NumPy — 84%
- Matplotlib — 80% | Seaborn — 78%
- Power BI — 80% | Tableau — 78%

🌐 **Web Development**
- React, Next.js, HTML, CSS, JavaScript, TypeScript
- FastAPI, Express.js, REST APIs, PostgreSQL

🛠️ **DevTools**
- Git — 84% | GitHub — 88% | VS Code — 92% | Docker — 74%`,
};

// =============================================================
// 4. PROJECTS SECTION
// =============================================================
export const projectsSection: SectionEntry = {
  id: "projects",
  title: "Projects",
  content: `
    Section label: 03 / WORK LOG
    
    Projects:
    1. EcoMatch (active)
       Tagline: AI-Powered Waste Exchange Platform
       Tech: LangGraph, FastAPI, PostgreSQL, Python, Express.js
       Features: Multi-agent collaboration, confidence scoring, explainable AI workflows, microservices
       Architecture: LangGraph Agents → FastAPI Services → Express.js Gateway → PostgreSQL
    
    2. ASIE - Adaptive Skill Intelligence Engine (completed)
       Tagline: Future Skill Demand Forecasting
       Tech: Python, FastAPI, React, XGBoost, spaCy, NetworkX
       Features: Skill forecasting (XGBoost+Prophet+Holt-Winters), NLP extraction (spaCy), SHAP, knowledge graph
       Architecture: React Frontend → FastAPI Backend → ML Engine → Docker
    
    3. AI Malware Detection System (completed)
       Tagline: ML Pipeline for Malware Classification
       Tech: Python, Scikit-learn, SHAP, Machine Learning
       Features: Feature engineering, GridSearchCV, Precision/Recall/F1/AUC-ROC, SHAP explainability
       Architecture: Python Pipeline → Scikit-learn Model → SHAP Explainability → Metrics
  `,
  questions: [
    "What projects have you built?",
    "Show me your work",
    "What have you created?",
    "Tell me about your portfolio projects",
    "What AI projects have you done?",
    "Give me a project overview",
    "What are you most proud of building?",
    "What is EcoMatch?",
    "Tell me about ASIE",
    "What is the malware detection project?",
    "Have you built anything with LangGraph?",
    "Do you have any live projects?",
    "What problem does EcoMatch solve?",
    "How does ASIE work?",
    "What is your most complex project?",
    "Can you walk me through your projects?",
    "What have you shipped?",
    "What apps have you developed?",
    "Tell me about your AI projects",
    "Which project used XGBoost?",
    "Which project used SHAP?",
  ],
  keywords: [
    { word: "project", weight: 3 },
    { word: "projects", weight: 3 },
    { word: "built", weight: 2 },
    { word: "build", weight: 2 },
    { word: "work", weight: 2 },
    { word: "made", weight: 2 },
    { word: "apps", weight: 2 },
    { word: "created", weight: 2 },
    { word: "shipped", weight: 2 },
    { word: "ecomatch", weight: 3 },
    { word: "asie", weight: 3 },
    { word: "malware", weight: 3 },
    { word: "langgraph", weight: 2 },
    { word: "xgboost", weight: 3 },
    { word: "shap", weight: 3 },
    { word: "waste", weight: 2 },
    { word: "portfolio", weight: 2 },
    { word: "proud", weight: 2 },
    { word: "live", weight: 2 },
    { word: "complex", weight: 2 },
    { word: "developed", weight: 2 },
  ],
  answer: `I have built **3 major AI projects**:

---
🌿 **1. EcoMatch** *(Active)*
> AI-Powered Waste Exchange Platform
- Multiple AI agents classify waste, match businesses & estimate environmental impact
- **Stack:** LangGraph, FastAPI, PostgreSQL, Python, Express.js
- Features: Multi-agent pipelines, confidence scoring, explainable AI

---
🧠 **2. ASIE** *(Completed)*
> Adaptive Skill Intelligence Engine
- Predicts future high-demand skills over next 3–5 years using ML + NLP
- **Stack:** Python, FastAPI, React, XGBoost, spaCy, NetworkX
- Features: Skill forecasting, SHAP explainability, knowledge graph

---
🛡️ **3. AI Malware Detection System** *(Completed)*
> ML Pipeline for Malware Classification
- End-to-end malware detection with feature engineering & explainability
- **Stack:** Python, Scikit-learn, SHAP
- Features: GridSearchCV tuning, F1/AUC-ROC evaluation, SHAP insights

Check the **Projects** section for GitHub links & detailed architecture!`,
};

// =============================================================
// 5. EDUCATION SECTION
// =============================================================
export const educationSection: SectionEntry = {
  id: "education",
  title: "Education",
  content: `
    Section label: 04 / HISTORY
    
    1. Devi Ahilya Vishwavidyalaya (DAVV)
       Position: B.Sc. Computer Science
       Duration: Aug 2021 – Mar 2024
       Work done: Completed B.Sc. with CGPA 6.9. Built foundation in programming, DSA, OS, DBMS.
       Skills: Computer Science, DBMS, Algorithms, Operating Systems
    
    2. K.R. Mangalam University
       Position: MCA (AI/ML)
       Duration: Sep 2025 – Jun 2027
       Work done: Pursuing MCA with focus on AI/ML. SGPA: 8.31. Developing expertise in ML, DL, GenAI, Agentic AI.
       Skills: AI/ML, Deep Learning, Gen AI, Agentic AI
    
    Seeking: AI/ML or GenAI internship
  `,
  questions: [
    "What is your educational background?",
    "Where did you study?",
    "Tell me about your education",
    "What is your degree?",
    "What university did you go to?",
    "What is your CGPA or SGPA?",
    "Are you still studying?",
    "What is your academic history?",
    "What college did Amit attend?",
    "When did you graduate?",
    "Tell me about your MCA",
    "Tell me about your BSc",
    "What did you study in college?",
    "Do you have work experience?",
    "Have you done any internships?",
    "What is your work history?",
    "What job have you held?",
    "Are you a fresher?",
    "What is your qualification?",
    "What year are you in right now?",
    "How long have you been studying AI?",
  ],
  keywords: [
    { word: "education", weight: 3 },
    { word: "experience", weight: 3 },
    { word: "university", weight: 3 },
    { word: "college", weight: 3 },
    { word: "degree", weight: 3 },
    { word: "study", weight: 2 },
    { word: "studying", weight: 2 },
    { word: "mca", weight: 3 },
    { word: "bsc", weight: 3 },
    { word: "cgpa", weight: 3 },
    { word: "sgpa", weight: 3 },
    { word: "qualification", weight: 3 },
    { word: "internship", weight: 2 },
    { word: "graduate", weight: 2 },
    { word: "fresher", weight: 2 },
    { word: "academic", weight: 2 },
    { word: "history", weight: 2 },
    { word: "mangalam", weight: 3 },
    { word: "davv", weight: 3 },
    { word: "job", weight: 2 },
    { word: "work history", weight: 3 },
  ],
  answer: `📚 **Education & Experience:**

🎓 **B.Sc. Computer Science** — Devi Ahilya Vishwavidyalaya (DAVV)
- Duration: Aug 2021 – Mar 2024
- CGPA: **6.9**
- Foundation: Programming, DSA, Operating Systems, DBMS

🎓 **MCA (AI/ML)** — K.R. Mangalam University
- Duration: Sep 2025 – Jun 2027 *(Currently Pursuing)*
- SGPA: **8.31**
- Specialization: Machine Learning, Deep Learning, Generative AI, Agentic AI

🔍 **Currently Seeking:** An AI/ML or GenAI internship to contribute to real-world products and grow in a professional environment.`,
};

// =============================================================
// 6. CERTIFICATIONS SECTION
// =============================================================
export const certificationsSection: SectionEntry = {
  id: "certifications",
  title: "Certifications",
  content: `
    Section label: 04 / VERIFIED EXPERTISE
    Description: Credentials reflecting focus on full-stack development, AI systems, and production-grade delivery.
    
    Certifications:
    1. Power BI for Beginners — Simplilearn (2025)
    2. Machine Learning with Python — IBM (2025)
    3. Generative AI — OutSkills (2025)
  `,
  questions: [
    "What certifications do you have?",
    "Are you certified in anything?",
    "What credentials do you hold?",
    "Show me your certificates",
    "Do you have any IBM certifications?",
    "Have you done any online courses?",
    "Are you certified in machine learning?",
    "What badges or credentials do you have?",
    "Tell me about your Power BI certification",
    "Do you have a Generative AI certificate?",
    "What verified credentials do you have?",
    "Which organizations certified you?",
    "Are your certifications recent?",
    "What training have you completed?",
    "Do you have any Simplilearn certifications?",
  ],
  keywords: [
    { word: "certification", weight: 3 },
    { word: "certifications", weight: 3 },
    { word: "certificate", weight: 3 },
    { word: "certified", weight: 3 },
    { word: "credential", weight: 3 },
    { word: "courses", weight: 2 },
    { word: "ibm", weight: 3 },
    { word: "simplilearn", weight: 3 },
    { word: "outskills", weight: 3 },
    { word: "power bi", weight: 3 },
    { word: "badge", weight: 2 },
    { word: "training", weight: 2 },
    { word: "course", weight: 2 },
    { word: "verified", weight: 2 },
    { word: "credential", weight: 2 },
  ],
  answer: `I hold **3 verified certifications**:

🏆 **Power BI for Beginners**
- Organization: Simplilearn | Year: 2025

🏆 **Machine Learning with Python**
- Organization: IBM | Year: 2025

🏆 **Generative AI**
- Organization: OutSkills | Year: 2025

All credentials focus on modern AI systems and data-driven development. Visit the **Certifications** section on the portfolio to verify each one!`,
};

// =============================================================
// 7. LIBRARY / RESOURCES SECTION — BOOKS ONLY
// =============================================================
export const librarySection: SectionEntry = {
  id: "library",
  title: "My Knowledge Library",
  content: `
    Section label: 05 / REPOSITORY
    Quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one." — George R.R. Martin
    
    Books in Library:
    1. Bhagavad Gita — Rating: 5/5
       Review: A timeless spiritual guide offering deep psychological insights into duty, mind control, and inner peace.
    
    2. The Psychology of Money — Rating: 5/5
       Review: A fascinating look into how our minds and emotions drive financial decisions. Doing well with money is less about intelligence and more about behavior.
    
    3. The Power of Habit — Rating: 5/5
       Review: Explores the science behind why habits exist and how they can be changed. Understanding habits is the first step to rewiring your brain for productivity.
  `,
  questions: [
    "What books do you read?",
    "Tell me about your library",
    "Which books do you recommend?",
    "What is in your knowledge library?",
    "What are your favourite books?",
    "What books have you loved?",
    "Recommend me a book",
    "Which book changed your life?",
    "Do you read books?",
    "What books has Amit read?",
    "Tell me about your favourite books",
    "What is the best book you have read?",
    "Give me a book recommendation",
    "Any good books to suggest?",
    "Which books are rated 5 stars by you?",
    "What does Amit read in his free time?",
    "Tell me about Bhagavad Gita",
    "Tell me about Psychology of Money",
    "Tell me about Power of Habit",
  ],
  keywords: [
    { word: "library", weight: 3 },
    { word: "book", weight: 3 },
    { word: "books", weight: 3 },
    { word: "read", weight: 3 },
    { word: "reading", weight: 3 },
    { word: "recommend", weight: 3 },
    { word: "favourite", weight: 3 },
    { word: "favorite", weight: 3 },
    { word: "bhagavad", weight: 3 },
    { word: "gita", weight: 3 },
    { word: "psychology", weight: 3 },
    { word: "money", weight: 2 },
    { word: "habit", weight: 3 },
    { word: "changed", weight: 2 },
    { word: "suggestion", weight: 2 },
    { word: "rated", weight: 2 },
    { word: "starred", weight: 2 },
    { word: "free time", weight: 2 },
  ],
  answer: `Here are the books I love and highly recommend 📚:

---
📖 **Bhagavad Gita** — ⭐⭐⭐⭐⭐
A timeless spiritual guide offering deep psychological insights into duty, mind control, and inner peace. A must-read for clarity of thought.

---
📖 **The Psychology of Money** — ⭐⭐⭐⭐⭐
Doing well with money is less about intelligence and more about behavior. This book completely changes how you think about wealth and decisions.

---
📖 **The Power of Habit** — ⭐⭐⭐⭐⭐
The science behind why habits form and how to change them. Understanding this is the first step to rewiring your brain for better productivity and growth.

Explore the **Library section** on the portfolio for more!`,
};

// =============================================================
// 8. DASHBOARDS / STATS SECTION
// =============================================================
export const dashboardsSection: SectionEntry = {
  id: "dashboards",
  title: "Dashboards (LeetCode & GitHub Stats)",
  content: `
    Section label: 06 / ANALYTICS
    
    LeetCode Stats:
    - Total Solved: 486 / 3100
    - Easy: 182/800 | Medium: 245/1600 | Hard: 59/700
    - Contest Rating: 1842
    - Global Rank: Top 4.2%
    
    GitHub Stats:
    - Stars: 124
    - Followers: 86 | Following: 34
    - Repositories: 42
    - Top Languages: TypeScript (48%), Python (32%), JavaScript (12%), GLSL (8%)
    - Recent Activity: Pushing commits, Stripe webhook integration, Docker optimization
  `,
  questions: [
    "What is your LeetCode rating?",
    "How many LeetCode problems have you solved?",
    "Show me your coding stats",
    "What is your contest rating?",
    "What is your global rank on LeetCode?",
    "How active are you on GitHub?",
    "How many GitHub repos do you have?",
    "What is your GitHub profile?",
    "Tell me about your LeetCode performance",
    "What programming languages dominate your GitHub?",
    "Are you good at competitive programming?",
    "What is your GitHub star count?",
    "How many hard problems have you solved?",
    "What is your GitHub follower count?",
    "Show me your analytics",
    "How consistent are you with coding?",
    "What is your LeetCode rank?",
    "How many medium LeetCode problems done?",
  ],
  keywords: [
    { word: "leetcode", weight: 3 },
    { word: "github", weight: 3 },
    { word: "stats", weight: 3 },
    { word: "analytics", weight: 3 },
    { word: "rating", weight: 2 },
    { word: "rank", weight: 2 },
    { word: "solved", weight: 2 },
    { word: "problems", weight: 2 },
    { word: "competitive", weight: 2 },
    { word: "repositories", weight: 2 },
    { word: "repos", weight: 2 },
    { word: "stars", weight: 2 },
    { word: "followers", weight: 2 },
    { word: "dashboard", weight: 3 },
    { word: "performance", weight: 2 },
    { word: "consistent", weight: 2 },
    { word: "hard", weight: 2 },
    { word: "medium", weight: 2 },
    { word: "easy", weight: 2 },
    { word: "contest", weight: 2 },
  ],
  answer: `📊 **My Coding Stats Dashboard:**

**LeetCode:**
- ✅ Total Solved: **486 / 3100**
- 🟢 Easy: 182/800 | 🟡 Medium: 245/1600 | 🔴 Hard: 59/700
- 🏆 Contest Rating: **1842**
- 🌍 Global Rank: **Top 4.2%**

---

**GitHub:**
- ⭐ Stars: **124**
- 👥 Followers: 86 | Following: 34
- 📦 Public Repos: **42**
- 💻 Top Languages: TypeScript (48%) | Python (32%) | JS (12%) | GLSL (8%)

Profile: https://github.com/amitjatthap2002`,
};

// =============================================================
// 9. CONTACT SECTION
// =============================================================
export const contactSection: SectionEntry = {
  id: "contact",
  title: "Contact / Get in Touch",
  content: `
    Section label: 07 / TRANSMISSION
    Description: Drop a message, response within 24 hours.
    
    Email: amitsumitjatthap@gmail.com
    Phone: +91-9685193991
    Location: Khandwa, Madhya Pradesh, India
    GitHub: https://github.com/amitjatthap2002
    LinkedIn: https://www.linkedin.com/in/amit-jatthap-3666962a8/
    LeetCode: https://leetcode.com/u/Amit_Jatthap/
    
    Contact Form: Name, Email, Subject, Message fields available
  `,
  questions: [
    "How can I contact you?",
    "What is your email address?",
    "Can I hire you?",
    "How do I reach Amit?",
    "Where can I send a message?",
    "What is your phone number?",
    "How can I collaborate with you?",
    "Are you available for freelance?",
    "How quickly do you respond?",
    "Drop me your LinkedIn",
    "Share your GitHub",
    "Where are you located?",
    "Is Amit open to collaborations?",
    "How do I get in touch?",
    "Give me your contact details",
    "Do you accept project proposals?",
    "Can I reach you on LinkedIn?",
    "How do I send you a message?",
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
    { word: "location", weight: 2 },
    { word: "collaborate", weight: 3 },
    { word: "freelance", weight: 3 },
    { word: "proposal", weight: 2 },
    { word: "respond", weight: 2 },
    { word: "address", weight: 2 },
    { word: "reach out", weight: 3 },
  ],
  answer: `Let's connect! Here's how you can reach me 📬:

📧 **Email:** amitsumitjatthap@gmail.com
📞 **Phone:** +91-9685193991
📍 **Location:** Khandwa, Madhya Pradesh, India

🔗 **Socials:**
- GitHub: https://github.com/amitjatthap2002
- LinkedIn: https://www.linkedin.com/in/amit-jatthap-3666962a8/
- LeetCode: https://leetcode.com/u/Amit_Jatthap/

💬 Or use the **Contact Form** on the portfolio — I typically respond within **24 hours**!`,
};

// =============================================================
// 10. GOALS / FUTURE SECTION
// =============================================================
export const goalsSection: SectionEntry = {
  id: "goals",
  title: "Goals & Future Plans",
  content: `
    Short-term goal: Secure an AI/ML or GenAI internship
    Long-term goal: Build AI platforms for India in cybersecurity, education, governance, cloud infrastructure
    Vision: Build startup-scale AI products with real-world impact
    Career Goal: Build intelligent, explainable, and scalable AI products
  `,
  questions: [
    "What are your future goals?",
    "Where do you see yourself in 5 years?",
    "What are your short-term goals?",
    "What do you want to achieve?",
    "What is your dream job?",
    "What is your long-term vision?",
    "What motivates you professionally?",
    "Are you looking for an internship?",
    "What kind of work are you looking for?",
    "What is your career plan?",
    "What are your ambitions?",
    "What do you want to build in the future?",
    "Where is Amit headed in his career?",
    "What is Amit's mission?",
    "What are your aspirations?",
  ],
  keywords: [
    { word: "goal", weight: 3 },
    { word: "goals", weight: 3 },
    { word: "future", weight: 3 },
    { word: "vision", weight: 3 },
    { word: "aim", weight: 3 },
    { word: "ambition", weight: 3 },
    { word: "dream", weight: 2 },
    { word: "plan", weight: 2 },
    { word: "aspiration", weight: 3 },
    { word: "mission", weight: 3 },
    { word: "internship", weight: 2 },
    { word: "5 years", weight: 3 },
    { word: "motivat", weight: 2 },
    { word: "career plan", weight: 3 },
    { word: "objective", weight: 2 },
  ],
  answer: `🎯 **My Career Goals:**

**Short-Term:**
Secure an **AI/ML or GenAI internship** to contribute to real-world products and grow in a professional environment.

**Long-Term:**
Build AI platforms for India that solve meaningful problems in areas like:
- 🔒 Cybersecurity
- 🎓 Education
- 🏛️ Governance
- ☁️ Cloud Infrastructure

**Ultimate Vision:**
Create startup-scale, explainable, and production-ready AI products that generate real business impact — not just prototypes.`,
};

// =============================================================
// MASTER EXPORT — All sections in one array
// =============================================================
export const allSections: SectionEntry[] = [
  heroSection,
  aboutSection,
  skillsSection,
  projectsSection,
  educationSection,
  certificationsSection,
  librarySection,
  dashboardsSection,
  contactSection,
  goalsSection,
];

// =============================================================
// SIMILARITY SEARCH ENGINE (for mySection.ts)
// =============================================================

/**
 * findBestSectionAnswer()
 *
 * Runs weighted similarity search over all sections.
 *
 * Scoring:
 *   - Exact token match   → +weight
 *   - Partial match (>4)  → +weight × 0.5
 *   - Multi-word phrase   → +weight × 1.5
 *
 * @param query      - raw user input
 * @param threshold  - minimum score (default: 2)
 * @returns best answer string, or null if no match
 */
export function findBestSectionAnswer(
  query: string,
  threshold = 2
): string | null {
  const normalized = query.toLowerCase().replace(/[^a-z0-9\s]/gi, "").trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);

  let bestScore = 0;
  let bestAnswer: string | null = null;
  let bestSection = "";

  for (const section of allSections) {
    let score = 0;

    for (const kw of section.keywords) {
      const kwLower = kw.word.toLowerCase();

      if (kwLower.includes(" ")) {
        if (normalized.includes(kwLower)) {
          score += kw.weight * 1.5;
        }
      } else {
        if (tokens.includes(kwLower)) {
          score += kw.weight;
        } else if (
          kwLower.length > 4 &&
          tokens.some((t) => t.includes(kwLower) || kwLower.includes(t))
        ) {
          score += kw.weight * 0.5;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = section.answer;
      bestSection = section.id;
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      `[mySection] Best match: "${bestSection}" | Score: ${bestScore.toFixed(2)}`
    );
  }

  return bestScore >= threshold ? bestAnswer : null;
}

/**
 * SECTION FALLBACK RESPONSE
 */
export const SECTION_FALLBACK =
  "Hmm, I didn't find a precise match! Try asking about:\n• **Who is Amit** (intro)\n• **Skills** (tech stack, AI/ML, web)\n• **Projects** (EcoMatch, ASIE, Malware Detection)\n• **Education**\n• **Certifications**\n• **Books** (library)\n• **LeetCode / GitHub stats**\n• **Contact** (email, LinkedIn)\n• **Goals** (internship, future plans)";
