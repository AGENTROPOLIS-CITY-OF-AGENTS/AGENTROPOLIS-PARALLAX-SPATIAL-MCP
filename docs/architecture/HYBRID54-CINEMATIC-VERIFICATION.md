# HYBRID54 Cinematic Verification Adapter — v0.1

Status: **contract proposal; no automatic video verification or provider execution**.

## Separation of representations

ASDS54 defines portable shot intent in `contracts/hybrid-shot.v0.1.schema.json` (owned by `AGENTROPOLIS-ASDS-54`); CONSTRUCTION owns local shot preparation and audio conform. PARALLAX validates *instrumented 3D scene operations and evidentiary bindings*. It does not govern generative-model internals or treat AI video as playable world geometry.

## Minimum evidence record

For each approved shot:
- shot ID and ENTITY54/WORLDQ scene/object IDs, where actually registered
- original Blender camera lens, height, named view, camera trajectory, frame number
- raw graybox capture hash and blurred grayscale composition-guide hash
- reference manifest: roles, authorized origin, identities, wardrobe, environment, composition-only
- permission/mandate decision and source asset rights
- whether video provider supports number and format of references
- verified $0 additional cost for each Hermes video operation; UNKNOWN means BLOCKED
- generation tool/provider, model/version, duration, prompt and negative constraints
- output video hash; alignment and continuity observations with explicit uncertainty
- final master hash, dimensions and independently measured loudness/peak
- resulting receipt ID, verifier version, human reviewer, terminal state

## Valid verification claims

`BLOCKING_CAPTURED`: source scene camera and named geometry have captured evidence.

`LAYOUT_DERIVED`: blurred reference derives from a specified source frame, verified by hashes and processing parameters.

`GENERATED_UNVERIFIED`: video exists but continuity, identity, and cost/references require review.

`CINEMATIC_VERIFIED`: an independent reviewer or instrumented test has judged the specified visual assertions, with documented tolerances.

`INTERACTIVE_VERIFIED`: independently tested live world/scene operations, not implied by a cinematic clip.

## Acceptance boundaries

1. PARALLAX's existing Inspect → Bounded Operation → Capture → Verify → Receipt corridor must remain intact.
2. Do not demand pixel-exact 3D/video correspondence. Preserve camera-relative composition anchors and record exceptions; graybox transition is a soft wipe.
3. A generated shot is not proof of interaction, persistent agents, working doors, or live WebMCP capabilities.
4. No expensive endpoint is invoked by an evidence inspection or manifest validation.
5. No browser/mobile interaction is permitted to grant policy authority; AEGIS/Execution Envelope remain the gate.
6. Missing input evidence, unsupported tool capability, unverified spending allowance or identity drift yields `REVIEW_REQUIRED` or `BLOCKED`, never a fabricated success receipt.

## Integration target

CONSTRUCTION `scripts/hybrid54.py` emits an offline Hermes job handoff and hash metadata. PARALLAX may ingest authorized evidence *after* execution; the adapter proposed here is not implemented in the current reusable spatial runtime.
