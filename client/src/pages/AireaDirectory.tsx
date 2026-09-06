import { ArrowLeft, Building2, CheckCircle2, ChevronRight, Fingerprint, Globe2, Network, Search, ShieldCheck, Users } from "lucide-react";
import { Link, useLocation } from "wouter";

type DirectoryKind = "researchers" | "evidence" | "institutions";

const pageData: Record<DirectoryKind, { eyebrow: string; title: string; intro: string; icon: typeof Users; stats: [string, string][]; rows: { title: string; meta: string; detail: string; href?: string }[] }> = {
  researchers: {
    eyebrow: "AIREA / RESEARCHERS",
    title: "People behind the record.",
    intro: "Researcher profiles connect works, claims, observations, and institutional affiliations without collapsing contribution into a single author field.",
    icon: Users,
    stats: [["Registered researchers", "18"], ["Active works", "27"], ["Affiliations tracked", "42"]],
    rows: [
      { title: "Sierra N. Warren", meta: "AUTHOR · SIERRA WARREN DEVELOPMENTS, LLC", detail: "1 registered work · 7 artifacts · AIREA-WORK-0001", href: "/works/airea-work-0001" },
      { title: "KIFO Research Desk", meta: "PROGRAM TEAM · KENTUCKY INSTITUTIONAL FUTURES OBSERVATORY", detail: "12 regional records · 84 institutions indexed", href: "/programs/kifo" },
      { title: "AIREA Observatory Contributors", meta: "COLLABORATIVE PROFILE · INSTITUTIONAL INTELLIGENCE", detail: "Shared observations, receipts, and methodological notes" },
    ],
  },
  evidence: {
    eyebrow: "AIREA / EVIDENCE",
    title: "Every claim has a path.",
    intro: "Evidence is a first-class institutional layer: observation records, capsules, receipts, artifacts, and integrity events remain inspectable independently of the work they support.",
    icon: Fingerprint,
    stats: [["Registered artifacts", "146"], ["Evidence capsules", "32"], ["Integrity receipts", "218"]],
    rows: [
      { title: "Observation Records", meta: "MACHINE-READABLE · AIREA OBSERVATION RECORD V0.1", detail: "38 records · claims, probes, conditions, outputs, and integrity" },
      { title: "Evidence Capsules", meta: "PORTABLE RECEIPT BUNDLE · SHA-256 INTEGRITY", detail: "32 capsules · file entries, receipt refs, provenance, and reproduction" },
      { title: "Work 0001 evidence path", meta: "AIREA-WORK-0001 · MIXED EVIDENCE", detail: "7 artifacts · 3 claims · 2 conflict sets", href: "/works/airea-work-0001" },
    ],
  },
  institutions: {
    eyebrow: "AIREA / INSTITUTIONS",
    title: "Context for institutional change.",
    intro: "Institutions are the durable context around a claim: organizations, regions, affiliations, and systems whose histories shape what the evidence can mean.",
    icon: Building2,
    stats: [["Institutions indexed", "84"], ["Regions represented", "12"], ["Programs connected", "04"]],
    rows: [
      { title: "Kentucky Institutional Futures Observatory", meta: "PROGRAM · COMMONWEALTH OF KENTUCKY", detail: "84 institutions · 12 regions · 27 open concerns", href: "/programs/kifo" },
      { title: "Sierra Warren Developments, LLC", meta: "ORGANIZATION · RESEARCH AND DEVELOPMENT", detail: "1 researcher · 1 registered work · 7 artifacts" },
      { title: "Commonwealth regional index", meta: "GEOGRAPHIC CONTEXT · KENTUCKY", detail: "Bluegrass, Cumberland, Louisville Metro, Pennyroyal, Purchase, Western Coalfield", href: "/programs/kifo/regions" },
    ],
  },
};

export default function AireaDirectory({ kind }: { kind: DirectoryKind }) {
  const [location] = useLocation();
  const data = pageData[kind];
  const Icon = data.icon;
  return <div className="directory-page"><header className="institution-nav"><Link href="/" className="institution-lockup"><span className="institution-mark">A</span><span><strong>AIREA.ai</strong><small>institutional intelligence</small></span></Link><nav><Link href="/works">Works</Link><Link href="/researchers">Researchers</Link><Link href="/programs/kifo">Programs</Link><Link href="/evidence">Evidence</Link><Link href="/institutions">Institutions</Link></nav><button className="institution-search" aria-label="Search AIREA"><Search size={17} /></button></header><main className="directory-main"><Link href="/" className="back-link"><ArrowLeft size={14} /> AIREA home</Link><section className="directory-hero"><div><span className="eyebrow-chip"><Icon size={13} /> {data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p></div><div className="directory-hero-mark"><Icon size={32} /><span className="mono-label">SHARED AIREA LAYER</span><strong>Inspectable by design</strong></div></section><section className="directory-stats">{data.stats.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section><section className="directory-body"><div className="directory-list-head"><div><span className="section-kicker">REGISTERED OBJECTS</span><h2>Explore the {kind} record</h2></div><button className="directory-filter"><Network size={14} /> All connected</button></div><div className="directory-list">{data.rows.map((row) => { const content = <><div className="directory-row-icon"><Icon size={17} /></div><div className="directory-row-copy"><strong>{row.title}</strong><span>{row.meta}</span><p>{row.detail}</p></div><div className="directory-row-state"><CheckCircle2 size={14} /><small>CONNECTED</small></div><ChevronRight size={16} /></>; return row.href ? <Link href={row.href} className="directory-row" key={row.title}>{content}</Link> : <div className="directory-row" key={row.title}>{content}</div>; })}</div></section><section className="directory-principle"><ShieldCheck size={18} /><div><span className="section-kicker">AIREA INFRASTRUCTURE</span><h2>Objects stay typed.<br />Relationships stay visible.</h2></div><p>Researchers, evidence, and institutions can connect across programs without losing their own identity or provenance.</p></section></main><footer className="institution-footer"><span>AIREA.ai · {location.replace("/", "")}</span><span><Globe2 size={11} /> Shared identity · evidence · history · integrity</span></footer></div>;
}
