import { describe, expect, it, vi } from 'vitest';
import { createCaptureArtifact, verifyCaptureBinding } from './capture.js';
import { runClosedLoopConstruction } from './operator-loop.js';
import { applySpatialMutation } from './scene-state.js';
import type { WorldGraph } from './world-graph.js';

const scene: WorldGraph = {
  sceneId: 'test-district',
  version: 1,
  objects: [{
    id: 'light-1', type: 'light', label: 'Key light', position: [0, 1, 0], rotation: [0, 0, 0],
    intensity: 20, permissions: ['inspect', 'intensity', 'capture'],
  }],
};

describe('PARALLAX runtime', () => {
  it('denies an unauthorized mutation without changing the graph', () => {
    expect(() => applySpatialMutation(scene, { kind: 'material', objectId: 'light-1', material: 'red' }))
      .toThrow('CAPABILITY_DENIED');
    expect(scene.version).toBe(1);
  });

  it('detects tampered evidence', async () => {
    const capture = await createCaptureArtifact(scene, 'data:image/png;base64,original');
    expect(await verifyCaptureBinding(capture)).toBe(true);
    expect(await verifyCaptureBinding({ ...capture, captureRef: `${capture.captureRef}tampered` })).toBe(false);
  });

  it('runs mutate, capture, verify, receipt in order', async () => {
    const calls: string[] = [];
    const result = await runClosedLoopConstruction({
      graph: scene,
      plan: { objective: 'Set an interview light', mutations: [{ kind: 'intensity', objectId: 'light-1', intensity: 70 }] },
      capture: async (graph) => { calls.push('capture'); return createCaptureArtifact(graph, `scene:${graph.version}`); },
      verify: async (_graph, capture) => {
        calls.push('verify');
        return { status: 'PASS', passed: true, score: 100, notes: ['bounded'], captureId: capture.captureId, captureHash: capture.captureHash };
      },
    });
    expect(calls).toEqual(['capture', 'verify']);
    expect(result.graph.version).toBe(2);
    expect(result.receipt.captureHash).toBe(result.capture.captureHash);
  });

  it('cannot issue a receipt when verification fails', async () => {
    const capture = vi.fn(async (graph: WorldGraph) => createCaptureArtifact(graph, 'failed'));
    await expect(runClosedLoopConstruction({
      graph: scene,
      plan: { objective: 'Unsafe change', mutations: [{ kind: 'intensity', objectId: 'light-1', intensity: 90 }] },
      capture,
      verify: async (_graph, artifact) => ({ status: 'FAIL', passed: false, score: 0, notes: [], captureId: artifact.captureId, captureHash: artifact.captureHash }),
    })).rejects.toThrow('RECEIPT_DENIED');
  });
});
