# TRELLIS.2 Asset Verification Lane

PARALLAX may consume TRELLIS.2-generated 3D candidates as spatial objects, but generation is not verification.

## Closed loop

```text
rights-cleared source
-> TRELLIS.2 candidate mesh
-> import into non-production scene
-> PARALLAX inspect
-> bounded transform/material/collision operations
-> capture before/after state
-> visual + structural verification
-> performance check
-> receipt
-> approved promotion
```

## PARALLAX responsibilities

PARALLAX verifies the spatial result, not the model-provider claim. For TRELLIS.2 assets, the verifier should record:

- object identity and lineage
- source image hash
- candidate and optimized mesh hashes
- scale, pivot, bounds, transforms
- material slots and PBR maps
- triangle count and LOD state
- collision state
- texture memory estimate
- runtime target
- capture artifacts
- verification outcome

## Typed capability proposal

```text
parallax.asset.inspect
parallax.asset.import-candidate
parallax.asset.optimize-preview
parallax.asset.material-preview
parallax.asset.collision-preview
parallax.asset.capture
parallax.asset.verify
```

These capabilities do not grant production import authority.

## Game/web acceptance

A generated asset is not accepted merely because it renders. Acceptance requires target-specific evidence for frame time, memory, draw calls, visual fidelity, collisions where applicable, and rollback.

For browser/mobile consumers, prefer explicit LODs, compressed textures, and compressed mesh delivery only after validation.

## Canon line

> TRELLIS.2 generates the candidate. PARALLAX proves what entered the scene and what changed.
