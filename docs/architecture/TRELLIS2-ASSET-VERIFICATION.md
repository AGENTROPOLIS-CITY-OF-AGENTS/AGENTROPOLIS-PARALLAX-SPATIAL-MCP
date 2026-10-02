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


## Production review lattice

- **Devin** implements adapters/tests, resolves CI failures, and records exact build/commit evidence.
- **GrokBot** attacks visual fit, gameplay integration, LOD/material/collision assumptions, and runtime regressions.
- **VERITY** independently verifies source commit, evidence hashes, authority boundaries, benchmark claims, rollback, and promotion-gate integrity.
- **Hermes** orchestrates execution, continuity, retries, cross-repo dependency order, and receipt aggregation.

The executor that changes the asset or scene must not self-certify production readiness.

## Promotion gate

A TRELLIS.2-derived asset remains non-production until:

1. source rights/provenance are bound,
2. master and runtime derivative hashes are recorded,
3. target-runtime profile is explicit,
4. import/material/collision/LOD checks pass,
5. renderer health and cleanup checks pass,
6. performance evidence exists for the target profile,
7. rollback/replacement path exists,
8. independent VERITY review passes.

**Generated != Imported != Verified != Production.**
