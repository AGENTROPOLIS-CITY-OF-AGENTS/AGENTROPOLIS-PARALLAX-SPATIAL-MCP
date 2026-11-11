# WebMCP Challenge → PARALLAX consolidation audit (2026-11-10)

## Decision
The WebMCP Challenge has ended. PARALLAX is the canonical destination for all WebMCP Challenge materials, not just CHAOS INPUT. Keep the source repository as historical provenance; do not delete it or merge this review branch without approval.

## Exact source and destination
- Source: AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-WEBMCP-CHALLENGE, PR #26 head `7560a520c704b9030eb50730af6da9c10842acd9` (tree `66aa7a205498f120dbd3ee0513321a0f10631595`).
- Destination baseline: AGENTROPOLIS-CITY-OF-AGENTS/AGENTROPOLIS-PARALLAX-SPATIAL-MCP main `f551ecf2abda17c584236d5071eeaa6e9daf27fa` (tree `03a352a9f1c78f462479a773191df99afe99cf90`).
- Review branch: `review/webmcp-full-consolidation-20261110`.

## Recursive Git tree comparison (source PR #26 vs PARALLAX/apps/webmcp-challenge)
- 301 source blobs.
- 298 source-relative blob paths already present in PARALLAX.
- 297 existing paths have identical blob SHA.
- Four source paths were missing and have now been copied from the exact PR #26 SHA:
  - `docs/CHAOS-INPUT-SPATIAL-CONTROL.md`
  - `src/demo/chaos/GestureControlLab.tsx`
  - `src/intent/chaos-input.ts`
  - `src/intent/chaos-input.test.ts`
- One pre-existing file differs: `src/App.tsx`. **Preserve PARALLAX's modified App.tsx until the differences are reviewed.** Do not overwrite the integrated app shell blindly.
- This comparison includes files tracked in the source PR head. It does not prove that all historical branches, unmerged PRs, releases, issues, git-lfs objects, or external assets were migrated.

## Required validation
1. Compare all 301 source-relative paths and blob hashes again against the updated review branch; explain the intentional `src/App.tsx` delta.
2. Confirm `GestureControlLab` is actually reachable through PARALLAX's app navigation; importing/copying it alone does not wire a route.
3. Run `npm ci`, the WebMCP gesture five tests, WebMCP full suite (37 baseline), PARALLAX runtime four tests, and PARALLAX full suite. Attach raw logs and exit codes.
4. Repair the nested `ui-vault` dependency installation gap (missing `react/jsx-dev-runtime`) without masking failed tests.
5. Review licensing, MediaPipe asset loading, real-camera validation, camera permission denial and accessibility fallbacks.
6. Preserve original provenance and archive/redirect source only after successful independent verification.
7. Separate HERMES HANDS plugin effort; catalog camera/WASM limitations remain independently blocked pending compliant design.

## Verification boundary
The file-copy commits are real, but **tests have not been rerun after migration**, and no merge, deployment or production launch is authorized.
