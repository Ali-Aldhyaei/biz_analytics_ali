import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/portfolio/ui";

import jbLogo from "@/assets/jobbasket-logo.webp";
import jbPreview from "@/assets/jobbasket-preview.webp";
import jbFull from "@/assets/jobbasket-full.webp";
import cfLogo from "@/assets/crypfish-icon.webp";
import cfPresenter from "@/assets/crypfish-presenter.webp";

const ease = [0.2, 0.8, 0.2, 1] as const;

type Project = {
  id: string;
  index: string;
  label: string;
  logo: string;
  name: string;
  tagline: string;
  intro: string;
  points: string[];
  skills: string[];
  image: { src: string; full: string; w: number; h: number; alt: string };
};

const projects = [
  {
    id: "jobbasket",
    index: "04",
    label: "Project · JobBasket",
    logo: jbLogo,
    name: "JobBasket",
    tagline: "AI Job-Screening App",
    intro:
      "A personal job-screening app I built with Google AI Studio from my own requirements. It pulls remote jobs from 8 automatic sources plus 3 on-demand sources, reads each posting, removes jobs that fail my eligibility rules (location, contract type, language, experience, scam checks), and shows the rest with a tailored pitch. It also tracks my applications and matches employer email replies to each job.",
    points: [
      "Defined the requirements and eligibility rules and directed an AI app builder through iterative prompts.",
      "Integrated 8 automatic job APIs and 3 on-demand sources, managing API keys, quotas, and spending limits.",
      "Designed a screening funnel and a 6-point fit checklist.",
      "Ran a 75-search data collection (8,194+ records) to stress-test the screening logic.",
      "Tested every version and reported 15+ defects, including wrong eligibility verdicts and mismatched counters.",
    ],
    skills: ["Prompt Engineering", "Quality Assurance Testing", "Google AI Studio", "REST APIs"],
    image: { src: jbPreview, full: jbFull, w: 900, h: 626, alt: "JobBasket app screen" },
  },
  {
    id: "crypfish",
    index: "05",
    label: "Project · Crypfish",
    logo: cfLogo,
    name: "Crypfish",
    tagline: "AI Trading System",
    intro:
      "An AI-assisted crypto trading pipeline running 24/7 on a cloud server, built with AI-written code from my specifications.",
    points: [
      "Designed the strategy: 1-day trend filter (50-EMA), 4-hour support mapping, and 15-minute breakout triggers.",
      "Set up and secured an Ubuntu server on Linode (Frankfurt) with systemd, tmux, and protected credentials; managed the code on GitHub.",
      "Installed, configured, and ran three AI models: Kronos (price forecasting), FinBERT (news sentiment), and Gemini (risk auditor).",
      "Defined order-book rules using live Level 2 data and set risk rules: 30% cash reserve, a 3-minute circuit breaker, and 2:1 bracket orders.",
      "Connected a Telegram bot for trade alerts and post-trade reviews.",
    ],
    skills: ["Telegram", "Git", "Linux", "GitHub", "REST APIs"],
    image: { src: cfPresenter, full: cfPresenter, w: 1000, h: 545, alt: "Crypfish presentation" },
  },
] satisfies [Project, Project];

function ProjectSection({ p }: { p: Project }) {
  return (
    <section id={p.id} className="mx-auto grid max-w-[1600px] scroll-mt-28 items-center gap-12 px-6 py-24 md:grid-cols-[minmax(0,1fr)_380px] lg:gap-20 2xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
      >
        <SectionLabel index={p.index}>{p.label}</SectionLabel>
        <div className="flex items-center gap-4">
          <img src={p.logo} alt={`${p.name} logo`} className="h-14 w-14 shrink-0 rounded-xl border border-border object-cover" />
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            {p.name} <span className="text-gradient">— {p.tagline}</span>
          </h2>
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{p.intro}</p>
        <ul className="mt-6 max-w-3xl space-y-3">
          {p.points.map((pt) => (
            <li key={pt} className="border-l border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground">
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.skills.map((s) => (
            <span key={s} className="rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-foreground">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.15, ease }}
        className="relative isolate mx-auto w-full max-w-[380px]"
      >
        <div aria-hidden="true" className="absolute inset-2 -z-20 translate-x-3 -rotate-6 rounded-lg border border-accent/30 bg-accent/5" />
        <div aria-hidden="true" className="absolute inset-2 -z-10 -translate-x-3 rotate-3 rounded-lg border border-primary/30 bg-primary/5" />
        <a href={p.image.full} target="_blank" rel="noreferrer" className="group relative block rounded-lg border border-border shadow-[var(--shadow-glow)] transition-transform duration-500 motion-safe:hover:-translate-y-2" aria-label={`Open full-size ${p.name} image`}>
          <img src={p.image.src} loading="lazy" width={p.image.w} height={p.image.h} alt={p.image.alt} className="block h-auto w-full rounded-lg" />
          <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border border-border bg-background/90 px-3 py-2 text-xs text-foreground backdrop-blur">View full size <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </a>
      </motion.div>
    </section>
  );
}

export function JobBasket() {
  return <ProjectSection p={projects[0]} />;
}

export function Crypfish() {
  return <ProjectSection p={projects[1]} />;
}
