import { Position } from '../../types/position';
import { IMap } from '../Map/interface';

export type PrevPosition = Position | undefined;
export type CollisionHandler<MapEntity> = (
  mapEntities: Array<MapEntity>,
  map: IMap,
  collisionAtP1: Position,
  collisionAtP2: Position,
) => void;
