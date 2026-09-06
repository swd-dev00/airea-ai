import { ArrowRight, BookOpen, Building2, Fingerprint, Globe2, History, Search, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";

const programs = [
  { name: "KIFO", full: "Kentucky Institutional Futures Observatory", href: "/programs/kifo", description: "A living observatory for Kentucky institutions, regions, indicators, and futures.", tone: "teal" },
  { name: "AIREA Works", full: "Registered research and technical analysis", href: "/works", description: "Traceable works with claims, receipts, provenance, and append-preserving history.", tone: "moss" },
];

const surfaces = [
  [Users, "Researchers", "/researchers", "Profiles, affiliations, and contribution histories"],
  [BookOpen, "Registered works", "/works", "Research records with visible state and evidence"],
  [Fingerprint, "Evidence", "/evidence", "Receipts, capsules, observations, and integrity"],
  [Building2, "Institutions", "/institutions", "Organizations, regions, and institutional context"],
];

export default function AireaHome() {
  return <div className="institution-page">
    <header className="institution-nav"><Link href="/" className="institution-lockup"><span className="institution-mark">A</span><span><strong>AIREA.ai</strong><small>institutional intelligence</small></span></Link><nav><Link href="/works">Works</Link><Link href="/researchers">Researchers</Link><Link href="/programs/kifo">Programs</Link><Link href="/evidence">Evidence</Link></nav><button className="institution-search" aria-label="Search AIREA"><Search size={17} /></button></header>
    <main>
      <section className="institution-hero"><div className="institution-hero-copy"><span className="eyebrow-chip"><Globe2 size={13} /> AIREA / PUBLIC RESEARCH PLATFORM</span><h1>Research that keeps its <em>history.</em></h1><p>AIREA is an umbrella research and institutional intelligence platform for registered works, evidence, provenance, researcher profiles, and the programs that make sense of complex systems.</p><div className="hero-actions"><Link href="/works" className="primary-cta">Explore registered works <ArrowRight size={15} /></Link><Link href="/programs/kifo" className="secondary-cta">Enter KIFO <ArrowRight size={15} /></Link></div></div><div className="institution-hero-card"><div className="orbital-mark"><span></span><span></span><span></span><b>A</b></div><div><span className="mono-label">INSTITUTIONAL LAYER</span><strong>AIREA.ai</strong><p>Shared identity · evidence model · integrity infrastructure</p></div></div></section>
      <section className="platform-strip"><div><strong>01</strong><span>Umbrella institution</span></div><div><strong>04</strong><span>Core public surfaces</span></div><div><strong>∞</strong><span>Programs can grow here</span></div><div className="platform-strip-note"><ShieldCheck size={16} /> Provenance is inspectable by design</div></section>
      <section className="institution-section"><div className="section-kicker">THE AIREA ECOSYSTEM</div><div className="institution-section-heading"><h2>One research institution.<br /><em>Many instruments.</em></h2><p>Programs retain their own scope and identity while drawing on the same record architecture: claims, evidence, history, and integrity.</p></div><div className="program-grid">{programs.map((program) => <Link href={program.href} key={program.name} className={`program-tile ${program.tone}`}><span className="program-tile-top"><span>{program.name}</span><ArrowRight size={17} /></span><h3>{program.full}</h3><p>{program.description}</p><span className="tile-link">Open program <ArrowRight size={14} /></span></Link>)}</div></section>
      <section className="institution-section surfaces-section"><div className="section-kicker">SHARED INFRASTRUCTURE</div><div className="surface-grid">{surfaces.map(([Icon, title, href, desc]) => <Link href={href as string} className="surface-card" key={title as string}><Icon size={19} /><div><h3>{title as string}</h3><p>{desc as string}</p></div><ArrowRight size={15} /></Link>)}</div></section>
      <section className="institution-principle"><History size={20} /><div><span className="section-kicker">THE AIREA PRINCIPLE</span><h2>Preserve what happened.<br />Keep unknowns visible.</h2></div><p>Every work can change state without erasing the path that led there. Proof tiers describe available evidence—not a progress bar toward truth.</p></section>
    </main><footer className="institution-footer"><span>AIREA.ai · public research platform</span><span>Registered works · evidence · programs · history</span></footer>
  </div>;
}
