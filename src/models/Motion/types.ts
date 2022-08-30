import { Position } from '../../types/position';
import { Size } from '../../types/size';
import { IMap } from '../Map/interface';

export type MotionProps = {
  position: Position;
  size: Size;
  step?: number;
};

export type PrevPosition = Position | undefined;
export type CollisionHandler<MapEntity> = (
  mapEntities: Array<MapEntity>,
  map: IMap,
  collisionAtP1: Position,
  collisionAtP2: Position,
) => void;
