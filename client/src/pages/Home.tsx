import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  CheckCircle2,
  Download,
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
  Plus,
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

const conflictSets = [
  {
    id: "CS-0007",
    claim: "C-014",
    type: "CONDITION_MISMATCH / VALUE_MISMATCH",
    title: "Institutional workflow margin differs across input sets",
    left: { id: "OR-001", label: "Author execution", value: "$1,676.00", date: "29 Jul 2026", condition: "Registered labor-rate file", result: "Supports C-014", tone: "teal" },
    right: { id: "OR-003", label: "Independent run", value: "$1,540.00", date: "04 Sep 2026", condition: "Different labor-rate file", result: "Contradicts C-014", tone: "coral" },
    resolution: "Unresolved — independent reproduction with registered inputs is still missing.",
  },
  {
    id: "CS-0011",
    claim: "C-009",
    type: "METHOD_DISAGREEMENT",
    title: "Governance overhead estimate depends on allocation method",
    left: { id: "OR-007", label: "Scenario model A", value: "18.4% of cost", date: "29 Jul 2026", condition: "Fully allocated labor", result: "Supports C-009", tone: "teal" },
    right: { id: "OR-008", label: "Scenario model B", value: "11.2% of cost", date: "31 Jul 2026", condition: "Direct labor only", result: "Qualifies C-009", tone: "amber" },
    resolution: "Scope differs — the claim needs a declared allocation policy before comparison can be resolved.",
  },
];

const claimHistory = [
  { date: "29 Jul 2026", state: "SUPPORTED", proof: "P3 · DEMONSTRATED", reason: "Calculator execution recorded and manuscript values matched.", receipt: "R-00031 · EXECUTABLE RESULT · PASS", tone: "teal" },
  { date: "29 Jul 2026", state: "SUPPORTED", proof: "P4 · REPRODUCED", reason: "Author rerun regenerated the registered output.", receipt: "R-00042 · AUTHOR REPRODUCTION · PASS", tone: "moss" },
  { date: "04 Sep 2026", state: "CONTESTED", proof: "P4 · REPRODUCED", reason: "A second run returned a different value under a different labor-rate file.", receipt: "R-00055 · INDEPENDENT REPRODUCTION · PARTIAL", tone: "coral" },
  { date: "FUTURE", state: "PENDING", proof: "P5 · INDEPENDENTLY VALIDATED", reason: "Run the independent reproduction with the registered input set.", receipt: "Missing receipt · NEXT THRESHOLD", tone: "future" },
];

const work0001Export = {
  work_id: "AIREA-WORK-0001",
  title: "The True Cost of Trustworthy AI",
  work_type: "ORIGINAL_TECHNICAL_ANALYSIS",
  author: { name: "Sierra N. Warren", organization: "Sierra Warren Developments, LLC" },
  version: "1.0",
  registration_state: "REGISTERED",
  evidence_profile: "MIXED_EVIDENCE",
  claims: claims.map(({ id, state, proof, type, statement, missing }) => ({ claim_id: id, statement, claim_type: type, state, proof_tier: proof, missing_proof: missing })),
  artifacts: artifacts.map(({ name, kind, className }) => ({ name, artifact_kind: kind, evidence_class: className })),
  conflict_sets: conflictSets.map(({ id, claim, type, resolution }) => ({ conflict_id: id, claim_id: claim, conflict_type: type, current_resolution: resolution })),
  claim_history: claimHistory,
  exported_at: "2026-09-05T00:00:00Z",
};

