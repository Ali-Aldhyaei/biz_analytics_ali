import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Mail,
  Download,
  Database,
  ShieldCheck,
  Bot,
  Users,
  Trophy,
  Moon,
  Handshake,
  ArrowUpRight,
  BarChart3,
  Ship,
  Check,
  Linkedin,
} from "lucide-react";
import aliSrc from "@/assets/ali.png";
const ali = { url: aliSrc };
import logoSrc from "@/assets/ad-logo.png";
const logo = { url: logoSrc };
import cvSrc from "@/assets/ali-cv.jpg";
const cv = { url: cvSrc };
import { SectionLabel } from "@/components/portfolio/ui";
import { JobBasket } from "@/components/portfolio/JobBasket";
import { TableauEmbed } from "@/components/portfolio/TableauEmbed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ali Aldhyaei — Data Architect & Business Analyst" },
      {
        name: "description",
        content:
          "Ali Aldhyaei: SQL pipelines, data cleaning and live Power BI & Tableau dashboards that turn raw data into business decisions.",
      },
      { property: "og:title", content: "Ali Aldhyaei — Data Architect & Business Analyst" },
      {
        property: "og:description",
        content: "Engineering clarity from chaos. SQL, data cleaning and interactive dashboards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EMAIL = "ali@bizanalytics.online";
const LINKEDIN = "https://www.linkedin.com/in/ali-aldhyaei-415a07431/?isSelfProfile=false";
const POWERBI_SRC =
  "https://app.powerbi.com/view?r=eyJrIjoiZjIwMzIzZjgtNDE3MS00NDdiLWFjOTAtY2NhZjkwNGYwNGY4IiwidCI6ImQxOWJmYWU3LWE1ODYtNDgyOS05MTE5LWJkYzUxZDg1NDFkOCJ9";

const skills = [
  "SQL",
  "Data Cleaning",
  "Data Analysis",
  "Excel",
  "Power BI",
  "Tableau",
  "Dashboard Design",
  "Data Visualization",
  "Business Analysis",
  "Data Storytelling",
];

const certs = [
  { name: "Google Data Analytics Professional Certificate", org: "Google" },
  { name: "Microsoft Power BI Data Analyst Professional Certificate", org: "Microsoft" },
  { name: "Google Project Management Professional Certificate", org: "Google" },
  { name: "Excel Skills for Business Specialization", org: "Macquarie University" },
  { name: "Prompt Engineering Specialization Certificate", org: "Vanderbilt University" },
];

const phases = [
  {
    icon: Handshake,
    title: "Closing Contract Deals",
    body: "I personally reached out to external Web3 founders, negotiated partnership terms, and signed cross-project collaboration and marketing contracts.",
  },
  {
    icon: Bot,
    title: "Setting up Bots",
    body: "I set up and connected 12 different bots to handle server safety, user support tickets, and chat tracking.",
  },
  {
    icon: Users,
    title: "Managing People & Money",
    body: "I tracked the project's costs, hired designers and programmers, trained staff, and let go of people who didn't meet goals.",
  },
  {
    icon: Trophy,
    title: "Running Events",
    body: "I organized multi-user gaming tournaments and handled the prize distribution logistics for the community.",
  },
  {
    icon: Moon,
    title: "Current Project Status & Evolution",
    body: "When the Web3 and NFT market slowed sharply, I made the executive decision to pause the roadmap and move the platform into a low-cost \"sleep mode\" to preserve resources — redirecting my full focus to core data systems, analytics, and infrastructure where demand is stable.",
  },
];

const ease = [0.2, 0.8, 0.2, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SpringTilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        x.set(px);
        y.set(py);
        ref.current!.style.setProperty("--mx", `${px * 100}%`);
        ref.current!.style.setProperty("--my", `${py * 100}%`);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Backdrop />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <CvPortal />
        <Bento />
        <JobBasket />
        <Dashboards />
        <Crypters />
      </main>
      <Footer />
    </div>
  );
}

