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
