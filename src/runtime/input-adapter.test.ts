import { describe, expect, it } from 'vitest';
import { createCaptureArtifact } from './capture.js';
import { handleGestureIntent } from './input-adapter.js';
import type { AipIntent } from '../input/chaos-input.js';
import type { WorldGraph } from './world-graph.js';

const scene: WorldGraph = {
  sceneId: 'test-district',
  version: 1,
  objects: [{
    id: 'light-1', type: 'light', label: 'Key light', position: [0, 1, 0], rotation: [0, 0, 0],
    intensity: 20, permissions: ['inspect', 'intensity', 'capture'],
  }],
};

function intent(overrides: Partial<AipIntent> = {}): AipIntent {
  return {
    version: '0.1',
    id: 'intent-1',
    verb: 'select',
    actor: { identity: 'unverified.local-operator', inputMode: 'gesture' },
    target: { type: 'object', id: 'light-1' },
    authority: { requiresConfirmation: false, riskClass: 'low' },
    context: { source: 'chaos-input', verificationStatus: 'experimental', recognitionConfidence: 0.99 },
    ...overrides,
  };
}

const capture = async (graph: WorldGraph) => createCaptureArtifact(graph, `scene:${graph.version}`);
const verifyPass = async (_graph: WorldGraph, artifact: Awaited<ReturnType<typeof capture>>) => ({
  status: 'PASS' as const, passed: true, score: 100, notes: ['bounded'],
  captureId: artifact.captureId, captureHash: artifact.captureHash,
});
const verifyFail = async (_graph: WorldGraph, artifact: Awaited<ReturnType<typeof capture>>) => ({
  status: 'FAIL' as const, passed: false, score: 0, notes: [],
  captureId: artifact.captureId, captureHash: artifact.captureHash,
});

describe('gesture input adapter', () => {
  it('denies an unauthorized gesture intent without changing the graph', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent(),
      // light-1 has no 'material' permission, so the existing gate denies this.
      mutation: { kind: 'material', objectId: 'light-1', material: 'red' },
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('denied');
    if (outcome.status !== 'denied') throw new Error('expected denial');
    expect(outcome.denial.reason).toBe('CAPABILITY_DENIED');
    expect(outcome.denial.intentId).toBe('intent-1');
    expect(scene.version).toBe(1);
  });

  it('produces a denial receipt for a denied intent', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      // approve is consequential and the host did not confirm it.
      intent: intent({ verb: 'approve', authority: { requiresConfirmation: true, riskClass: 'high' } }),
      mutation: { kind: 'intensity', objectId: 'light-1', intensity: 70 },
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('denied');
    if (outcome.status !== 'denied') throw new Error('expected denial');
    expect(outcome.denial.reason).toBe('CONFIRMATION_REQUIRED');
    expect(outcome.denial.denialId).toContain('denial-test-district-1-intent-1');
    expect(outcome.denial.verb).toBe('approve');
    expect(outcome.denial.sceneId).toBe('test-district');
    expect(outcome.denial.sceneVersion).toBe(1);
    expect(outcome.denial.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(scene.version).toBe(1);
  });

  it('executes an authorized gesture intent through the existing receipt chain', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent(),
      mutation: { kind: 'intensity', objectId: 'light-1', intensity: 70 },
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('executed');
    if (outcome.status !== 'executed') throw new Error('expected execution');
    expect(outcome.result.graph.version).toBe(2);
    expect(outcome.result.receipt.captureHash).toBe(outcome.result.capture.captureHash);
    expect(outcome.result.receipt.objective).toBe('gesture:select:intent-1');
    expect(scene.version).toBe(1);
  });

  it('denies a failed verification instead of issuing a receipt', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent(),
      mutation: { kind: 'intensity', objectId: 'light-1', intensity: 70 },
      capture,
      verify: verifyFail,
    });
    expect(outcome.status).toBe('denied');
    if (outcome.status !== 'denied') throw new Error('expected denial');
    expect(outcome.denial.reason).toBe('VERIFICATION_FAILED');
    expect(scene.version).toBe(1);
  });

  it('inspects without mutating the graph', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent({ verb: 'inspect' }),
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('inspected');
    if (outcome.status !== 'inspected') throw new Error('expected inspection');
    expect(outcome.object.id).toBe('light-1');
    expect(scene.version).toBe(1);
  });

  it('treats stop as a request, not a mutation', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent({ verb: 'stop' }),
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('stop-requested');
    if (outcome.status !== 'stop-requested') throw new Error('expected stop request');
    expect(outcome.intentId).toBe('intent-1');
    expect(scene.version).toBe(1);
  });

  it('denies a mutation proposal that targets a different object than the intent', async () => {
    const outcome = await handleGestureIntent({
      graph: scene,
      intent: intent(),
      mutation: { kind: 'intensity', objectId: 'light-2', intensity: 70 },
      capture,
      verify: verifyPass,
    });
    expect(outcome.status).toBe('denied');
    if (outcome.status !== 'denied') throw new Error('expected denial');
    expect(outcome.denial.reason).toBe('TARGET_MISMATCH');
    expect(scene.version).toBe(1);
  });

  it('denies a null intent', async () => {
    const outcome = await handleGestureIntent({ graph: scene, intent: null, capture, verify: verifyPass });
    expect(outcome.status).toBe('denied');
    if (outcome.status !== 'denied') throw new Error('expected denial');
    expect(outcome.denial.reason).toBe('MALFORMED_INTENT');
    expect(outcome.denial.intentId).toBe('unknown');
  });
});