function Backdrop() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const bg = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, color-mix(in oklab, var(--glow-2) 22%, transparent), transparent 60%), radial-gradient(900px circle at ${100 - (x as number)}% ${100 - (y as number)}%, color-mix(in oklab, var(--glow-3) 14%, transparent), transparent 65%)`,
  );
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-glow-1 opacity-25 blur-[140px] animate-drift" />
      <div
        className="absolute bottom-[-20%] right-[10%] h-[600px] w-[600px] rounded-full bg-glow-3 opacity-15 blur-[160px] animate-drift"
        style={{ animationDelay: "-11s" }}
      />
      <motion.div className="absolute inset-0" style={{ background: bg }} />
      <div className="absolute inset-0 grid-bg" />
    </div>
  );
}

function LinkedInNode({ big = false }: { big?: boolean }) {
  return (
    <motion.a
      href={LINKEDIN}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[image:var(--gradient-neon)] p-[1.5px] shadow-[var(--shadow-glow)]`}
    >
      <span
        className={`flex items-center gap-3 rounded-full bg-background/80 backdrop-blur ${big ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm"} font-medium`}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
          <Linkedin className="h-4 w-4" />
        </span>
        Connect on LinkedIn
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  );
}

function Nav() {
  const links = [
    ["CV", "#cv"],
    ["Stack", "#stack"],
    ["JobBasket", "#jobbasket"],
    ["Dashboards", "#dashboards"],
    ["Operations", "#crypters"],
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2">
        <a href="#top" className="flex min-w-0 items-center gap-2 font-display font-semibold">
          <img src={logo.url} alt="AD logo" className="h-9 w-12 shrink-0 object-contain" />
          <span className="hidden truncate sm:inline">Ali Aldhyaei</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex shrink-0 items-center overflow-hidden rounded-full bg-[image:var(--gradient-neon)] p-[1.5px] transition hover:shadow-[var(--shadow-glow)]"
        >
          <span className="rounded-full bg-background/85 px-4 py-1.5 text-sm font-medium backdrop-blur transition group-hover:bg-background/70">
            Contact
          </span>
        </a>

      </nav>
    </motion.header>
  );
}

