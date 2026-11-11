# WebMCP Gesture Lab Migration into PARALLAX

Status: review branch, DRAFT PR only. No merge, no deploy.

Source: `AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-WEBMCP-CHALLENGE`
PR #26, branch `feat/chaos-input-aip-gesture-lab-20261012`,
head `7560a520c704b9030eb50730af6da9c10842acd9`.

Target: `AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PARALLAX-SPATIAL-MCP`,
base main `f551ecf2abda17c584236d5071eeaa6e9daf27fa`,
branch `review/webmcp-gesture-lab-migration`.

Governing doc: `docs/migrations/WEBMCP-INTO-PARALLAX.md` (non-destructive
placement, truth boundary, follow-on consolidation by capability).

## Truth boundary

Generated != Verified. The gesture lab is EXPERIMENTAL. It has NO
real-hands validation anywhere. Importing it does not upgrade its
verification state and grants it no authority. It emits AIP intent
proposals only; a gesture never authorizes execution. The AIP v0.1
vocabulary and verbs are unchanged from the source.

## What was migrated

### 1. Gesture lab classifier + AIP constructor (canonical Parallax copy)

| Source (PR #26 @ 7560a520) | Landing path | Notes |
| --- | --- | --- |
| `src/intent/chaos-input.ts` (4,093 B, sha256 `13d78da4…6545df`) | `src/input/chaos-input.ts` | Code plus a Parallax provenance header; four non-null index assertions (`!`) in `classifyHand` were required by the Parallax root tsconfig (`noUncheckedIndexedAccess`, which the source repo does not enable). They are type-level only and behavior-identical: every asserted index is guarded by the `landmarks.length === 21` check on the line above. The vendored copy below stays byte-identical to source. |
| `src/intent/chaos-input.test.ts` (2,501 B, sha256 `544a489b…690dd`) | `src/input/chaos-input.test.ts` | Verbatim; 5 vitest cases |

### 2. Input adapter (new Parallax runtime code)

| File | Notes |
| --- | --- |
| `src/runtime/input-adapter.ts` | `handleGestureIntent()`: the only path for a gesture intent to reach the governed execution surface. Mutating proposals go through `runClosedLoopConstruction` (existing permission gates, SHA-256 capture binding, fail-closed receipts). Consequential verbs (`approve`, `reject`) are denied without explicit host confirmation. `inspect` is a permission-gated read; `stop` is a request, not a cancellation. Every denial returns a denial receipt (proof of refusal, not a construction receipt). |
| `src/runtime/input-adapter.test.ts` | 8 tests: unauthorized intent denied, denial receipt produced, authorized intent executed through the receipt chain, failed verification denied, inspect without mutation, stop as request, target mismatch denied, null intent denied. |
| `src/index.ts` | Exports the new `input-adapter` and `input/chaos-input` modules. |

No change was made to the runtime security model: permission gates,
receipts, and fail-closed behavior are owned by the existing runtime
modules, not by the adapter.

### 3. Vendored demo area (`apps/webmcp-challenge/`)

| Source | Landing path | Notes |
| --- | --- | --- |
| PR #26 `src/demo/chaos/GestureControlLab.tsx` (8,815 B, sha256 `dfc3b319…121fdba4`) | `apps/webmcp-challenge/src/demo/chaos/GestureControlLab.tsx` | Byte-identical to source |
| PR #26 `src/intent/chaos-input.ts` (4,093 B) | `apps/webmcp-challenge/src/intent/chaos-input.ts` | Byte-identical vendored copy, required by the lab's own import (`../../intent/chaos-input`). See duplication note below. |
| PR #26 `docs/CHAOS-INPUT-SPATIAL-CONTROL.md` (sha256 `7286854e…91298`) | `apps/webmcp-challenge/docs/CHAOS-INPUT-SPATIAL-CONTROL.md` | Byte-identical; preserves the lab's own experimental-status and privacy documentation |
| PR #26 `src/App.tsx` wiring (2 lines) | `apps/webmcp-challenge/src/App.tsx` | Same import + `<GestureControlLab />` mount as PR #26. Resulting file is byte-identical to PR #26 `src/App.tsx`. |

### 4. Vendored snapshot update (source main)

`apps/webmcp-challenge/` updated from source `0fb521c350a0f8202680d787396b5ff8a47c054e`
(Sept 4) to source main `c5101a3056f7c96e7b6420fd589fd911e35a9928` (Oct 14,
"feat: expose AGENTROPOLIS loop engineering baseline").
`apps/webmcp-challenge/PARALLAX-IMPORT.json` `source_commit` updated to
`c5101a3056f7c96e7b6420fd589fd911e35a9928`; mode stays
`vendored-source-snapshot` and all other provenance fields are unchanged.

The only file that differs between those two source commits is
`index.html`: it adds
`<script src="https://agentropolis-city-of-agents.github.io/AGENTROPOLIS-DESIGN-SYSTEM/js/loop-baseline.js" defer></script>`
and changes `  </head>` to `</head>`. The vendored `index.html` now matches
source main byte for byte. Note: that script loads from an external
GitHub Pages origin at runtime; it is reproduced faithfully from source,
not introduced by this migration. Whether the vendored app should use the
locally vendored `agentropolis-loop-baseline.js` at the Parallax root
instead is a follow-on decision, not taken here.

The pre-existing vendored tree was verified to be an exact copy of source
@ `0fb521c3` (297 files) plus `PARALLAX-IMPORT.json`; nothing current was
deleted.

## Duplication inventory (consolidation plan, step 1)

- NEW, known duplication: `src/input/chaos-input.ts` (canonical Parallax
  copy) vs `apps/webmcp-challenge/src/intent/chaos-input.ts` (vendored demo
  copy, required by the lab's import path). Per plan step 6, the vendored
  copy is removed only after tests prove parity; it is retained in this PR
  so the vendored demo stays self-contained and byte-faithful to source.
- PRE-EXISTING, out of scope for this PR: `apps/webmcp-challenge/src/spatial/*`
  duplicates the Parallax root runtime (`src/runtime/*`); the governed
  `packages/ui-vault` inside the vendored app is retained until intentionally
  promoted or extracted. No existing Parallax work was overwritten or
  discarded because a similarly named file exists in the import.

## Verification (recorded 2026-11-11, run locally on this branch)

Parallax root (`npm run typecheck`, `npm run build`): both PASS.

Root targeted tests (`npx vitest run src/input/chaos-input.test.ts
src/runtime/runtime.test.ts src/runtime/input-adapter.test.ts`):
17 passed (5 migrated PR #26 + 4 pre-existing runtime + 8 new adapter).

Root full suite (`npx vitest run` from the repo root): 96 tests passed,
0 failed, across 18 of 19 test files. The 19th file,
`apps/webmcp-challenge/packages/ui-vault/tests/public-exports.test.ts`,
failed to LOAD (not a test failure): `Cannot find package
'react/jsx-dev-runtime'` because the Parallax root `node_modules` has no
React; the vendored app's tests need the vendored app's own dependencies.
Verified PRE-EXISTING: the same file fails identically on clean main
(`git stash`, same error, exit 1). It is not caused by this PR.

Vendored app (`apps/webmcp-challenge/`, own dependencies installed):
`npm run typecheck` PASS; `npx vitest run` 32 passed (8 files);
`npm run test:ui-vault` 12 passed (3 files), including the
public-exports suite that cannot load from the repo root. This validates
the App.tsx wiring and the vendored lab/intent placement.

## Not done / open

- No real-hands validation of the gesture lab (unchanged from source).
- No camera/mic permissions or network calls added beyond what PR #26
  already does (local MediaPipe, CPU, no frames retained; model/WASM
  assets load from the pinned CDN URLs already in the lab source).
- No merge, no deploy. HERMES HANDS v0.1 build authorization is a separate
  task in WEBMCP-CHALLENGE and is untouched by this PR.
