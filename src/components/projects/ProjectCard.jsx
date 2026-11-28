import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code2, Database, Dumbbell, ExternalLink, LockKeyhole, ShieldCheck, Workflow } from 'lucide-react';

const projectIcons = {
  'sqlsense': Database,
  'honeypot-system': ShieldCheck,
  'file-encryption-tool': LockKeyhole,
  'workout-planning-app': Dumbbell,
  'api-automation-generator': Workflow,
};

const routeMap = {
  'sqlsense': 'sqlsense',
  'honeypot-system': 'honeypot-system',
  'file-encryption-tool': 'file-encryption-tool',
  'workout-planning-app': 'heuristic-workout-app',
  'api-automation-generator': 'dynamic-api-generator'
};

export const ProjectCard = ({ project, isFeatured }) => {
  const ProjectIcon = projectIcons[project.id] || Code2;
  const pathId = routeMap[project.id] || project.id;
  const topOutcomes = Object.entries(project.metrics || {}).slice(0, 3);
  const topTags = (project.tags || []).slice(0, 4);
  const extraTagCount = Math.max(0, (project.tags?.length || 0) - topTags.length);

  return (
    <div className={`h-full group ${isFeatured ? 'md:col-span-2' : 'col-span-1'}`}>
      <article className="relative glass-panel card-hover-effect rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between space-y-5">
        {/* Top Row: Icon + Quiet Category/Featured Label */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#E8EDF1] dark:bg-[#1D242E] text-[#087F79] dark:text-[#55D6C8] flex items-center justify-center shrink-0">
                <ProjectIcon aria-hidden="true" className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#5B6573] dark:text-[#A7B0BC] truncate">
                {project.category}
              </span>
            </div>

            {isFeatured && (
              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#087F79]/10 text-[#087F79] dark:bg-[#55D6C8]/15 dark:text-[#55D6C8] shrink-0">
                Featured
              </span>
            )}
          </div>

          {/* Primary Focus: Project Name & Concise Description */}
          <div className="space-y-2">
            <h4 className="text-lg sm:text-xl font-bold text-[#17202B] dark:text-[#F4F6F8] group-hover:text-[#087F79] dark:group-hover:text-[#55D6C8] transition-colors">
              {project.title}
            </h4>
            <p className="text-sm text-[#5B6573] dark:text-[#A7B0BC] leading-relaxed font-sans">
              {project.shortDescription}
            </p>
          </div>

          {/* Key Outcomes Strip (quiet surface, no nested card outlines) */}
          {topOutcomes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#E8EDF1]/75 dark:bg-[#1D242E]/75 font-mono">
              {topOutcomes.map(([key, val]) => (
                <div key={key} className="space-y-0.5 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#5B6573] dark:text-[#A7B0BC] block">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-xs font-semibold text-[#17202B] dark:text-[#F4F6F8] block truncate" title={val}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Restrained Tech Tags + Clear Source Code / Case Study Links */}
        <div className="space-y-4 pt-4 border-t border-[#17202B]/10 dark:border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-1.5">
            {topTags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-[#E8EDF1] dark:bg-[#1D242E] text-[#17202B] dark:text-[#F4F6F8]"
              >
                {tag}
              </span>
            ))}
            {extraTagCount > 0 && (
              <span className="text-[11px] font-mono text-[#5B6573] dark:text-[#A7B0BC] px-1">
                +{extraTagCount} more
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3 text-xs font-mono">
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#5B6573] hover:text-[#17202B] dark:text-[#A7B0BC] dark:hover:text-[#F4F6F8] py-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              <span>Source Code</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <Link
              to={`/projects/${pathId}`}
              className="inline-flex items-center gap-1 font-bold text-[#087F79] dark:text-[#55D6C8] hover:underline py-1 rounded transition-colors group/case focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] dark:focus-visible:ring-[#55D6C8]"
            >
              <span>Case Study</span>
              <ChevronRight className="w-4 h-4 group-hover/case:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