function Hero() {
  const words = ["Ali Aldhyaei"];
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 pb-24 pt-36 lg:grid-cols-[1.3fr_1fr] lg:pt-44 2xl:px-16"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-muted-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-glow-2 animate-pulse-dot" />
          Data Architect · Business Analyst · Available
        </motion.div>
        <h1 className="font-semibold leading-[0.9] tracking-[-0.05em]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 1, ease }}
                className="block whitespace-nowrap pb-2 text-gradient text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
          className="mt-8 max-w-2xl text-[clamp(1.25rem,2.2vw,2rem)] font-display leading-tight text-foreground"
        >
          Engineering clarity from chaos.{" "}
          <span className="text-muted-foreground">Architecting enterprise data infrastructures.</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground"
        >
          Canadian Citizen // Database Logic, Data Cleaning, SQL Pipelines, and Interactive Live Dashboards.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <LinkedInNode big />
          <a
            href={`mailto:${EMAIL}`}
            className="glass flex items-center gap-3 rounded-full px-5 py-3 text-sm transition hover:bg-secondary"
          >
            <Mail className="h-4 w-4 text-primary" /> {EMAIL}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease }}
        className="relative mx-auto aspect-square w-full max-w-md 2xl:max-w-xl"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-border animate-spin-slow" />
        <div className="absolute inset-6 rounded-full bg-[image:var(--gradient-neon)] p-[2px] shadow-[var(--shadow-glow)]">
          <div className="h-full w-full overflow-hidden rounded-full bg-background">
            <img src={ali.url} alt="Ali Aldhyaei portrait" className="h-full w-full object-cover object-[50%_25%]" />
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute -bottom-2 -left-2 flex items-center gap-3 rounded-2xl px-3 py-3 sm:-left-8"
        >
          <img src={logo.url} alt="AD logo" className="h-12 w-16 object-contain" />
          <div>
            <div className="font-display text-sm font-semibold">Ali Aldhyaei</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Data Architect</div>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="glass neon-border absolute -right-2 top-6 rounded-full px-4 py-2 sm:-right-6"
        >
          <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-glow-2 animate-pulse-dot" />
            <span className="text-gradient">AI Integration Expert</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CvPortal() {
  return (
    <section id="cv" className="mx-auto max-w-[1600px] scroll-mt-28 px-6 py-24 2xl:px-16">
      <Reveal>
        <SectionLabel index="02">My Technical Dossier</SectionLabel>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="glass rounded-3xl p-8 sm:p-12">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-gradient">
            Data Architect & Business Analyst
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I'm a Data & Business Analyst with hands-on experience in{" "}
            <span className="text-foreground">SQL, data cleaning, and building interactive dashboards</span> — turning
            raw data into clear insights that drive better business decisions.
          </p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {[
              ["Citizenship", "Canadian"],
              ["Languages", "English · Arabic"],
              ["Certifications", "5 Professional"],
            ].map(([k, v]) => (
              <motion.div key={k} variants={item} className="rounded-2xl border border-border bg-muted/40 p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="mt-1 font-display font-medium">{v}</div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        <Reveal delay={0.15} className="glass group flex flex-col overflow-hidden rounded-3xl p-5">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-4/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-2/70" />
            <span className="ml-2">ali_aldhyaei ~ /dossier</span>
          </div>
          <SpringTilt className="relative max-h-[420px] flex-1 overflow-hidden rounded-2xl border border-border">
            <a href={cv.url} target="_blank" rel="noreferrer">
              <img src={cv.url} alt="Ali Aldhyaei CV preview" className="w-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </a>
          </SpringTilt>
          <a
            href={cv.url}
            download="Ali-Aldhyaei-CV.jpg"
            className="neon-border mt-5 flex items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-4 text-sm font-medium transition hover:shadow-[var(--shadow-glow)]"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Download My CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Bento() {
  return (
    <section id="stack" className="mx-auto max-w-[1600px] scroll-mt-28 px-6 py-24 2xl:px-16">
      <Reveal>
        <SectionLabel index="03">My Intelligence Grid</SectionLabel>
        <h2 className="mb-12 max-w-3xl text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.02]">
          The stack I engineer with. <span className="text-muted-foreground">Tuned for insight.</span>
        </h2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-6">
        <Reveal className="glass rounded-3xl p-8 md:col-span-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Database className="h-4 w-4 text-primary" /> MY_CORE_STACK · {skills.length} modules I've mastered
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {skills.map((s, i) => (
              <motion.span
                key={s}
                variants={item}
                whileHover={{ scale: 1.08, y: -3 }}
                className="flex cursor-default items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm transition-colors hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-glow-2 animate-pulse-dot"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
                {s}
              </motion.span>
            ))}
          </motion.div>
        </Reveal>
        <Reveal delay={0.1} className="glass flex flex-col justify-between rounded-3xl p-8 md:col-span-2">
          <div className="font-mono text-xs text-muted-foreground">I SPEAK</div>
          <div className="mt-6 space-y-3">
            {["English", "Arabic"].map((l) => (
              <div key={l} className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
                <span className="font-display">{l}</span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-primary">
                  <Check className="h-3 w-3" /> Fluent
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="md:col-span-6">
          <div className="mb-4 mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" /> CREDENTIALS I'VE EARNED
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certs.map((c) => (
              <div
                key={c.name}
                className="glass flex min-h-[170px] flex-col justify-between rounded-3xl border border-border p-6 transition-shadow hover:shadow-[var(--shadow-glow)]"
              >
                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">{c.org}</div>
                  <div className="mt-3 font-display text-lg font-semibold leading-snug">{c.name}</div>
                </div>
                <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>VERIFIED · MY CREDENTIAL</span>
                  <ShieldCheck className="h-4 w-4 text-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DashMeta({
  tag,
  name,
  icon: Icon,
  context,
  impact,
}: {
  tag: string;
  name: string;
  icon: typeof Ship;
  context: string;
  impact: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-neon)]">
          <Icon className="h-5 w-5 text-foreground" />
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{tag}</div>
          <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">{name}</h3>
        </div>
      </div>
      <div className="space-y-4 text-sm text-muted-foreground">
        <div>
          <div className="mb-1 font-mono text-[10px] uppercase tracking-widest">How I architected it</div>
          {context}
        </div>
        <div>
          <div className="mb-1 font-mono text-[10px] uppercase tracking-widest">Impact</div>
          {impact}
        </div>
      </div>
    </div>
  );
}

function Dashboards() {
  return (
    <section id="dashboards" className="mx-auto max-w-[1600px] scroll-mt-28 space-y-10 px-6 py-24 2xl:px-16">
      <Reveal>
        <SectionLabel index="05">My Live Dashboards</SectionLabel>
      </Reveal>
      <PowerBiEngine />
      <TableauDeck />
    </section>
  );
}

function PowerBiEngine() {
  const [loaded, setLoaded] = useState(false);
  return (
    <Reveal className="glass rounded-[2rem] p-6 sm:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_600px]">
        <DashMeta
          tag="Container 01 · Power BI Engine"
          name="Customer Revenue Intelligence"
          icon={BarChart3}
          context="I engineered this entirely within the Microsoft Power BI ecosystem."
          impact="I built it to track subscription contract behaviors and isolate consumer revenue leaks across 7,000 active customer rows."
        />
        <div className="relative mx-auto aspect-[600/373.5] w-full max-w-[600px] overflow-hidden rounded-xl border border-border bg-background/60">
          {!loaded && <div className="absolute inset-0 skeleton" />}
          <iframe
            title="Customer Revenue Intelligence (1)"
            src={POWERBI_SRC}
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="relative h-full w-full rounded-xl border-0"
          />
        </div>
      </div>
    </Reveal>
  );
}

function TableauDeck() {
  return (
    <Reveal className="glass rounded-[2rem] p-6 sm:p-10">
      <div className="mb-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <DashMeta
          tag="Container 02 · Tableau Operations Deck"
          name="Maritime Operations Command Center"
          icon={Ship}
          context="I engineered this entirely within the Tableau Public application framework."
          impact="I built it to map global logistics telemetry, tracking transit risk levels, route disruptions, and delayed financial impacts across critical shipping ports."
        />
        <div className="border-l border-primary/30 pl-4 text-sm">
          <p className="mb-2 leading-relaxed text-muted-foreground">If the dashboard doesn’t load, use this direct link.</p>
          <a
            href="https://public.tableau.com/views/MaritimeOperationsCommandCenter/OperationsCommandCenter?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
          >
            Open on Tableau Public <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
      <TableauEmbed />
    </Reveal>
  );
}

function Crypters() {
  const [open, setOpen] = useState(0);
  return (
    <section id="crypters" className="mx-auto max-w-5xl scroll-mt-28 px-6 py-24">
      <Reveal>
        <SectionLabel index="06">My Operations · Crypters Desert</SectionLabel>
      </Reveal>
      <Reveal className="neon-border glass rounded-3xl p-8 sm:p-10">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">Crypters Desert Infrastructure</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          I ran a digital community of over 550 members — setting up 12 automation bots, managing the project budget,
          and hiring and firing contract workers.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            ["550+", "Members"],
            ["12", "Bots"],
            ["5", "Phases"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl font-semibold text-gradient sm:text-4xl">{n}</div>
              <div className="font-mono text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <p className="mt-10 font-mono text-xs text-muted-foreground">
        // I built the entire backend structure from scratch.
      </p>
      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative mt-8 border-l border-border pl-8"
      >
        {phases.map((p, i) => {
          const isOpen = open === i;
          return (
            <motion.li key={p.title} variants={item} className="relative mb-4">
              <span
                className={`absolute -left-[41px] top-5 h-5 w-5 rounded-full border transition ${
                  isOpen ? "border-primary bg-primary shadow-[var(--shadow-glow)]" : "border-border bg-background"
                }`}
              />
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="glass w-full rounded-2xl p-5 text-left transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <p.icon className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] text-muted-foreground">[Phase 0{i + 1}] · Led by me</div>
                    <div className="font-display text-lg font-medium">{p.title}</div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{isOpen ? "−" : "+"}</span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                    >
                      {p.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-16">
      <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <img src={logo.url} alt="AD logo" className="h-20 w-32 object-contain" />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none">
          Let's architect your next <span className="text-gradient">data breakthrough</span> together.
        </h2>
        <p className="text-lg text-muted-foreground">I'm ready when you are. Drop me a line below.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <LinkedInNode big />
          <a
            href={`mailto:${EMAIL}`}
            className="glass flex items-center gap-3 rounded-full px-5 py-3 text-sm transition hover:bg-secondary"
          >
            <Mail className="h-4 w-4 text-primary" /> {EMAIL}
          </a>
        </div>
        <div className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Ali Aldhyaei</div>
      </Reveal>
    </footer>
  );
}
