# AIREA Work 0001
## Conflicting Claims, Observation Records, Evidence Capsule Receipts, and JSON Schema v0.1

**Status:** Draft implementation specification  
**Version:** 0.1  
**Work:** `AIREA-WORK-0001` — *The True Cost of Trustworthy AI*  
**Schema dialect:** JSON Schema Draft 2020-12  
**Canonicalization:** RFC 8785-compatible JSON Canonicalization Scheme, identified as `JCS-RFC8785-compatible-json-v0.1`

## 1. Direct answer: how conflicting claims are handled

AIREA does **not** merge conflicting observations into one overwritten “truth.” Each Observation Record is an immutable account of what was observed under a particular set of conditions. Conflicts are represented at the **claim layer**, where multiple Observation Records can support, qualify, contradict, or fail to reproduce the same canonical claim.

For AIREA Work 0001, the relationship is:

```text
Registered Work
  └── Canonical Claim C-014
        ├── Observation Record OR-001 — supports
        ├── Observation Record OR-002 — supports
        ├── Observation Record OR-003 — contradicts
        ├── Receipt R-00031 — author reproduction
        ├── Receipt R-00042 — independent reproduction
        └── Claim History
              ├── SUPPORTED
              ├── CONTESTED
              └── current state determined by explicit evidence policy
```

The system uses five separate concepts:

| Concept | Meaning |
|---|---|
| Observation Record | An immutable record of an observation under stated conditions. |
| Claim | A stable proposition belonging to the registered work. |
| Evidence Relationship | The typed relationship between a claim and an observation, source, model, executable, output, or receipt. |
| Receipt | A machine-readable record showing what a specific artifact or execution establishes. |
| Claim State | The current evidentiary state of the claim after considering its linked evidence and history. |

### 1.1 Conflict does not mutate historical records

When a new observation conflicts with an earlier observation, AIREA creates a new Observation Record and a new evidence relationship. The earlier record remains available with its original digest, timestamp, conditions, and interpretation.

The claim history then receives an event such as:

```text
C-014: SUPPORTED → CONTESTED
Reason: OR-003 reports a contradictory result under a comparable condition set.
Supporting evidence: OR-001, OR-002, R-00031.
Contradictory evidence: OR-003, R-00055.
```

### 1.2 Conflict detection is not conflict resolution

The schema records that evidence conflicts. It does not automatically decide which observation is correct.

A conflict may arise because of:

- changed model or deployment state;
- changed prompt, probe, or sampling parameters;
- changed dataset or input population;
- evaluator disagreement;
- measurement uncertainty;
- an actual contradiction under comparable conditions;
- incomplete or unavailable conditions.

The Work-level claim ledger may later classify the conflict as resolved, but only through a recorded event with an explicit procedure and authority. A new observation must never silently erase or downgrade the historical evidence that preceded it.

### 1.3 Claim state and proof tier remain separate

AIREA uses two independent axes.

#### Claim state

| State | Definition |
|---|---|
| `OBSERVED` | The asserted information appears directly in an observation or source. |
| `SUPPORTED` | The available evidence supports the assertion within a stated scope. |
| `INFERRED` | The assertion is an interpretation derived from evidence. |
| `CONTESTED` | Meaningful contradictory evidence exists. |
| `UNRESOLVED` | Evidence exists but is insufficient to settle the claim. |
| `RETRACTED` | The claim has been withdrawn from the active record while its history remains preserved. |

`VERIFIED` is intentionally **not** a freely assignable claim state in v0.1. Verification is represented by a receipt and a verification event that names the procedure, verifier, scope, and result. A Work implementation may expose a derived “verified within scope” display, but it must retain the underlying procedure and receipt.

#### Proof tier

| Tier | Definition |
|---|---|
| `P0_DECLARED` | The author has stated the claim. |
| `P1_SPECIFIED` | The method, mechanism, or calculation is documented. |
| `P2_IMPLEMENTED` | A corresponding implementation exists. |
| `P3_DEMONSTRATED` | Execution evidence shows that the implementation ran. |
| `P4_REPRODUCED` | The result was regenerated from disclosed artifacts and method. |
| `P5_INDEPENDENTLY_VALIDATED` | Qualified independent evidence supports the result. |

Proof tiers are monotonic only when the new evidence satisfies the relevant threshold. A claim may be `CONTESTED` at `P4_REPRODUCED`; reproducibility does not imply absence of contradictory evidence.

## 2. Required Work-level conflict model

The Work object is outside the Observation Record itself, but AIREA Work 0001 must maintain a claim ledger with the following fields:

