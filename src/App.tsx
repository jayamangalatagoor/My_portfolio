import { useState, useEffect } from 'react';
import {
  Linkedin, Mail, ArrowUpRight, Menu, X, Github,
  Phone, MapPin, FileText, Copy, Check, Sparkles, ArrowRight, Sun, Moon,
} from 'lucide-react';
import { Modal } from './components/Modal';
import { projects, skills } from './data';
import { Project } from './types';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const NAV = ['about', 'skills', 'work', 'education', 'contact'];
const RESUME_URL =
  'https://drive.google.com/file/d/1EcmEbUoDndQ4t4k1C6LT9gOT4YpEU_ib/view?usp=drive_link';

const SOCIALS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tagoor-jayamangala-b19a30283/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/TagoorJ', label: 'GitHub' },
  { icon: Mail, href: 'mailto:jayamangalatagore@gmail.com', label: 'Email' },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'genai' | 'data'>('all');
  const [isLight, setIsLight] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'light';
    }
    return false; // default: dark
  });

  useReveal();

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('jayamangalatagore@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    const isGenAI = (p.category || '').toLowerCase().includes('genai');
    return activeFilter === 'genai' ? isGenAI : !isGenAI;
  });

  return (
    <div className="relative min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden">
      <a href="#about" className="skip-link">Skip to content</a>
      <div className="aura" aria-hidden />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(14,14,19,0.92)',
            color: isLight ? '#18181B' : '#FAFAFA',
            border: '1px solid rgba(129,140,248,0.30)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
          },
        }}
      />

      {/* ───────── NAV ───────── */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
          <nav className="glass rounded-2xl h-16 flex items-center justify-between px-4 sm:px-5">
            <button
              onClick={() => scrollTo('about')}
              className="flex items-center gap-2.5 group"
            >
              <span className="grid place-items-center w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 text-accent2 font-display font-bold text-sm">
                T
              </span>
              <span className="font-display font-semibold tracking-tight text-[15px]">
                Tagoor<span className="text-faint"> Jayamangala</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`relative px-3.5 py-2 text-[13.5px] capitalize rounded-lg transition-colors ${
                    activeSection === s ? 'text-ink' : 'text-faint hover:text-ink'
                  }`}
                >
                  {s}
                  {activeSection === s && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent2/70" />
                  )}
                </button>
              ))}
              <button
                onClick={() => setIsLight(!isLight)}
                aria-label="Toggle theme"
                className="ml-1 grid place-items-center w-9 h-9 rounded-lg glass glass-hover text-sub hover:text-ink"
              >
                {isLight ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1.5 inline-flex items-center gap-1.5 text-[13.5px] font-medium px-4 py-2 rounded-lg bg-ink text-base hover:opacity-90 transition-opacity"
              >
                Résumé
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={() => setIsLight(!isLight)}
                aria-label="Toggle theme"
                className="grid place-items-center w-10 h-10 rounded-lg glass glass-hover text-sub"
              >
                {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                className="p-2 rounded-lg glass-hover glass"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden glass rounded-2xl mt-2 p-2">
              {NAV.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="block w-full text-left px-4 py-3 text-sm capitalize text-sub hover:text-ink rounded-lg hover:bg-line/5 transition-colors"
                >
                  {s}
                </button>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium px-4 py-3 rounded-lg bg-ink text-base"
              >
                Résumé <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[13px] text-sub glass rounded-full px-3.5 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent2" />
              </span>
              Open to AI &amp; Data Engineering opportunities
            </div>

            <h1 className="font-display font-extrabold tracking-tight leading-[1.04] text-[clamp(2.6rem,7vw,5rem)]">
              I build <span className="text-gradient">AI products</span> and{' '}
              <span className="text-gradient">data systems</span>
              <br className="hidden sm:block" /> that work in production.
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-sub leading-relaxed max-w-2xl">
              I'm <span className="text-ink font-medium">Tagoor Jayamangala</span> — an AI &amp; Data
              Engineer at <span className="text-ink font-medium">Welspun Transformation Services</span>.
              I've shipped four live systems — two LLM-powered agents and two data pipelines —
              used daily across the organization.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('work')}
                className="group inline-flex items-center gap-2 bg-accent text-white font-medium px-6 py-3.5 rounded-xl shadow-glow hover:bg-accent2 transition-colors"
              >
                Explore my work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 glass glass-hover px-6 py-3.5 rounded-xl font-medium"
              >
                Get in touch
              </button>
              <div className="flex items-center gap-1.5 sm:ml-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid place-items-center w-11 h-11 rounded-xl glass glass-hover text-sub hover:text-ink"
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            {/* stat strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden glass">
              {[
                { n: '4', l: 'Production systems' },
                { n: '2', l: 'LLM agents' },
                { n: '2', l: 'Data pipelines' },
                { n: '20+', l: 'Connected tools' },
              ].map((s) => (
                <div key={s.l} className="bg-line/[0.015] px-5 py-5">
                  <div className="font-display font-bold text-3xl accent-gradient">{s.n}</div>
                  <div className="text-[12.5px] text-faint mt-1 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <Section id="about" label="01" title="About">
        <div className="reveal grid md:grid-cols-[0.85fr_1.6fr] gap-10 lg:gap-14 items-start">
          <div className="md:sticky md:top-28">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-3xl bg-accent/20 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative glass rounded-3xl p-2">
                <img
                  src="https://i.postimg.cc/VNq9vSLf/Whats-App-Image-2025-03-31-at-14-09-47-e669fdc9.jpg"
                  alt="Tagoor Jayamangala"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-faint">
              <MapPin className="w-4 h-4 text-accent2" />
              Hyderabad, India · open to remote
            </div>
          </div>

          <div>
            <div className="space-y-5 text-lg leading-relaxed text-sub">
              <p className="text-ink">
                I'm an AI &amp; Data Engineer who cares about systems that actually run — not
                prototypes. In my first professional role at{' '}
                <span className="accent-gradient font-medium">Welspun Transformation Services</span>,
                I've taken four systems from blank repo to production.
              </p>
              <p>
                On the AI side I built <strong className="text-ink font-medium">Sintex</strong>, a
                multilingual WhatsApp agent for a plumber loyalty program with RAG over pipe &amp;
                tank product docs, and <strong className="text-ink font-medium">ChittiGPT</strong>,
                an enterprise HR copilot wiring 20+ company services into one agentic chat.
              </p>
              <p>
                On the data side I designed a two-layer KPI pipeline over 6 PostgreSQL databases and
                MongoDB, and a real-time funnel tracker that fuses three live sources every 60 seconds.
                I hold a Diploma in Data Analytics from SUNY Potsdam (Appuji Scholarship, 86%) and a
                Gold Certificate in Python from NASSCOM.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {[
                { k: 'Role', v: 'AI & Data Eng.' },
                { k: 'Company', v: 'Welspun (WTSL)' },
                { k: 'Languages', v: 'EN · TE · HI' },
                { k: 'Status', v: 'Open to roles' },
              ].map((x) => (
                <div key={x.k} className="glass rounded-2xl p-4">
                  <div className="text-[11px] uppercase tracking-wider text-faint">{x.k}</div>
                  <div className="font-medium text-sm mt-1.5 text-ink">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── SKILLS ───────── */}
      <Section id="skills" title="What I work with" label="02">
        <div className="stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="group glass glass-hover rounded-3xl p-6 flex flex-col"
            >
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-2xl mb-5">
                {skill.icon}
              </span>
              <h3 className="font-display font-semibold text-lg leading-tight mb-2.5">
                {skill.category}
              </h3>
              <p className="text-[14px] text-sub leading-relaxed mb-5">{skill.description}</p>
              <p className="mt-auto pt-4 border-t border-line/[0.08] text-[13px] text-faint leading-relaxed">
                {skill.items.slice(0, 6).join('  ·  ')}
                {skill.items.length > 6 && (
                  <span className="text-accent2"> +{skill.items.length - 6} more</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────── WORK ───────── */}
      <Section id="work" title="Selected work" label="03">
        <div className="reveal flex flex-wrap items-center gap-2 mb-9">
          <span className="text-sm text-faint mr-1">Filter</span>
          {([
            ['all', 'All'],
            ['genai', 'GenAI'],
            ['data', 'Data Eng'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                activeFilter === key
                  ? 'bg-accent text-white'
                  : 'glass glass-hover text-sub'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-5">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative w-full text-left glass glass-hover rounded-3xl p-5 sm:p-6 overflow-hidden hover:-translate-y-0.5 animate-fade-up"
            >
              <div className="grid sm:grid-cols-[auto_1fr_auto] gap-5 sm:gap-7 items-center">
                <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-2xl overflow-hidden border border-line/10 shrink-0">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 text-[12px] text-faint mb-2">
                    <span className="accent-gradient font-medium uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-faint" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl leading-tight mb-2 group-hover:text-accent2 transition-colors">
                    {project.shortName || project.title}
                  </h3>
                  <p className="text-[15px] text-sub leading-relaxed line-clamp-2 mb-3.5">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-line/[0.03] border border-line/[0.07] text-sub"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tools.length > 6 && (
                      <span className="text-[11px] px-2 py-0.5 text-faint">
                        +{project.tools.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:text-right shrink-0 sm:min-w-[120px]">
                  <div>
                    <div className="font-display font-bold text-2xl accent-gradient leading-none">
                      {project.metric}
                    </div>
                    <div className="text-[11px] text-faint mt-1.5 max-w-[130px] sm:ml-auto leading-tight">
                      {project.metricLabel}
                    </div>
                  </div>
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-line/10 text-sub group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ───────── EDUCATION ───────── */}
      <Section id="education" title="Education & credentials" label="04">
        <div className="stagger grid sm:grid-cols-2 gap-4">
          {[
            { t: 'Gold Certificate — Python', s: 'NASSCOM & 360DigiTMG', y: 'Gold', tag: 'Credential' },
            { t: 'B.Tech — Electrical & Electronics', s: 'S.R.K.R Engineering College', y: '7.93', tag: '2020–2024' },
            { t: 'Intermediate (MPC)', s: 'Sri Chaitanya Junior College', y: '9.75', tag: '2018–2020' },
          ].map((e) => (
            <div
              key={e.t}
              className="glass glass-hover rounded-3xl p-6 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider accent-gradient font-medium mb-2">{e.tag}</div>
                <h3 className="font-display font-semibold text-[16px] leading-snug">{e.t}</h3>
                <p className="text-sm text-sub mt-1.5">{e.s}</p>
              </div>
              <div className="font-display font-bold text-2xl text-ink shrink-0">{e.y}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────── CONTACT ───────── */}
      <Section id="contact" title="Let's build something" label="05">
        <div className="reveal relative glass rounded-[2rem] p-8 sm:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <Sparkles className="w-7 h-7 text-accent2 mb-5" />
              <p className="text-2xl sm:text-3xl font-display font-semibold leading-snug tracking-tight">
                I'm looking for <span className="accent-gradient">AI / GenAI Engineer</span> and{' '}
                <span className="accent-gradient">Data Engineer</span> roles — remote, hybrid, or
                on-site across India.
              </p>
              <p className="mt-5 text-sub leading-relaxed text-lg">
                If you're building intelligent systems where data pipelines and LLM applications work
                together, let's talk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:jayamangalatagore@gmail.com"
                  className="inline-flex items-center gap-2 bg-accent text-white font-medium px-6 py-3.5 rounded-xl shadow-glow hover:bg-accent2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email me
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 glass glass-hover px-6 py-3.5 rounded-xl font-medium"
                >
                  {copied ? <Check className="w-4 h-4 text-accent2" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy address'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail, label: 'jayamangalatagore@gmail.com', href: 'mailto:jayamangalatagore@gmail.com' },
                { icon: Phone, label: '+91 91826 19119', href: 'tel:+919182619119' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tagoor-jayamangala-b19a30283/' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/TagoorJ' },
                { icon: FileText, label: 'Résumé', href: RESUME_URL },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl bg-line/[0.02] border border-line/[0.07] px-5 py-3.5 hover:border-accent/30 hover:bg-line/[0.04] transition-colors group"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-accent/10 text-accent2 shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-sm truncate text-sub group-hover:text-ink transition-colors">{label}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-faint group-hover:text-accent2 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── FOOTER ───────── */}
      <footer className="relative z-10 border-t border-line/[0.06] py-9 mt-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-faint">© {new Date().getFullYear()} Tagoor Paramathma Jayamangala</p>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center w-9 h-9 rounded-lg glass glass-hover text-faint hover:text-ink"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

function Section({
  id, label, title, children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 py-20 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="reveal flex items-end gap-4 mb-12">
          <span className="font-display text-sm font-semibold accent-gradient">{label}</span>
          <h2 className="font-display font-bold text-3xl sm:text-[2.6rem] tracking-tight leading-none">
            {title}
          </h2>
          <span className="flex-1 h-px bg-line/[0.08] mb-2" />
        </div>
        {children}
      </div>
    </section>
  );
}

export default App;
