import { ArrowLeft, ArrowRight, BarChart3, BookOpen, CalendarDays, ChevronRight, Compass, Filter, Map, Search, ShieldCheck, Waypoints } from "lucide-react";
import { Link, useLocation } from "wouter";

const nav = [
  ["/programs/kifo", "Overview", Compass],
  ["/programs/kifo/atlas", "Atlas", Map],
  ["/programs/kifo/explorer", "Explorer", Search],
  ["/programs/kifo/regions", "Regions", Waypoints],
  ["/programs/kifo/indicators", "Indicators", BarChart3],
  ["/programs/kifo/methodology", "Methodology", BookOpen],
  ["/programs/kifo/history", "History", CalendarDays],
] as const;

const indicators = [
  ["Institutional capacity", "68", "12 regions indexed", "teal"],
  ["Future pressure", "4.2×", "compared to 2018 baseline", "coral"],
  ["Open concerns", "27", "across 6 domains", "amber"],
];

const regions = ["Bluegrass", "Cumberland", "Louisville Metro", "Pennyroyal", "Purchase", "Western Coalfield"];

export default function KifoProgram() {
  const [location, setLocation] = useLocation();
  const active = nav.find(([href]) => href === location) || nav[0];
  const isSubpage = location !== "/programs/kifo";
  const pageTitle = active[1] === "Overview" ? "Kentucky Institutional Futures Observatory" : active[1];
  return <div className="kifo-page">
    <header className="kifo-topbar"><Link href="/" className="kifo-parent"><span className="kifo-parent-mark">A</span><span>AIREA.ai</span></Link><ChevronRight size={14} /><span className="kifo-breadcrumb">PROGRAMS / KIFO</span><div className="kifo-top-actions"><Link href="/works">AIREA works</Link><button aria-label="Search KIFO"><Search size={16} /></button></div></header>
    <div className="kifo-layout"><aside className="kifo-rail"><div className="kifo-brand"><span className="kifo-seal">K</span><div><strong>KIFO</strong><small>Kentucky Institutional<br />Futures Observatory</small></div></div><div className="kifo-rail-label">PROGRAM VIEWS</div><nav>{nav.map(([href, label, Icon]) => <button key={href} className={location === href ? "active" : ""} onClick={() => setLocation(href)}><Icon size={15} /><span>{label}</span>{location === href && <ArrowRight size={13} />}</button>)}</nav><div className="kifo-rail-bottom"><ShieldCheck size={15} /><span>Powered by AIREA evidence<br />and provenance infrastructure</span></div></aside>
      <main className="kifo-main"><section className="kifo-hero"><div><span className="kifo-eyebrow">KIFO / {isSubpage ? active[1].toUpperCase() : "PROGRAM LANDING"}</span><h1>{pageTitle}</h1><p>{isSubpage ? `A KIFO research surface for ${active[1].toLowerCase()}, grounded in Kentucky-specific indicators, institutions, regions, concerns, and timelines.` : "A living research instrument for seeing how Kentucky institutions are changing, where pressure is accumulating, and what futures remain possible."}</p></div><div className="kifo-hero-meta"><span>PROGRAM ID</span><strong>KIFO-001</strong><span>SCOPE</span><strong>Commonwealth of Kentucky</strong><span>STATE</span><strong className="teal-text">ACTIVE OBSERVATORY</strong></div></section>
        {isSubpage ? <SubpageView title={active[1]} /> : <Overview />}
      </main></div><footer className="kifo-footer"><span>KIFO is a named program within <Link href="/">AIREA.ai</Link></span><span>Claims and evidence remain inspectable at the institutional layer.</span></footer>
  </div>;
}

