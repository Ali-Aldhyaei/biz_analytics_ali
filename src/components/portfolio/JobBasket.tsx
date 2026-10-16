import { motion } from "framer-motion";
import { Radar, Filter, Activity, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/portfolio/ui";

import shotSrc from "@/assets/jobbasket-new-preview.webp";
const shot = { url: shotSrc };
import shotFullSrc from "@/assets/jobbasket-new-full.png";
const shotFull = { url: shotFullSrc };

const ease = [0.2, 0.8, 0.2, 1] as const;

const features = [
  { icon: Radar, label: "Multi-source scrapers" },
  { icon: Filter, label: "Candidate filtering gates" },
  { icon: Activity, label: "Live AI tracking" },
];

export function JobBasket() {
  return (
    <section id="jobbasket" className="mx-auto grid max-w-[1600px] scroll-mt-28 items-center gap-12 px-6 py-24 md:grid-cols-[minmax(0,1fr)_340px] lg:gap-20 2xl:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
      >
        <SectionLabel index="04">Proprietary Build</SectionLabel>
        <h2 className="max-w-3xl text-3xl font-semibold uppercase leading-tight sm:text-4xl lg:text-5xl">
          Proprietary Build: <span className="text-gradient">JobBasket Automation Command Infrastructure</span>
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          I engineered a custom end-to-end remote job procurement and automation ecosystem. The platform integrates
          direct multi-source web scrapers, automated candidate filtering gates, and live background AI tracking
          protocols to actively monitor pipeline telemetry across{" "}
          <span className="text-foreground">15+ global job channels</span> simultaneously.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {features.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-2 border-l border-primary/40 py-1 pl-3 pr-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" /> {label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.15, ease }}
        className="relative isolate mx-auto w-full max-w-[320px]"
      >
        <div aria-hidden="true" className="absolute inset-2 -z-20 translate-x-3 -rotate-6 rounded-lg border border-accent/30 bg-accent/5" />
        <div aria-hidden="true" className="absolute inset-2 -z-10 -translate-x-3 rotate-3 rounded-lg border border-primary/30 bg-primary/5" />
        <a href={shotFull.url} target="_blank" rel="noreferrer" className="group relative block rounded-lg border border-border shadow-[var(--shadow-glow)] transition-transform duration-500 motion-safe:hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4" aria-label="Open full-size JobBasket screenshot">
          <img src={shot.url} loading="lazy" width={700} height={816} alt="JobBasket automation platform" className="block h-auto w-full rounded-lg" />
          <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border border-border bg-background/90 px-3 py-2 text-xs text-foreground backdrop-blur">View full size <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </a>
      </motion.div>
    </section>
  );
}
