import { Position } from '../../types/position';
import { Size } from '../../types/size';

export type MapEntity = {
  // TODO: type field will be enum in future
  type: string;
  destructible: boolean;
  surmountable: boolean;
  position: Position;
  size: Size;
}