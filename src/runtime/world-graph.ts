export type Vec3 = readonly [number, number, number];

export type SpatialPermission =
  | 'inspect'
  | 'translate'
  | 'rotate'
  | 'material'
  | 'intensity'
  | 'capture';

export interface SpatialObject {
  id: string;
  type: string;
  label: string;
  position: Vec3;
  rotation: Vec3;
  material?: string;
  intensity?: number;
  permissions: readonly SpatialPermission[];
}

export interface WorldGraph {
  sceneId: string;
  version: number;
  objects: readonly SpatialObject[];
}

export function getSpatialObject(graph: WorldGraph, id: string): SpatialObject {
  const object = graph.objects.find((entry) => entry.id === id);
  if (!object) throw new Error(`SPATIAL_OBJECT_NOT_FOUND:${id}`);
  return object;
}

export function assertSpatialPermission(object: SpatialObject, permission: SpatialPermission): void {
  if (!object.permissions.includes(permission)) {
    throw new Error(`CAPABILITY_DENIED:${object.id}:${permission}`);
  }
}
