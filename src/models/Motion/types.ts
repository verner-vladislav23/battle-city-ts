import { Position } from '../../types/position';

export type PrevPosition = Position | undefined;
export type CollisionHandler = (
  collisionP1: Position,
  collisionP2: Position,
) => void;