| Field | Requirement |
|---|---|
| `claim_id` | Stable identifier such as `C-014`. It must not change when evidence changes. |
| `statement` | The canonical proposition. |
| `claim_type` | For example `ANALYTICAL`, `COMPUTATIONAL`, `EMPIRICAL`, or `SPECIFICATION`. |
| `scope` | Population, scenario, time range, or conditions to which the claim applies. |
| `state` | Current claim state. |
| `proof_tier` | Highest supported proof tier under the Work’s evidence policy. |
| `evidence_relationships` | Typed links to records, sources, artifacts, and receipts. |
| `conflict_set` | Groups of evidence relationships that cannot currently be reconciled. |
| `missing_receipts` | Proof thresholds or required receipts not yet present. |
| `history` | Append-only state-transition events. |

### 2.1 Evidence relationship types

The minimum relationship vocabulary is:

- `SUPPORTS`
- `QUALIFIES`
- `CONTRADICTS`
- `REPRODUCES`
- `FAILS_TO_REPRODUCE`
- `DERIVED_FROM`
- `COMPUTED_BY`
- `ORIGINATES_FROM`
- `REQUIRES`
- `CHALLENGES`
- `RESPONDS_TO`

### 2.2 Conflict-set rules

A conflict set is required when two or more evidence relationships concern the same claim and cannot currently be reconciled under comparable scope and conditions.

A conflict set must include:

- a stable `conflict_id`;
- the affected `claim_id`;
- at least two evidence relationship references;
- a conflict type;
- a statement of what is inconsistent;
- comparability status;
- an optional resolution event reference;
- the current conflict state.

Allowed conflict types are:

- `VALUE_MISMATCH`
- `BEHAVIORAL_MISMATCH`
- `SOURCE_CONTRADICTION`
- `METHOD_DISAGREEMENT`
- `ATTRIBUTION_CONFLICT`
- `REPRODUCTION_FAILURE`
- `SCOPE_MISMATCH`
- `CONDITION_MISMATCH`
- `EVALUATOR_DISAGREEMENT`
- `OTHER`

A conflict must not be raised solely because two records have different values when their conditions or scopes are not comparable. In that case, the relationship should be `QUALIFIES` or the conflict type should be `CONDITION_MISMATCH` rather than an unqualified contradiction.

## 3. AIREA Observation Record v0.1

### 3.1 Purpose

An Observation Record is an immutable, versioned record of an observed system, artifact, execution, or research condition. It may be linked to one or more Work claims, but it does not change the claim’s state by itself.

### 3.2 Top-level required fields

The exact machine-readable schema is provided in `airea-observation-record-v0.1.schema.json`.

| Field | Type | Required | Semantics |
|---|---|---:|---|
| `record_type` | constant string | Yes | `airea.observation_record` |
| `record_version` | constant string | Yes | `0.1` |
| `observation_id` | UUID | Yes | Immutable record identifier |
| `observed_at` | RFC 3339 datetime | Yes | Observation time |
| `recorded_at` | RFC 3339 datetime | Yes | Capture time |
| `subject` | object | Yes | Declared observed system or artifact |
| `conditions` | object | Yes | Conditions relevant to interpretation |
| `probe` | object | Yes | Probe suite and case identity |
| `input` | content envelope | Yes | Input digest and disclosure status |
| `output` | content envelope | Yes | Output digest and disclosure status |
| `trace` | object | Yes | Tool, retrieval, source, and event references |
| `claim_assertions` | array | Yes | Claims observed, supported, contradicted, or qualified by this record |
| `evaluations` | array | Yes | Named computed or evaluator-derived measurements |
| `provenance` | object | Yes | Actor, code, datasets, sources, and lineage |
| `classifications` | array | Yes | Evidence classes present in this record |
| `integrity` | object | Yes | Canonicalization and record digest |
| `limitations` | array | Yes | Known limitations and unavailable information |

### 3.3 Claim assertion object

Each Observation Record may include multiple claim assertions. A claim assertion does not redefine the canonical Work claim. It states how this observation relates to that claim.

Required fields:

- `assertion_id` — stable identifier within the record;
- `claim_id` — canonical Work claim identifier;
- `relationship` — one of the evidence relationship types;
- `local_statement` — the proposition as represented by this observation;
- `evidence_refs` — references to fields, files, outputs, evaluations, or trace events;
- `local_state` — `OBSERVED`, `SUPPORTED`, `INFERRED`, `CONTESTED`, `UNRESOLVED`, or `RETRACTED`;
- `scope` — conditions or population for which the assertion applies;
- `rationale` — concise explanation;
- `receipt_refs` — receipts that substantiate this assertion;
- `limitations` — assertion-specific limits.

### 3.4 Immutability rules

After publication, an Observation Record must not be edited in place. A correction, annotation, challenge, response, or verification is a new event linked to the original record.

Any change to record content requires:

1. a new `observation_id` or event identifier;
2. a `supersedes` or `corrects` reference;
3. preservation of the previous record and digest;
4. an explanation of the change;
5. a new integrity digest.

