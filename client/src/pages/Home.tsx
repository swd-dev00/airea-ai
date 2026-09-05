import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  ExternalLink,
  FileCode2,
  FileSpreadsheet,
  Fingerprint,
  GitBranch,
  History,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  PanelRightClose,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

const claims = [
  {
    id: "C-014",
    state: "CONTESTED",
    proof: "P4 · REPRODUCED",
    type: "COMPUTATIONAL",
    statement: "Institutional workflow fully allocated margin = $1,676",
    summary: "Supported for the registered input set; one independent run used a different labor-rate file.",
    supports: 2,
    contradicts: 1,
    missing: "Independent reproduction with registered inputs",
    accent: "coral",
  },
  {
    id: "C-001",
    state: "SUPPORTED",
    proof: "P2 · IMPLEMENTED",
    type: "ANALYTICAL",
    statement: "Production AI cost cannot be represented adequately by model/API execution cost alone.",
    summary: "Supported by the cost framework, public pricing references, and modeled deployment scenarios.",
    supports: 3,
    contradicts: 0,
    missing: "Primary customer-level operating data",
    accent: "teal",
  },
  {
    id: "C-009",
    state: "INFERRED",
    proof: "P1 · SPECIFIED",
    type: "ANALYTICAL",
    statement: "Governance overhead becomes a material cost driver at institutional scale.",
    summary: "A reasoned conclusion from scenario modeling; not yet validated against primary evidence.",
    supports: 1,
    contradicts: 0,
    missing: "External validation across institutions",
    accent: "amber",
  },
];

const artifacts = [
  { name: "The_True_Cost_of_Trustworthy_AI.md", kind: "MANUSCRIPT", className: "SPECIFICATION", icon: BookOpen },
  { name: "ai_unit_economics_calculator.py", kind: "EXECUTABLE", className: "COMPUTED", icon: FileCode2 },
  { name: "public_reference_pricing.csv", kind: "EVIDENCE TABLE", className: "PUBLIC_REFERENCE", icon: FileSpreadsheet },
  { name: "loaded_labor_rates.csv", kind: "EVIDENCE TABLE", className: "MODELED", icon: FileSpreadsheet },
  { name: "deployment_scenarios.csv", kind: "MODEL TABLE", className: "MODELED", icon: Layers3 },
  { name: "customer_margin_summary.csv", kind: "COMPUTED OUTPUT", className: "COMPUTED", icon: FileSpreadsheet },
  { name: "assumptions_register.csv", kind: "ASSUMPTION REGISTER", className: "MODELED", icon: SlidersHorizontal },
];

const history = [
  { date: "2026-07-29", title: "Public reference inputs captured", detail: "6 sources registered · access dates preserved", tone: "teal" },
  { date: "2026-07-29", title: "Model assumptions registered", detail: "Assumption register attached to Work 0001", tone: "moss" },
  { date: "2026-07-29", title: "Calculator execution recorded", detail: "Institutional workflow margin produced: $1,676", tone: "teal" },
  { date: "2026-07-29", title: "Generated outputs matched manuscript values", detail: "Author reproduction receipt R-00031 · PASS", tone: "moss" },
  { date: "2026-09-05", title: "Work registered with AIREA", detail: "AIREA-WORK-0001 · version 1.0", tone: "ink" },
  { date: "FUTURE", title: "External reproduction submitted", detail: "Missing proof threshold · P4 → P5 candidate", tone: "future" },
];

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

