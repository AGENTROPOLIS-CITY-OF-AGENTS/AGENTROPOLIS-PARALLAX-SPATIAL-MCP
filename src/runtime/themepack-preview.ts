import type { WorldGraph } from './world-graph.js';

/**
 * Read-only ThemePack preview adapter. Preview rendering is presentation only.
 * It grants no scene-mutation, capture, approval, WebMCP or device authority.
 */
export interface ThemePreviewLayers {
  themeId: string;
  sceneId: string;
  layers: readonly { id: string; role: string; depth: number }[];
  palette: Readonly<Record<'obsidian' | 'cyan' | 'red' | 'cream', string>>;
  motion: { strength: number; reduced: boolean };
}

export function inspectThemePreview(theme: ThemePreviewLayers): WorldGraph {
  if (theme.layers.length !== 3) throw new Error('INVALID_THEME:LAYER_COUNT');
  const roles = theme.layers.map(layer => layer.role);
  if (roles.join(',') !== 'background,glow,foreground') throw new Error('INVALID_THEME:LAYER_ORDER');
  if (!Number.isFinite(theme.motion.strength) || theme.motion.strength < 0.5 || theme.motion.strength > 2) {
    throw new Error('INVALID_THEME:DEPTH');
  }
  for (const color of Object.values(theme.palette)) {
    if (!/^#[0-9a-fA-F]{6}$/.test(color)) throw new Error('INVALID_THEME:PALETTE');
  }
  return {
    sceneId: theme.sceneId,
    version: 1,
    objects: theme.layers.map(layer => ({
      id: theme.themeId + ':' + layer.id,
      type: 'themed-visual-layer',
      label: layer.role,
      position: [0, 0, theme.motion.reduced ? 0 : layer.depth * theme.motion.strength] as const,
      rotation: [0, 0, 0] as const,
      permissions: ['inspect'] as const,
    })),
  };
}
