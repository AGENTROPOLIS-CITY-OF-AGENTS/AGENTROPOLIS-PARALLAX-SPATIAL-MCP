# Spatial Economic Intent

PARALLAX may turn XR, AR, NFC, spatial-anchor, IRL-scavenger, live-event, and world interactions into governed SocialEconomicIntent objects. Spatial presence never grants payment authority by itself.

## Sources

- AR/VR interaction
- NFC tap
- spatial anchor encounter
- IRL scavenger event
- creator object encounter
- TCG object encounter
- LIVE/XR event action
- physical collectible link

## Allowed intent classes

- `BUY_OBJECT`
- `LICENSE_ASSET`
- `JOIN_EVENT`
- `UNLOCK_CONTENT`
- `CLAIM_REWARD`
- `TIP_CREATOR`
- `ENTER_MATCH`
- `COMMISSION_AGENT`

## Canonical flow

```text
Spatial Encounter
  -> signed SpatialInteractionEvent
  -> Social/Creator/Game context resolution
  -> optional SocialEconomicIntent
  -> ATG / policy / approval
  -> Execution Envelope
  -> Settlement Router
  -> SettlementReceipt
  -> owning domain validates and applies result
```

## Hard invariants

- NFC/QR/spatial anchors are locators or evidence inputs, never authority tokens by themselves.
- A tap, gaze, proximity event, gesture, or scan cannot silently move value.
- High-risk or value-moving actions require the same mandate, policy, budget, approval, and receipt corridor as non-spatial clients.
- LIVE streams, XR sessions, world navigation, and scavenger gameplay remain usable during settlement outages.
- A malicious or replayed physical tag must not create duplicate purchases or rewards.
- Location or device data shared with settlement adapters is minimized to what the approved adapter actually requires.
- Third-party AR glasses and headsets remain interchangeable surfaces; PARALLAX owns the normalized spatial event contract.

## Replay protection

Every value-capable spatial event SHOULD bind:

```text
event_id
principal_id
anchor_id or object_id
nonce
timestamp
correlation_id
intent_id when created
```

Consumers reject reused nonce/event combinations when the action is single-use.
