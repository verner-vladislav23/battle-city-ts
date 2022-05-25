import { Position } from '../../types/position';

export type PrevPosition = Position | undefined;
export type CollisionHandler<MapEntity> = (
  mapEntities: Array<MapEntity>,
  collisionAtP1: Position,
  collisionAtP2: Position,
) => void;