function Overview() { return <>
  <section className="kifo-signal-grid">{indicators.map(([label, value, detail, tone]) => <div className={`kifo-signal ${tone}`} key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</section>
  <section className="kifo-content-grid"><div className="kifo-panel kifo-map-panel"><div className="kifo-panel-head"><div><span className="kifo-eyebrow">01 / KENTUCKY ATLAS</span><h2>Institutions in motion</h2></div><Link href="/programs/kifo/atlas">Open Atlas <ArrowRight size={14} /></Link></div><div className="kentucky-map"><div className="map-outline"></div>{[18,31,44,58,70,81].map((left, index) => <span className={`map-node node-${index}`} style={{ left: `${left}%`, top: `${28 + (index % 3) * 18}%` }} key={left}></span>)}</div><div className="map-caption"><span><i className="map-dot teal-dot"></i>indexed institution</span><span><i className="map-dot coral-dot"></i>open concern</span><span>12 regions · 84 institutions</span></div></div><div className="kifo-panel"><div className="kifo-panel-head"><div><span className="kifo-eyebrow">02 / CURRENT CONCERNS</span><h2>What needs attention</h2></div><Link href="/programs/kifo/explorer">Explore <ArrowRight size={14} /></Link></div><div className="concern-list"><Concern label="Workforce continuity" count="09" tone="coral" detail="5 regions affected" /><Concern label="Institutional succession" count="07" tone="amber" detail="12 open records" /><Concern label="Civic infrastructure" count="06" tone="teal" detail="3 new this month" /><Concern label="Data visibility" count="05" tone="moss" detail="2 evidence gaps" /></div></div></section>
  <section className="kifo-lower-grid"><div className="kifo-panel"><div className="kifo-panel-head"><div><span className="kifo-eyebrow">03 / REGIONAL LENS</span><h2>Six regions, one record</h2></div><Link href="/programs/kifo/regions">View regions <ArrowRight size={14} /></Link></div><div className="region-list">{regions.map((region, index) => <Link href="/programs/kifo/regions" key={region}><span className="region-number">0{index + 1}</span><strong>{region}</strong><span>{index + 8} institutions</span><ChevronRight size={14} /></Link>)}</div></div><div className="kifo-panel kifo-doctrine"><span className="kifo-eyebrow">KIFO DOCTRINE</span><h2>Observe before you forecast.</h2><p>KIFO records what changed, what supports the interpretation, and what remains unknown—before converting signals into institutional futures.</p><Link href="/programs/kifo/methodology">Read methodology <ArrowRight size={14} /></Link></div></section>
</>; }

function Concern({ label, count, tone, detail }: { label: string; count: string; tone: string; detail: string }) { return <div className="concern-row"><span className={`concern-marker ${tone}`}></span><strong>{label}</strong><small>{detail}</small><b>{count}</b><ChevronRight size={14} /></div>; }

function SubpageView({ title }: { title: string }) { const summaries: Record<string, [string, string][]> = { Atlas: [["Indexed institutions", "84"], ["Regions", "12"], ["Open concerns", "27"]], Explorer: [["Active evidence paths", "146"], ["Unresolved conflicts", "18"], ["Recent observations", "32"]], Regions: [["Regions with active signals", "12"], ["Institutions mapped", "84"], ["Comparative timelines", "6"]], Indicators: [["Tracked indicators", "38"], ["Updated this cycle", "14"], ["Evidence-backed", "29"]], Methodology: [["Observation record", "v0.1"], ["Proof policy", "P0–P5"], ["History", "Append-only"]], History: [["Registered events", "218"], ["Latest update", "05 Sep 2026"], ["Open thresholds", "11"]] }; const cards = summaries[title] || summaries.Atlas; return <section className="kifo-subpage"><div className="subpage-summary">{cards.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="kifo-panel subpage-panel"><div className="kifo-panel-head"><div><span className="kifo-eyebrow">KIFO / {title.toUpperCase()}</span><h2>Research surface under construction</h2></div><button className="filter-button"><Filter size={14} /> Filter view</button></div><div className="subpage-placeholder"><Waypoints size={24} /><h3>{title} is connected to the AIREA record layer.</h3><p>This program view will expose Kentucky-specific records, indicators, institutions, regions, and timelines without creating a separate evidence system.</p><Link href="/programs/kifo" className="secondary-cta">Return to KIFO overview <ArrowLeft size={14} /></Link></div></div></section>; }
