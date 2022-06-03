import { Position } from '../../types/position';
import { Size } from '../../types/size';

type BaseMapEntityProperties = {
  readonly destructible: boolean;
  readonly surmountable: boolean;
  readonly position: Position;
  readonly size: Size;
};

export type WallMapEntityType = {
  readonly type: 'wall';
} & BaseMapEntityProperties;

export type BoxMapEntityType = {
  readonly type: 'box';
} & BaseMapEntityProperties;

export type MapEntityType = WallMapEntityType | BoxMapEntityType;
