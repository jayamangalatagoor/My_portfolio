export interface Project {
  id: string;
  title: string;
  summary: string;
  tools: string[];
  businessProblem: string[];
  businessObjective: string[];
  constraints: string[];
  projectArchitecture?: {
    description: string[];
    diagramUrl?: string;
  };
  methodology: string[];
  keyLearnings: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  visualizations?: string[];
  dashboardUrl?: string;
  coverImage?: string;
  // ── display metadata (optional) ──
  shortName?: string;     // compact label, e.g. "Sintex"
  category?: string;      // e.g. "GenAI / Agentic AI"
  year?: string;          // e.g. "2025"
  metric?: string;        // headline stat, e.g. "8 agent tools"
  metricLabel?: string;   // label for the stat
}

export interface Skill {
  category: string;
  items: string[];
  icon?: string;
  description?: string;
}
