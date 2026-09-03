# PARALLAX // Brand Canon

PARALLAX is the spatial WebMCP product/protocol identity for AGENTROPOLIS.

This file is the source of truth for the name, positioning, palette, emblem semantics, usage boundaries, and product vocabulary.

## Why PARALLAX exists

Web agents should not only click interfaces. They should be able to inspect structured spatial state, perform bounded changes, observe the result, verify whether the objective was achieved, and prove what changed.

PARALLAX names that loop.

The public promise is:

> **See. Act. See Again. Prove It.**

The protocol-level invariant is:

> **Generated != Verified.**

## Naming hierarchy

| Role | Canonical name |
| --- | --- |
| Public short name | PARALLAX |
| Formal product/protocol | PARALLAX Spatial MCP |
| Parent system | AGENTROPOLIS |
| Technical category | Closed-loop spatial agency for the web |
| Challenge implementation | AGENTROPOLIS-WEBMCP-CHALLENGE |

Do not rename the challenge implementation to PARALLAX. The challenge repo demonstrates PARALLAX; this repository owns PARALLAX as a permanent product/protocol identity.

## Palette

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Base | Obsidian | `#0a0a12` | Backgrounds, void, canvas |
| Tile | Obsidian+ | `#12121c` | Raised panels, HUD surfaces |
| Signal | Cyan | `#5ee9f0` | Observable scene state, paths, spatial telemetry |
| Verify | Red | `#ee1b2e` | Verification nodes, receipts, alerts, correction boundaries |
| Type | Cream | `#f2f0ea` | Wordmark, primary text |

PARALLAX inherits the AGENTROPOLIS Obsidian Signal foundation. District/product accents may extend this system but must not replace it.

## Emblem

The PARALLAX emblem is an original spatial-loop mark built from:

1. an outer scene boundary / aperture,
2. a cyan observation path,
3. a directional spatial axis,
4. a red verification node.

The red point is intentionally singular: it represents the checkpoint where generated state becomes verified evidence or is rejected for correction.

The emblem should read at small sizes as a spatial target/coordinate system without copying real-world navigation, gaming, or aerospace marks.

## Logo assets

- `public/brand/parallax-logo.svg` — primary lockup
- `public/brand/parallax-icon.svg` — standalone emblem
- `public/brand/parallax-favicon.svg` — simplified small-size mark

### Clear space

Keep clear space around the full lockup equal to at least the diameter of the red verification node.

### Never

- recolor outside the canonical palette for official product identity,
- bake raster glow, bloom, or gradients into the canonical SVG assets,
- stretch or skew the wordmark,
- remove the verification node from the official emblem,
- use PARALLAX to imply browser-native WebMCP support where the environment has not verified it,
- mark a generated state as verified merely because it rendered.

Glow belongs to CSS/presentation effects, not the source logo.

## Product vocabulary

PARALLAX describes spatial operations using this loop:

```text
INTENT
  -> AUTHORIZED CAPABILITY
  -> INSPECT
  -> OPERATE
  -> CAPTURE
  -> VERIFY
  -> CORRECT (if needed)
  -> RECEIPT
```

Preferred status language:

- `UNVERIFIED`
- `CORRECTION_NEEDED`
- `PASS`
- `FAIL`
- `UNAVAILABLE`
- `DEFERRED_WITH_REASON`

Avoid vague success labels such as `CORRECT` for intermediate or failed states.

## Claims boundary

PARALLAX may truthfully claim a capability only when supported by evidence in the relevant environment.

The current reference implementation demonstrates bounded spatial scene operations, capture, deterministic objective verification, and receipt generation.

It does **not** automatically imply:

- general visual intelligence,
- universal browser-native WebMCP availability,
- unrestricted scene authority,
- completion of the entire AGENTROPOLIS Identity -> Mandate -> Policy corridor inside the spatial subsystem itself.

The spatial subsystem begins after an authorized capability has been granted unless an implementation explicitly proves more.

## Brand ownership and licensing

Code and documentation source may be licensed under Apache-2.0.

PARALLAX and AGENTROPOLIS names, logos, icons, emblems, presentation artwork, and visual identity remain project branding. Apache-2.0 does not grant independent trademark or brand-use rights. See `/NOTICE`.
