# PARALLAX Demo Asset Manifest

This manifest maps the supplied visual artifacts into the PARALLAX demo without treating concept art as runtime evidence.

## Source artifacts

| Source file | Canonical role | Target repo path | Usage |
|---|---|---|---|
| `agentropolis.png` | AGENTROPOLIS city reveal | `assets/demo/01-agentropolis-city.webp` | Scene 6 city-scale evolution; optional final background |
| `desktop model parallax.png` | Builder workspace | `assets/demo/02-builder-desk.webp` | Scene 1 opening + Scene 7 return |
| `directors chair parallax.png` | Virtual-production studio | `assets/demo/03-virtual-production-studio.webp` | Scenes 2–5 spatial environment |
| `neuro avatar parallax.png` | Builder identity reference | `assets/demo/04-neuro-avatar.webp` | Character continuity reference only |
| `PARALLAX 3D HERO.png` | Product hero/UI grammar | `assets/demo/05-parallax-hero-ui.webp` | Scene 4 product loop / web hero |
| `PARALLAXmcp x logo.png` | Canonical circular mark | `assets/demo/06-parallax-logo.webp` | Scene 4 reveal + Scene 8 closing card |

## Asset doctrine

- Preserve the obsidian / cyan / crimson palette.
- No robot or humanoid representation of the autonomous agent.
- The agent is represented by scan grids, spatial wireframes, cursors, state transitions and receipts.
- Concept imagery may illustrate the workflow but may not be labeled as verified runtime footage.
- Runtime proof requires state capture + re-observation + verifier result + receipt.
- Denial proof requires an explicit denial record; an unchanged object is supporting evidence, not the denial record itself.
- Keep the Builder a solo-builder story. Do not add a fictional engineering team.

## Delivery profiles

### Hero / website
- 16:9 or responsive crop
- use `05-parallax-hero-ui.webp`
- CTA: `SEE THE AGENT WORK`
- loop displayed visibly: `OBSERVE → ACT → SEE AGAIN → VERIFY → RECEIPT`

### Film / Devpost
- master: 16:9
- target duration: 45–55 seconds
- preserve legible receipt fields during the proof beat
- do not display `NOW ON DEVPOST` until the listing is actually live

### Social cut
- 9:16
- opening hook in first 1.5 seconds: `GENERATED ≠ VERIFIED`
- show one authorized transform + one denied transform
- close with canonical PARALLAX mark

## Runtime evidence overlay

When actual runtime footage exists, overlay these fields instead of decorative data:

```text
receipt_id
objective
mandate_ref
policy_ref
target
before_state_ref
after_state_ref
verifier_result
dispatch_status
timestamp
```

For a denied attempt, use:

```text
denial_id
attempted_action
target
mandate_ref
policy_ref
denial_reason
dispatch_status
timestamp
```

## Local compressed demo kit

The six supplied PNGs were normalized into lightweight WebP delivery copies for the demo kit. Source PNGs remain the archival originals; delivery copies should be used for web/video prototyping.