## 4. Evidence Capsule v0.1 and receipts

### 4.1 Purpose

An Evidence Capsule is a portable package containing Observation Records, probe definitions, outputs or content references, comparison reports, provenance, receipts, event history, and a manifest of integrity digests.

The exact receipt schema is provided in `airea-evidence-receipt-v0.1.schema.json`. The capsule manifest schema is provided in `airea-evidence-capsule-v0.1.schema.json`.

### 4.2 Receipt principle

A receipt answers:

> **What allows AIREA to say this particular thing about this particular claim?**

A receipt establishes only the proposition described by its type and result. Receipts must not silently strengthen one another.

For example:

- A registration receipt proves registration.
- A source receipt proves that a source was captured and says what it says.
- An execution receipt proves that an executable produced an output under defined conditions.
- A demonstration receipt proves that an implementation executed.
- A reproduction receipt proves that a result was regenerated.
- An independent-validation receipt proves that qualified external evidence supports a stated scope.

### 4.3 Receipt types

| Receipt type | Minimum proof implication |
|---|---|
| `REGISTRATION` | The work, record, or artifact was registered at a stated time. |
| `SOURCE_CAPTURE` | A source artifact was captured with identity, access date, and digest. |
| `SPECIFICATION` | A mechanism, method, or calculation is documented. |
| `IMPLEMENTATION` | A corresponding executable or implementation exists. |
| `EXECUTABLE_RESULT` | An executable produced a named output under version-bound inputs and conditions. |
| `DEMONSTRATION` | The implemented mechanism executed successfully in the demonstrated environment. |
| `AUTHOR_REPRODUCTION` | The author or originating team regenerated the result. |
| `INDEPENDENT_REPRODUCTION` | An independent party regenerated the result from disclosed materials. |
| `EXTERNAL_VALIDATION` | Qualified external evaluation supports a stated proposition and scope. |
| `CORRECTION` | A correction was recorded without erasing the prior record. |
| `CHALLENGE` | A substantive contradiction or challenge was recorded. |
| `VERIFICATION` | A named verification procedure returned a result within a stated scope. |

### 4.4 Receipt status

Allowed statuses are:

- `PASS`
- `FAIL`
- `PARTIAL`
- `PENDING`
- `REVOKED`
- `UNKNOWN`

A `PASS` status applies only to the receipt’s defined operation. An `EXECUTABLE_RESULT` with `PASS` does not imply independent reproduction. An `INDEPENDENT_REPRODUCTION` with `PASS` does not imply that every claim in the Work is true.

### 4.5 Receipt and proof-tier rules

The Work claim ledger may derive a proof tier from receipts only when the receipt’s scope covers the claim and the receipt status is `PASS`.

| Receipt evidence | Maximum directly supported tier |
|---|---:|
| `DECLARED` claim or registration | P0 |
| `SPECIFICATION` receipt | P1 |
| `IMPLEMENTATION` receipt | P2 |
| `DEMONSTRATION` or `EXECUTABLE_RESULT` receipt | P3 |
| `AUTHOR_REPRODUCTION` or `INDEPENDENT_REPRODUCTION` receipt | P4 |
| `EXTERNAL_VALIDATION` receipt | P5 |

A failed, partial, pending, revoked, or unknown receipt cannot advance the proof tier. It may still be relevant evidence for a contested or unresolved claim.

## 5. Verification protocol

### 5.1 Record validation

A validator must perform the following checks:

1. Validate the record against the JSON Schema.
2. Confirm all digest fields match `sha256:` followed by 64 hexadecimal characters.
3. Canonicalize the record using the declared canonicalization rule.
4. Exclude the record digest field or replace it with the documented placeholder.
5. Recompute the record digest.
6. Compare the computed digest to `integrity.record_sha256`.
7. Confirm every referenced local file is present or explicitly marked unavailable.
8. Confirm claim assertion references point to known Work claim IDs or are flagged as unresolved external references.
9. Confirm each `VERIFICATION` or `EXTERNAL_VALIDATION` receipt reference has a procedure and scope.
10. Return a structured result with `VALID`, `INVALID`, or `INCOMPLETE`.

### 5.2 Capsule validation

A capsule verifier must:

1. Reject absolute paths, parent-directory traversal, and symlinks in the archive.
2. Validate `capsule.json` against the capsule schema.
3. Validate every included Observation Record and Receipt.
4. Recompute each file’s SHA-256 digest.
5. Compare every computed digest with the manifest.
6. Detect missing, modified, or unexpected files.
7. Verify the manifest digest.
8. Check that record, receipt, comparison, and provenance references resolve.
9. Check that private or redacted content is not accidentally exposed as public.
10. Report integrity separately from scientific validity and proof state.

### 5.3 Conflict analysis protocol

When a Work receives a new observation related to an existing claim:

1. Resolve the referenced `claim_id`.
2. Compare scope, probe, inputs, model declaration, code, evaluator, and relevant conditions.
3. Classify the relationship as `SUPPORTS`, `QUALIFIES`, `CONTRADICTS`, `REPRODUCES`, `FAILS_TO_REPRODUCE`, or another explicit relationship.
4. If the records are not comparable, record the condition mismatch rather than asserting contradiction.
5. If comparable evidence materially conflicts, create or update a `conflict_set`.
6. Append a claim-history event.
7. Recalculate the current claim state under the Work’s stated evidence policy.
8. Preserve all prior records and receipts.
9. Identify the next missing receipt or verification threshold.
10. Display the conflict and its uncertainty to users.

### 5.4 Conflict-state algorithm for the MVP

The first implementation may use this deterministic policy:

```text
if claim is RETRACTED:
    current_state = RETRACTED
else if a comparable PASS evidence relationship is CONTRADICTS
     and no recorded resolution event covers that contradiction:
    current_state = CONTESTED
else if supporting evidence exists but the required proof threshold is missing:
    current_state = SUPPORTED or INFERRED, according to the strongest valid relationship
else if evidence exists but cannot settle the claim:
    current_state = UNRESOLVED
else:
    current_state = DECLARED or OBSERVED, according to the available record
```

This algorithm is intentionally conservative. A later policy may incorporate replication count, uncertainty intervals, reviewer qualifications, or domain-specific rules, but such policy changes must be versioned and recorded.

## 6. Example conflict in Work 0001

Consider Claim `C-014`:

> **Institutional workflow fully allocated margin = $1,676.00.**

The Work may contain:

| Evidence | Relationship | Result |
|---|---|---|
| `OR-001` | `SUPPORTS` | Author’s calculator produced `$1,676.00`. |
| `R-00031` | `EXECUTABLE_RESULT` | Author execution passed. |
| `OR-002` | `REPRODUCES` | Author rerun produced `$1,676.00`. |
| `OR-003` | `CONTRADICTS` | Independent run produced `$1,540.00` using a different labor-rate file. |
| `R-00055` | `INDEPENDENT_REPRODUCTION` | Partial; inputs differ from the registered model inputs. |

The correct AIREA result is not “the claim is false.” It is:

```text
Claim state: CONTESTED
Proof tier: P4_REPRODUCED, subject to scope
Conflict type: CONDITION_MISMATCH / VALUE_MISMATCH
Cause: The independent run used a different labor-rate file.
Missing receipt: Independent reproduction using the version-bound registered inputs.
```

If a later independent reproduction uses the registered inputs and produces `$1,676.00`, AIREA can append a resolution event. The earlier contradiction remains visible, and the claim’s current state may become `SUPPORTED` within the explicitly registered input scope.

## 7. Public interface requirements

The Evidence Explorer must not display a single green “verified” badge for a conflicted claim. It must show:

- current claim state;
- proof tier;
- supporting evidence;
- contradictory evidence;
- comparability status;
- missing receipts;
- relevant conditions;
- event history;
- what the evidence does not establish.

A recommended claim header is:

```text
CLAIM C-014                                      CONTESTED
Institutional workflow fully allocated margin    P4 · REPRODUCED
$1,676.00

Evidence: 2 supporting records · 1 contradictory record
Comparability: PARTIAL — labor-rate file differs
Missing proof: independent reproduction with registered inputs
Current interpretation: supported for the registered input set;
                         conflict remains unresolved outside that scope
```

## 8. Versioning requirements

Observation Records and receipts must declare their own schema versions. A breaking field or semantic change requires a new schema version and migration note. Additive optional fields may be added only when they do not change canonicalization or the meaning of existing fields.

The Work’s conflict policy must also be versioned. A claim state derived under `claim-policy-v0.1` must retain that policy reference so a later policy can recalculate the current state without rewriting history.

## 9. Implementation deliverables

The minimum implementation package should contain:

```text
schema/
├── aerea-observation-record-v0.1.schema.json
├── aerea-evidence-receipt-v0.1.schema.json
└── aerea-evidence-capsule-v0.1.schema.json

policy/
└── claim-conflict-policy-v0.1.json

examples/work-0001/
├── claims/C-014.json
├── records/OR-001.json
├── records/OR-002.json
├── records/OR-003.json
├── receipts/R-00031.json
├── receipts/R-00055.json
└── conflict-sets/CS-0007.json
```

## 10. References

[1]: https://json-schema.org/draft/2020-12/json-schema-core "JSON Schema Draft 2020-12 Core"

[2]: https://www.rfc-editor.org/rfc/rfc8785 "JSON Canonicalization Scheme"

[3]: https://www.researchobject.org/ro-crate/specification/1.3/index.html "RO-Crate 1.3 Specification"