function Metric({ value, label, tone }: { value: string; label: string; tone?: string }) {
  return (
    <div className="metric">
      <strong className={tone ? `text-${tone}` : ""}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("work");
  const [selectedClaim, setSelectedClaim] = useState(claims[0]);
  const [drawer, setDrawer] = useState<"provenance" | "receipt" | "proof" | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");

  const visibleClaims = useMemo(
    () => claims.filter((claim) => `${claim.id} ${claim.statement} ${claim.type}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const openClaim = (claim: (typeof claims)[number]) => {
    setSelectedClaim(claim);
    setDrawer("provenance");
  };

  const navigateView = (view: string) => {
    setActiveTab(view);
    const target = document.getElementById(view === "work" ? "work-overview" : view === "claims" ? "claim-ledger" : "record-history");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to evidence</a>
      <aside className={`side-rail ${mobileNav ? "mobile-open" : ""}`} aria-label="AIREA navigation">
        <div className="brand-lockup">
          <img className="brand-logo" src="/manus-storage/pasted_file_a7xUh7_image_3cb42f17.png" alt="AIREA" />
          <div>
            <div className="brand-name">AIREA</div>
            <div className="brand-sub">research record</div>
          </div>
          <button className="icon-button rail-close" aria-label="Close navigation" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <div className="rail-section-label">CURRENT WORK</div>
        <button className="work-switcher" onClick={() => setActiveTab("work")}>
          <span className="work-symbol">01</span>
          <span className="work-switcher-copy"><strong>Trustworthy AI</strong><small>AIREA-WORK-0001</small></span>
          <ChevronDown size={15} />
        </button>
        <nav className="primary-nav" aria-label="Record views">
          {[
            ["work", BookOpen, "Work overview"],
            ["claims", Network, "Claims & evidence"],
            ["history", History, "History"],
          ].map(([key, Icon, label]) => (
            <button key={key as string} className={`nav-item ${activeTab === key ? "active" : ""}`} onClick={() => navigateView(key as string)}>
              <Icon size={16} strokeWidth={1.8} /><span>{label as string}</span>{key === "claims" && <span className="nav-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="rail-spacer" />
        <div className="program-card">
          <div className="program-kicker"><Sparkles size={13} /> OBSERVATORY PROGRAM</div>
          <p>Preserve what happened. Keep unknowns visible.</p>
          <button className="text-link" onClick={() => setDrawer("proof")}>Read the doctrine <ArrowUpRight size={13} /></button>
        </div>
        <div className="rail-footer"><span className="status-dot" /> v0.1 · public record</div>
      </aside>

      {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}

      <main id="main-content" className="main-column">
        <header className="topbar">
          <button className="icon-button menu-trigger" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={19} /></button>
          <div className="breadcrumbs"><span>WORKS</span><ChevronRight size={13} /><strong>AIREA-WORK-0001</strong></div>
          <div className="topbar-actions"><button className="icon-button" aria-label="Search records"><Search size={17} /></button><button className="avatar" aria-label="Sierra Warren profile">SW</button></div>
        </header>

        <div className="content-wrap">
          <section id="work-overview" className="work-header fade-in">
            <div className="eyebrow-row"><StatusPill tone="teal">REGISTERED</StatusPill><span className="eyebrow-note">Last state recorded 05 Sep 2026</span></div>
            <div className="header-grid">
              <div>
                <h1>The True Cost of<br /><em>Trustworthy AI</em></h1>
                <p className="lede">A customer-level unit-economics framework for production systems.</p>
                <div className="byline"><span className="avatar small">SW</span><span>Research by <strong>Sierra N. Warren</strong></span><span className="dot-separator" /> <span>Sierra Warren Developments, LLC</span></div>
              </div>
              <div className="work-meta-card">
                <div><span>AIREA ID</span><strong className="mono">AIREA-WORK-0001</strong></div>
                <div><span>WORK TYPE</span><strong>Original technical analysis</strong></div>
                <div><span>VERSION</span><strong>1.0 <span className="version-arrow">↗</span></strong></div>
              </div>
            </div>
          </section>

          <section className="summary-strip fade-in delay-1" aria-label="Work summary">
            <Metric value="3" label="canonical claims" /><Metric value="7" label="registered artifacts" /><Metric value="P4" label="highest proof tier" tone="teal" /><Metric value="1" label="open conflict" tone="coral" /><div className="summary-note"><CircleHelp size={16} /><span>Evidence profile<br /><strong>Mixed evidence</strong></span></div>
          </section>

          <section id="claim-ledger" className="section-block fade-in delay-2">
            <div className="section-heading"><div><div className="section-index">01 / CLAIM LEDGER</div><h2>What this work claims</h2></div><div className="section-tools"><label className="search-field"><Search size={14} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter claims" aria-label="Filter claims" /></label><button className="quiet-button" onClick={() => setDrawer("proof")}><SlidersHorizontal size={14} /> Evidence policy</button></div></div>
            <div className="claims-list">
              {visibleClaims.map((claim) => (
                <article className={`claim-card ${selectedClaim.id === claim.id ? "selected" : ""}`} key={claim.id}>
                  <div className="claim-card-top"><div className="claim-id mono">{claim.id}</div><StatusPill tone={claim.accent}>{claim.state}</StatusPill><span className="claim-type">{claim.type}</span><button className="claim-open" aria-label={`Inspect provenance for ${claim.id}`} onClick={() => openClaim(claim)}><ArrowUpRight size={16} /></button></div>
                  <button className="claim-statement" onClick={() => openClaim(claim)}>{claim.statement}</button>
                  <p className="claim-summary">{claim.summary}</p>
                  <div className="claim-footer"><div className="claim-proof"><span className="proof-label">PROOF TIER</span><strong>{claim.proof}</strong><button className="info-dot" aria-label={`Explain ${claim.proof}`} onClick={() => setDrawer("proof")}>i</button></div><div className="evidence-counts"><span className="count-support"><ArrowUpRight size={13} /> {claim.supports} support</span>{claim.contradicts > 0 && <span className="count-conflict"><ArrowDownRight size={13} /> {claim.contradicts} contradict</span>}</div></div>
                  <div className="missing-proof"><span className="missing-icon">∕</span><span><small>MISSING PROOF</small>{claim.missing}</span><ChevronRight size={15} /></div>
                </article>
              ))}
            </div>
          </section>

          <section className="split-grid fade-in delay-3">
            <div className="section-block compact"><div className="section-heading"><div><div className="section-index">02 / ARTIFACT INVENTORY</div><h2>What the record contains</h2></div><button className="quiet-button"><ExternalLink size={14} /> Export</button></div><div className="artifact-list">{artifacts.map(({ name, kind, className, icon: Icon }) => <button className="artifact-row" key={name} onClick={() => setDrawer("provenance")}><Icon size={16} /><span className="artifact-main"><strong>{name}</strong><small>{kind}</small></span><span className="artifact-class">{className}</span><ChevronRight size={14} /></button>)}</div></div>
            <div id="record-history" className="section-block compact"><div className="section-heading"><div><div className="section-index">03 / RECORD HISTORY</div><h2>How certainty changed</h2></div><button className="quiet-button" onClick={() => navigateView("history")}><History size={14} /> Full history</button></div><div className="timeline">{history.map((item, index) => <div className={`timeline-item ${item.tone}`} key={`${item.date}-${item.title}`}><div className="timeline-marker"><span /></div><div className="timeline-copy"><span className="timeline-date mono">{item.date}</span><strong>{item.title}</strong><p>{item.detail}</p></div>{index === 3 && <StatusPill tone="moss">P4</StatusPill>}</div>)}</div></div>
          </section>

          <section className="record-banner fade-in delay-4"><div className="record-banner-icon"><Fingerprint size={20} /></div><div><span className="section-index">VERIFICATION VIEWS</span><h2>Observation Record & Evidence Capsule</h2><p>Inspect the machine-readable evidence behind this work without leaving the record.</p></div><div className="record-banner-actions"><button onClick={() => setDrawer("receipt")}><ClipboardCheck size={15} /> View receipts</button><button onClick={() => setDrawer("provenance")}><LockKeyhole size={15} /> Provenance</button></div></section>

          <footer className="page-footer"><span>AIREA AI · operational layer of the AI Observatory & Conservatory</span><span className="mono">No claim without an evidence path.</span></footer>
        </div>
      </main>

      {drawer && <div className="drawer-layer"><button className="drawer-scrim" aria-label="Close drawer" onClick={() => setDrawer(null)} /><aside className="evidence-drawer" aria-label="Evidence detail" aria-live="polite"><div className="drawer-header"><div><span className="section-index">{drawer === "provenance" ? "PROVENANCE DRAWER" : drawer === "receipt" ? "RECEIPT REGISTER" : "EVIDENCE DOCTRINE"}</span><h2>{drawer === "provenance" ? selectedClaim.id : drawer === "receipt" ? "Receipts" : "Proof is not truth"}</h2></div><button className="icon-button" aria-label="Close evidence drawer" onClick={() => setDrawer(null)}><PanelRightClose size={18} /></button></div>
        {drawer === "provenance" && <><div className="drawer-claim"><StatusPill tone={selectedClaim.accent}>{selectedClaim.state}</StatusPill><h3>{selectedClaim.statement}</h3><p>{selectedClaim.summary}</p></div><div className="drawer-section"><div className="drawer-label">EVIDENCE PATH</div><div className="evidence-path"><button onClick={() => setDrawer("receipt")}><span className="path-icon teal"><FileCode2 size={15} /></span><span><strong>ai_unit_economics_calculator.py</strong><small>EXECUTABLE · COMPUTED</small></span><ChevronRight size={14} /></button><button onClick={() => setDrawer("receipt")}><span className="path-icon moss"><ClipboardCheck size={15} /></span><span><strong>R-00031 · Executable result</strong><small>PASS · AUTHOR REPRODUCTION</small></span><ChevronRight size={14} /></button><button onClick={() => setDrawer("receipt")}><span className="path-icon coral"><GitBranch size={15} /></span><span><strong>R-00055 · Independent run</strong><small>PARTIAL · INPUTS DIFFER</small></span><ChevronRight size={14} /></button></div></div><div className="drawer-section"><div className="drawer-label">COMPARABILITY</div><div className="compare-callout"><span className="callout-icon">!</span><div><strong>Partial — labor-rate file differs</strong><p>The contradictory run does not use the registered `loaded_labor_rates.csv`. The conflict remains visible instead of being collapsed.</p></div></div></div><div className="drawer-section"><div className="drawer-label">MISSING PROOF</div><div className="missing-drawer"><span className="missing-icon">∕</span><div><strong>Independent reproduction with registered inputs</strong><p>This receipt would test whether the result holds when the version-bound model inputs are restored.</p></div></div></div></>}
        {drawer === "receipt" && <><div className="receipt-card"><div className="receipt-top"><StatusPill tone="moss">PASS</StatusPill><span className="mono">R-00031</span></div><h3>Executable result</h3><p>Author execution produced the institutional workflow margin under defined inputs.</p><div className="receipt-grid"><span>CLAIM<strong>C-014</strong></span><span>EXPECTED<strong>$1,676.00</strong></span><span>OBSERVED<strong>$1,676.00</strong></span><span>INDEPENDENT?<strong>NO</strong></span></div></div><div className="receipt-card subdued"><div className="receipt-top"><StatusPill tone="amber">PARTIAL</StatusPill><span className="mono">R-00055</span></div><h3>Independent reproduction</h3><p>Run completed, but the labor-rate file differs from the registered input set.</p><div className="receipt-grid"><span>CLAIM<strong>C-014</strong></span><span>EXPECTED<strong>$1,676.00</strong></span><span>OBSERVED<strong>$1,540.00</strong></span><span>SCOPE<strong>PARTIAL</strong></span></div></div><div className="drawer-note"><CircleHelp size={16} /><p>Receipts establish specific evidence relationships. They do not create blanket verification for the work.</p></div></>}
        {drawer === "proof" && <><div className="doctrine-block"><p>Proof tier describes the kind and strength of evidence currently available. It is not a progress bar toward truth, quality, or value.</p></div><div className="tier-list">{[["P0", "DECLARED", "Author has stated it."], ["P1", "SPECIFIED", "Method or mechanism is documented."], ["P2", "IMPLEMENTED", "A corresponding implementation exists."], ["P3", "DEMONSTRATED", "Execution evidence exists."], ["P4", "REPRODUCED", "Result regenerated from disclosed materials."], ["P5", "INDEPENDENTLY VALIDATED", "Qualified external evidence exists."]].map(([tier, title, copy]) => <div className={`tier-row ${selectedClaim.proof.startsWith(tier) ? "current" : ""}`} key={tier}><strong>{tier}</strong><span><b>{title}</b><small>{copy}</small></span>{selectedClaim.proof.startsWith(tier) && <span className="current-label">CURRENT</span>}</div>)}</div><div className="drawer-note"><ShieldCheck size={16} /><p>Claim state and proof tier remain separate. A claim can be P4 reproduced and still contested.</p></div></>}
      </aside></div>}
    </div>
  );
}
