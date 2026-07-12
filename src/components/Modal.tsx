import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

const formatBullet = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>');

export function Modal({ project, onClose }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const Block = ({
    label, title, children,
  }: { label: string; title: string; children: React.ReactNode }) => (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-display text-xs font-semibold accent-gradient uppercase tracking-wider">{label}</span>
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <span className="flex-1 h-px bg-line/[0.08]" />
      </div>
      {children}
    </div>
  );

  const List = ({ items, plain = false }: { items: string[]; plain?: boolean }) => (
    <ul className="space-y-3">
      {items.map((point, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span className="text-accent2 text-base mt-0.5 shrink-0">›</span>
          {plain ? (
            <span className="text-sub">{point}</span>
          ) : (
            <span className="text-sub" dangerouslySetInnerHTML={{ __html: formatBullet(point) }} />
          )}
        </li>
      ))}
    </ul>
  );

  const chip = 'text-[11.5px] px-2.5 py-1 rounded-lg bg-line/[0.03] border border-line/[0.08] text-sub';

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black/75 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="modal-panel relative bg-raised text-ink w-full sm:max-w-3xl sm:rounded-3xl border border-line/[0.08] shadow-soft max-h-screen sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* header */}
        <div className="sticky top-0 z-10 backdrop-blur-md bg-raised/85 border-b border-line/[0.08] px-4 sm:px-6 py-4 flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-faint mb-1">
              <span className="accent-gradient font-medium uppercase tracking-wider">{project.category}</span>
              {project.year && <><span>·</span><span>{project.year}</span></>}
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 grid place-items-center w-10 h-10 rounded-xl border border-line/[0.08] text-sub hover:text-ink hover:border-accent/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* cover + summary */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6">
          {project.coverImage && (
            <div className="rounded-2xl overflow-hidden border border-line/[0.08] mb-5">
              <img src={project.coverImage} alt={project.title} decoding="async" className="w-full h-40 sm:h-52 object-cover" />
            </div>
          )}
          <div className="grid sm:grid-cols-[1fr_auto] gap-5 items-start">
            <p className="text-[16px] leading-relaxed text-sub">{project.summary}</p>
            {project.metric && (
              <div className="rounded-xl bg-accent/10 border border-accent/20 px-4 py-3 sm:text-right">
                <div className="font-display font-bold text-xl accent-gradient">{project.metric}</div>
                <div className="text-xs text-faint mt-1 max-w-[150px]">{project.metricLabel}</div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tools.map((t) => (
              <span key={t} className={chip}>{t}</span>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="p-4 sm:p-6 space-y-8 mt-1">
          {project.businessProblem?.length > 0 && (
            <Block label="Problem" title="The Problem"><List items={project.businessProblem.slice(0, 3)} plain /></Block>
          )}
          {project.businessObjective?.length > 0 && (
            <Block label="Goal" title="The Objective"><List items={project.businessObjective.slice(0, 3)} plain /></Block>
          )}
          {project.projectArchitecture?.description && (
            <Block label="Solution" title="How it works">
              <div className="rounded-2xl border border-line/[0.08] bg-line/[0.02] p-5">
                <List items={project.projectArchitecture.description.slice(0, 4)} />
              </div>
              {project.projectArchitecture.diagramUrl && (
                <img
                  src={project.projectArchitecture.diagramUrl}
                  alt="Architecture diagram"
                  className="mt-4 rounded-2xl border border-line/[0.08] w-full"
                />
              )}
            </Block>
          )}
          {project.techStack?.length > 0 && (
            <Block label="Stack" title="Tech Stack">
              <div className="space-y-4">
                {project.techStack.map((cat, i) => (
                  <div key={i}>
                    <h4 className="text-[11px] uppercase tracking-wider text-faint mb-2">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, j) => (
                        <span key={j} className={chip}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          )}
          {(project.constraints?.length > 0 || project.methodology?.length > 0 || project.keyLearnings?.length > 0) && (
            <details className="group rounded-2xl border border-line/[0.08] bg-line/[0.02] p-5">
              <summary className="cursor-pointer list-none font-display font-semibold flex items-center justify-between gap-4">
                More technical details
                <span className="text-accent2 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="mt-6 space-y-8 border-t border-line/[0.08] pt-6">
                {project.constraints?.length > 0 && (
                  <Block label="Limits" title="Constraints"><List items={project.constraints} plain /></Block>
                )}
                {project.methodology?.length > 0 && (
                  <Block label="Build" title="Implementation"><List items={project.methodology} plain /></Block>
                )}
                {project.keyLearnings?.length > 0 && (
                  <Block label="Learn" title="Key learnings"><List items={project.keyLearnings} plain /></Block>
                )}
              </div>
            </details>
          )}
          {project.visualizations && project.visualizations.length > 0 && (
            <Block label="Viz" title="Visualizations">
              <div className="grid sm:grid-cols-2 gap-4">
                {project.visualizations.map((url, i) => (
                  <img key={i} src={url} alt={`Visualization ${i + 1}`} className="rounded-2xl border border-line/[0.08] w-full" />
                ))}
              </div>
            </Block>
          )}
          {project.dashboardUrl && (
            <a
              href={project.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white font-medium px-5 py-3 rounded-xl shadow-glow hover:bg-accent2 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View live project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
