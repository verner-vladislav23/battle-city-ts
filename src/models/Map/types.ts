import { Position } from '../../types/position';
import { Size } from '../../types/size';

type BaseMapEntityProperties = {
  destructible: boolean;
  surmountable: boolean;
  position: Position;
  size: Size;
};

export type Wall = {
  type: 'wall';
} & BaseMapEntityProperties;

// for example
export type Box = {
  type: 'box';
} & BaseMapEntityProperties;

export type MapEntity = Wall | Box;
