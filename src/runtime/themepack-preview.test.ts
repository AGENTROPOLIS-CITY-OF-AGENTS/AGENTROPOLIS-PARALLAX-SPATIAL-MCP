import { describe, expect, it } from 'vitest';
import { inspectThemePreview, type ThemePreviewLayers } from './themepack-preview.js';
import { applySpatialMutation } from './scene-state.js';

const pack: ThemePreviewLayers = {
  themeId: 'agentropolis.obsidian-signal', sceneId: 'asds54/theme-preview',
  layers: [
    { role: 'background', id: 'obsidian-skyline', depth: 0.05 },
    { role: 'glow', id: 'signal-aura', depth: 0.12 },
    { role: 'foreground', id: 'city-silhouette', depth: -0.25 },
  ],
  palette: { obsidian: '#0a0a12', cyan: '#5ee9f0', red: '#ee1b2e', cream: '#f2f0ea' },
  motion: { strength: 1, reduced: false },
};

describe('ASDS54 ThemePack read-only preview', () => {
  it('maps theme layers to inspect-only objects', () => {
    const scene = inspectThemePreview(pack);
    expect(scene.objects.map(o => o.label)).toEqual(['background', 'glow', 'foreground']);
    expect(() => applySpatialMutation(scene, { kind: 'translate', objectId: scene.objects[0]!.id, delta: [1, 0, 0] })).toThrow('CAPABILITY_DENIED');
  });
  it('honors reduced motion', () => {
    const scene = inspectThemePreview({ ...pack, motion: { strength: 1.5, reduced: true } });
    expect(scene.objects.every(o => o.position[2] === 0)).toBe(true);
  });
  it('denies bad visual metadata', () => {
    expect(() => inspectThemePreview({ ...pack, palette: { ...pack.palette, cyan: 'invalid' } })).toThrow('INVALID_THEME:PALETTE');
    expect(() => inspectThemePreview({ ...pack, layers: [] })).toThrow('INVALID_THEME:LAYER_COUNT');
  });
});
