# PARALLAX Spatial MCP

**See. Act. See Again. Prove It.**

Closed-loop spatial agency for the web.

PARALLAX is the governed spatial construction protocol being developed inside AGENTROPOLIS. It gives authorized agents a bounded way to inspect interactive scenes, perform permitted spatial operations, capture the resulting state, verify the outcome, and produce an auditable receipt.

> **Generated != Verified.** A spatial mutation is not complete merely because it rendered. PARALLAX treats capture, verification, and receipt as distinct stages.

## Closed-loop corridor

```text
USER INTENT
    |
    v
AUTHORIZED WEB CAPABILITY
    |
    v
INSPECT SCENE / WORLD GRAPH
    |
    v
BOUNDED OPERATION
    |
    v
RENDER / CAPTURE
    |
    v
VERIFY
    |
    +---- correction needed ----> operate again
    |
    v
RECEIPT / AUDIT
```

## What PARALLAX is

PARALLAX is designed as a reusable protocol/product layer for spatial agent operations on the web. The challenge implementation currently demonstrates the pattern with a governed studio scene and bounded operations such as scene inspection, object transforms, lighting changes, capture, verification, and receipts.

PARALLAX does **not** claim that every browser currently exposes native WebMCP APIs, nor that the current deterministic verifier is general visual intelligence. Runtime availability and verifier capability must be reported honestly per environment.

## Reference implementation

The active WebMCP Challenge implementation lives in:

**[AGENTROPOLIS-WEBMCP-CHALLENGE](https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-WEBMCP-CHALLENGE)**

During the challenge window, working runtime code remains there to avoid destabilizing the submission. After submission, reusable protocol/runtime pieces can be extracted here deliberately.

## Procedural Three.js worlds

Yes: PARALLAX can wrap an explorable, procedural Three.js environment without making any authoring tool a runtime dependency. The spatial scene remains the renderer and interaction surface; PARALLAX provides governed capabilities, deterministic inspection, bounded operations, before/after capture, verification, and audit receipts.

A compatible world exposes `window.scene` plus recommended camera, renderer, and PARALLAX adapter handles. Doors, terminals, projected menus, props, and agent avatars request typed capabilities; they do not grant authority by being clicked.

See [Procedural Three.js World Compatibility](docs/architecture/PROCEDURAL-THREEJS-COMPATIBILITY.md) for the runtime contract, evidence bundle, operation envelope, district mapping, and acceptance tests.

## MiniMax H3 handmade reconstruction

PARALLAX now exposes the typed browser capability `parallax.video.handmade-reconstruction`. It compiles the governed 15-second reference-image construction prompt and issues a fail-closed verification receipt covering maker consistency, hand count, subject continuity, causal assembly, reference match, final reveal, and text overlays.

The compiler does not call a provider or infer image rights. Provider execution remains behind an independently authorized adapter.

See [H3 Handmade Reconstruction](docs/architecture/H3-HANDMADE-RECONSTRUCTION.md) and [the browser adapter](public/parallax-h3-reconstruction.js).

## Brand

Public name: **PARALLAX**  
Formal name: **PARALLAX Spatial MCP**  
Parent system: **AGENTROPOLIS**  
Behavioral promise: **See. Act. See Again. Prove It.**

The visual canon inherits the AGENTROPOLIS Obsidian Signal foundation:

- Obsidian `#0a0a12`
- Cyan `#5ee9f0`
- Red `#ee1b2e`
- Cream `#f2f0ea`

See [`docs/brand/PARALLAX-BRAND-CANON.md`](docs/brand/PARALLAX-BRAND-CANON.md).

## Repository boundary

For now this repository is the canonical home for:

- PARALLAX product identity and brand canon
- protocol architecture and vocabulary
- verification and receipt principles
- future reusable SDK/runtime extraction
- examples and implementation guidance

The challenge repo remains the canonical home for the current submission implementation until the challenge is complete.

## License

Software and documentation source are provided under the Apache License 2.0 unless a file states otherwise.

The **PARALLAX**, **AGENTROPOLIS**, and related names, logos, emblems, visual identity, and brand assets are project branding and are **not granted for independent trademark/brand use by the Apache-2.0 software license**. See [`NOTICE`](NOTICE).
