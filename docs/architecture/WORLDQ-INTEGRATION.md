# PARALLAX × WORLDQ Integration

PARALLAX Spatial MCP and WORLDQ are separate AGENTROPOLIS primitives with complementary responsibilities.

## Boundary

**PARALLAX** governs spatial agency:

```text
inspect -> authorize -> operate -> capture -> verify -> receipt
```

**WORLDQ** governs compact world representation and transport:

```text
inspect -> encode -> quantize -> stream -> decode -> verify
```

WORLDQ does not replace PARALLAX. PARALLAX does not need to own a world codec.

## Combined path

```text
WORLDQ package / stream
        |
        v
WORLDQ decode + integrity verification
        |
        v
PARALLAX world graph adapter
        |
        v
PARALLAX capability / authority gate
        |
        v
bounded spatial mutation
        |
        v
capture + verification + receipt
        |
        v
WORLDQ commit/package update (when persistence is requested)
```

## Trust rule

A successfully decoded WORLDQ object is not automatically authorized to act. Data-plane reconstruction and control-plane authority remain separate.

## Challenge integration

The AGENTROPOLIS WebMCP Challenge can demonstrate both primitives in one closed loop while retaining separate reusable repositories:

1. inspect a spatial world;
2. encode/quantize or load WORLDQ representation;
3. progressively reconstruct a requested region;
4. expose reconstructed entities to PARALLAX;
5. perform an authorized spatial operation;
6. capture and verify the result;
7. persist the approved state change;
8. verify hashes/receipt.

This provides a stronger proof than either compression or spatial mutation alone: compact world transport plus governed closed-loop agency.
