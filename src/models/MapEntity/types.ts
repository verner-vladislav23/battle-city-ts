import { Position } from '../../types/position';
import { Size } from '../../types/size';

type BaseMapEntityProperties = {
  destructible: boolean;
  surmountable: boolean;
  position: Position;
  size: Size;
};

export type WallMapEntityType = {
  type: 'wall';
} & BaseMapEntityProperties;

export type BoxMapEntityType = {
  type: 'box';
} & BaseMapEntityProperties;

export type MapEntityType = WallMapEntityType | BoxMapEntityType
