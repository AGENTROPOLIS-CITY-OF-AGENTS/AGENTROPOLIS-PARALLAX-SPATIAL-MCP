# WebMCP Challenge -> PARALLAX Import

Status: authorized migration/import path

## Intent

PARALLAX is absorbing a full source snapshot of `AGENTROPOLIS-WEBMCP-CHALLENGE` so the working challenge application, governed UI vault, AIP/WebMCP experiments, receipts, and spatial demonstration can be evolved alongside the canonical PARALLAX runtime without deleting the existing PARALLAX SDK/runtime.

## Non-destructive placement

The imported application is placed at:

```text
apps/webmcp-challenge/
```

Existing PARALLAX root runtime, brand, protocol documentation, tests, and package boundaries remain intact.

## Source provenance

The sync workflow records the exact source commit in:

```text
apps/webmcp-challenge/PARALLAX-IMPORT.json
```

The source repository remains available for history and provenance. The vendored snapshot is an integration step, not a claim that every experimental challenge capability is production-ready.

## Truth boundary

Preserve the existing PARALLAX rule:

**Generated != Verified.**

Challenge code labelled mocked, simulated, experimental, or unverified must retain that status after import. Importing source does not upgrade verification state or grant authority.

## Follow-on consolidation

After the snapshot is present, migration should proceed by capability rather than by blind root-file replacement:

1. inventory duplicate runtime pieces;
2. keep canonical reusable PARALLAX runtime at the repository root;
3. migrate verified challenge features behind PARALLAX adapters;
4. retain the governed `packages/ui-vault` until it is intentionally promoted or extracted;
5. preserve provenance, licenses, accessibility, and design-system contracts;
6. remove challenge-only duplication only after tests prove parity.

Do not overwrite or discard existing PARALLAX work merely because a similarly named file exists in the imported application.
