import { Project, Skill } from './types';

export const projects: Project[] = [

  // ── 1. SINTEX ──────────────────────────────────────────────────────────────
  {
    id: 'sintex',
    shortName: 'Sintex',
    category: 'GenAI · Agentic AI',
    year: '2025',
    metric: '4 langs',
    metricLabel: 'multilingual WhatsApp agent',
    title: 'Sintex — Multilingual WhatsApp AI Assistant for Plumbers',
    summary:
      'A production LLM-powered WhatsApp chatbot for the Sintex plumber loyalty program, letting plumbers across India check and redeem reward points, scan product QR codes, raise support tickets, find dealers, and get instant answers from official Sintex pipe and tank documentation — all in their own language (English, Hindi, Marathi, or Hinglish).',
    tools: [
      'Python', 'FastAPI', 'LangGraph', 'LangChain',
      'Azure OpenAI (GPT)', 'RAG', 'PostgreSQL', 'SQLAlchemy',
      'Alembic', 'WATI (WhatsApp API)', 'rapidfuzz', 'fpdf2', 'Docker'
    ],
    coverImage: 'https://i.postimg.cc/PrmdGSp5/what-is-GPT.png',

    businessProblem: [
      'Sintex runs a loyalty program for plumbers, but participation was low because plumbers had to use a separate app or portal that most of them never opened.',
      'Plumbers across India speak different languages — English, Hindi, Marathi, Hinglish — and existing digital tools offered no multilingual support.',
      'Plumbers frequently called support teams to ask about product specs (pipe pressure ratings, tank capacities, etc.), overloading the helpdesk with questions that official documents already answered.',
      'Reward claims required manual processes that were slow, error-prone, and dependent on correct data entry — leading to trust issues with the loyalty program.',
      'There was no single, frictionless channel for plumbers to interact with the loyalty program, find dealers nearby, or raise a support ticket.',
    ],

    businessObjective: [
      'Bring the entire loyalty program experience into WhatsApp — the one app every plumber already uses daily.',
      'Enable plumbers to interact in their own language without any switching or translation friction.',
      'Automate product Q&A by retrieving answers directly from official Sintex pipe and tank documentation using RAG, eliminating helpdesk load for product queries.',
      'Make reward claims 100% reliable by running critical transactions through deterministic rule-based logic — not the AI — so the database is always accurate.',
      'Increase plumber engagement and loyalty program participation through convenience and language accessibility.',
    ],

    constraints: [
      'WhatsApp message format is plain text — no rich UI, no forms, no buttons for complex flows — requiring all interaction to be handled through conversational design.',
      'Language detection had to be automatic and accurate across four languages including Hinglish (a code-mixed informal hybrid), with no user setup required.',
      'Reward claim logic had to be 100% deterministic — the AI must never be allowed to write incorrect values into the database, even if a user attempts to manipulate it.',
      'RAG responses had to stay grounded in official Sintex documents — hallucination about product specs (pressure ratings, capacities) would be a serious trust and safety issue.',
      'The system had to handle concurrent WhatsApp sessions from many users with low latency, deployed on a Linux server with Docker.',
    ],

    projectArchitecture: {
      description: [
        '**WhatsApp Layer (WATI):** Incoming messages are received via WATI webhook and routed to the FastAPI backend. Outgoing responses are sent back through WATI\'s WhatsApp Business API.',
        '**FastAPI Backend:** Handles webhook events, manages user sessions, and routes each message to the LangGraph AI agent.',
        '**LangGraph Agentic Workflow:** An 8-tool ReAct agent powered by Azure OpenAI. Each tool handles a specific domain: points check, redemption, QR scanning, dealer search, ticket raising, RAG product Q&A, PDF generation, and language detection.',
        '**RAG Layer (Product Q&A Tool):** Official Sintex pipe and tank documents are chunked, embedded, and stored in a vector store. When a user asks a product question, the agent retrieves relevant chunks and synthesizes an accurate answer — never hallucinating specs.',
        '**Rule-Based Reward Logic:** All point claim and redemption transactions bypass the LLM entirely and run through strict validation logic before writing to PostgreSQL. Ensures data integrity regardless of conversation context.',
        '**PostgreSQL + SQLAlchemy + Alembic:** Stores users, conversation history, reward transactions, and claims. Schema versioned with Alembic migrations.',
        '**PDF Generation (fpdf2):** On-demand reward statement PDFs generated and sent directly in WhatsApp chat.',
        '**Docker Deployment:** Entire application containerized and deployed on a Linux UAT/production server.',
      ],
    },

    methodology: [
      'Designed the full conversational flow for 8 features, mapping each to a dedicated LangGraph tool so the agent routes deterministically to the right function.',
      'Implemented automatic language detection using a lightweight classifier at the start of each session; all subsequent responses are generated in the detected language.',
      'Built the RAG pipeline: chunked and embedded official Sintex pipe and tank product documentation, stored vectors in a pgvector-backed store, and connected it as the product Q&A tool.',
      'Separated reward claim and redemption logic completely from the AI layer — these run as pure Python functions with database validation, called by the agent only as a trigger.',
      'Integrated WATI webhooks for receiving WhatsApp messages and sending responses, handling media messages for QR code scanning.',
      'Generated on-demand PDF reward statements using fpdf2 and delivered them directly in the WhatsApp conversation.',
      'Implemented fuzzy matching (RapidFuzz) for product name lookups so plumbers can find products even with spelling variations.',
      'Containerized with Docker and deployed on a Linux server with systemd service management and Nginx reverse proxy.',
    ],

    keyLearnings: [
      'Learned how to design AI agents where certain critical paths must be fully deterministic — separating LLM reasoning from transactional logic is essential for production reliability.',
      'Gained hands-on experience building RAG pipelines grounded in domain-specific documents, including chunking strategy, embedding, and retrieval tuning.',
      'Understood the complexity of multilingual NLP in a production environment, especially for code-mixed languages like Hinglish.',
      'Improved skills in agentic workflow design with LangGraph, including tool routing, state management, and multi-turn conversation handling.',
      'Learned production deployment patterns: Docker, systemd, Nginx, and managing live webhooks from external services.',
    ],

    techStack: [
      { category: 'Programming & Backend', items: ['Python', 'FastAPI', 'Async Python'] },
      { category: 'AI & LLM Engineering', items: ['LangGraph', 'LangChain', 'Azure OpenAI (GPT)', 'RAG', 'Agentic AI', 'Prompt Engineering', 'Tool-Calling', 'pgvector'] },
      { category: 'Database & ORM', items: ['PostgreSQL', 'SQLAlchemy', 'Alembic'] },
      { category: 'Integrations & Libraries', items: ['WATI (WhatsApp API)', 'rapidfuzz', 'fpdf2'] },
      { category: 'DevOps & Deployment', items: ['Docker', 'Nginx', 'systemd', 'Linux', 'Git'] },
    ],

    visualizations: [],
  },

  // ── 2. CHITTIGPT ────────────────────────────────────────────────────────────
  {
    id: 'chittigpt',
    shortName: 'ChittiGPT',
    category: 'GenAI · Enterprise Copilot',
    year: '2025',
    metric: '20+ tools',
    metricLabel: 'connected HR services',
    title: 'ChittiGPT — Enterprise HR Copilot for Welspun Group',
    summary:
      'An internal AI assistant deployed for Welspun Group employees, handling everyday HR self-service through chat — leave, attendance corrections, payslips, document downloads, IT/HR tickets, and policy Q&A. Employees can also ask questions about company HR policies and insurance documents, or upload their own PDF/Excel file and query it directly in the conversation.',
    tools: [
      'Python', 'FastAPI', 'LangGraph', 'WebSockets',
      'Azure OpenAI (GPT-4.1-mini)', 'RAG', 'PostgreSQL',
      'SQLAlchemy', 'Alembic', 'JWT', 'Prometheus', 'Docker'
    ],
    coverImage: 'https://i.postimg.cc/HLSWQZG8/9dcf9e0f-16ed-4495-a8f4-98f4c9cba131.jpg',

    businessProblem: [
      'Welspun Group employees were spending significant time navigating multiple HR portals and systems to complete routine self-service tasks — leave applications, payslip downloads, attendance corrections, Form 16 retrieval.',
      'HR and IT support teams were overloaded with Level-1 queries that employees could answer themselves if information were easily accessible.',
      'Searching for HR policy details, insurance coverage, or internal procedures required navigating long PDF documents — a slow and frustrating experience for employees.',
      'There was no unified interface connecting all these services; employees had to remember which system to use for which task.',
      'The organization needed a scalable, secure, chat-based assistant that could grow with the number of connected tools and services.',
    ],

    businessObjective: [
      'Build a single chat interface where employees can complete any routine HR or self-service task without leaving the conversation.',
      'Connect 20+ internal company services as tools so the AI agent can execute real actions — not just answer questions.',
      'Enable employees to ask natural language questions against official HR, policy, and insurance documents using a RAG layer grounded in Welspun\'s own documentation.',
      'Allow employees to upload their own PDFs or Excel files and query them directly in chat for document-level Q&A.',
      'Deliver real-time, streaming responses with full conversation memory so every interaction feels natural and context-aware.',
      'Deploy securely with JWT + OTP authentication, live monitoring, and versioned database migrations.',
    ],

    constraints: [
      'All tool calls had to be accurate and safe — the agent connecting to real HR systems means errors have real consequences (wrong leave records, incorrect payslip data).',
      'Response latency had to feel conversational despite the agent reasoning over 20+ tools; streaming over WebSockets was necessary to avoid blank-screen waits.',
      'Document Q&A (RAG) had to stay grounded in official Welspun documents — hallucinated policy answers could create compliance or HR issues.',
      'The system had to be secure: JWT + OTP email login for authentication, with no unauthorized access to employee data.',
      'The PostgreSQL schema evolved significantly during development (15+ migrations), requiring disciplined versioning with Alembic.',
    ],

    projectArchitecture: {
      description: [
        '**FastAPI + WebSocket Backend:** Handles authentication, manages long-lived WebSocket connections for real-time streaming, and routes messages to the LangGraph agent.',
        '**LangGraph ReAct Agent (Azure OpenAI GPT-4.1-mini):** The core intelligence layer. At each turn, the agent reasons over the available tools, decides which to call, executes it, and synthesizes a human-readable response streamed token-by-token.',
        '**20+ Connected Tools:** Each company service (leave management, attendance, payslip, Form 16, mediclaim e-card, IT tickets, HR tickets, referrals, etc.) is wrapped as a LangGraph tool. The agent selects and calls the right tool based on user intent.',
        '**RAG Layer (Policy & Document Q&A):** Official Welspun HR, policy, and insurance documents are embedded and stored in pgvector. When a user asks a policy question, the RAG tool retrieves the most relevant chunks and answers from the source — not from model memory.',
        '**User Document Q&A:** Employees can upload their own PDFs or Excel files mid-conversation. The system chunks and embeds the uploaded file on-the-fly and makes it queryable within that session.',
        '**Conversation Memory:** Full conversation history is maintained per user session, so the agent can refer back to earlier messages and maintain context across multi-turn interactions.',
        '**JWT + OTP Authentication:** Login via email OTP generates a JWT token. All API endpoints and WebSocket connections are authenticated.',
        '**PostgreSQL + SQLAlchemy + Alembic:** 15+ versioned schema migrations. Stores users, sessions, conversation history, and tool logs.',
        '**Prometheus Monitoring:** Live metrics on agent latency, tool call success rates, active connections, and error rates.',
        '**Docker Deployment:** Containerized and deployed on internal Welspun infrastructure.',
      ],
    },

    methodology: [
      'Designed the LangGraph agent with a ReAct loop — the agent reasons step-by-step before calling a tool, improving accuracy on complex multi-step HR tasks.',
      'Wrapped each of 20+ internal company APIs as typed LangGraph tools with input validation, error handling, and retry logic.',
      'Built the RAG pipeline over official Welspun HR, policy, and insurance documents — chunked, embedded (Azure OpenAI embeddings), and stored in pgvector for semantic retrieval.',
      'Implemented on-the-fly document Q&A: when a user uploads a file, it\'s parsed, chunked, embedded, and stored in a temporary session-scoped vector store.',
      'Built real-time streaming using FastAPI WebSockets — tokens stream from the LLM to the client as they are generated, eliminating perceived latency.',
      'Implemented JWT authentication with OTP email verification, protecting all endpoints and WebSocket handshakes.',
      'Managed database schema evolution with 15+ Alembic migrations across the development lifecycle.',
      'Added Prometheus metrics collection and exposed a metrics endpoint for live system monitoring.',
      'Containerized the full application stack with Docker for reproducible deployment.',
    ],

    keyLearnings: [
      'Built deep expertise in production LangGraph agent design — tool registration, ReAct reasoning loops, streaming, and state management at scale.',
      'Learned how to build secure multi-tenant backends with JWT authentication, WebSocket management, and session isolation.',
      'Gained practical experience running RAG in an enterprise context — grounding answers in official documents, handling edge cases, and preventing hallucination on sensitive HR topics.',
      'Understood the full lifecycle of a production database: schema design, versioned Alembic migrations across 15+ iterations, and query optimization.',
      'Developed operational skills: Prometheus monitoring, Docker containerization, and debugging live production issues.',
    ],

    techStack: [
      { category: 'Programming & Backend', items: ['Python', 'FastAPI', 'Async Python', 'WebSockets'] },
      { category: 'AI & LLM Engineering', items: ['LangGraph', 'LangChain', 'Azure OpenAI (GPT-4.1-mini)', 'RAG', 'Agentic AI', 'Tool-Calling', 'pgvector'] },
      { category: 'Database & ORM', items: ['PostgreSQL', 'SQLAlchemy', 'Alembic'] },
      { category: 'Security & Auth', items: ['JWT', 'OTP Authentication'] },
      { category: 'DevOps & Monitoring', items: ['Docker', 'Prometheus', 'Git', 'Linux'] },
    ],

    visualizations: [],
  },

  // ── 3. WELHIRE KPI ETL ──────────────────────────────────────────────────────
  {
    id: 'welhire-kpi-etl',
    shortName: 'WelHire KPI ETL',
    category: 'Data Engineering · ETL',
    year: '2025',
    metric: '11 KPIs',
    metricLabel: 'from 6 PG DBs + MongoDB',
    title: 'WelHire Analytics — Two-Layer KPI ETL Pipeline',
    summary:
      'A daily batch analytics ETL pipeline with a two-layer architecture: Layer 1 consolidates recruitment data from 6 PostgreSQL databases and MongoDB into a unified analytics warehouse; Layer 2 computes 11 business KPIs for recruiter, tenant, and candidate reporting. Orchestrated by Apache Airflow with automated SMTP email run-reports.',
    tools: [
      'Python', 'Pandas', 'NumPy', 'Apache Airflow (DockerOperator)',
      'PostgreSQL (psycopg3)', 'MongoDB (PyMongo)', 'MySQL (PyMySQL)',
      'SQLAlchemy', 'Docker', 'Cron', 'SMTP', 'Paramiko / SSH Tunnel'
    ],
    coverImage: 'https://i.postimg.cc/mk3S20Ms/maxresdefault.jpg',

    businessProblem: [
      'WelHire (Welspun\'s recruitment platform) ran on multiple separate databases — each service (jobs, CVs, interviews, subscriptions, tenants) had its own PostgreSQL database, with candidate activity data in MongoDB.',
      'Recruitment and leadership teams had no consolidated view of hiring performance across tenants and recruiters — KPIs had to be pulled manually from multiple systems.',
      'There was no automated daily reporting, so decision-making on funnel health, recruiter productivity, and platform usage was slow and reactive.',
      'Adding a new data source to the pipeline required touching multiple parts of the codebase — there was no clean separation between source-specific logic and the transformation layer.',
      'DB connections were unmanaged — each job opened its own connections, causing resource exhaustion on busy days.',
    ],

    businessObjective: [
      'Build an automated daily pipeline that consolidates all WelHire data into a single analytics warehouse — one source of truth for all reporting.',
      'Compute 11 standardized business KPIs covering recruiter metrics, interview funnel stages, attempt/completion rates, candidate ratings, and tenant-level breakdowns.',
      'Make the pipeline modular: onboarding a new source database should require minimal code changes.',
      'Automate daily reporting with SMTP email summaries so stakeholders receive pipeline status and KPI snapshots without checking dashboards.',
      'Optimize resource usage with connection pooling and column-level data loading.',
    ],

    constraints: [
      'Six separate PostgreSQL databases plus MongoDB had to be read without impacting production performance — connections had to be managed carefully.',
      'Some databases were only accessible via SSH tunnel in local development; the pipeline had to support both VNet (production) and SSH tunnel (local) connectivity without code branching.',
      'The Airflow DockerOperator setup required credentials to be mounted at runtime (not baked into the image) for security compliance.',
      'One failing source job must not kill the entire pipeline — each Layer 1 job needed independent error handling.',
      'Layer 2 KPIs had to support both replace and append load modes depending on the KPI type.',
    ],

    projectArchitecture: {
      description: [
        '**Layer 1 — Extract, Transform, Load:** Reads from 6 PostgreSQL databases (jobs, CVs, interviews, subscriptions, adapter, tenant_user) and MongoDB (candidates, JDs, user activity). Each source is a modular job registered in a job registry — adding a new source takes two lines. Performs validated joins and aggregations, then loads into the analytics warehouse.',
        '**Layer 2 — KPI Engine:** An independent, registry-driven layer that reads from the analytics warehouse and computes 11 business KPIs: daily recruiter metrics, jobs master, role-based applicants, user-wise daily activity, JD creation, interview daily, candidate ratings, interview stages, attempted/completed counts, and tenant-level breakdowns. Each KPI is an independent module with its own replace/append load mode.',
        '**Main Executor:** Chains Layer 1 → Layer 2 in sequence. Handles retry logic (configurable MAX_RETRIES), structured file + console logging, and sends automated SMTP email reports on completion or failure.',
        '**Connection Management:** Centralized singleton DB connections with SQLAlchemy connection pooling (~70% fewer connections vs. per-job approach). Column-level data loading avoids fetching unnecessary columns into memory.',
        '**Apache Airflow Orchestration:** A DockerOperator DAG schedules the full pipeline daily at 1 AM. Credentials are mounted at runtime via .env files — never baked into the image. Cron provides a fallback trigger.',
        '**SSH Tunnel Support:** Paramiko-based SSH tunnel for local development DB access, with automatic detection based on environment config.',
      ],
    },

    methodology: [
      'Designed Layer 1 as a modular job-registry pattern: each source database is a self-contained module implementing a standard interface. The executor iterates the registry and runs each job independently.',
      'Built Layer 2 as a separate, equally modular KPI registry: each KPI is a class with a compute() method, load mode (replace/append), and target table. New KPIs can be added without touching existing code.',
      'Implemented centralized singleton database connections with SQLAlchemy pooling, reducing total connections by approximately 70% compared to the per-job approach.',
      'Built column-level data loaders that only fetch the columns needed for each transformation — reducing memory usage on large tables.',
      'Wired the full Layer 1 → Layer 2 execution chain through a single main_executer.py with retry logic, structured logging, and SMTP email reporting.',
      'Set up the Apache Airflow DockerOperator DAG with environment variable mounting at runtime for credential security.',
      'Added Paramiko-based SSH tunnel support for local development, activated via environment config with no code branching.',
      'Wrote a CLI tool (run_kpi.py) to execute individual or multiple KPIs in isolation for debugging and backfill.',
    ],

    keyLearnings: [
      'Learned how to design truly modular ETL pipelines where adding a new source or KPI requires minimal changes to existing code.',
      'Gained practical experience with multi-source data consolidation across heterogeneous databases (PostgreSQL, MongoDB, MySQL).',
      'Understood production-grade Airflow orchestration: DockerOperator, credential security, retry policies, and pipeline observability.',
      'Built appreciation for connection pooling and resource management in data pipelines — unmanaged connections are a silent performance killer.',
      'Improved skills in pipeline error isolation — ensuring one failing job doesn\'t cascade to abort the entire run.',
    ],

    techStack: [
      { category: 'Programming', items: ['Python', 'Pandas', 'NumPy'] },
      { category: 'Orchestration', items: ['Apache Airflow (DockerOperator)', 'Cron'] },
      { category: 'Databases', items: ['PostgreSQL (psycopg3)', 'MongoDB (PyMongo)', 'MySQL (PyMySQL)', 'SQLAlchemy'] },
      { category: 'DevOps & Infrastructure', items: ['Docker', 'Docker Compose', 'SSH Tunneling (Paramiko)', 'Git', 'Linux'] },
      { category: 'Reporting', items: ['SMTP Email Reporting', 'Structured Logging'] },
    ],

    visualizations: [],
  },

  // ── 4. CANDIDATE LIVE-STATUS ETL ────────────────────────────────────────────
  {
    id: 'candidate-live-status-etl',
    shortName: 'Live-Status Tracker',
    category: 'Data Engineering · Real-Time',
    year: '2025',
    metric: '60s',
    metricLabel: 'refresh cadence',
    title: 'Candidate Live-Status Tracker — Real-Time Interview Funnel ETL',
    summary:
      'A near real-time ETL pipeline running every 60 seconds that fuses live state from three read-only source systems (PostgreSQL + two MongoDB collections) into a single MySQL analytics table showing exactly where every candidate sits across 14 interview funnel stages. Includes a live Streamlit + Plotly dashboard for funnel monitoring, stuck-candidate detection, and ETL health tracking.',
    tools: [
      'Python', 'Apache Airflow', 'PostgreSQL', 'MongoDB (PyMongo)',
      'MySQL (mysql-connector-python)', 'SQLAlchemy',
      'Streamlit', 'Plotly', 'Docker / Docker Compose', 'Pytest', 'Cron'
    ],
    coverImage: 'https://i.postimg.cc/5NFrs0k1/Screenshot-2025-04-01-121642.png',

    businessProblem: [
      'During live interviews on WelHire, recruiters and operations teams had no real-time visibility into where individual candidates were in the interview process.',
      'Candidates could get stuck at any stage (device check failed, link not opened, interview abandoned mid-way) with no automated detection — support teams found out only when candidates called.',
      'Interview state was spread across three separate systems (scheduling DB, activity event logs, interview session DB) with no single consolidated view.',
      'The platform supported two different interview engines (Classic 2.0 and Agentic 3.0), each with different event schemas — there was no unified stage model across both.',
      'Manual status checks required querying multiple databases and mentally joining the results — too slow for live operational support.',
    ],

    businessObjective: [
      'Build a pipeline that runs every 60 seconds and writes the current funnel stage of every active candidate to a single analytics table.',
      'Model the full interview journey as 14 ordered stages — from email sent through device checks, in-progress interview, completion, and post-processing — across both Classic and Agentic engines.',
      'Provide a live Streamlit dashboard showing the funnel distribution, stuck candidates, and ETL health metrics.',
      'Enforce strict read-only access to all three source systems — the pipeline must never write to production databases.',
      'Make the schema versioned and auto-migrating so new stages or columns can be added without manual DB intervention.',
    ],

    constraints: [
      'All three source systems are production read-only — the pipeline must use read-only Postgres sessions and find-only Mongo queries, with no writes to source systems ever.',
      'MongoDB was accessible via SRV connection string inside the VNet (production) but required a SOCKS5/SSH tunnel locally — the connectivity strategy had to be environment-driven with no code branching.',
      'Stage resolution had to be deterministic: given the same set of events, the pipeline must always produce the same current_stage. Edge cases (terminated interviews, abandoned sessions) needed explicit override logic.',
      'The Airflow DAG runs every minute — at this frequency, schema migrations had to be idempotent and auto-applied at startup without causing downtime.',
      'The composite primary key (candidate_id, jd_id) required an upsert-plus-history-append pattern on every tick — tracking the current state AND maintaining a change history.',
    ],

    projectArchitecture: {
      description: [
        '**Three Source Systems (Read-Only):** PostgreSQL `scheduled_interviews` table (scheduling data), MongoDB `user_activity_events` collection (candidate interaction events), MongoDB `interviewSession` collection (live session state). All accessed strictly read-only.',
        '**Extract Layer:** PostgreSQL accessed with `set_session(readonly=True)`. MongoDB accessed with `.find()` and `.distinct()` only — no write operations possible.',
        '**Transform Layer:** Events from all three sources are merged per (candidate_id, jd_id). A deterministic stage resolver evaluates 14 ordered stages in sequence — NOT_STARTED → EMAIL_SENT → LINK_OPENED → CHECKS → IN_PROGRESS → COMPLETED → POST_PROCESSING — with TERMINATED as an override state. Supports both Classic 2.0 and Agentic 3.0 event schemas.',
        '**Load Layer:** MySQL `cand_sts_etl_active_stages` table updated via upsert on composite key (candidate_id, jd_id). Every change also appended to a history table for audit and trend analysis.',
        '**Schema Manager:** Versioned migrations (v4 through v9) auto-applied idempotently at startup. New columns or stages can be added by incrementing the version — no manual intervention needed.',
        '**Apache Airflow DAG:** Runs the full extract → transform → load cycle every minute (`* * * * *` cron). Also runnable via bare Python command or cron for non-Airflow environments.',
        '**Streamlit + Plotly Dashboard:** Live funnel distribution chart, stuck/stalled candidate table, source connectivity health indicators, and ETL run health metrics. Refreshes on page load.',
        '**Docker Compose Stack:** Airflow (webserver + scheduler + metadata DB), migration runner (runs once at startup), and Streamlit dashboard — all containerized for identical local and production environments.',
        '**26 Unit Tests (Pytest):** Cover the stage resolver logic, window calculations, and edge cases (terminated sessions, missing events, partial data).',
      ],
    },

    methodology: [
      'Mapped all interview events from both Classic 2.0 and Agentic 3.0 engines to a unified 14-stage model, defining precedence rules for each stage transition.',
      'Implemented a deterministic stage resolver: given all events for a (candidate_id, jd_id), it evaluates stages in order and returns the highest reached stage, with TERMINATED as an unconditional override.',
      'Built a strict source safety layer: Postgres sessions opened with `set_session(readonly=True)`; all Mongo access through find/distinct only. No write path exists to source databases.',
      'Implemented environment-driven MongoDB connectivity: SRV connection string for production (inside VNet), SOCKS5/SSH tunnel for local development, selected automatically via environment variables.',
      'Designed the schema manager to apply versioned migrations idempotently at startup — safe to run on every container restart.',
      'Built the upsert + history pattern: each tick updates the active stage table and appends to history, enabling both current-state queries and historical trend analysis.',
      'Built the Streamlit dashboard with Plotly charts for funnel visualization, a sortable stuck-candidate table, and real-time ETL health indicators.',
      'Packaged the full stack (Airflow, migrations, Streamlit) in Docker Compose for reproducible local and production environments.',
      'Wrote 26 Pytest unit tests covering the stage resolver and all edge cases before deploying to production.',
    ],

    keyLearnings: [
      'Learned how to build a real-time data fusion pipeline that merges events from heterogeneous sources into a unified state model.',
      'Gained expertise in deterministic event-driven state machines — modeling a complex business process (interview funnel) as ordered, explicit stage transitions.',
      'Understood the importance of strict source safety in production ETL — read-only enforcement must be architectural, not just a convention.',
      'Built practical skills in environment-driven connectivity patterns — handling VNet vs. SSH tunnel without code branches.',
      'Learned the value of idempotent schema migrations in high-frequency pipelines where downtime for manual DB changes is not acceptable.',
    ],

    techStack: [
      { category: 'Programming', items: ['Python'] },
      { category: 'Orchestration', items: ['Apache Airflow', 'Cron'] },
      { category: 'Databases', items: ['PostgreSQL', 'MongoDB (PyMongo)', 'MySQL (mysql-connector-python)', 'SQLAlchemy'] },
      { category: 'Dashboard', items: ['Streamlit', 'Plotly', 'Pandas'] },
      { category: 'DevOps & Testing', items: ['Docker', 'Docker Compose', 'Pytest', 'Git', 'Linux'] },
    ],

    visualizations: [],
  },

  // ── 5. REJECTION REPORTS ────────────────────────────────────────────────────
  {
    id: 'welspun-rejection-reporting',
    shortName: 'Rejection Reports',
    category: 'Data Tooling · Automation',
    year: '2025',
    metric: '3 sheets',
    metricLabel: 'auto-ingested & deduped',
    title: 'Industrial Rejection Reports Automation — Welspun',
    summary:
      'A Streamlit-based application for Welspun\'s quality team that automates ingestion of daily pipe rejection data from Excel sheets into MySQL, with multi-sheet parsing, record-level deduplication, and real-time upload feedback — eliminating the manual entry process and preventing data inconsistencies.',
    tools: ['Python', 'Streamlit', 'Pandas', 'MySQL', 'SQLAlchemy', 'OpenPyXL', 'Excel'],
    coverImage: 'https://i.postimg.cc/YSVyXwxW/Gemini-Generated-Image-r5g3b1r5g3b1r5g3.png',

    businessProblem: [
      'Welspun\'s quality team recorded daily pipe rejection data manually — a slow, error-prone process that frequently produced duplicate entries and inconsistent records.',
      'Rejection data came from Excel files with three separate sheets (ProdRej, DIP1, DIP2), each with different column structures, requiring manual reformatting before entry.',
      'Duplicate records were a persistent issue — the same rejection event would sometimes be entered multiple times, skewing quality metrics.',
      'Non-technical quality team members needed a simple, self-service tool — accessing a database directly was not an option.',
    ],

    businessObjective: [
      'Build a simple file-upload interface that automates the full ingestion pipeline: upload Excel → parse multiple sheets → validate → deduplicate → insert into MySQL.',
      'Eliminate duplicate records with record-level deduplication logic before any database write.',
      'Give users instant feedback on upload results — how many records were inserted, how many were duplicates, and any errors.',
    ],

    constraints: [
      'Excel files had three sheets with different column structures — the parser had to handle each sheet independently with its own column mapping.',
      'Deduplication had to be precise: comparing incoming records against existing database entries at the row level, not just checking for identical files.',
      'The tool had to be completely usable by non-technical quality team members — zero command-line, zero SQL.',
    ],

    projectArchitecture: {
      description: [
        '**Streamlit Interface:** Single-page file upload UI. User selects an Excel file; the app processes it and shows results inline.',
        '**Pandas Multi-Sheet Parser:** Reads ProdRej, DIP1, and DIP2 sheets independently, validates column structure, and normalizes data types.',
        '**Record-Level Deduplication:** For each incoming row, queries the existing MySQL table to check for a matching record before insertion. Only new records are written.',
        '**SQLAlchemy ORM:** Manages all database connections and transactions with proper error handling and rollback on failure.',
        '**Three-Table MySQL Schema:** Separate tables for prodrej, dip1, dip2 — each mapped to its corresponding sheet structure.',
        '**Real-Time Feedback:** After processing, the app displays a per-sheet summary: records inserted, duplicates skipped, and any row-level errors.',
      ],
    },

    methodology: [
      'Designed a Streamlit interface with drag-and-drop Excel upload, accessible to non-technical quality team users.',
      'Used Pandas to read and validate all three sheets, applying sheet-specific column mappings and type conversions.',
      'Implemented record-level deduplication: before inserting each row, checked for an existing matching record in the target MySQL table.',
      'Used SQLAlchemy ORM for all database operations with transaction management and graceful rollback on errors.',
      'Added a per-sheet result summary displayed immediately after upload: inserted count, duplicate count, and error details.',
      'Created a structured logging mechanism to trace every upload, recording which rows were inserted, skipped, or failed.',
    ],

    keyLearnings: [
      'Learned how to build practical data ingestion tools that handle real-world Excel messiness — inconsistent formats, mixed types, missing values.',
      'Gained experience with record-level deduplication strategies at the database boundary.',
      'Understood the importance of immediate user feedback in operational tools used by non-technical teams.',
      'Improved skills building Streamlit applications for industrial data workflows.',
    ],

    techStack: [
      { category: 'Programming', items: ['Python'] },
      { category: 'Frontend / UI', items: ['Streamlit'] },
      { category: 'Data Processing', items: ['Pandas', 'OpenPyXL'] },
      { category: 'Database', items: ['MySQL', 'SQLAlchemy'] },
      { category: 'Tools', items: ['Microsoft Excel', 'Git'] },
    ],

    visualizations: [],
  },

];

