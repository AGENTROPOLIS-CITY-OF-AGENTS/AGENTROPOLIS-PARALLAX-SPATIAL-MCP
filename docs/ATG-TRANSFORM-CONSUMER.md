# PARALLAX Spatial MCP as an ATG TRANSFORM Consumer

PARALLAX consumes the provider-neutral ATG TRANSFORM representation. It does not redefine ATG.

## Role

PARALLAX turns observed web/spatial experiences into verifiable experience graphs and can compare intended ATG semantics against observed behavior.

```text
SCREEN + DOM + CSS + A11Y TREE + EVENTS + WEBMCP + SPATIAL STATE
                              ↓
                         ATG OBSERVE
                              ↓
                  ATG DECOMPOSE / INFER
                              ↓
                  CANONICAL EXPERIENCE GRAPH
                              ↓
                         PARALLAX VERIFY
```

## Reconstruction domains

PARALLAX may consume ATG.RECON for:

- UI reconstruction
- spatial scene reconstruction
- interaction reconstruction
- behavior/state reconstruction
- visual hierarchy reconstruction
- component relationship inference
- accessibility semantics

## Human + agent dual surface

An interface object may carry both human presentation and machine capability semantics.

Example:

```text
ENTITY mint_button

human.label = "Mint Your Terp"
agent.capability = collectible.mint.prepare
state.enabled_when = collection.live && user.eligible
effect.dispatch = holofoil.mint.prepare
```

A visible control does not itself grant authority. WebMCP/agent capability execution still requires the normal Agentropolis Identity -> Mandate -> Policy -> Tool permission -> Execution -> Receipt -> Audit corridor.

## Epistemic truth

PARALLAX observations SHOULD preserve whether a property is OBSERVED, RECOVERED, INFERRED, or SYNTHESIZED.

Observed UI mutation is evidence of mutation. Absence of mutation is not, by itself, proof that policy enforcement occurred. Verification receipts must preserve that distinction.

## Future world-state compatibility

PARALLAX should increasingly reason over ENTITY, STATE, SPACE, TIME, RELATION, ACTION, INTENT, CONSTRAINT, EVIDENCE and UNCERTAINTY rather than browser pixels alone.

This allows the same semantic layer to span conventional pages, WebMCP surfaces, spatial interfaces, 3D worlds and future world-model-native applications.
