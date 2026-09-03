import type { SpatialCaptureArtifact } from './receipt.js';
import type { WorldGraph } from './world-graph.js';

const encoder = new TextEncoder();

export async function sha256(value: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function createCaptureArtifact(
  graph: WorldGraph,
  captureRef: string,
): Promise<SpatialCaptureArtifact> {
  const captureHash = await sha256(captureRef);
  return {
    captureId: `sha256:${captureHash}`,
    captureHash,
    captureRef,
    sceneId: graph.sceneId,
    sceneVersion: graph.version,
  };
}

export async function verifyCaptureBinding(capture: SpatialCaptureArtifact): Promise<boolean> {
  const hash = await sha256(capture.captureRef);
  return capture.captureHash === hash && capture.captureId === `sha256:${hash}`;
}
