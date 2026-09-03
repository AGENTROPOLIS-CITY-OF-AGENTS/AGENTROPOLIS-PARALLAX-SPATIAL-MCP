# Procedural Three.js World Compatibility

Status: **compatible by design**

PARALLAX Spatial MCP can govern and verify a browser-native, procedural Three.js world such as an explorable district, studio, lobby, or spatial control room. The scene runtime renders the world. PARALLAX supplies the authorized inspection, mutation, capture, verification, and receipt loop around it.

This document records an original AGENTROPOLIS implementation pattern. It does not import or redistribute third-party scene code or assets.

## Runtime contract

A compatible host exposes stable handles:

```js
window.scene = scene;                    // required
window.__THREE_CAMERA__ = camera;        // recommended
window.__renderer__ = renderer;          // recommended
window.__PARALLAX_SPATIAL__ = {
  version: "1.0",
  districtId: "identity-plaza",
  getWorldState,
  listCapabilities,
  executeBoundedOperation,
  captureEvidence
};
```

Framework-specific adapters may provide the same contract, but the first reference target is vanilla Three.js.

## World-to-protocol mapping

| Spatial runtime feature | PARALLAX role |
| --- | --- |
| Procedural scene graph | Inspect named objects, transforms, materials, lights, and district state |
| Camera transitions | Save and restore deterministic named views |
| Doors and collision zones | Enforce capability and policy gates before state transitions |
| 3D terminals and screens | Bind visible surfaces to real agent, ledger, telemetry, or district data |
| Interactive props | Expose bounded, schema-defined operations rather than arbitrary page execution |
| Scene mutation | Capture before/after state and attach the authorized mandate |
| Shader and post-processing | Verify compile/runtime health and detect visual regression |
| Mobile/touch controls | Record and replay deterministic interaction scenarios |
| Persistent world state | Emit receipts tied to state version, actor, operation, and evidence hashes |

## Required corridor

```text
Identity -> Mandate -> Policy -> Inspect -> Operate -> Capture -> Verify -> Receipt -> Audit
```

No scene interaction grants authority by itself. A clicked door, terminal, avatar, or projected menu requests a capability; policy decides whether the corresponding operation may execute.

## Minimum operation envelope

Every operation must define:

- `operationId`
- authorized actor and mandate
- district and target object IDs
- typed arguments and bounds
- expected preconditions
- permitted side effects
- verification assertions
- rollback or compensating action
- receipt fields

Example:

```json
{
  "operationId": "district.door.open",
  "districtId": "identity-plaza",
  "targetId": "door:skills-district",
  "args": { "durationMs": 900 },
  "bounds": { "durationMs": { "min": 250, "max": 2000 } },
  "verify": [
    { "path": "target.state", "equals": "open" },
    { "path": "collision.portalEnabled", "equals": true }
  ]
}
```

## Evidence bundle

A completed mutation should produce:

- intent and authorization decision
- pre-operation world snapshot
- normalized operation request
- post-operation world snapshot
- deterministic camera/view identifier
- screenshot or frame capture when available
- console, shader, and renderer health
- verification results
- timing and resource deltas
- receipt ID plus content hashes

## Acceptance tests

1. Inspecting a district returns stable IDs and typed state.
2. Replaying a named camera view produces an equivalent framing.
3. An unauthorized door or terminal operation is denied without mutation.
4. An authorized operation changes only declared targets.
5. Verification detects incorrect transforms, missing objects, console errors, and failed shaders.
6. Touch and pointer scenarios can be replayed.
7. Reduced-motion mode preserves every functional path.
8. A receipt links authorization, before/after evidence, verification, and hashes.
9. Renderer memory returns to its baseline after temporary objects are disposed.
10. The world remains usable when advanced effects are disabled.

## AGENTROPOLIS district rule

Spatial objects must represent real system state. Decorative objects may exist, but they must never masquerade as live agents, policy decisions, permissions, or ledger events.

Suggested first zones:

- Mission Control: operator control plane
- Identity Plaza: identity and mandate gates
- Sentinel-6 wall: audit and drift telemetry
- Skills District: governed capability registry
- 33.3FM: broadcast engine and live media controls
- Hermes City: named agent presence and group coordination
- University: instructional and simulation spaces
- Neteru: separately governed adult narrative district

## Dependency boundary

PARALLAX does not require Fable or any specific authoring tool. It needs an instrumented browser scene and a compliant adapter. A Fable-generated, hand-written, or otherwise generated Three.js scene can participate when it exposes the runtime contract and passes the same policy and verification gates.
