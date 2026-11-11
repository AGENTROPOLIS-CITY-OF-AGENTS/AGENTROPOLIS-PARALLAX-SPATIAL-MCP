import { runClosedLoopConstruction, type ClosedLoopResult } from './operator-loop.js';
import type { SpatialCaptureArtifact, SpatialVerification } from './receipt.js';
import type { SpatialMutation } from './scene-state.js';
import { assertSpatialPermission, getSpatialObject, type SpatialObject, type WorldGraph } from './world-graph.js';
import type { AipIntent } from '../input/chaos-input.js';

/**
 * Gesture input adapter: the only path by which a CHAOS INPUT / AIP intent
 * reaches the governed PARALLAX execution surface.
 *
 * An intent is a PROPOSAL, never an authorization. This adapter:
 * - routes every mutating proposal through the existing permission gates
 *   (`applySpatialMutation`, via `runClosedLoopConstruction`) and the
 *   existing receipt chain (capture -> verify -> receipt, fail-closed);
 * - grants gesture input no authority the runtime does not already grant;
 * - denies consequential verbs (`approve`, `reject`) unless the host
 *   explicitly confirms them (`confirmedByHost`), because a gesture alone
 *   cannot authorize;
 * - records every denial as a denial receipt. A denial receipt is NOT a
 *   construction receipt: it proves the attempt was refused, it does not
 *   claim anything was executed or verified.
 *
 * The runtime security model is unchanged: permission gates, SHA-256
 * capture binding, and fail-closed receipts are all owned by the existing
 * runtime modules, not by this adapter.
 */

export type GestureDenialReason =
  | 'MALFORMED_INTENT'
  | 'CONFIRMATION_REQUIRED'
  | 'NO_MUTATION_PROPOSAL'
  | 'TARGET_MISMATCH'
  | 'CAPABILITY_DENIED'
  | 'OBJECT_NOT_FOUND'
  | 'VERIFICATION_FAILED';

export interface GestureDenialReceipt {
  denialId: string;
  intentId: string;
  verb: string;
  reason: GestureDenialReason;
  sceneId: string;
  sceneVersion: number;
  generatedAt: string;
}

export type GestureIntentOutcome =
  | { status: 'executed'; result: ClosedLoopResult }
  | { status: 'inspected'; object: SpatialObject }
  | { status: 'stop-requested'; intentId: string }
  | { status: 'denied'; denial: GestureDenialReceipt };

function deny(
  graph: WorldGraph,
  intent: AipIntent | null,
  reason: GestureDenialReason,
): GestureIntentOutcome {
  const intentId = intent?.id ?? 'unknown';
  const verb = intent?.verb ?? 'unknown';
  return {
    status: 'denied',
    denial: {
      denialId: `denial-${graph.sceneId}-${graph.version}-${intentId}`,
      intentId,
      verb,
      reason,
      sceneId: graph.sceneId,
      sceneVersion: graph.version,
      generatedAt: new Date().toISOString(),
    },
  };
}

const CONSEQUENTIAL_VERBS: readonly string[] = ['approve', 'reject'];

export async function handleGestureIntent(input: {
  graph: WorldGraph;
  intent: AipIntent | null;
  mutation?: SpatialMutation;
  confirmedByHost?: boolean;
  capture: (graph: WorldGraph) => Promise<SpatialCaptureArtifact>;
  verify: (graph: WorldGraph, capture: SpatialCaptureArtifact, objective: string) => Promise<SpatialVerification>;
}): Promise<GestureIntentOutcome> {
  const { graph, intent } = input;
  if (!intent) return deny(graph, null, 'MALFORMED_INTENT');

  // Consequential verbs need explicit host confirmation. A gesture alone
  // cannot authorize.
  if (CONSEQUENTIAL_VERBS.includes(intent.verb) && !input.confirmedByHost) {
    return deny(graph, intent, 'CONFIRMATION_REQUIRED');
  }

  // Read-only verb: permission-gated read, no mutation, no receipt.
  if (intent.verb === 'inspect') {
    try {
      const object = getSpatialObject(graph, intent.target.id);
      assertSpatialPermission(object, 'inspect');
      return { status: 'inspected', object };
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('SPATIAL_OBJECT_NOT_FOUND')) {
        return deny(graph, intent, 'OBJECT_NOT_FOUND');
      }
      if (error instanceof Error && error.message.startsWith('CAPABILITY_DENIED')) {
        return deny(graph, intent, 'CAPABILITY_DENIED');
      }
      throw error;
    }
  }

  // Stop is a request, not a confirmed runtime cancellation. No mutation.
  if (intent.verb === 'stop') {
    return { status: 'stop-requested', intentId: intent.id };
  }

  // Every remaining verb needs a host-supplied mutation proposal, and the
  // proposal must target the same object the intent named.
  if (!input.mutation) return deny(graph, intent, 'NO_MUTATION_PROPOSAL');
  if (input.mutation.objectId !== intent.target.id) {
    return deny(graph, intent, 'TARGET_MISMATCH');
  }

  // Governed path: existing permission gates + capture/verify/receipt chain.
  try {
    const result = await runClosedLoopConstruction({
      graph,
      plan: {
        objective: `gesture:${intent.verb}:${intent.id}`,
        mutations: [input.mutation],
      },
      capture: input.capture,
      verify: input.verify,
    });
    return { status: 'executed', result };
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('CAPABILITY_DENIED')) {
      return deny(graph, intent, 'CAPABILITY_DENIED');
    }
    if (error instanceof Error && error.message.startsWith('RECEIPT_DENIED')) {
      return deny(graph, intent, 'VERIFICATION_FAILED');
    }
    throw error;
  }
}
