import type { SpatialMutation } from './scene-state.js';

export interface SpatialCaptureArtifact {
  captureId: string;
  captureHash: string;
  captureRef: string;
  sceneId: string;
  sceneVersion: number;
}

export type SpatialVerificationStatus = 'PASS' | 'CORRECTION_NEEDED' | 'FAIL';

export interface SpatialVerification {
  status: SpatialVerificationStatus;
  passed: boolean;
  score: number;
  notes: readonly string[];
  captureId: string;
  captureHash: string;
}

export interface SpatialConstructionReceipt {
  receiptId: string;
  sceneId: string;
  objective: string;
  beforeVersion: number;
  afterVersion: number;
  captureId: string;
  captureHash: string;
  captureRef: string;
  mutations: readonly SpatialMutation[];
  verification: SpatialVerification;
  generatedAt: string;
}

export function createSpatialReceipt(
  input: Omit<SpatialConstructionReceipt, 'receiptId' | 'generatedAt'>,
): SpatialConstructionReceipt {
  if (!input.verification.passed || input.verification.status !== 'PASS') {
    throw new Error('RECEIPT_DENIED:VERIFICATION_NOT_PASSED');
  }
  if (input.captureId !== input.verification.captureId || input.captureHash !== input.verification.captureHash) {
    throw new Error('RECEIPT_DENIED:CAPTURE_MISMATCH');
  }
  return {
    ...input,
    receiptId: `spatial-${input.sceneId}-${input.afterVersion}-${input.captureHash.slice(0, 12)}`,
    generatedAt: new Date().toISOString(),
  };
}
