import { Position } from '../../types/position';
import { Size } from '../../types/size';

export type DynamicMapEntityID = string;

type BaseMapEntityProps = {
  readonly destructible: boolean;
  readonly surmountable: boolean;
  readonly position: Position;
  readonly size: Size;
};

type StaticBaseMapEntityProps = {
  readonly isStatic: true;
} & BaseMapEntityProps;

type DynamicBaseMapEntityProps = {
  readonly isStatic: false;
  readonly id: DynamicMapEntityID;
  readonly step?: number;
} & BaseMapEntityProps;

// static map entities
export type WallMapEntityType = {
  readonly type: 'wall';
  readonly destructible: true;
  readonly surmountable: false;
} & StaticBaseMapEntityProps;

export type BoxMapEntityType = {
  readonly type: 'box';
  readonly destructible: false;
  readonly surmountable: false;
} & StaticBaseMapEntityProps;

export type WaterMapEntityType = {
  readonly type: 'water';
  readonly destructible: false;
  readonly surmountable: true;
} & StaticBaseMapEntityProps;

export type ForestMapEntityType = {
  readonly type: 'forest';
  readonly destructible: false;
  readonly surmountable: true;
} & StaticBaseMapEntityProps;

export type MapEntityProps<T> = Omit<T, 'position'>;

// dynamic map entities
export type TankMapEntityType = {
  readonly type: 'tank';
  readonly destructible: true;
  readonly surmountable: false;
} & DynamicBaseMapEntityProps;

export type BulletMapEntityType = {
  readonly type: 'bullet';
  readonly destructible: true;
  readonly surmountable: false;
} & DynamicBaseMapEntityProps;

export type StaticMapEntityType =
  | WallMapEntityType
  | BoxMapEntityType
  | WaterMapEntityType
  | ForestMapEntityType;

export type DynamicMapEntityType = TankMapEntityType | BulletMapEntityType;
