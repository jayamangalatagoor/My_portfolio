import { useState, useEffect } from 'react';
import {
  Linkedin, Mail, ArrowUpRight, Menu, X, Github,
  Phone, MapPin, FileText, Copy, Check, Sparkles, ArrowRight, Sun, Moon,
  BrainCircuit, Database, Code2, Server, CloudCog, BarChart3,
} from 'lucide-react';
import { Modal } from './components/Modal';
import { projects, skills } from './data';
import { Project } from './types';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const NAV = ['about', 'skills', 'work', 'education', 'contact'];
const RESUME_URL = `${import.meta.env.BASE_URL}resume/Tagoor_Jayamangala_Resume.pdf`;

const SOCIALS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/tagoor-jayamangala-b19a30283/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/TagoorJ', label: 'GitHub' },
  { icon: Mail, href: 'mailto:jayamangalatagore@gmail.com', label: 'Email' },
];

const SKILL_ICONS = [BrainCircuit, Database, Code2, Server, CloudCog, BarChart3];

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
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
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
  const [isLight, setIsLight] = useState(false);

  useReveal();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const updateScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
        frame = 0;
      });
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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

  const changeFilter = (filter: 'all' | 'genai' | 'data') => {
    const update = () => setActiveFilter(filter);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && document.startViewTransition) {
      document.startViewTransition(update);
    } else {
      update();
    }
  };

  return (
    <div className="relative min-h-screen bg-base text-ink font-body antialiased overflow-x-hidden">
      <a href="#about" className="skip-link">Skip to content</a>
      <div className="aura" aria-hidden />
      <div className="dynamic-backdrop" aria-hidden>
        <span className="mesh-blob mesh-blob-one" />
        <span className="mesh-blob mesh-blob-two" />
        <span className="mesh-blob mesh-blob-three" />
        <span className="light-ribbon ribbon-one" />
        <span className="light-ribbon ribbon-two" />
        <span className="contour-field" />
        <span className="perspective-grid" />
        <span className="energy-wave" />
        <span className="code-watermark watermark-one">{'{ DATA }'}</span>
        <span className="code-watermark watermark-two">PIPELINES // 01</span>
        <div className="pipeline-map">
          <span><Database />SOURCE</span><i />
          <span><Code2 />TRANSFORM</span><i />
          <span><Server />WAREHOUSE</span><i />
          <span><BarChart3 />INSIGHTS</span>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden />

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
        <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
          <nav className="nav-shell glass rounded-2xl h-14 sm:h-16 flex items-center justify-between px-3 sm:px-5">
            <button
              onClick={() => scrollTo('about')}
              className="brand-mark flex items-center gap-2.5 group"
            >
              <span className="grid place-items-center w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 text-accent2 font-display font-bold text-sm">
                T
              </span>
              <span className="font-display font-semibold tracking-tight text-[14px] sm:text-[15px]">
                Tagoor<span className="nav-full-name text-faint"> Jayamangala</span>
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
                className="ml-1.5 inline-flex items-center gap-2 text-[13.5px] font-semibold px-4 py-2.5 rounded-xl bg-accent text-white shadow-glow hover:bg-accent2 transition-colors"
              >
                View Resume
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
            <div className="mobile-menu md:hidden glass rounded-2xl mt-2 p-2">
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
                className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl bg-accent text-white shadow-glow"
              >
                View Resume <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* ───────── HERO ───────── */}
      <section className="hero-section relative z-10 pt-28 sm:pt-40 pb-12 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="reveal grid lg:grid-cols-[1.45fr_0.75fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-top flex flex-wrap items-center justify-between gap-4 mb-7">
                <div className="inline-flex items-center gap-2 text-[13px] text-sub glass rounded-full px-3.5 py-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent2" />
                  </span>
                  Open to new opportunities
                </div>
                <div className="hero-socials flex items-center gap-2" aria-label="Social links">
                  <span className="social-intro text-[13px] font-semibold text-accent mr-1">Find me online:</span>
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"
                      className="social-link inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl text-ink text-[13px] font-semibold">
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <p className="hero-eyebrow font-display font-semibold text-accent2 mb-3">Hello, I'm Tagoor.</p>
              <h1 className="hero-title font-display font-extrabold tracking-tight leading-[1.08] text-[clamp(2.35rem,5.2vw,4.5rem)] max-w-3xl">
                Data Engineer building{' '}
                <span className="text-gradient">intelligent, production-ready systems.</span>
              </h1>

              <p className="mt-6 text-lg text-sub leading-relaxed max-w-2xl">
                I build reliable data pipelines, analytics platforms, and AI-powered systems that
                turn complex enterprise data into useful products.
              </p>

              <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo('work')}
                  className="group inline-flex items-center gap-2 bg-accent text-white font-medium px-6 py-3.5 rounded-xl shadow-glow hover:bg-accent2 transition-colors"
                >
                  View projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 glass glass-hover px-6 py-3.5 rounded-xl font-medium"
                >
                  Contact me
                </button>
              </div>
            </div>

            <aside className="tech-sticker" aria-label="Animated data pipeline systems visualization">
              <div className="sticker-glow" aria-hidden />
              <div className="sticker-status"><i /> PIPELINE HEALTHY</div>
              <div className="sticker-orbit sticker-orbit-outer">
                <span className="orbit-chip chip-ai">ETL</span>
                <span className="orbit-chip chip-data">SQL</span>
                <span className="orbit-chip chip-api">AI</span>
              </div>
              <div className="sticker-orbit sticker-orbit-mid">
                <span className="orbit-particle particle-one" />
                <span className="orbit-particle particle-two" />
              </div>
              <div className="sticker-core">
                <span className="core-scan" />
                <span className="core-rings" />
                <Database className="core-icon" strokeWidth={1.35} />
                <span className="core-label">DATA CORE</span>
                <span className="core-version">ETL // STREAMING</span>
              </div>
              <div className="sticker-readout readout-right"><b>30+</b><span>DATA TOOLS</span></div>
              <div className="sticker-code" aria-hidden>
                <span>SQL</span><span>ETL</span><span>01</span><span>DB</span><span>AI</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="telemetry-shell relative z-10" aria-label="Technical capabilities">
        <div className="telemetry-track">
          {[0, 1].map((copy) => (
            <div className="telemetry-group" key={copy} aria-hidden={copy === 1}>
              {['LLM SYSTEMS', 'RAG PIPELINES', 'AGENTIC AI', 'REAL-TIME DATA', 'FASTAPI', 'CLOUD DEPLOYMENT'].map((item, index) => (
                <span key={item}><i className={index % 2 ? 'signal-dot cyan' : 'signal-dot'} />{item}<b>0{index + 1}</b></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── ABOUT ───────── */}
      <Section id="about" label="About me" title="Building useful systems, not just prototypes">
        <div className="reveal grid md:grid-cols-[0.72fr_1.6fr] gap-9 lg:gap-12 items-start">
          <div className="md:sticky md:top-28">
            <div className="relative group max-w-[280px] md:max-w-none mx-auto">
              <div className="absolute -inset-3 rounded-3xl bg-accent/20 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative glass rounded-3xl p-2">
                <img
                  src="https://i.postimg.cc/VNq9vSLf/Whats-App-Image-2025-03-31-at-14-09-47-e669fdc9.jpg"
                  alt="Tagoor Jayamangala"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center md:justify-start gap-2 text-sm text-faint">
              <MapPin className="w-4 h-4 text-accent2" />
              Hyderabad, India · open to remote
            </div>
          </div>

          <div>
            <div className="space-y-5 text-[17px] leading-relaxed text-sub max-w-2xl">
              <p className="text-ink">
                I turn AI and data ideas into dependable products. At{' '}
                <span className="accent-gradient font-medium">Welspun Transformation Services</span>,
                I take projects from initial design through deployment and support.
              </p>
              <p>
                My work includes multilingual WhatsApp assistants, enterprise HR copilots,
                multi-source ETL pipelines, and real-time analytics systems.
              </p>
              <p>
                I focus on practical outcomes: accurate data, safe automation, simple user
                experiences, and systems teams can maintain after launch.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8 max-w-2xl">
              {[
                { k: 'Role', v: 'AI & Data Eng.' },
                { k: 'Company', v: 'Welspun (WTSL)' },
                { k: 'Location', v: 'Hyderabad, India' },
                { k: 'Status', v: 'Open to opportunities' },
              ].map((x) => (
                <div key={x.k} className="stat-card glass rounded-2xl p-4">
                  <div className="text-[11px] uppercase tracking-wider text-faint">{x.k}</div>
                  <div className="font-medium text-sm mt-1.5 text-ink">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────── SKILLS ───────── */}
      <Section id="skills" title="Skills I use to deliver" label="Technical toolkit">
        <div className="stagger grid lg:grid-cols-2 gap-4">
          {skills.map((skill, index) => {
            const Icon = SKILL_ICONS[index];
            const visibleItems = skill.items.slice(0, 5);

            return (
              <article
                key={skill.category}
                className={`skill-card interactive-card group glass glass-hover rounded-2xl p-5 sm:p-6 ${index < 2 ? 'skill-card-featured' : ''}`}
              >
                <div className="flex gap-4 sm:gap-5 items-start">
                  <span className="skill-icon grid place-items-center w-11 h-11 rounded-xl shrink-0">
                    <Icon className="w-5 h-5 text-accent2" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display font-semibold text-lg leading-tight">{skill.category}</h3>
                      <span className="font-display text-xs text-faint shrink-0">0{index + 1}</span>
                    </div>
                    <p className="text-[14px] text-sub leading-relaxed mt-2">{skill.description}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line/[0.08] flex flex-wrap gap-2">
                  {visibleItems.map((item) => (
                    <span key={item} className="skill-chip">{item}</span>
                  ))}
                </div>

              </article>
            );
          })}
        </div>
      </Section>

      {/* ───────── WORK ───────── */}
      <Section id="work" title="Projects with real-world impact" label="Featured work">
        <div className="reveal flex flex-wrap items-center gap-2 mb-9">
          <span className="text-sm text-faint mr-1">Filter</span>
          {([
            ['all', 'All'],
            ['genai', 'GenAI'],
            ['data', 'Data Eng'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeFilter(key)}
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

        <div key={activeFilter} className="project-grid grid md:grid-cols-2 gap-5">
          {filtered.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="project-card interactive-card group relative w-full text-left glass glass-hover rounded-3xl overflow-hidden animate-fade-up"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-line/10">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="project-cover-image w-full h-full object-cover group-hover:scale-[1.035] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/[0.04] pointer-events-none" />
                  <div className="absolute right-4 bottom-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-2.5 text-right shadow-lg">
                    <div className="font-display font-bold text-xl text-white leading-none">{project.metric}</div>
                    <div className="text-[10px] text-white/80 mt-1 max-w-[130px] leading-tight">{project.metricLabel}</div>
                  </div>
              </div>

              <div className="p-5 sm:p-6">
                  <h3 className="font-display font-semibold text-xl sm:text-[1.35rem] leading-tight mb-2 group-hover:text-accent2 transition-colors">
                    {project.shortName || project.title}
                  </h3>
                  <p className="text-[14px] text-sub leading-relaxed mb-4">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pr-12">
                    {project.tools.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-line/[0.03] border border-line/[0.07] text-sub"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tools.length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 text-faint">
                        +{project.tools.length - 4} more
                      </span>
                    )}
                  </div>
                  <span className="absolute right-5 bottom-5 grid place-items-center w-10 h-10 rounded-full border border-line/10 text-sub group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* ───────── EDUCATION ───────── */}
      <Section id="education" title="Learning that shaped my foundation" label="Education & credentials">
        <div className="stagger grid sm:grid-cols-2 gap-4">
          {[
            { t: 'Gold Certificate — Python', s: 'NASSCOM & 360DigiTMG', y: 'Gold', tag: 'Credential' },
            { t: 'B.Tech — Electrical & Electronics', s: 'S.R.K.R Engineering College', y: '7.93', tag: '2020–2024' },
            { t: 'Intermediate (MPC)', s: 'Sri Chaitanya Junior College', y: '9.75', tag: '2018–2020' },
            { t: 'Secondary School Certificate (SSC)', s: 'Bhashyam E.M. High School · BSE Andhra Pradesh', y: '9.8', tag: '2017–2018' },
          ].map((e) => (
            <div
              key={e.t}
              className="education-card interactive-card glass glass-hover rounded-3xl p-6 flex items-start justify-between gap-4"
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
      <Section id="contact" title="Have a role or project in mind?" label="Let's work together">
        <div className="contact-panel reveal relative glass rounded-3xl p-5 sm:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <Sparkles className="sparkle-float w-7 h-7 text-accent2 mb-5" />
              <p className="text-xl sm:text-3xl font-display font-semibold leading-snug tracking-tight">
                I'm looking for <span className="accent-gradient">AI / GenAI Engineer</span> and{' '}
                <span className="accent-gradient">Data Engineer</span> roles — remote, hybrid, or
                on-site across India.
              </p>
              <p className="mt-5 text-sub leading-relaxed text-lg">
                If you're building intelligent systems where data pipelines and LLM applications work
                together, let's talk.
              </p>
              <div className="contact-actions mt-8 flex flex-wrap gap-3">
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
                { icon: FileText, label: 'View Resume', href: RESUME_URL },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link flex items-center gap-3.5 rounded-2xl bg-line/[0.02] border border-line/[0.07] px-5 py-3.5 hover:border-accent/30 hover:bg-line/[0.04] transition-colors group"
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
  const subtitles: Record<string, string> = {
    about: 'A quick look at my experience, approach, and the kind of problems I enjoy solving.',
    skills: 'The focused set of technologies I use across AI, backend, data, and deployment.',
    work: 'Selected production projects, the problems behind them, and the results they delivered.',
    education: 'Academic background and credentials supporting my engineering practice.',
    contact: 'I am open to AI Engineering and Data Engineering opportunities.',
  };

  return (
    <section id={id} className="relative z-10 py-14 sm:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="section-heading reveal max-w-3xl mb-9 sm:mb-11">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent2 mb-3">
            <span className="w-7 h-px bg-accent2/70" />
            {label}
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-[2.5rem] tracking-tight leading-[1.12]">
            {title}
          </h2>
          <p className="mt-3 text-sub leading-relaxed max-w-2xl">{subtitles[id]}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export default App;
