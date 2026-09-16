# PARALLAX Heavy-Build Device Verification

Status: CANONICAL VERIFICATION CONTRACT
Owner: AGENTROPOLIS-PARALLAX-SPATIAL-MCP
Upstream authority: AGENTROPOLIS-GAMING-DISTRICT / CHAOS GAMING DEVELOPMENT PRODUCTIONS (GDP)

## Role

PARALLAX verifies that compiled runtime assets and scenes remain spatially correct and viable on the declared target profile. It does not generate benchmark truth and it does not silently mutate archival masters.

## Required verification inputs

- build id and source revision
- target platform and device tier
- asset variant identifiers
- texture runtime path
- mesh compression path
- LOD policy
- shader profile
- expected memory budget
- expected frame target

## Verification checks

PARALLAX should validate, where instrumentation exists:

- asset import success
- material and texture binding correctness
- LOD transition correctness
- collision state
- missing texture/material regressions
- texture memory estimate
- geometry/runtime cost estimate
- scene culling behavior
- lazy-load/streaming boundaries
- device-tier variant selection
- reduced-quality fallback behavior

## Device-tier rule

The same scene may resolve to different runtime derivatives for:

```text
web-light
mobile-low
mobile-mid
mobile-high
desktop
xr-spatial
```

Those variants may differ in texture resolution, ASTC/KTX2 profile, geometry ceiling, shadow/effect payload, animation density, and optional content.

PARALLAX verifies that the selected variant is internally coherent for the declared target. It does not require visual identity at the byte level between tiers.

## Handoff corridor

```text
CREATOR runtime derivative
  -> PARALLAX import/spatial verification
  -> target profile verification result
  -> Gaming District device benchmark
  -> agentropolis.heavy-build-performance-receipt.v1
```

## Fail conditions

PARALLAX must fail or hold verification when:

- the wrong device-tier variant is mounted
- expected texture formats are unavailable without an approved fallback
- LOD or collision behavior breaks interaction
- optimization introduces material/UV/normal corruption
- streaming boundaries break scene continuity
- the build cannot identify which runtime derivative was tested

## Authority boundary

PARALLAX verifies the spatial/runtime package. Gaming District owns the final fidelity, playability, sustained thermal, and release decision.