// ── SKILLS ───────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  {
    category: 'AI & LLM Engineering',
    icon: '🤖',
    items: [
      'LangGraph',
      'LangChain',
      'Azure OpenAI',
      'RAG (Retrieval-Augmented Generation)',
      'Agentic AI / ReAct Agents',
      'Prompt Engineering',
      'Tool-Calling Workflows',
      'pgvector / Vector DBs',
      'Conversational AI',
    ],
    description:
      'Building production LLM-powered systems: agentic workflows, RAG pipelines grounded in real documents, and multi-turn conversational AI deployed at enterprise scale.',
  },
  {
    category: 'Data Engineering',
    icon: '🛠️',
    items: [
      'ETL / Data Pipelines',
      'Apache Airflow',
      'Multi-Source Data Integration',
      'Pipeline Orchestration',
      'Database Migrations (Alembic)',
      'Connection Pooling',
      'Query Optimization',
      'Schema Design',
      'Cron Scheduling',
    ],
    description:
      'Designing and shipping production ETL pipelines: multi-source extraction, warehouse consolidation, KPI computation, and orchestration with Apache Airflow.',
  },
  {
    category: 'Programming & Backend',
    icon: '💻',
    items: [
      'Python',
      'FastAPI',
      'Async Python',
      'WebSockets',
      'SQLAlchemy',
      'Pydantic',
      'Alembic',
      'JWT & OTP Auth',
      'REST APIs',
      'Webhook Integrations',
    ],
    description:
      'Building scalable backend services and APIs: FastAPI, async Python, real-time WebSocket streaming, authentication, and ORM-based database management.',
  },
  {
    category: 'Databases',
    icon: '🗄️',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'pgvector',
      'SQL',
    ],
    description:
      'Working across relational and NoSQL databases in production: schema design, query optimization, migrations, vector storage, and multi-source integration.',
  },
  {
    category: 'DevOps & Deployment',
    icon: '🚀',
    items: [
      'Docker',
      'Docker Compose',
      'Nginx',
      'Gunicorn / Uvicorn',
      'systemd',
      'Prometheus',
      'Pytest',
      'SSH Tunneling (Paramiko)',
      'Git',
      'Linux',
    ],
    description:
      'Deploying and operating production systems: Docker containerization, Nginx reverse proxy, systemd service management, monitoring, and testing.',
  },
  {
    category: 'BI & Visualization',
    icon: '📊',
    items: [
      'Streamlit',
      'Plotly',
      'Power BI (DAX, Power Query)',
      'Tableau',
      'Google Looker Studio',
      'Pandas',
      'Advanced Excel',
    ],
    description:
      'Building live dashboards and data visualizations: from real-time Streamlit + Plotly pipeline monitors to Power BI and Tableau business intelligence reports.',
  },
];
