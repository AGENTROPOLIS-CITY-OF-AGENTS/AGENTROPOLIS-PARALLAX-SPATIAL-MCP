import { applySpatialMutation, type SpatialMutation } from './scene-state.js';
import { createSpatialReceipt, type SpatialCaptureArtifact, type SpatialConstructionReceipt, type SpatialVerification } from './receipt.js';
import type { WorldGraph } from './world-graph.js';

export interface ClosedLoopPlan {
  objective: string;
  mutations: readonly SpatialMutation[];
}

export interface ClosedLoopResult {
  graph: WorldGraph;
  receipt: SpatialConstructionReceipt;
  capture: SpatialCaptureArtifact;
}

export async function runClosedLoopConstruction(input: {
  graph: WorldGraph;
  plan: ClosedLoopPlan;
  capture: (graph: WorldGraph) => Promise<SpatialCaptureArtifact>;
  verify: (graph: WorldGraph, capture: SpatialCaptureArtifact, objective: string) => Promise<SpatialVerification>;
}): Promise<ClosedLoopResult> {
  const beforeVersion = input.graph.version;
  let graph = input.graph;
  for (const mutation of input.plan.mutations) graph = applySpatialMutation(graph, mutation);

  const capture = await input.capture(graph);
  const verification = await input.verify(graph, capture, input.plan.objective);
  const receipt = createSpatialReceipt({
    sceneId: graph.sceneId,
    objective: input.plan.objective,
    beforeVersion,
    afterVersion: graph.version,
    captureId: capture.captureId,
    captureHash: capture.captureHash,
    captureRef: capture.captureRef,
    mutations: input.plan.mutations,
    verification,
  });
  return { graph, capture, receipt };
}
