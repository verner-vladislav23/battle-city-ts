import { Position } from '../../types/position';
import { Size } from '../../types/size';

type BaseMapEntityProps = {
  readonly destructible: boolean;
  readonly surmountable: boolean;
  readonly position: Position;
  readonly size: Size;
};

export type WallMapEntityType = {
  readonly type: 'wall';
  readonly destructible: true;
  readonly surmountable: false;
} & BaseMapEntityProps;

export type BoxMapEntityType = {
  readonly type: 'box';
  readonly destructible: false;
  readonly surmountable: false;
} & BaseMapEntityProps;

export type WaterMapEntityType = {
  readonly type: 'water';
  readonly destructible: false;
  readonly surmountable: false;
} & BaseMapEntityProps;

export type ForestMapEntityType = {
  readonly type: 'forest';
  readonly destructible: false;
  readonly surmountable: true;
} & BaseMapEntityProps;

export type MapEntityProps<T> = Omit<T, 'position'>;
export type MapEntityType =
  | WallMapEntityType
  | BoxMapEntityType
  | WaterMapEntityType
  | ForestMapEntityType;
