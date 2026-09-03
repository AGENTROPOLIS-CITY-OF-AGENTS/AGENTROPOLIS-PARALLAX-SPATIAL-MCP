# Closed-Loop Spatial Agency

PARALLAX is a governed spatial construction pattern for agent-native web experiences.

## Core idea

A website exposes structured spatial capabilities rather than forcing an agent to blindly manipulate pixels or brittle DOM coordinates.

```text
WEB PAGE / INTERACTIVE WORLD
          |
          v
WEBMCP CAPABILITY SURFACE
          |
          v
AUTHORIZED AGENT
          |
          v
PARALLAX SPATIAL LOOP
          |
          v
SCENE / WORLD GRAPH
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
          +---- CORRECTION_NEEDED ----> OPERATE AGAIN
          |
          v
RECEIPT / AUDIT
```

## Reference capability surface

A PARALLAX-compatible implementation may expose capabilities equivalent to:

- `getScene`
- `getObject`
- `transformObject`
- `setMaterial`
- `setLight`
- `captureView`
- `verifyScene`

The names are not the protocol. The important requirement is that capability boundaries, permissions, state changes, capture evidence, verification, and receipts remain explicit.

## Scene graph contract

Agents should receive structured object identifiers and bounded capability metadata rather than infer authority from appearance.

Example:

```json
{
  "id": "key-light-01",
  "type": "light",
  "position": [1.4, 2.1, -0.5],
  "permissions": [
    "inspect",
    "translate",
    "rotate",
    "intensity"
  ]
}
```

A capability absent from the permission set is not authorized simply because the underlying renderer technically supports it.

## Verification contract

PARALLAX separates these states:

1. **Mutation completed** — the requested operation executed.
2. **Capture completed** — resulting state was rendered into an evidence artifact.
3. **Verification completed** — a verifier evaluated that captured state against an objective.
4. **Receipt issued** — evidence and result were recorded after verification.

The implementation should bind verification and receipt to the same captured artifact through a stable capture reference, hash, ID, or equivalent mechanism.

## Failure behavior

Denied or invalid operations must fail closed:

- no unauthorized mutation,
- no successful verification derived from the rejected mutation,
- no successful receipt claiming that the rejected operation occurred.

Verification failure should produce an honest `CORRECTION_NEEDED` or `FAIL` state rather than a success-adjacent label.

## Governance boundary

PARALLAX is designed to compose with the wider AGENTROPOLIS governance corridor:

```text
Identity -> Mandate -> Policy -> Authorized Capability
                                   |
                                   v
                              PARALLAX LOOP
                                   |
                                   v
                           Receipt -> Audit
```

A PARALLAX implementation should not claim that the spatial subsystem independently performs identity, mandate, or policy evaluation unless executable evidence proves that integration.

## Runtime honesty

Browser-native WebMCP capability is environment-dependent. A fallback demo, deterministic harness, or browser preview can verify PARALLAX logic without proving that `document.modelContext` or another native WebMCP surface exists in that environment.

Report runtime states explicitly:

- `AVAILABLE`
- `UNAVAILABLE`
- `DEFERRED_WITH_REASON`

Never infer support.

## Reference implementation

The current challenge implementation is maintained in:

https://github.com/AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-WEBMCP-CHALLENGE

Until the challenge submission is complete, this repository intentionally does not duplicate that runtime code. The post-challenge extraction should preserve commit history/evidence where practical and should not silently rewrite capability claims.