type ImportedRecord = { fileName: string; kind: "Observation Record" | "Evidence Capsule"; status: "VALIDATED" | "IMPORTED"; summary: string };
type ResolutionStatus = "ACCEPTED" | "REJECTED" | "SUPERSEDED";
const initialClaimResolutions: Record<string, { status: ResolutionStatus; receipt: string; note: string }> = {
  "C-014": { status: "ACCEPTED", receipt: "R-00031 · PASS", note: "Accepted within the registered input set; independent result remains scoped as contradictory." },
  "C-001": { status: "ACCEPTED", receipt: "R-00042 · PASS", note: "Accepted as the current analytical formulation." },
  "C-009": { status: "SUPERSEDED", receipt: "R-00061 · METHOD UPDATE", note: "Supersedes the earlier allocation method; the claim remains inferred under the revised scope." },
};

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
  const [activeConflict, setActiveConflict] = useState(conflictSets[0]);
  const [imports, setImports] = useState<ImportedRecord[]>([]);
  const [importMessage, setImportMessage] = useState("");
  const [conflictFilter, setConflictFilter] = useState("ALL");
  const [resolutionEvents, setResolutionEvents] = useState<{ id: string; date: string; text: string }[]>([]);
  const [digestStatus, setDigestStatus] = useState<"IDLE" | "VERIFYING" | "COMPUTED" | "VERIFIED" | "FAILED">("IDLE");
  const [digestMessage, setDigestMessage] = useState("");
  const [claimResolutions, setClaimResolutions] = useState(initialClaimResolutions);

  const visibleClaims = useMemo(
    () => claims.filter((claim) => `${claim.id} ${claim.statement} ${claim.type}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const visibleConflicts = conflictSets.filter((conflict) => conflictFilter === "ALL" || conflict.type.includes(conflictFilter));
  const openClaim = (claim: (typeof claims)[number]) => {
    setSelectedClaim(claim);
    setDrawer("provenance");
  };

  const navigateView = (view: string) => {
    setActiveTab(view);
    const target = document.getElementById(view === "work" ? "work-overview" : view === "claims" ? "claim-ledger" : view === "conflicts" ? "conflict-sets" : view === "resolution" ? "resolution-workflow" : "record-history");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const exportWork = () => {
    const payload = JSON.stringify({ ...work0001Export, claim_resolutions: claimResolutions, resolution_events: resolutionEvents }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "airea-work-0001.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const addResolutionEvent = () => {
    const conflict = activeConflict;
    setResolutionEvents((events) => [{ id: `EV-${String(events.length + 1).padStart(3, "0")}`, date: new Date().toISOString().slice(0, 10), text: `${conflict.id} reviewed: resolution remains open; next receipt required.` }, ...events]);
  };
  const setResolutionStatus = (claimId: string, status: ResolutionStatus) => {
    const eventId = `REV-${Date.now().toString(36).toUpperCase()}`;
    const date = new Date().toISOString().slice(0, 10);
    setClaimResolutions((current) => ({ ...current, [claimId]: { ...current[claimId], status, receipt: `${eventId} · REVIEW DECISION`, note: `${status[0]}${status.slice(1).toLowerCase()} by the current review decision; prior states remain in the history.` } }));
    setResolutionEvents((events) => [{ id: eventId, date, text: `${claimId} moved to ${status}; review receipt recorded and prior decision preserved.` }, ...events]);
  };
  const verifyCapsuleDigest = async (file: File, expectedDigest?: string) => {
    setDigestStatus("VERIFYING");
    setDigestMessage("");
    try {
      const bytes = await file.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const hex = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
      const computedDigest = `sha256:${hex}`;
      if (expectedDigest) {
        const matches = computedDigest.toLowerCase() === expectedDigest.toLowerCase();
        setDigestStatus(matches ? "VERIFIED" : "FAILED");
        setDigestMessage(matches ? `Verified against capsule manifest: ${computedDigest.slice(0, 24)}…${computedDigest.slice(-8)}.` : `Digest mismatch. Computed ${computedDigest.slice(0, 24)}…${computedDigest.slice(-8)}; manifest declares ${expectedDigest.slice(0, 24)}…${expectedDigest.slice(-8)}.`);
      } else {
        setDigestStatus("COMPUTED");
        setDigestMessage(`SHA-256 computed: ${computedDigest.slice(0, 24)}…${computedDigest.slice(-8)}. No file_sha256 was present for comparison.`);
      }
    } catch {
      setDigestStatus("FAILED");
      setDigestMessage("Web Crypto could not compute a digest for this file.");
    }
  };
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const kind = file.name.toLowerCase().includes("capsule") ? "Evidence Capsule" : "Observation Record";
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const valid = kind === "Observation Record"
          ? parsed?.record_type === "airea.observation_record" && parsed?.record_version === "0.1" && typeof parsed?.observation_id === "string" && parsed?.subject && parsed?.conditions && parsed?.probe && parsed?.input && parsed?.output && Array.isArray(parsed?.claim_assertions) && parsed?.integrity
          : parsed?.capsule_type === "airea.evidence_capsule" && parsed?.capsule_version === "0.1" && typeof parsed?.capsule_id === "string" && Array.isArray(parsed?.record_refs) && Array.isArray(parsed?.receipt_refs) && Array.isArray(parsed?.file_entries) && parsed?.integrity;
        setImports((current) => [{ fileName: file.name, kind, status: valid ? "VALIDATED" : "IMPORTED", summary: valid ? "Required v0.1 fields recognized." : "Imported locally; required fields need review." }, ...current]);
        setImportMessage(valid ? `${kind} validated and added to this record.` : `${kind} imported for review.`);
        if (kind === "Evidence Capsule") void verifyCapsuleDigest(file, parsed?.integrity?.file_sha256 || parsed?.integrity?.manifest_sha256);
      } catch {
        setImportMessage("The selected file is not valid JSON.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
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
            ["conflicts", GitBranch, "Conflict sets"],
            ["resolution", ShieldCheck, "Resolution workflow"],
            ["history", History, "History"],
          ].map(([key, Icon, label]) => (
            <button key={key as string} className={`nav-item ${activeTab === key ? "active" : ""}`} onClick={() => navigateView(key as string)}>
              <Icon size={16} strokeWidth={1.8} /><span>{label as string}</span>{key === "claims" && <span className="nav-count">3</span>}{key === "conflicts" && <span className="nav-count coral-count">1</span>}
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
                (() => { const resolution = claimResolutions[claim.id]; return (
                <article className={`claim-card ${selectedClaim.id === claim.id ? "selected" : ""}`} key={claim.id}>
                  <div className="claim-card-top"><div className="claim-id mono">{claim.id}</div><StatusPill tone={claim.accent}>{claim.state}</StatusPill><StatusPill tone={resolution.status === "ACCEPTED" ? "moss" : resolution.status === "REJECTED" ? "coral" : "amber"}>{resolution.status}</StatusPill><span className="claim-type">{claim.type}</span><button className="claim-open" aria-label={`Inspect provenance for ${claim.id}`} onClick={() => openClaim(claim)}><ArrowUpRight size={16} /></button></div>
                  <button className="claim-statement" onClick={() => openClaim(claim)}>{claim.statement}</button>
                  <p className="claim-summary">{claim.summary}</p>
                  <div className="claim-footer"><div className="claim-proof"><span className="proof-label">PROOF TIER</span><strong>{claim.proof}</strong><button className="info-dot" aria-label={`Explain ${claim.proof}`} onClick={() => setDrawer("proof")}>i</button></div><div className="evidence-counts"><span className="count-support"><ArrowUpRight size={13} /> {claim.supports} support</span>{claim.contradicts > 0 && <span className="count-conflict"><ArrowDownRight size={13} /> {claim.contradicts} contradict</span>}</div></div>
                  <div className="missing-proof"><span className="missing-icon">∕</span><span><small>MISSING PROOF</small>{claim.missing}</span><ChevronRight size={15} /></div>
                </article>); })()
              ))}
            </div>
          </section>

          <section id="conflict-sets" className="section-block conflict-section fade-in delay-3">
            <div className="section-heading"><div><div className="section-index">01A / CONFLICT SETS</div><h2>Where the record disagrees</h2></div><StatusPill tone="coral">1 OPEN CONFLICT</StatusPill></div>
            <div className="conflict-toolbar"><div><strong>{activeConflict.id}</strong><span>{activeConflict.type}</span></div><div className="conflict-toolbar-actions"><select aria-label="Filter conflict sets" value={conflictFilter} onChange={(event) => setConflictFilter(event.target.value)}><option value="ALL">All conflict types</option><option value="CONDITION">Condition mismatch</option><option value="METHOD">Method disagreement</option></select><select aria-label="Choose conflict set" value={activeConflict.id} onChange={(event) => setActiveConflict(conflictSets.find((item) => item.id === event.target.value) || conflictSets[0])}>{visibleConflicts.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.claim}</option>)}</select><button className="quiet-button" onClick={() => setDrawer("provenance")}><CircleHelp size={14} /> How conflicts work</button></div></div>
            <div className="conflict-title"><h3>{activeConflict.title}</h3><p>{activeConflict.resolution}</p></div>
            <div className="conflict-compare">
              {[activeConflict.left, activeConflict.right].map((record, index) => <article className={`observation-panel ${record.tone}`} key={record.id}><div className="observation-panel-top"><span className="mono">{record.id}</span><StatusPill tone={record.tone}>{record.result}</StatusPill></div><span className="observation-role">{record.label}</span><strong className="observation-value">{record.value}</strong><dl><div><dt>OBSERVED</dt><dd>{record.date}</dd></div><div><dt>INPUT CONDITION</dt><dd>{record.condition}</dd></div><div><dt>CLAIM</dt><dd>{activeConflict.claim}</dd></div></dl><button className="panel-link" onClick={() => { setSelectedClaim(claims[0]); setDrawer("provenance"); }}>Inspect provenance <ArrowUpRight size={13} /></button>{index === 0 ? <span className="panel-badge">SUPPORTS</span> : <span className="panel-badge">CONTRADICTS</span>}</article>)}
            </div>
            <div className="conflict-interpretation"><span className="callout-icon">!</span><div><strong>Interpretation remains scoped</strong><p>The records establish different outputs. Because the independent run used a different labor-rate file, AIREA records a condition mismatch rather than declaring the claim false.</p></div><div className="resolution-actions"><StatusPill tone="amber">UNRESOLVED</StatusPill><button className="quiet-button" onClick={addResolutionEvent}><Plus size={13} /> Add review event</button></div></div>
          </section>

          {resolutionEvents.length > 0 && <div className="resolution-events">{resolutionEvents.map((event) => <div className="resolution-event" key={event.id}><CheckCircle2 size={14} /><span><strong>{event.id} · {event.date}</strong><small>{event.text}</small></span></div>)}</div>}
          <section className="split-grid fade-in delay-3">
            <div className="section-block compact"><div className="section-heading"><div><div className="section-index">02 / ARTIFACT INVENTORY</div><h2>What the record contains</h2></div><button className="quiet-button" onClick={exportWork}><Download size={14} /> Export JSON</button></div><div className="artifact-list">{artifacts.map(({ name, kind, className, icon: Icon }) => <button className="artifact-row" key={name} onClick={() => setDrawer("provenance")}><Icon size={16} /><span className="artifact-main"><strong>{name}</strong><small>{kind}</small></span><span className="artifact-class">{className}</span><ChevronRight size={14} /></button>)}</div></div>
            <div id="record-history" className="section-block compact"><div className="section-heading"><div><div className="section-index">03 / RECORD HISTORY</div><h2>How certainty changed</h2></div><button className="quiet-button" onClick={() => navigateView("history")}><History size={14} /> Full history</button></div><div className="timeline">{history.map((item, index) => <div className={`timeline-item ${item.tone}`} key={`${item.date}-${item.title}`}><div className="timeline-marker"><span /></div><div className="timeline-copy"><span className="timeline-date mono">{item.date}</span><strong>{item.title}</strong><p>{item.detail}</p></div>{index === 3 && <StatusPill tone="moss">P4</StatusPill>}</div>)}</div></div>
          </section>

          <section className="section-block import-history-grid fade-in delay-4">
            <div className="import-card"><div className="section-index">04 / IMPORT EVIDENCE</div><h2>Bring a record into the work</h2><p>Load a real v0.1 Observation Record or Evidence Capsule locally. The prototype validates the type and version before adding it to this record.</p><label className="import-drop"><Fingerprint size={20} /><span><strong>Choose JSON file</strong><small>Observation Record or Evidence Capsule · local only</small></span><input type="file" accept="application/json,.json" onChange={handleImport} /></label>{importMessage && <div className="import-message" role="status"><ShieldCheck size={15} />{importMessage}</div>}{digestStatus !== "IDLE" && <div className={`digest-message ${digestStatus.toLowerCase()}`} role="status"><Fingerprint size={14} /><span><strong>Digest {digestStatus.toLowerCase()}</strong><small>{digestMessage}</small></span></div>}{imports.length > 0 && <div className="import-list">{imports.map((item) => <div className="import-row" key={`${item.fileName}-${item.kind}`}><span className="import-status">{item.status === "VALIDATED" ? "✓" : "·"}</span><span><strong>{item.fileName}</strong><small>{item.kind} · {item.summary}</small></span></div>)}</div>}</div>
            <div id="claim-history" className="history-card"><div className="section-index">05 / CLAIM HISTORY</div><h2>State transitions with receipts</h2><p>Claim state changes only when a recorded event and receipt justify the transition.</p><div className="state-history">{claimHistory.map((event, index) => <div className={`state-event ${event.tone}`} key={`${event.date}-${event.state}-${index}`}><div className="state-event-dot" /><div className="state-event-copy"><span className="mono">{event.date}</span><strong>{event.state} <i>·</i> {event.proof}</strong><p>{event.reason}</p><small>{event.receipt}</small></div></div>)}</div><div className="history-rule"><ShieldCheck size={15} /><span>Receipts advance evidence tier only within their defined scope. They never create blanket verification.</span></div></div>
          </section>

          <section id="resolution-workflow" className="section-block resolution-workflow fade-in delay-4"><div className="section-heading"><div><div className="section-index">06 / RESOLUTION WORKFLOW</div><h2>Decide what the record accepts</h2></div><span className="workflow-note"><ShieldCheck size={14} /> Every decision keeps its receipt</span></div><div className="resolution-legend"><span><i className="legend-dot accepted" /> ACCEPTED · current evidence is admitted within scope</span><span><i className="legend-dot rejected" /> REJECTED · current evidence is not admitted</span><span><i className="legend-dot superseded" /> SUPERSEDED · replaced without erasing history</span></div><div className="resolution-table">{claims.map((claim) => { const resolution = claimResolutions[claim.id]; return <article className="resolution-row" key={`resolution-${claim.id}`}><div className="resolution-claim"><span className="mono">{claim.id}</span><strong>{claim.statement}</strong><small>{resolution.note}</small></div><div className={`resolution-current ${resolution.status.toLowerCase()}`}><span>CURRENT DECISION</span><strong>{resolution.status}</strong><small>{resolution.receipt}</small></div><div className="resolution-actions-grid"><button className={resolution.status === "ACCEPTED" ? "selected" : ""} onClick={() => setResolutionStatus(claim.id, "ACCEPTED")}>Accept</button><button className={resolution.status === "REJECTED" ? "selected rejected" : ""} onClick={() => setResolutionStatus(claim.id, "REJECTED")}>Reject</button><button className={resolution.status === "SUPERSEDED" ? "selected superseded" : ""} onClick={() => setResolutionStatus(claim.id, "SUPERSEDED")}>Supersede</button></div></article>; })}</div><div className="workflow-footnote"><History size={15} /><span>Changing a decision updates the current resolution only. Earlier decisions, claim states, and receipts remain append-preserved in the claim history.</span></div></section>
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
